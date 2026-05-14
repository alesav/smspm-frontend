---
title: "SMS API Integration Guide: Send Text Messages from Your App"
description: "Step-by-step guide to integrating an SMS API into your web or mobile application. Includes code examples in JavaScript, Python, and PHP."
pubDate: 2025-06-10
author: "SMSPM Team"
authorTitle: "Developer Relations"
image: "/blog/sms-api-integration.png"
imageAlt: "Code editor showing SMS API integration code"
tags: ["sms api", "developer", "integration", "rest api", "javascript", "python"]
featured: false
readingTime: 9
---

Integrating an SMS API into your application lets you send programmatic text messages — OTPs, order updates, alerts — without any third-party app. This guide walks through the SMSPM REST API with examples in three languages.

## Prerequisites

- An SMSPM account with positive balance ([register here](https://app.smspm.com/en/app/register))
- Your API token (Settings → API Keys in the dashboard)
- Basic knowledge of HTTP requests in your language of choice

## Authentication

All SMSPM API requests use Bearer token authentication:

```
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json
```

## Sending a Single SMS

### JavaScript (Node.js / fetch)

```javascript
const response = await fetch('https://app.smspm.com/api/v2/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '+37251234567',
    from: 'SMSPM',      // sender ID (max 11 chars, letters/digits)
    message: 'Your order #1234 has been shipped!',
  }),
});

const result = await response.json();
console.log(result); // { id: "msg_xxx", status: "queued", price: 0.065 }
```

### Python

```python
import requests

response = requests.post(
    'https://app.smspm.com/api/v2/sms/send',
    headers={
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json',
    },
    json={
        'to': '+37251234567',
        'from': 'SMSPM',
        'message': 'Your order #1234 has been shipped!',
    }
)
print(response.json())
```

### PHP

```php
$response = file_get_contents('https://app.smspm.com/api/v2/sms/send', false,
  stream_context_create(['http' => [
    'method' => 'POST',
    'header' => "Authorization: Bearer YOUR_API_TOKEN\r\nContent-Type: application/json",
    'content' => json_encode([
      'to'      => '+37251234567',
      'from'    => 'SMSPM',
      'message' => 'Your order #1234 has been shipped!',
    ]),
  ]])
);
echo $response;
```

## Sending Bulk SMS

To send to multiple recipients in one API call, pass an array in the `to` field:

```javascript
const response = await fetch('https://app.smspm.com/api/v2/sms/send', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_TOKEN', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: ['+37251234567', '+37261234567', '+4915123456789'],
    from: 'MyBrand',
    message: 'Flash sale: 20% off everything today only!',
  }),
});
```

## Checking Delivery Status

```javascript
const msgId = 'msg_xxx'; // from the send response
const status = await fetch(`https://app.smspm.com/api/v2/sms/${msgId}`, {
  headers: { 'Authorization': 'Bearer YOUR_API_TOKEN' },
});
const data = await status.json();
// data.status: 'delivered' | 'failed' | 'queued' | 'sent'
```

## Error Handling Best Practices

| HTTP Status | Meaning | Action |
|-------------|---------|--------|
| 200 | Success | Process normally |
| 400 | Bad request (invalid number, empty message) | Log and skip |
| 401 | Invalid token | Check API key |
| 402 | Insufficient balance | Top up account |
| 429 | Rate limited | Retry with backoff |
| 5xx | Server error | Retry after 30s |

## Rate Limits

The SMSPM API allows **100 requests/minute** on the standard plan. For campaigns with 10,000+ recipients, batch your numbers into groups of 500 per request rather than sending 10,000 individual requests.

## Webhook: Receiving Delivery Reports

Configure a webhook URL in your dashboard (Settings → Webhooks) to receive real-time delivery events:

```json
{
  "event": "sms.delivered",
  "id": "msg_xxx",
  "to": "+37251234567",
  "status": "delivered",
  "deliveredAt": "2025-06-10T14:23:11Z"
}
```

## Full API Reference

The complete OpenAPI specification is available at [app.smspm.com/docs](https://app.smspm.com/docs) and can be imported directly into Postman, Insomnia, or Bruno.

---

*Questions? [Open a support ticket](https://relio.work/helpdesk/smspmcom) or check our [API documentation](https://app.smspm.com/docs).*
