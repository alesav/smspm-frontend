# SMSPM Website Structure

This document outlines the URL structure for the SMSPM frontend across all supported languages.

## 🌐 Supported Languages
- **en**: English
- **et**: Estonian
- **ru**: Russian
- **es**: Spanish
- **de**: German
- **fr**: French
- **lv**: Latvian
- **lt**: Lithuanian

---

## 🏠 Core Pages
| Page | Pattern | Localized Slugs (Pricing) |
|------|---------|-------------------------|
| Home | `/[lang]/` | - |
| About | `/[lang]/about` | - |
| Pricing | `/[lang]/[slug]` | en: `prices`, et: `sms-hinnad`, ru: `sms-ceny`, es: `precios-sms`, de: `sms-preise`, fr: `prix-sms`, lv: `sms-cenas`, lt: `sms-kainos` |

---

## 🛠️ Free Tools Section
Hub for all free SMS utilities.

| Page | Pattern |
|------|---------|
| Tools Hub | `/[lang]/tools` |
| SMS Character Counter | `/[lang]/tools/sms-character-counter` |
| Phone Formatter | `/[lang]/tools/phone-formatter` |
| SMS Text Optimizer | `/[lang]/tools/sms-text-optimizer` |
| Unicode / GSM Checker | `/[lang]/tools/unicode-gsm-checker` |
| Phone Extractor | `/[lang]/tools/phone-extractor` |
| Text Case Converter | `/[lang]/tools/text-case-converter` |

---

## 🌍 Country Specific Pages (Sample)
There are ~190 country pages per language.

| Page | Pattern |
|------|---------|
| Page Template | `/[lang]/country/send-sms-[country-name]` |
| Germany | `/[lang]/country/send-sms-germany` |
| Estonia | `/[lang]/country/send-sms-estonia` |
| France | `/[lang]/country/send-sms-france` |
| Latvia | `/[lang]/country/send-sms-latvia` |
| Lithuania | `/[lang]/country/send-sms-lithuania` |

---

## ⚖️ Legal & Security
| Page | Pattern |
|------|---------|
| Privacy Policy | `/[lang]/privacy` |
| Terms of Service | `/[lang]/terms` |
| Security | `/[lang]/security` |
