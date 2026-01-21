# Country Pages Generation System

## Overview

This system automatically generates SMS pricing pages for 184+ countries using data from `pricelist.json`. It intelligently protects manually edited pages from being overwritten while allowing template-based pages to be regenerated when the template changes.

## Quick Start

### 1. Extract Countries from Pricelist
```bash
node scripts/extract-countries.mjs
```
This analyzes `pricelist.json` and creates `data/extracted-countries.json` with all countries and their providers.

### 2. Test Generation (Dry Run)
```bash
node scripts/generate-country-pages-smart.mjs --dry-run
```
Shows what will be generated without creating files.

### 3. Generate All Pages
```bash
node scripts/generate-country-pages-smart.mjs
```
Creates pages for all 184 countries in `src/pages/en/country/`.

### 4. Regenerate Template Pages (After Template Changes)
```bash
node scripts/generate-country-pages-smart.mjs --force
```
Regenerates only template-based pages, protects manual pages.

## File Structure

```
smspm-frontend/
├── pricelist.json                          # Source pricing data
├── data/
│   ├── extracted-countries.json            # Generated: all countries + providers
│   ├── country-metadata.js                 # Manual: country flags, codes, population
│   └── generated-pages-tracking.json       # Auto: tracks template vs manual pages
├── scripts/
│   ├── extract-countries.mjs               # Extract countries from pricelist
│   └── generate-country-pages-smart.mjs    # Smart page generator with protection
└── src/pages/en/country/
    ├── send-sms-estonia.astro              # 🔒 PROTECTED (manually curated)
    ├── send-sms-germany.astro              # 🔒 PROTECTED (manually curated)
    ├── send-sms-france.astro               # 🔒 PROTECTED (manually curated)
    ├── send-sms-spain.astro                # 🔒 PROTECTED (manually curated)
    ├── send-sms-united-kingdom.astro       # 🔒 PROTECTED (manually curated)
    ├── send-sms-brazil.astro               # ✅ Template-generated
    ├── send-sms-australia.astro            # ✅ Template-generated
    └── ... (179+ more template-generated)
```

## How It Works

### Page Types

1. **PROTECTED Pages** (5 pages)
   - Listed in `PROTECTED_PAGES` array in generator script
   - Manually curated, high-quality content
   - NEVER regenerated, even with `--force`
   - Examples: Estonia, UK, Germany, France, Spain

2. **MANUAL Pages** (User-edited)
   - Template-generated pages that you've edited
   - Automatically detected and protected from regeneration
   - Tracked in `generated-pages-tracking.json`

3. **TEMPLATE Pages** (179+ pages)
   - Auto-generated from template
   - Regenerated when template changes
   - Can be converted to manual by editing

### Protection System

The generator uses content hashing to detect manual edits:

1. **First Generation**: Creates page, saves hash → marked as "template"
2. **User Edits Page**: Content hash changes → auto-marked as "manual"
3. **Future Regenerations**: Manual pages are skipped, template pages updated

### Tracking File

`data/generated-pages-tracking.json` stores:
```json
{
  "version": "1.0.0",
  "templateHash": "abc123...",
  "lastGenerated": "2025-01-13T...",
  "pages": {
    "send-sms-brazil.astro": {
      "type": "template",
      "contentHash": "def456...",
      "generatedAt": "2025-01-13T...",
      "country": "Brazil",
      "providerCount": 4
    },
    "send-sms-finland.astro": {
      "type": "manual",
      "contentHash": "xyz789...",
      "generatedAt": "2025-01-13T...",
      "country": "Finland",
      "providerCount": 28
    }
  }
}
```

## Usage Scenarios

### Scenario 1: Initial Setup (First Time)
```bash
# Extract countries from pricelist
node scripts/extract-countries.mjs

# Generate all pages
node scripts/generate-country-pages-smart.mjs
```
**Result**: 181 new pages created (3 already protected)

### Scenario 2: Update Template for All Pages
```bash
# Edit: scripts/generate-country-pages-smart.mjs
# Change the generatePageTemplate() function

# Regenerate all template-based pages
node scripts/generate-country-pages-smart.mjs --force
```
**Result**: Template pages regenerated, manual/protected pages untouched

### Scenario 3: Customize a Specific Country
```bash
# Edit: src/pages/en/country/send-sms-brazil.astro
# Make your changes (better content, images, custom sections)

# Next regeneration will detect your edits
node scripts/generate-country-pages-smart.mjs --force
```
**Result**: Brazil page skipped (auto-marked as manual), others regenerated

### Scenario 4: Update Pricing Data
```bash
# Update: pricelist.json with new prices
node scripts/extract-countries.mjs
node scripts/generate-country-pages-smart.mjs --force
```
**Result**: All template pages get new pricing, manual pages unchanged

### Scenario 5: Add New Protected Page
```bash
# Edit: scripts/generate-country-pages-smart.mjs
# Add to PROTECTED_PAGES array:
const PROTECTED_PAGES = [
  'send-sms-estonia.astro',
  'send-sms-united-kingdom.astro',
  'send-sms-germany.astro',
  'send-sms-france.astro',
  'send-sms-spain.astro',
  'send-sms-brazil.astro',  // ← Add this
];
```
**Result**: Brazil page permanently protected from regeneration

## Command Line Options

### `--dry-run`
Test generation without creating files
```bash
node scripts/generate-country-pages-smart.mjs --dry-run
```
Shows exactly what would be generated.

### `--force`
Regenerate all template-based pages (even if unchanged)
```bash
node scripts/generate-country-pages-smart.mjs --force
```
Useful after template modifications.

### Combined
```bash
node scripts/generate-country-pages-smart.mjs --dry-run --force
```
Test forced regeneration without writing files.

## Template Customization

Edit the `generatePageTemplate()` function in `generate-country-pages-smart.mjs`:

### Add Custom Section
```javascript
function generatePageTemplate(countryName, providers, metadata) {
  // ... existing code ...
  
  return `---
// ... frontmatter ...
---

<Layout>
  <Navigation />
  <main>
    <CountryHero country={country} />
    <CountryInfo country={country} />
    
    <!-- YOUR CUSTOM SECTION -->
    <section class="custom-section">
      <h2>Why Choose SMSPM for ${countryName}?</h2>
      <p>Custom content here...</p>
    </section>
    
    <MobileProviders country={country} />
    <!-- ... rest of template ... -->
  </main>
</Layout>`;
}
```

### Modify SEO
```javascript
seo: {
  title: \`Send Bulk SMS to \${countryName} | Best Prices | SMSPM\`,
  description: \`Premium SMS gateway for \${countryName}. ${providers.length} providers, from €\${startingPrice}. Try free!\`,
  keywords: [
    // Add more keywords...
  ]
}
```

## Country Metadata

Add more countries to `data/country-metadata.js`:

```javascript
export const COUNTRY_METADATA = {
  'Brazil': { 
    code: 'br', 
    flag: '🇧🇷', 
    currency: 'BRL', 
    callingCode: '+55',
    timezone: 'America/Sao_Paulo',
    population: '215M',
    mobileUsers: '230M',
    slug: 'brazil'
  },
  // Add more countries...
};
```

Countries not in metadata will use fallback values (generic flag 🌍, USD currency, etc.).

## Best Practices

### 1. Keep Protected Pages Minimal
Only protect pages with truly custom, high-quality content. Let the generator handle the bulk.

### 2. Test with Dry Run First
Always run `--dry-run` before actual generation to preview changes.

### 3. Commit Tracking File
Include `data/generated-pages-tracking.json` in git to preserve manual/template status across team members.

### 4. Version Control Template
When modifying the template, use semantic versioning in tracking file if needed.

### 5. Batch Updates
When updating multiple template pages, edit template once and regenerate all with `--force`.

## Output Summary

After generation, you'll see:
```
============================================================
📊 Generation Summary:
============================================================
Total countries: 184
✅ Generated: 150        # New/updated template pages
🔒 Protected: 5          # Permanently protected pages
✏️  Manual: 29           # User-edited pages (auto-protected)
⏭️  Skipped: 0           # Unchanged pages (no --force)
============================================================
```

## Troubleshooting

### Page Won't Regenerate
**Problem**: Page marked as manual but you want to regenerate it.

**Solutions**:
1. Delete from tracking file: `data/generated-pages-tracking.json`
2. Delete the .astro file and regenerate
3. Manually update the contentHash in tracking file

### Template Changes Not Applying
**Problem**: Changed template but pages not updating.

**Solution**: Use `--force` flag:
```bash
node scripts/generate-country-pages-smart.mjs --force
```

### Missing Country Metadata
**Problem**: Country shows generic data (🌍 flag, USD currency).

**Solution**: Add to `data/country-metadata.js`

## Future Enhancements

### Multi-language Support
Extend to generate pages in multiple languages:
```javascript
const CONFIG = {
  languages: ['en', 'et', 'ru', 'es', 'de', 'fr'],
  outputDirs: {
    'en': 'src/pages/en/country',
    'et': 'src/pages/et/riik',
    'ru': 'src/pages/ru/strana',
    // ...
  }
};
```

### Dynamic Routing
Use Astro's `getStaticPaths()` for cleaner architecture:
```typescript
// src/pages/[lang]/country/[slug].astro
export async function getStaticPaths() {
  // Generate paths from pricelist
}
```

### Build-Time KV Integration
Fetch from Cloudflare KV during build:
```javascript
const pricelist = await fetch(`https://api.cloudflare.com/...`);
```

## Summary

✅ **Automatic**: Generates 184+ pages from pricelist
✅ **Smart**: Protects manually edited pages
✅ **Flexible**: Easy template customization
✅ **Safe**: Dry-run before committing
✅ **Scalable**: Add more countries anytime

**Main Commands**:
```bash
# Extract → Generate → Done
node scripts/extract-countries.mjs
node scripts/generate-country-pages-smart.mjs

# Update template → Regenerate
node scripts/generate-country-pages-smart.mjs --force

# Test first
node scripts/generate-country-pages-smart.mjs --dry-run
```
