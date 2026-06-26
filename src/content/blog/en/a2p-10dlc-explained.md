---
title: "A2P 10DLC Explained: A Practical Guide for US Businesses"
description: "What is A2P 10DLC, who needs to register, what it costs, and how it affects SMS deliverability in the US. A plain-English guide with actionable steps."
pubDate: 2025-06-26
lastUpdated: 2025-06-26
author: "SMSPM Team"
tags: ["compliance", "a2p-10dlc", "us", "guide"]
draft: false
---

> **Last Updated:** June 26, 2026 — Regulations and carrier policies are subject to change. This guide reflects current 2025–2026 requirements. Check with your SMS provider for updates.

If you're sending business SMS to US phone numbers, A2P 10DLC registration isn't optional anymore — it's required by US carriers. Here's what it means, what you need to do, and how it affects your deliverability.

## What Is A2P 10DLC?

**A2P** stands for Application-to-Person — any SMS sent by a software system to a consumer (as opposed to person-to-person text messages). **10DLC** refers to 10-digit long codes — the standard local phone numbers (e.g. +1 415 555 0123) used as SMS senders.

Before 10DLC, businesses sent A2P SMS from unregistered 10-digit numbers, which carriers treated identically to personal messages. This enabled spam and robocalls. The US mobile carriers (AT&T, T-Mobile, Verizon) and the industry body CTIA created the 10DLC registry to require businesses to identify themselves before using standard 10-digit numbers for A2P messaging.

## Who Needs to Register?

Any business or developer sending SMS to US mobile numbers via 10-digit long codes. This includes:
- Transactional notifications (order confirmations, shipping updates)
- OTP and 2FA codes
- Marketing campaigns and promotions
- Appointment reminders
- Customer service messages

**Exceptions:** Toll-free numbers (1-800 etc.) have a separate registration process. Short codes (5–6 digit numbers) have their own legacy vetting process. 10DLC registration applies specifically to standard 10-digit local numbers.

## The Registration Hierarchy

10DLC registration has three layers:

### 1. Brand Registration
You register your company — legal name, EIN (US tax ID) or equivalent, company type, country, and website. This tells carriers who is sending. Cost: approximately $4 one-time fee (paid through your SMS provider).

### 2. Campaign Registration
A campaign describes the specific use case for your messages: OTP verification, customer service, marketing promotions, etc. Each distinct use case typically needs its own campaign. Cost: $10–$25 one-time per campaign, plus a monthly recurring fee of $10 per campaign. Carriers also charge a throughput fee.

### 3. Number Association
Your 10DLC numbers are associated with the registered campaign. Once associated, those numbers get improved throughput and better deliverability filtering.

## Timeline and Approval

Brand registration typically approves within 24–72 hours. Campaign registration can take 1–7 business days depending on the use case and carrier vetting. Some use cases (healthcare, financial services, political) face additional scrutiny.

Plan at least 1–2 weeks from starting registration to having a fully approved and associated number ready to send.

## What Happens Without Registration?

Unregistered A2P traffic on 10DLC numbers is filtered or blocked by US carriers. This means:
- Messages silently fail to deliver
- Your carrier may throttle your sending rate to near zero
- In some cases, the number is flagged, which affects future sending even after registration

As of 2023, carriers enforce this strictly. Don't assume unregistered traffic will "probably get through."

## Common Use Cases and Their Campaign Types

| Use case | Campaign type | Monthly fee |
|---|---|---|
| Verification codes (OTP, 2FA) | Account Notification | ~$10 |
| Order/shipping notifications | Account Notification | ~$10 |
| Marketing promotions | Mixed / Marketing | ~$10–25 |
| Customer care / support | Customer Care | ~$10 |
| Emergency alerts | Public Safety | varies |

Check your SMS provider's documentation for the exact campaign type that matches your messages — mislabeled campaigns get flagged during vetting.

## Carrier-Specific Throughput Limits

Once your 10DLC number is approved and assigned a campaign, each US carrier applies throughput limits. These are the **maximum SMS per second** from a registered 10DLC number:

| Carrier | Account Notification* | Marketing | Customer Care | Limit/Sec |
|---|---|---|---|---|
| **AT&T** | Tier 1: 20/sec | 1/sec | 10/sec | varies by tier |
| **Verizon** | Tier 1: 50/sec | 1/sec | 10/sec | varies by tier |
| **T-Mobile** | Tier 1: 40/sec | 1/sec | 10/sec | varies by tier |

**\*Account Notification** (most common for OTP, order confirmations) has tiered throughput that increases with volume history and compliance track record.

**Practical implications:**

- **Tier 1 (new registration):** AT&T ~20/sec → ~1.7M SMS/day from a single number
- **After 30 days compliance:** Typically Tier 2 → 2–3× increase
- **After 6+ months clean history:** Tier 3 → highest limits (50–100+/sec possible)

**Strategy for high-volume sending:**

If you need >20/sec throughput immediately:
- Register multiple numbers and distribute load across them (3–5 numbers = 60–100/sec)
- Start with Account Notification campaigns (highest throughput tier)
- Maintain excellent compliance (low complaints, fast STOP responses) to get tier upgrades

Contact your SMS provider for current tier limits and options — carriers update these periodically.

## SMS Content Requirements After Registration

10DLC registration doesn't mean you can send anything. Carriers and CTIA still require:
- **Opt-in consent**: recipients must have explicitly opted in to receive messages from you
- **Opt-out mechanism**: every message must honor STOP replies; your system must stop sending to that number immediately
- **Opt-in disclosure**: at the point of sign-up, users must be told what types of messages they'll receive and how to opt out
- **No prohibited content**: illegal substances, adult content (without age gating), abusive language, and certain financial schemes are prohibited

These requirements exist whether or not you've registered. Registration just ensures your infrastructure is recognized — compliance with content rules is a separate obligation.

## How SMSPM Handles US Sending

SMSPM supports US SMS delivery. For US A2P traffic, the registration process is managed through the platform. Contact [support@smspm.com](mailto:support@smspm.com) to discuss your use case and get guidance on the right sender type and registration path for your volume.

For lower-volume US sending, **toll-free numbers with toll-free verification** are often a faster alternative to 10DLC with similar deliverability outcomes — and registration is typically free.

## Key Takeaways

- A2P 10DLC is mandatory for US business SMS on 10-digit numbers — not optional
- Register your brand and at least one campaign before sending at scale
- Budget approximately $4 brand fee + $10–25 per campaign + $10/month per campaign in ongoing fees
- Approval takes days, not hours — start before you need it
- Content compliance (opt-in, opt-out) is required regardless of registration status

[Contact SMSPM support](mailto:support@smspm.com) for help with US SMS setup and 10DLC registration guidance.
