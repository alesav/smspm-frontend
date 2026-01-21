# 🚀 Quick Reference Card - Country Pages System

## ⚡ Most Common Commands

```bash
# Generate all new pages (first time or after updating pricelist)
npm run countries:generate

# Update template for all pages (after changing template code)
npm run countries:regenerate

# Test what will happen (safe, no changes)
npm run countries:test

# Check current status
npm run countries stats
```

---

## 📋 Complete Workflow Examples

### 🆕 Initial Setup
```bash
npm run countries:extract        # Extract from pricelist.json
npm run countries:test           # Preview (optional)
npm run countries:generate       # Generate 181 pages
```

### 🔄 Update Prices
```bash
# 1. Edit pricelist.json
# 2. Run:
npm run countries:extract
npm run countries:regenerate
```

### 🎨 Change Template
```bash
# 1. Edit: scripts/generate-country-pages-smart.mjs
# 2. Run:
npm run countries:test           # Preview changes
npm run countries:regenerate     # Apply to all template pages
```

### ✏️ Customize One Country
```bash
# 1. Edit: src/pages/en/country/send-sms-brazil.astro
# 2. Save (automatically marked as manual)
# 3. Future regenerations will skip this file
```

---

## 🎯 Page Status Types

| Icon | Type | Can Regenerate? | How to Create |
|------|------|-----------------|---------------|
| 🔒 | PROTECTED | ❌ Never | Add to `PROTECTED_PAGES` array |
| ✏️ | MANUAL | ❌ Never | Edit any generated page |
| ✅ | TEMPLATE | ✅ Yes | Auto-generated |

---

## 📁 Key Files

| File | Purpose | Edit? |
|------|---------|-------|
| `pricelist.json` | Source pricing data | ✅ Yes |
| `scripts/generate-country-pages-smart.mjs` | Page generator & template | ✅ Yes |
| `data/country-metadata.js` | Country flags, codes, etc | ✅ Yes |
| `data/extracted-countries.json` | Auto-extracted countries | ❌ No (auto) |
| `data/generated-pages-tracking.json` | Page status tracking | ❌ No (auto) |

---

## 🛡️ Protection System

### To PROTECT a page permanently:
```javascript
// In generate-country-pages-smart.mjs
const PROTECTED_PAGES = [
  'send-sms-estonia.astro',
  'send-sms-brazil.astro',  // ← Add here
];
```

### To UN-PROTECT a manual page:
```bash
# Delete the page and regenerate
rm src/pages/en/country/send-sms-brazil.astro
npm run countries:generate
```

---

## 📊 Current Status
```bash
npm run countries stats
```
Shows:
- Total pages: 181
- 🔒 Protected: 5 (permanent)
- ✏️ Manual: 0 (user-edited)
- ✅ Template: 181 (can regenerate)

---

## 🎨 Template Customization

Edit: `scripts/generate-country-pages-smart.mjs`

Function: `generatePageTemplate(countryName, providers, metadata)`

Then run:
```bash
npm run countries:regenerate
```

---

## ⚠️ Important Notes

✅ **DO**:
- Test with `--dry-run` before actual generation
- Commit `generated-pages-tracking.json` to git
- Edit template once, regenerate all pages

❌ **DON'T**:
- Manually edit template-generated pages and expect changes to persist through regeneration
- Delete `generated-pages-tracking.json` (loses manual page tracking)
- Edit pages in bulk - edit the template instead!

---

## 🔍 Troubleshooting

### Page won't regenerate?
→ Check if marked as manual in `data/generated-pages-tracking.json`
→ Delete page and run `npm run countries:generate`

### Template changes not applying?
→ Use `npm run countries:regenerate` (with `--force`)

### Missing country metadata?
→ Add to `data/country-metadata.js`

---

## 📚 Full Documentation

- **Complete Guide**: `COUNTRY_PAGES_GENERATION.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **This Card**: `QUICK_REFERENCE.md`

---

## 🎉 Success Metrics

After setup:
- ✅ 181 country pages generated
- ✅ 3 seconds per regeneration
- ✅ 5 protected premium pages
- ✅ Automatic manual page detection
- ✅ SEO-optimized with structured data
- ✅ Build-time pricing from pricelist.json

---

**Remember**: Edit template once → Regenerate all → Customize special pages manually
