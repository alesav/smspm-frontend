/**
 * Hreflang utility for SMSPM frontend
 * Generates alternateUrls maps for Layout's hreflang tags
 */

const SITE = 'https://smspm.com';

export const LANGS = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'] as const;
export type Lang = typeof LANGS[number];

/**
 * Generate alternateUrls for pages with the same slug across all languages.
 * e.g. about, privacy, security, terms, tools/index, tools/sms-character-counter, etc.
 *
 * @param path - the path segment after the lang prefix, e.g. "about" or "tools/sms-character-counter"
 */
export function getAlternateUrls(path: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const lang of LANGS) {
    result[lang] = `${SITE}/${lang}/${path}`;
  }
  return result;
}

/**
 * Generate alternateUrls for pages where each language has a different slug.
 * Pass a map of lang -> full path after the lang prefix.
 *
 * @param slugMap - e.g. { en: 'prices', de: 'sms-preise', fr: 'prix-sms', ... }
 */
export function getLocalizedAlternateUrls(slugMap: Partial<Record<Lang, string>>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const lang of LANGS) {
    const slug = slugMap[lang];
    if (slug) {
      result[lang] = `${SITE}/${lang}/${slug}`;
    }
  }
  return result;
}

/**
 * Generate alternateUrls for /{lang}/ homepage (no path segment).
 */
export function getHomeAlternateUrls(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const lang of LANGS) {
    result[lang] = `${SITE}/${lang}`;
  }
  return result;
}

/** Prices page localized slugs */
export const PRICES_SLUGS: Record<Lang, string> = {
  en: 'prices',
  et: 'sms-hinnad',
  ru: 'sms-ceny',
  es: 'precios-sms',
  de: 'sms-preise',
  fr: 'prix-sms',
  lv: 'sms-cenas',
  lt: 'sms-kainos',
};
