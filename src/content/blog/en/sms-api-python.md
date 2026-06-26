---
title: "SMS API in Python: A Complete Tutorial"
description: "Send SMS from Python using SMSPM's REST API. Covers requests, async httpx, Django integration, OTP generation, and production error handling."
pubDate: 2025-06-26
author: "SMSPM Team"
tags: ["python", "api", "developer", "tutorial"]
draft: false
---

Python is the language of choice for data pipelines, web backends, automation scripts, and ML applications — all of which eventually need to send notifications. Here's how to integrate SMSPM's SMS API into any Python project.

## Installation

No SDK needed — just the standard `requests` library (or `httpx` for async):

```bash
pip install requests httpx  # httpx is optional, for async
```

Store credentials in environment variables, not in code:

```bash
export SMSPM_HASH="your_hash_here"
export SMSPM_TOKEN="your_token_here"
```

## Basic Send

```python
import os
import requests

def send_sms(to_number: str, text: str, from_number: str = "SMSPM") -> dict:
    """
    Send an SMS via SMSPM API.
    
    Args:
        to_number: Recipient in E.164 format (+37256789045)
        text: Message body (max 160 chars for single GSM-7 part)
        from_number: Alphanumeric sender ID or numeric shortcode
    
    Returns:
        API response dict with 'status' and 'messageId'
    
    Raises:
        requests.HTTPError: On non-200 response
        ValueError: On API-level error (status != 'success')
    """
    response = requests.get(
        "https://api.smspm.com",
        params={
            "hash": os.environ["SMSPM_HASH"],
            "token": os.environ["SMSPM_TOKEN"],
            "toNumber": to_number,
            "fromNumber": from_number,
            "text": text,
        },
        timeout=10,
    )
    response.raise_for_status()
    data = response.json()

    if data.get("status") != "success":
        raise ValueError(f"SMS send failed: {data.get('message', 'unknown error')}")

    return data


# Usage
result = send_sms("+37256789045", "Hello from SMSPM! Your code is 847392.")
print(f"Message ID: {result['messageId']}")
```

## Async Version with httpx

For FastAPI, async Django, or any `asyncio`-based project:

```python
import os
import httpx

async def send_sms_async(to_number: str, text: str, from_number: str = "SMSPM") -> dict:
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(
            "https://api.smspm.com",
            params={
                "hash": os.environ["SMSPM_HASH"],
                "token": os.environ["SMSPM_TOKEN"],
                "toNumber": to_number,
                "fromNumber": from_number,
                "text": text,
            },
        )
        response.raise_for_status()
        data = response.json()

    if data.get("status") != "success":
        raise ValueError(f"SMS failed: {data.get('message')}")
    return data


# FastAPI example
from fastapi import FastAPI
app = FastAPI()

@app.post("/notify")
async def notify_user(phone: str, message: str):
    result = await send_sms_async(phone, message)
    return {"messageId": result["messageId"]}
```

## Generating OTP Codes

```python
import secrets

def generate_otp(length: int = 6) -> str:
    """Cryptographically secure numeric OTP."""
    return str(secrets.randbelow(10 ** length)).zfill(length)

def send_otp(phone: str) -> str:
    code = generate_otp()
    send_sms(
        phone,
        f"Your verification code is {code}. Valid for 10 minutes. Do not share it.",
        from_number="MyApp",
    )
    return code  # store this server-side with TTL
```

## Sending Bulk SMS

```python
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def send_bulk(numbers: list[str], text: str, max_workers: int = 10) -> dict:
    results = {"sent": 0, "failed": 0, "errors": []}

    def _send(number):
        try:
            send_sms(number, text)
            return ("ok", number)
        except Exception as exc:
            return ("err", number, str(exc))

    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        futures = {pool.submit(_send, n): n for n in numbers}
        for future in as_completed(futures):
            outcome = future.result()
            if outcome[0] == "ok":
                results["sent"] += 1
            else:
                results["failed"] += 1
                results["errors"].append({"number": outcome[1], "error": outcome[2]})

    return results

# Usage
stats = send_bulk(
    ["+37256789045", "+4915123456789", "+447700900123"],
    "Your order has been dispatched.",
)
print(f"Sent: {stats['sent']}, Failed: {stats['failed']}")
```

## Django Integration

Create `sms.py` in your Django app:

```python
# myapp/sms.py
import os
import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

def send_sms(to: str, text: str, sender: str | None = None) -> bool:
    """Returns True on success, False on failure. Never raises."""
    try:
        response = requests.get(
            "https://api.smspm.com",
            params={
                "hash": settings.SMSPM_HASH,
                "token": settings.SMSPM_TOKEN,
                "toNumber": to,
                "fromNumber": sender or settings.SMSPM_SENDER,
                "text": text,
            },
            timeout=10,
        )
        response.raise_for_status()
        data = response.json()
        if data.get("status") != "success":
            logger.error("SMSPM error: %s", data)
            return False
        return True
    except Exception:
        logger.exception("SMS send failed to %s", to)
        return False
```

Add to `settings.py`:

```python
SMSPM_HASH   = os.environ.get("SMSPM_HASH", "")
SMSPM_TOKEN  = os.environ.get("SMSPM_TOKEN", "")
SMSPM_SENDER = os.environ.get("SMSPM_SENDER", "MyApp")
```

Use it in any Django view or Celery task:

```python
from myapp.sms import send_sms

# In a Celery task
@shared_task
def notify_order_shipped(order_id: int):
    order = Order.objects.get(pk=order_id)
    send_sms(
        order.customer.phone,
        f"Your order #{order_id} is on its way! Expected delivery: {order.eta:%d %b}."
    )
```

## Flask Integration

For Flask apps, wrap SMSPM in a helper module:

```python
# app/sms.py
import os
import requests
import logging

logger = logging.getLogger(__name__)

class SmsClient:
    def __init__(self, hash: str, token: str, sender: str = "MyApp"):
        self.hash = hash
        self.token = token
        self.sender = sender

    def send(self, to_number: str, text: str) -> bool:
        try:
            response = requests.get(
                "https://api.smspm.com",
                params={
                    "hash": self.hash,
                    "token": self.token,
                    "toNumber": to_number,
                    "fromNumber": self.sender,
                    "text": text,
                },
                timeout=10,
            )
            response.raise_for_status()
            data = response.json()
            return data.get("status") == "success"
        except Exception as e:
            logger.error(f"SMS failed: {e}")
            return False
```

Configure in `config.py` or `__init__.py`:

```python
# config.py
import os

SMSPM_HASH = os.environ.get("SMSPM_HASH", "")
SMSPM_TOKEN = os.environ.get("SMSPM_TOKEN", "")
SMSPM_SENDER = os.environ.get("SMSPM_SENDER", "MyApp")
```

Use in Flask routes:

```python
# app/routes.py
from flask import Flask, request, jsonify
from app.sms import SmsClient
from app.config import SMSPM_HASH, SMSPM_TOKEN, SMSPM_SENDER

app = Flask(__name__)
sms = SmsClient(SMSPM_HASH, SMSPM_TOKEN, SMSPM_SENDER)

@app.route("/order/<order_id>/notify", methods=["POST"])
def notify_order(order_id):
    phone = request.json.get("phone")
    success = sms.send(
        phone,
        f"Order #{order_id} confirmed. Delivery in 2-4 days.",
    )
    return {"sent": success}, 200 if success else 400
```

## Celery Background Tasks

For high-volume or delayed SMS (e.g., appointment reminders), use Celery with Redis:

```python
# app/celery_app.py
from celery import Celery
import os

celery_app = Celery("myapp")
celery_app.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0")
celery_app.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
```

Create SMS tasks in `app/tasks.py`:

```python
# app/tasks.py
from celery import shared_task
import os
import requests
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3)
def send_sms_task(self, to_number: str, text: str, sender: str = "MyApp"):
    """
    Async SMS send with automatic retry on failure.
    Failures after 3 retries are logged but don't crash the app.
    """
    try:
        response = requests.get(
            "https://api.smspm.com",
            params={
                "hash": os.environ["SMSPM_HASH"],
                "token": os.environ["SMSPM_TOKEN"],
                "toNumber": to_number,
                "fromNumber": sender,
                "text": text,
            },
            timeout=10,
        )
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") != "success":
            raise ValueError(f"API error: {data.get('message')}")
        
        logger.info(f"SMS sent to {to_number}, message ID: {data['messageId']}")
        return {"status": "success", "messageId": data["messageId"]}
    except requests.Timeout as exc:
        # Retry after 5, 10, then 20 seconds
        raise self.retry(exc=exc, countdown=5 * (2 ** self.request.retries))
    except Exception as exc:
        logger.error(f"SMS failed to {to_number}: {exc}")
        raise
```

Use in your Django models or Flask routes:

```python
# In a view or model save signal
from app.tasks import send_sms_task

# Queue SMS for later sending (non-blocking)
send_sms_task.delay(
    "+37256789045",
    "Your appointment tomorrow at 10 AM."
)

# Or schedule it for a specific time
from celery import shared_task
from datetime import datetime, timedelta

send_sms_task.apply_async(
    args=["+37256789045", "Reminder: appointment in 1 hour"],
    eta=datetime.now() + timedelta(hours=23),  # Send 1 hour before appointment
)
```

**Why use Celery for SMS?**

- **Non-blocking:** User request returns immediately; SMS sends in background
- **Retry logic:** Celery automatically retries on transient failures
- **Scheduling:** Send reminders at optimal times (e.g., 24h and 1h before appointment)
- **Monitoring:** Track task status in Celery Flower dashboard
- **Scalability:** Process thousands of SMS without blocking your web server

**Minimal setup (for development):**

```bash
pip install celery redis
# Start Redis
redis-server
# In another terminal, start Celery worker
celery -A app.celery_app worker --loglevel=info
```

## Phone Number Normalization

```python
import re

def normalize_e164(raw: str) -> str:
    """Normalize a phone number to E.164 format."""
    # Remove spaces, dashes, parentheses, dots
    stripped = re.sub(r"[\s\-().+]", "", raw)
    # Handle 00 prefix
    if stripped.startswith("00"):
        stripped = stripped[2:]
    return "+" + stripped

def is_valid_e164(number: str) -> bool:
    return bool(re.match(r"^\+[1-9]\d{6,14}$", number))
```

## Error Handling Strategy

For production systems, wrap the send call in a retry with exponential backoff:

```python
import time

def send_sms_with_retry(to: str, text: str, retries: int = 3) -> dict:
    for attempt in range(retries):
        try:
            return send_sms(to, text)
        except (requests.Timeout, requests.ConnectionError) as exc:
            if attempt == retries - 1:
                raise
            wait = 2 ** attempt  # 1s, 2s, 4s
            time.sleep(wait)
    raise RuntimeError("Max retries reached")
```

Transient network errors (timeouts, connection resets) are the most common failure mode. API-level failures (`status != success`) usually mean a configuration problem — don't retry those blindly.

## Checking Message Length

Before deploying templates, verify they fit in one SMS part (160 GSM-7 chars). A quick check:

```python
GSM7_CHARS = set('@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞ\x1bÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà')

def is_gsm7(text: str) -> bool:
    return all(c in GSM7_CHARS for c in text)

def sms_parts(text: str) -> int:
    if is_gsm7(text):
        return 1 if len(text) <= 160 else -(-len(text) // 153)
    else:
        return 1 if len(text) <= 70 else -(-len(text) // 67)
```

Or just use our [SMS Character Counter tool](/en/tools/sms-character-counter) to check templates visually.

## Pricing

SMSPM charges per SMS segment, per destination. Most EU countries are under €0.05 per SMS. Check [our pricing page](/en/prices) for per-country rates. For a typical notification system sending one SMS per transaction, the cost is well under $1 per 1,000 messages for most markets.

## Get Started

1. [Create a free account](https://app.smspm.com/app/register) — test credits included
2. Copy your `hash` and `token` from the API Docs dashboard
3. Paste the `send_sms` function above and run it — you should see an SMS in under a second
