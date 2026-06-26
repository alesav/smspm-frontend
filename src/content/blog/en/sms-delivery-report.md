---
title: "How to Handle SMS Delivery Reports (DLR) in Production"
description: "Understand SMS delivery reports, how to receive them via webhook callbacks, and how to use DLR data to monitor deliverability and debug failed sends."
pubDate: 2025-06-26
author: "SMSPM Team"
tags: ["deliverability", "api", "developer", "guide"]
draft: false
---

Sending an SMS returns a message ID from the gateway — but that only confirms the API accepted your request. A delivery report (DLR) tells you whether the message actually reached the handset. Here's how to set up DLR callbacks and use them effectively.

## What Is a Delivery Report?

A delivery report is a status update sent from the carrier network back to the SMS gateway (SMSPM) after a message reaches — or fails to reach — the recipient's handset. SMSPM then forwards this status to your specified callback URL via HTTP POST.

DLR statuses you'll see in practice:

| Status | Meaning |
|---|---|
| `delivered` | Handset confirmed receipt |
| `undelivered` | Carrier confirmed non-delivery (number invalid, handset unreachable) |
| `pending` | In transit — no confirmation yet (phone off, roaming delay) |
| `rejected` | Carrier rejected the message (spam filter, sender not registered) |
| `expired` | Message TTL elapsed without delivery (phone offline too long) |

Not all carriers send DLRs. In some markets (parts of Africa, some emerging markets), you'll only ever see `pending` — the carrier doesn't relay status back. Budget for this in your monitoring strategy.

## Setting Up a DLR Webhook

Configure your callback URL in SMSPM's API by appending `&callbackUrl=https://yourapp.com/webhooks/smspm` to your send request. SMSPM will POST the DLR payload to that URL when the carrier sends a status update.

### Example Express.js webhook handler

```javascript
import express from 'express';
const app = express();
app.use(express.json());

app.post('/webhooks/smspm', async (req, res) => {
  const { messageId, status, to, timestamp } = req.body;

  // Acknowledge immediately — don't wait for DB write
  res.sendStatus(200);

  // Process asynchronously
  await db.query(
    'UPDATE sms_logs SET status = $1, delivered_at = $2 WHERE message_id = $3',
    [status, timestamp, messageId]
  );

  if (status === 'undelivered' || status === 'rejected') {
    await alertingService.notify(`SMS to ${to} failed: ${status}`);
  }
});
```

Always respond with HTTP 200 immediately. If your handler takes too long, SMSPM will retry the webhook, causing duplicate processing.

### Python / FastAPI handler

```python
from fastapi import FastAPI, BackgroundTasks, Request
from sqlalchemy.orm import Session

app = FastAPI()

async def process_dlr(message_id: str, status: str, to: str, timestamp: str, db: Session):
    db.query(SmsLog).filter_by(message_id=message_id).update({
        "status": status,
        "delivered_at": timestamp
    })
    db.commit()
    if status in ("undelivered", "rejected", "expired"):
        await send_alert(f"SMS to {to} failed with status: {status}")

@app.post("/webhooks/smspm")
async def dlr_webhook(request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    data = await request.json()
    background_tasks.add_task(
        process_dlr, data["messageId"], data["status"], data["to"], data["timestamp"], db
    )
    return {"ok": True}
```

## What to Store

At minimum, log these fields for each outbound SMS:

```sql
CREATE TABLE sms_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id    TEXT NOT NULL UNIQUE,  -- from API response
  to_number     TEXT NOT NULL,
  from_number   TEXT NOT NULL,
  text_preview  TEXT,                  -- first 50 chars, for debugging
  status        TEXT NOT NULL DEFAULT 'pending',
  sent_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delivered_at  TIMESTAMPTZ,
  parts         INTEGER DEFAULT 1,
  cost_eur      NUMERIC(10,6),
  country_code  TEXT,
  error_code    TEXT                   -- populated on failure
);
CREATE INDEX ON sms_logs (message_id);
CREATE INDEX ON sms_logs (to_number, sent_at DESC);
CREATE INDEX ON sms_logs (status, sent_at DESC);
```

## Building a Deliverability Dashboard

Query your `sms_logs` table to track key metrics:

```sql
-- Delivery rate by day
SELECT
  DATE_TRUNC('day', sent_at) AS day,
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE status = 'delivered') AS delivered,
  ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'delivered') / COUNT(*), 1) AS delivery_rate_pct
FROM sms_logs
WHERE sent_at > NOW() - INTERVAL '30 days'
GROUP BY 1
ORDER BY 1;

-- Failure rate by country
SELECT
  country_code,
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE status IN ('undelivered','rejected','expired')) AS failed,
  ROUND(100.0 * COUNT(*) FILTER (WHERE status IN ('undelivered','rejected','expired')) / COUNT(*), 1) AS failure_rate_pct
FROM sms_logs
GROUP BY 1
ORDER BY failure_rate_pct DESC;
```

A healthy delivery rate for European and North American routes is typically above 95%. If you see a country dropping below 85%, investigate: the phone numbers may be stale, or there may be a carrier routing issue.

## Handling Retries

For critical notifications (payment failures, account alerts), implement a retry on non-delivery:

```javascript
async function sendWithRetry(to, text, maxAttempts = 2) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await sendSMS(to, text);
    const messageId = result.messageId;

    // Wait for DLR (poll or use webhook + await pattern)
    const status = await waitForDLR(messageId, { timeoutMs: 60_000 });

    if (status === 'delivered') return { success: true, messageId };
    if (status === 'rejected') break; // Don't retry rejected — it won't change
    // 'undelivered' or 'expired' → retry
  }
  return { success: false };
}
```

Don't retry `rejected` status — a carrier rejection usually means the message content triggered a filter and resending the same text will get the same result.

## DLR Timing Expectations

- **Delivered**: usually within 10–30 seconds for online handsets
- **Undelivered**: within a few minutes if the number is invalid
- **Pending → Delivered**: can take hours if the phone was off (carrier holds for 24–72 hours)
- **Pending → Expired**: after the carrier's hold period (24–72h), you get an expired status

For time-sensitive use cases (OTP), set your own application-level expiry much shorter (10 minutes) regardless of what the carrier does with the message.

## Common Issues and Fixes

**All messages staying "pending":** The carrier doesn't support DLR in that market, or your callback URL is not reachable from SMSPM's servers. Test your webhook URL with a tool like ngrok in development.

**High "rejected" rate:** Your sender ID may not be registered in that country, or message content matches a spam filter. Check the [Sender ID guide](/en/blog/understanding-sms-sender-id) for country-specific rules.

**Duplicate DLR callbacks:** Some carriers send multiple status updates for the same message. Make your handler idempotent — use `INSERT ... ON CONFLICT DO UPDATE` or similar.

## Summary

DLRs are essential for production SMS systems. Without them, you're flying blind — you know messages left your system but not whether they arrived. Set up your callback URL, log all statuses, alert on failure rates above a threshold (e.g. > 5% failed in a 1-hour window), and build a retry strategy for critical message types.

[View API documentation →](https://app.smspm.com/docs) · [Start sending →](https://app.smspm.com/app/register)
