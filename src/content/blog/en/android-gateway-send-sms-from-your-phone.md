---
title: "Send Bulk SMS for €0.01 Using Your Android Phone — Start for Free"
description: "SMSPM's Android Gateway turns any Android smartphone into a personal SMS sender. Route selected carriers through your own SIM card, pay just €0.01 per message, and let recipients see your real number instead of 'Authmsg'."
pubDate: 2025-07-01
author: "SMSPM Team"
tags: ["android-gateway", "bulk-sms", "cost-saving", "guide"]
draft: false
---

Most bulk SMS platforms charge you €0.05 to €0.45 per message depending on the country. There's a feature in SMSPM that can cut that to **€0.01 per SMS** for any carrier you have a local SIM for — using your own Android phone as the sending device. Here's how it works and why it's worth trying.

## What Is the Android Gateway?

The Android Gateway is a routing option inside SMSPM. Instead of sending your SMS through a commercial provider, the platform pushes the message via Firebase Cloud Messaging to a connected Android phone, which then sends it from the phone's SIM card — exactly like a regular text message.

From the recipient's perspective, the SMS arrives from a real, callable phone number. Not from "Info", "Authmsg", or a random short code. From your actual number.

## Why This Matters More Than You Might Think

Mobile operators have been steadily stripping alphanumeric sender IDs from incoming SMS traffic. A message you send as "YourBrand" often arrives as "Info" or a generic label — depending on the operator and country. This is accelerating, not slowing down.

When you route through the Android Gateway, the recipient sees your SIM card's number — a real mobile number they can:
- Call back directly
- Save to their contacts
- Reply to (replies go to the phone's inbox)

For local businesses sending appointment reminders, delivery notifications, or promotions, this makes a meaningful difference in trust and open rates.

## What It Actually Costs

| Route | Cost per SMS |
|---|---|
| SMSPM commercial gateway | €0.02 – €0.45 (carrier-dependent) |
| Android Gateway | **€0.01 flat** |

The €0.01 is SMSPM's platform fee — it covers infrastructure, push delivery via FCM, and routing logic. **Your SIM card charges are separate and depend on your mobile plan.** In most countries, standard mobile plans include a large monthly SMS allowance (1,000 is typical) — so in practice, you often pay only the €0.01 platform fee per message.

**Example:** 1,000 SMS to a Turkish carrier via commercial gateway at €0.12 each = **€120**. Via Android Gateway with a plan that includes 1,000 free SMS = **€10**. That's 92% less.

## You Can Start for Free

SMSPM has no monthly fee and no minimum spend. [Create a free account](https://app.smspm.com/app/register), top up with as little as you want, and you can test the Android Gateway immediately. The setup takes about 5 minutes.

The only thing you need:
- An Android phone running Android 8.0 or higher (most phones from 2017 onwards qualify)
- A SIM card in it
- The SMSPM Gateway app (APK download from your dashboard → Devices page)

## How to Set It Up

**Step 1 — Download and install the app**  
Go to your SMSPM dashboard → Devices, and download the SMSPM Gateway APK. Install it on the Android phone you want to use as a gateway.

**Step 2 — Grant permissions**  
The app needs Send SMS, Phone State, and Notifications permissions, plus a battery optimisation exemption so it stays alive in the background. On Xiaomi/MIUI phones, go to Settings → Apps → SMSPM Gateway → Battery → No restrictions.

**Step 3 — Generate a pairing code**  
In your dashboard → Devices, click **Generate pairing code**. A 6-digit code appears, valid for 15 minutes.

**Step 4 — Pair the phone**  
Enter the code in the app and tap **Pair device**. The dashboard detects the pairing automatically and shows your device.

**Step 5 — Set up routing**  
Go to your dashboard → Prices. For each carrier you want to route through your phone, find it in the table and change the Route dropdown from "SMSPM (default)" to your phone. The change takes effect immediately.

**Step 6 — Send**  
Send SMS normally via the dashboard or API. Messages matching your phone's route are automatically pushed to the device and sent from your SIM.

## What Happens If the Phone Is Offline?

By default, **fallback is enabled**: if the phone is unreachable, the message is automatically re-routed via SMSPM's commercial provider within 10 minutes. No SMS is lost, and your balance isn't double-charged.

If you disable fallback, the message waits in a retry queue for up to 24 hours, retrying at increasing intervals. When the phone comes back online, opening the app and tapping **"↓ Fetch queued"** immediately re-dispatches all waiting messages.

## Common Questions

**Can I connect multiple phones?**  
Yes — as many as you like. Each carrier route can be assigned to a specific device.

**Does this work with dual-SIM phones?**  
Yes, using whichever SIM is set as default for SMS in Android settings.

**Does the app need to be open?**  
No. It runs in the background via Firebase Cloud Messaging and wakes when a message needs sending.

**Is there a monthly sending limit per device?**  
Default is 1,000 SMS/month per device, configurable from the Devices page. Set it below your plan's free SMS allowance to avoid carrier charges.

**Is the €0.01 charged if the message fails?**  
The charge is on dispatch, not delivery — same as all SMS providers. If fallback is enabled and the phone is unreachable, the message re-routes via commercial provider at normal rates.

## Ready to Try It?

[Create your free SMSPM account](https://app.smspm.com/app/register) and connect your first Android device. No subscription, no minimum spend — just €0.01 per SMS through your own SIM card.

[View pricing by country →](/en/prices)  
[Read the full Android Gateway documentation →](https://app.smspm.com/app/devices)
