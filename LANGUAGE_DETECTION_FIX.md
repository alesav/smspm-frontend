# Language Detection Fix

## Problem
The language detection was not working because the site was using `output: 'static'` in Astro config, which meant all pages were pre-rendered at build time. This prevented the server from reading request headers (Accept-Language, cookies) at runtime.

## Solution
Changed the Astro configuration to enable Server-Side Rendering (SSR):

### Changes Made:

1. **astro.config.mjs**
   - Changed `output: 'static'` to `output: 'server'`
   - This enables SSR for all pages by default

2. **src/pages/index.astro** 
   - Added `export const prerender = false` to ensure SSR
   - This page now reads headers at request time

3. **src/pages/[lang]/index.astro**
   - Added `export const prerender = true` to pre-render static language pages
   - These pages are still fast (pre-rendered at build time)

## How It Works Now

### Root Page (/) - SSR
- Reads `Cookie: preferred-language=xx` header
- Reads `Accept-Language` header
- Detects language dynamically per request
- Displays content in detected language

### Language Pages (/en, /et, etc.) - Static
- Pre-rendered at build time
- Fast serving
- Always show the specific language

## Test Results ✅

All tests passing:

```
✅ Cookie detection: preferred-language=et → Estonian content
✅ Cookie detection: preferred-language=ru → Russian content  
✅ Browser detection: Accept-Language: et-EE → Estonian content
✅ Default fallback: Accept-Language: en-US → English content
```

## Performance Impact

- **Root page (/)**: Slight overhead (SSR), but enables dynamic language detection
- **Language pages (/en, /et, etc.)**: No impact, still fully static
- **Overall**: Minimal impact, only one page is SSR

## Deployment Notes

When deploying to Cloudflare:
- The `_worker.js` file will handle SSR for the root page
- Static assets still served from edge
- No additional configuration needed

## Testing Locally

```bash
# Start dev server
yarn dev

# Test with cookie in browser
# DevTools → Application → Cookies → Add:
# Name: preferred-language
# Value: et (or ru, es, de, fr, lv, lt)
# Path: /

# Refresh http://localhost:4322/ → Should show Estonian content
```

## Verification

Test script included: `test-lang-detection.mjs`

```bash
node test-lang-detection.mjs
```

This tests all language detection scenarios programmatically.
