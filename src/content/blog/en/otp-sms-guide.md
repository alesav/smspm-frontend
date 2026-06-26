---
title: "OTP SMS: A Developer's Guide to One-Time Password Delivery"
description: "Learn how OTP SMS works, how to implement it with SMSPM's API, and best practices for rate limiting, expiry, and retry logic in production."
pubDate: 2025-06-26
author: "SMSPM Team"
tags: ["otp", "authentication", "developer", "api"]
draft: false
---

One-time passwords delivered via SMS remain the most widely supported second factor in authentication systems — no app download required, works on every phone. This guide covers everything a developer needs to ship OTP SMS in production.

## What Is OTP SMS?

An OTP (one-time password) is a short numeric or alphanumeric code sent to a user's mobile number to verify ownership of that number or to authorize a specific action. The code is valid for a limited time (typically 5–10 minutes) and can be used only once.

Common use cases:
- New account registration (verify phone number ownership)
- Login second factor (2FA / MFA)
- High-value transaction authorization (banking, crypto)
- Password reset via phone
- Device enrollment

## How OTP SMS Works End-to-End

1. User enters their phone number and requests a code
2. Your server generates a random 6-digit code and stores it (with expiry) against the user's session or phone number
3. Your server calls the SMSPM API to send the code via SMS
4. User receives the SMS and enters the code in your UI
5. Your server verifies the submitted code matches the stored one and hasn't expired
6. On match: proceed; on fail: increment attempt counter and check rate limit

## Sending OTP with the SMSPM API

SMSPM uses a simple GET or POST request with query parameters. Here's a minimal OTP send in JavaScript:

```javascript
async function sendOTP(phoneNumber, code) {
  const params = new URLSearchParams({
    hash: process.env.SMSPM_HASH,
    token: process.env.SMSPM_TOKEN,
    toNumber: phoneNumber,   // E.164 format: +37256789045
    fromNumber: 'MyApp',     // Alphanumeric sender ID
    text: `Your MyApp verification code is: ${code}. Valid for 10 minutes.`
  });

  const response = await fetch(`https://api.smspm.com?${params}`);
  const result = await response.json();

  if (result.status !== 'success') {
    throw new Error(`SMS send failed: ${result.message}`);
  }
  return result;
}
```

The API responds with a `status` field — check it before assuming delivery. Use the returned message ID to query delivery status later if needed.

## Generating a Secure OTP Code

Never use `Math.random()` for OTP codes — it is not cryptographically secure. Use the platform's crypto module:

```javascript
// Node.js
import { randomInt } from 'crypto';

function generateOTP(digits = 6) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return String(randomInt(min, max + 1)).padStart(digits, '0');
}
```

For a 6-digit code this gives 1,000,000 possible values — sufficient for most use cases when combined with rate limiting and short expiry.

## Storing and Validating the Code

Store OTP codes server-side only — never in the browser or in the SMS callback URL. A minimal Redis schema:

```javascript
// Store: key = otp:+37256789045, value = {code, attempts, expiresAt}
await redis.set(
  `otp:${phoneNumber}`,
  JSON.stringify({ code, attempts: 0, expiresAt: Date.now() + 10 * 60 * 1000 }),
  { EX: 600 } // auto-expire in Redis too
);

// Verify
async function verifyOTP(phoneNumber, submitted) {
  const raw = await redis.get(`otp:${phoneNumber}`);
  if (!raw) return { valid: false, reason: 'expired' };

  const record = JSON.parse(raw);
  if (Date.now() > record.expiresAt) return { valid: false, reason: 'expired' };
  if (record.attempts >= 3) return { valid: false, reason: 'too_many_attempts' };

  if (submitted !== record.code) {
    record.attempts++;
    await redis.set(`otp:${phoneNumber}`, JSON.stringify(record), { EX: 600 });
    return { valid: false, reason: 'wrong_code' };
  }

  await redis.del(`otp:${phoneNumber}`); // consume the OTP
  return { valid: true };
}
```

## Rate Limiting: Preventing Abuse

Without rate limiting, attackers can trigger hundreds of SMS sends from your account, costing you money and harassing users. Apply two layers:

**Layer 1 — Per-phone-number cooldown:** allow at most one OTP send per phone number per 60 seconds.

**Layer 2 — Per-IP send limit:** allow at most 5 OTP sends per IP per hour (adjust for your traffic profile).

```javascript
async function canSendOTP(phoneNumber, ip) {
  const phoneKey = `otp:cooldown:${phoneNumber}`;
  const ipKey = `otp:ip:${ip}`;

  const [phoneCooldown, ipCount] = await Promise.all([
    redis.exists(phoneKey),
    redis.incr(ipKey)
  ]);

  if (ipCount === 1) await redis.expire(ipKey, 3600);
  if (phoneCooldown) throw new Error('Please wait before requesting another code');
  if (ipCount > 5) throw new Error('Too many requests');

  await redis.set(phoneKey, '1', { EX: 60 });
}
```

## Phone Number Validation Before Sending

Always validate and normalize the phone number to E.164 format before sending. SMSPM's `/en/tools/phone-formatter` shows the expected format. In code:

```javascript
// Strip spaces, dashes, parentheses — keep + and digits
function normalizePhone(raw) {
  const stripped = raw.replace(/[\s\-().]/g, '');
  // Handle 00 prefix same as +
  return stripped.startsWith('00') ? '+' + stripped.slice(2) : stripped;
}
```

Reject numbers that don't match `/^\+[1-9]\d{6,14}$/` before calling the API.

## Alternative: Database-Backed OTP (No Redis Required)

If you don't have Redis, you can store OTP codes in your primary database (PostgreSQL, MySQL, MongoDB, etc.). This is slightly slower but works fine for most applications (< 10K daily OTP sends).

### PostgreSQL Example

Create a table:

```sql
CREATE TABLE otp_codes (
  id BIGSERIAL PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  code VARCHAR(10) NOT NULL,
  attempts INT DEFAULT 0,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_phone_expires ON otp_codes(phone_number, expires_at);
```

Store and verify in your application:

```javascript
// Node.js with pg
const pool = new pg.Pool(/* config */);

async function storeOTP(phoneNumber, code) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  const query = `
    INSERT INTO otp_codes (phone_number, code, expires_at)
    VALUES ($1, $2, $3)
    ON CONFLICT (phone_number) DO UPDATE
    SET code = $2, expires_at = $3, attempts = 0
  `;
  await pool.query(query, [phoneNumber, code, expiresAt]);
}

async function verifyOTP(phoneNumber, submittedCode) {
  const query = `
    SELECT code, attempts, expires_at FROM otp_codes
    WHERE phone_number = $1 AND expires_at > NOW()
  `;
  const result = await pool.query(query, [phoneNumber]);

  if (!result.rows.length) {
    return { valid: false, reason: 'expired' };
  }

  const { code, attempts } = result.rows[0];
  if (attempts >= 3) {
    return { valid: false, reason: 'too_many_attempts' };
  }

  if (submittedCode !== code) {
    // Increment attempts
    await pool.query(
      'UPDATE otp_codes SET attempts = attempts + 1 WHERE phone_number = $1',
      [phoneNumber]
    );
    return { valid: false, reason: 'wrong_code' };
  }

  // Consume OTP
  await pool.query('DELETE FROM otp_codes WHERE phone_number = $1', [phoneNumber]);
  return { valid: true };
}
```

### MongoDB Example

```javascript
// Using mongoose
const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true },
  code: String,
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, index: true, expires: 0 },
});

const OTP = mongoose.model('OTP', otpSchema);

// Store
async function storeOTP(phoneNumber, code) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await OTP.updateOne(
    { phoneNumber },
    { code, attempts: 0, expiresAt },
    { upsert: true }
  );
}

// Verify
async function verifyOTP(phoneNumber, submittedCode) {
  const record = await OTP.findOne({ phoneNumber });
  
  if (!record) return { valid: false, reason: 'expired' };
  if (record.attempts >= 3) return { valid: false, reason: 'too_many_attempts' };
  
  if (submittedCode !== record.code) {
    await OTP.updateOne({ phoneNumber }, { $inc: { attempts: 1 } });
    return { valid: false, reason: 'wrong_code' };
  }
  
  await OTP.deleteOne({ phoneNumber });
  return { valid: true };
}
```

### Tradeoffs: Redis vs Database

| Factor | Redis | Database |
|--------|-------|----------|
| Speed | Very fast (in-memory) | Slower (disk I/O) |
| Setup | Extra infrastructure | Already have database |
| Scaling | Hits memory limits at ~100K/sec | Scales to millions/sec with proper indexing |
| Cleanup | Auto-expiry with TTL | Need manual cleanup jobs (or expire fields) |
| Cost | Additional server/managed service | Included in existing DB |

**When to use:**
- **Redis:** High-volume scenarios (>1K OTP/min), latency-sensitive, or already running Redis for caching
- **Database:** Low-to-medium volume (<100 OTP/min), simpler operations, existing database preference

Both approaches are secure if rate limits and expiry are enforced properly.

## SMS Message Copy Best Practices

- Keep it under 160 characters (one GSM-7 SMS part) — use our [SMS Character Counter](/en/tools/sms-character-counter) to check
- Include your app/brand name so users know who sent it
- State the expiry time explicitly
- Never include a link in an OTP message — it trains users to click SMS links, which is a phishing vector

Example: `Your MyApp code is 847392. Valid 10 min. Do not share this code.`

## Handling Delivery Failures

Not all SMS sends reach the handset immediately. Build a simple retry UI:

1. After send, show "Resend code" button (disabled for 60 seconds)
2. If user reports non-receipt after 2 attempts, offer an alternative (voice call, email OTP)
3. Log all delivery report callbacks from SMSPM to your webhook endpoint for debugging

## International Phone Numbers

SMSPM routes to 190+ countries, so international OTP delivery works out of the box. Things to watch:

- **Sender ID**: some countries (India, Indonesia, US) require pre-registered numeric sender IDs. Alphanumeric senders like "MyApp" work in Europe but not everywhere. Check the [SMSPM coverage](/en/prices) page for country-specific rules.
- **Encoding**: your OTP text should stay in the GSM-7 character set (no emoji, no special Unicode) to guarantee 160-char single-part delivery worldwide.
- **Time zones**: if your OTP message says "call us if you didn't request this", make sure your support team covers the user's time zone.

## Summary

| Step | What to do |
|---|---|
| Generate | Use `crypto.randomInt` for a 6-digit code |
| Store | Server-side only (Redis with TTL) |
| Send | SMSPM API with your hash/token credentials |
| Validate | Check code, expiry, and attempt count |
| Rate limit | Per-phone cooldown + per-IP hourly cap |
| Normalize | E.164 format before sending |

OTP SMS is one of the cheapest verification mechanisms available — at SMSPM's per-SMS pricing, the cost per verified user is a fraction of a euro cent for most markets.

[View pricing by country](/en/prices) · [API documentation](https://app.smspm.com/docs) · [Get started](https://app.smspm.com/app/register)
