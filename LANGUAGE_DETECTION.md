# Language Detection Implementation

This implementation provides automatic language detection for the SMSPM frontend homepage with SEO optimization.

## ⚠️ Important: SSR Configuration

The root homepage (`/`) uses **Server-Side Rendering (SSR)** to detect language at request time. This is configured via:
- `astro.config.mjs`: `output: 'server'` (enables SSR mode)
- `src/pages/index.astro`: `export const prerender = false` (ensures SSR for this page)
- `src/pages/[lang]/index.astro`: `export const prerender = true` (keeps language pages static)

**Why SSR?** Static pages are built once at build time and can't read request headers (cookies, Accept-Language). SSR pages are generated at request time, allowing dynamic language detection.

**Performance:** Only the root page uses SSR. Language-specific pages (`/en`, `/et`, etc.) remain fully static for optimal performance.

## Features

✅ **Browser Language Detection** - Detects user's preferred language from Accept-Language header
✅ **User Preference Storage** - Stores language choice in cookies for 1 year
✅ **No Redirects** - Root page displays detected language without redirecting (better UX and SEO)
✅ **SEO Optimized** - Includes proper hreflang tags and x-default
✅ **Language Switcher Integration** - Existing language switcher now stores preferences
✅ **Hybrid Rendering** - Root page is SSR, language pages are static

## How It Works

### Priority System

1. **Cookie Preference** (highest priority) - If user previously selected a language
2. **Browser Detection** - Parse Accept-Language header
3. **Default Language** - Falls back to English

### Root Homepage Behavior

When user visits `https://frontend.smspm.com/`:
- Detects their language preference
- Displays content in that language
- No redirect (fast, SEO-friendly)
- Sets `<html lang="xx">` attribute
- Includes hreflang tags for all languages

### Language-Specific Pages

Pages like `/en`, `/et`, `/ru` always display that language and include hreflang tags.

## Files Modified

1. **Created:**
   - `src/utils/i18n/language-detector.ts` - Core detection logic
   - `src/utils/i18n/index.ts` - Export barrel
   - `src/utils/__tests__/language-detector.test.ts` - Unit tests
   - `vitest.config.ts` - Test configuration

2. **Modified:**
   - `astro.config.mjs` - Changed output from 'static' to 'hybrid' for SSR support
   - `src/pages/index.astro` - Root page with detection + SSR enabled
   - `src/pages/[lang]/index.astro` - Language pages with hreflang
   - `src/layouts/Layout.astro` - Added lang prop and hreflang support
   - `src/components/Navigation.astro` - Store cookie on language selection
   - `package.json` - Added vitest dependencies

## Usage

### For Root Page

```astro
---
import { getFinalLanguage } from "../utils/i18n";

const acceptLanguage = Astro.request.headers.get('accept-language');
const cookieHeader = Astro.request.headers.get('cookie');
const detectedLang = getFinalLanguage(acceptLanguage, cookieHeader);
---

<Layout lang={detectedLang} alternateUrls={{...}}>
  <HomeContent lang={detectedLang} />
</Layout>
```

### For Language-Specific Pages

```astro
<Layout 
  lang="et"
  alternateUrls={{
    en: "https://frontend.smspm.com/en",
    et: "https://frontend.smspm.com/et",
    // ... other languages
  }}
>
```

## Testing

Run tests with:
```bash
yarn test
```

Run tests with UI:
```bash
yarn test:ui
```

## SEO Benefits

1. **Single Strong Root Domain** - No authority split across redirected versions
2. **Proper Hreflang Tags** - Search engines understand language relationships
3. **x-default Tag** - Specifies root as default for unknown languages
4. **Fast Page Load** - No redirect delay
5. **Better User Experience** - Instant content display

## Cookie Details

- **Name:** `preferred-language`
- **Value:** Two-letter language code (en, et, ru, es, de, fr, lv, lt)
- **Max-Age:** 31536000 seconds (1 year)
- **Path:** `/` (site-wide)
- **SameSite:** `Lax`

## Supported Languages

- `en` - English (default)
- `et` - Estonian
- `ru` - Russian
- `es` - Spanish
- `de` - German
- `fr` - French
- `lv` - Latvian
- `lt` - Lithuanian

## Next Steps

1. Install dependencies: `yarn install`
2. Run tests: `yarn test`
3. Test locally: `yarn dev`
4. Deploy and verify hreflang tags in production

## Google Search Console Verification

After deployment, verify in Google Search Console:
1. Check hreflang implementation
2. Monitor language-specific indexing
3. Review International Targeting report
