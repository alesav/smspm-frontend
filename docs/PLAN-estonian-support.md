# PLAN: Estonian Language Support (i18n) Implementation

## 🎯 Goal
Create a complete Estonian version of the SMSPM landing pages, following the existing high-end design pattern but with localized URLs and content.

---

## 🏗️ Phase 1: ANALYSIS & PREPARATION

### 1.1 Metadata Mapping
- **File**: `data/country-metadata.js`
- **Action**: Add `name_et` and `slug_et` to the `COUNTRY_METADATA` objects.
- **Example**:
  ```javascript
  'Australia': { 
     code: 'au', 
     flag: '🇦🇺', 
     slug: 'australia', 
     slug_et: 'austraaliasse', 
     name_et: 'Austraalia' 
  }
  ```

### 1.2 URL Pattern Definition
- **English**: `/en/country/send-sms-[slug]`
- **Estonian**: `/et/country/saada-sms-[slug_et]`
- **Pricing**: `/en/pricing` → `/et/hinnad`

---

## 📝 Phase 2: PLANNING & ARCHITECTURE

### 2.1 Strategy: Smart Generator Expansion
We will modify the `generate-country-pages-smart.mjs` script to loop through defined languages and generate files in the appropriate directories withLocalized prefixes.

### 2.2 Component Internationalization
- Create a lightweight i18n utility or use a basic JSON dictionary for UI strings.
- **Strings to Translate**:
  - Navigation links (Pricing, API Docs, Support)
  - Hero titles and descriptions
  - Footer descriptions and links
  - CTA section text

---

## 🛠️ Phase 3: SOLUTIONING (Developer Tasks)

### Task 1: Update Country Metadata
- Populate `data/country-metadata.js` with Estonian translations for all major countries.
- Create a fallback strategy for countries missing Estonian data (use English or automated translation).

### Task 2: Refactor `generate-country-pages-smart.mjs`
- Update `CONFIG` to include `languages: ['en', 'et']`.
- Update `generatePages` to loop through languages.
- Handle localized filename patterns based on language:
  - `en`: `send-sms-${slug}.astro`
  - `et`: `saada-sms-${slug_et}.astro`
- Update `generatePageTemplate` to accept `lang` and use translated strings for static content inside the template.

### Task 3: Build Estonian Core Pages
- Create `src/pages/et/index.astro` (Copy of index, translated).
- Create `src/pages/et/hinnad.astro` (Pricing page in Estonian).

---

## 🚀 Phase 4: IMPLEMENTATION & VERIFICATION

### 4.1 Running the Generator
```bash
npm run countries:generate -- --force
```
- Verify `src/pages/et/country/` contains localized filenames (e.g., `saada-sms-austraaliasse.astro`).

### 4.2 Link Verification
- Ensure the language switcher in `Navigation.astro` correctly links between:
  - `/` <-> `/et`
  - `/pricing` <-> `/et/hinnad`
  - `/en/country/...` <-> `/et/country/...`

### 4.3 SEO Verification
- Update `hreflang` tags on all pages to point to their translated counterparts.
- (Self-Correction): Use the canonical/alternate link logic in the template to automate this.

---

## 📋 Success Criteria
1. [ ] Global English site remains intact.
2. [ ] All 180+ country pages exist in `/et/country/` with Estonian slugs.
3. [ ] Estonian UI is completely translated (Buttons, Footer, Hero).
4. [ ] Language switcher works seamlessly.
5. [ ] SEO metadata includes correct localized titles and descriptions.
