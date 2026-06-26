---
title: "How to Send SMS with PHP: A Complete Guide"
description: "Step-by-step PHP tutorial for sending SMS via the SMSPM REST API. Covers authentication, sending single and bulk messages, error handling, and delivery callbacks."
pubDate: 2025-06-26
author: "SMSPM Team"
tags: ["php", "api", "developer", "tutorial"]
draft: false
---

PHP remains one of the most widely deployed server-side languages — it powers WordPress, Laravel, Symfony, and millions of custom applications. Adding SMS to a PHP app takes about 10 lines of code with SMSPM's REST API.

## Prerequisites

- PHP 7.4 or later (8.x recommended)
- `curl` extension enabled (standard in most hosting environments)
- A SMSPM account with your `hash` and `token` credentials from the [API Docs](https://app.smspm.com/docs)

## Sending Your First SMS

SMSPM's API accepts a simple GET or POST request. Here's the minimal PHP implementation:

```php
<?php

function sendSMS(string $toNumber, string $text, string $from = 'SMSPM'): array
{
    $params = http_build_query([
        'hash'       => getenv('SMSPM_HASH'),
        'token'      => getenv('SMSPM_TOKEN'),
        'toNumber'   => $toNumber,  // E.164: +37256789045
        'fromNumber' => $from,
        'text'       => $text,
    ]);

    $ch = curl_init('https://api.smspm.com?' . $params);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $httpCode !== 200) {
        throw new RuntimeException("SMS API request failed (HTTP $httpCode)");
    }

    $data = json_decode($response, true);
    if ($data['status'] !== 'success') {
        throw new RuntimeException('SMS send failed: ' . ($data['message'] ?? 'unknown error'));
    }

    return $data;
}

// Usage
try {
    $result = sendSMS('+37256789045', 'Your order has shipped! Track: https://track.example.com/abc123');
    echo 'Sent. Message ID: ' . $result['messageId'];
} catch (RuntimeException $e) {
    error_log('SMS error: ' . $e->getMessage());
}
```

Store your credentials in environment variables — never hardcode them in source files.

## Using POST Instead of GET

For longer messages or if your hosting blocks long query strings, use POST:

```php
<?php

function sendSMSPost(string $toNumber, string $text, string $from = 'SMSPM'): array
{
    $payload = json_encode([
        'hash'       => getenv('SMSPM_HASH'),
        'token'      => getenv('SMSPM_TOKEN'),
        'toNumber'   => $toNumber,
        'fromNumber' => $from,
        'text'       => $text,
    ]);

    $ch = curl_init('https://api.smspm.com');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT        => 10,
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}
```

## Sending Bulk SMS

To send the same message to multiple recipients, loop over your list. For large lists, batch in groups of 100 and add a short sleep between batches to stay within rate limits:

```php
<?php

function sendBulkSMS(array $phoneNumbers, string $text): array
{
    $results = ['sent' => 0, 'failed' => 0, 'errors' => []];
    $batches = array_chunk($phoneNumbers, 100);

    foreach ($batches as $batch) {
        foreach ($batch as $number) {
            try {
                sendSMS($number, $text);
                $results['sent']++;
            } catch (RuntimeException $e) {
                $results['failed']++;
                $results['errors'][] = ['number' => $number, 'error' => $e->getMessage()];
            }
        }
        // Pause between batches to avoid rate limiting
        if (count($batches) > 1) usleep(500000); // 0.5s
    }

    return $results;
}

// Usage
$numbers = ['+37256789045', '+4915123456789', '+447700900123'];
$stats   = sendBulkSMS($numbers, 'Flash sale: 20% off for the next 2 hours. Shop now.');
echo "Sent: {$stats['sent']}, Failed: {$stats['failed']}";
```

## Laravel Integration

If you're on Laravel, add a wrapper in `app/Services/SmsService.php`:

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    public function send(string $to, string $text, string $from = null): bool
    {
        $response = Http::timeout(10)->get('https://api.smspm.com', [
            'hash'       => config('services.smspm.hash'),
            'token'      => config('services.smspm.token'),
            'toNumber'   => $to,
            'fromNumber' => $from ?? config('services.smspm.sender'),
            'text'       => $text,
        ]);

        if (!$response->successful() || $response->json('status') !== 'success') {
            Log::error('SMSPM send failed', ['to' => $to, 'response' => $response->body()]);
            return false;
        }

        return true;
    }
}
```

Add to `config/services.php`:
```php
'smspm' => [
    'hash'   => env('SMSPM_HASH'),
    'token'  => env('SMSPM_TOKEN'),
    'sender' => env('SMSPM_SENDER', 'MyApp'),
],
```

Then inject `SmsService` anywhere in your app:

```php
// In a controller or job
public function sendOrderConfirmation(Order $order, SmsService $sms): void
{
    $sms->send(
        $order->customer->phone,
        "Order #{$order->id} confirmed. Estimated delivery: {$order->eta->format('d M')}."
    );
}
```

## Symfony Integration

For Symfony apps, add a service in `src/Service/SmspmService.php`:

```php
<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Psr\Log\LoggerInterface;

class SmspmService
{
    public function __construct(
        private HttpClientInterface $httpClient,
        private LoggerInterface $logger,
        private string $smspmHash,
        private string $smspmToken,
    ) {}

    public function send(string $toNumber, string $text, string $from = 'MyApp'): bool
    {
        try {
            $response = $this->httpClient->request('GET', 'https://api.smspm.com', [
                'query' => [
                    'hash'       => $this->smspmHash,
                    'token'      => $this->smspmToken,
                    'toNumber'   => $toNumber,
                    'fromNumber' => $from,
                    'text'       => $text,
                ],
                'timeout' => 10,
            ]);

            $data = $response->toArray();
            
            if ($data['status'] === 'success') {
                $this->logger->info('SMS sent', ['messageId' => $data['messageId']]);
                return true;
            }

            $this->logger->error('SMS failed', ['status' => $data['status']]);
            return false;
        } catch (\Exception $e) {
            $this->logger->error('SMS API error', ['error' => $e->getMessage()]);
            return false;
        }
    }
}
```

Configure in `config/services.yaml`:

```yaml
services:
  App\Service\SmspmService:
    arguments:
      $smspmHash: '%env(SMSPM_HASH)%'
      $smspmToken: '%env(SMSPM_TOKEN)%'
```

Usage in a controller or service:

```php
public function __construct(private SmspmService $smspm) {}

public function notifyUser(User $user): void
{
    $this->smspm->send($user->phone, "Welcome! Your account is active.");
}
```

## WordPress Integration

For WordPress sites (themes, plugins), use the built-in `wp_remote_get()` or `wp_remote_post()` functions — no external dependencies needed:

```php
<?php

function send_sms_wordpress(string $phone, string $message): bool
{
    $args = [
        'timeout'   => 10,
        'sslverify' => true,
    ];

    $query = http_build_query([
        'hash'       => getenv('SMSPM_HASH'),
        'token'      => getenv('SMSPM_TOKEN'),
        'toNumber'   => $phone,
        'fromNumber' => get_bloginfo('name'),
        'text'       => $message,
    ]);

    $response = wp_remote_get('https://api.smspm.com?' . $query, $args);

    if (is_wp_error($response)) {
        error_log('SMSPM Error: ' . $response->get_error_message());
        return false;
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);
    return $body['status'] === 'success';
}

// Hook into WooCommerce order processing
add_action('woocommerce_order_status_processing', function($order_id) {
    $order = wc_get_order($order_id);
    $phone = $order->get_billing_phone();
    $message = sprintf(
        'Order #%d confirmed. Expected delivery: %s. Track: %s',
        $order_id,
        date('M d'),
        $order->get_view_order_url()
    );

    send_sms_wordpress($phone, $message);
});
```

**Where to add this code:**

- **Standalone plugin:** Create `wp-content/plugins/smspm-notifier/smspm-notifier.php` and add the function
- **Theme's functions.php:** Add the function directly to your theme's `functions.php` (not recommended for production — use a custom plugin instead)
- **WooCommerce integration:** Add to a custom plugin that depends on WooCommerce

**For WooCommerce SMS notifications on multiple events:**

```php
// Order placed
add_action('woocommerce_thankyou', function($order_id) {
    $order = wc_get_order($order_id);
    send_sms_wordpress($order->get_billing_phone(), "Order confirmed!");
});

// Order shipped
add_action('woocommerce_order_status_changed', function($order_id, $old_status, $new_status) {
    if ($new_status === 'completed') {
        $order = wc_get_order($order_id);
        send_sms_wordpress(
            $order->get_billing_phone(),
            sprintf("Your order #%d has been delivered!", $order_id)
        );
    }
}, 10, 3);
```

## Handling Delivery Reports via Webhook

SMSPM can POST delivery status updates to your callback URL. Create a simple webhook endpoint in Laravel:

```php
// routes/api.php
Route::post('/webhooks/smspm', [SmsWebhookController::class, 'handle']);

// app/Http/Controllers/SmsWebhookController.php
public function handle(Request $request): JsonResponse
{
    $messageId = $request->input('messageId');
    $status    = $request->input('status'); // 'delivered', 'failed', 'pending'

    // Update your database record
    SmsLog::where('message_id', $messageId)->update(['status' => $status]);

    return response()->json(['ok' => true]);
}
```

## Phone Number Validation

Validate numbers before sending — it saves credits and prevents errors:

```php
function isValidE164(string $number): bool
{
    return (bool) preg_match('/^\+[1-9]\d{6,14}$/', $number);
}

function normalizePhone(string $raw): string
{
    // Remove spaces, dashes, parentheses
    $stripped = preg_replace('/[\s\-().]/u', '', $raw);
    // Convert 00 prefix to +
    return str_starts_with($stripped, '00') ? '+' . substr($stripped, 2) : $stripped;
}
```

## Message Length and Encoding

A standard GSM-7 SMS is 160 characters. Keep OTP and notification messages under that limit to send as a single part. Use our [SMS Character Counter](/en/tools/sms-character-counter) to check before deploying templates.

If you need to send longer messages (or messages with emojis), the API handles multi-part SMS automatically, but cost is multiplied by the number of parts.

## Cost Estimate

SMSPM charges per SMS part, per destination country. Most European countries are under 0.05 EUR/SMS. For a typical transactional notification campaign (one SMS per customer event), the cost is negligible at scale. [See full pricing →](/en/prices)

## Next Steps

- [Register for a free account](https://app.smspm.com/app/register) — test credits included
- [Full API reference](https://app.smspm.com/docs) — all parameters and response codes
- [SMS Character Counter](/en/tools/sms-character-counter) — check your message templates
- [Phone number formatter](/en/tools/phone-formatter) — normalize numbers to E.164
