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

/**
 * Blog post slug translations.
 * Most blog posts only exist in English — only list a post here once it has
 * been translated into other languages. Languages not present for a given
 * post are simply omitted from hreflang / the language switcher (no guessing,
 * no linking to a 404).
 *
 * Key: a stable identifier for the post (English slug is used as the key by convention).
 * Value: the slug for each language that has a translation.
 */
export const BLOG_SLUGS: Record<string, Partial<Record<Lang, string>>> = {
  'android-sms-gateway-send-sms-from-phone': {
    en: 'android-sms-gateway-send-sms-from-phone',
    et: 'android-gateway-saada-sms-oma-telefoniga',
    ru: 'android-gateway-otpravlyayte-sms-so-svoego-telefona',
    es: 'android-gateway-enviar-sms-desde-tu-telefono',
    de: 'android-gateway-sms-vom-eigenen-telefon-senden',
    fr: 'android-gateway-envoyer-sms-depuis-votre-telephone',
    lv: 'android-gateway-sutiet-sms-no-sava-talruna',
    lt: 'android-gateway-siunti-sms-is-savo-telefono',
  },
};

/**
 * Find the blog post's translation map by looking up a slug in any language.
 * Returns undefined if the slug isn't a known translated post (e.g. it's an
 * English-only post with no translations yet).
 */
export function findBlogTranslations(slug: string): Partial<Record<Lang, string>> | undefined {
  for (const translations of Object.values(BLOG_SLUGS)) {
    if (Object.values(translations).includes(slug)) {
      return translations;
    }
  }
  return undefined;
}

/**
 * Generate alternateUrls for a blog post, given its slug in any language.
 * Only includes languages that actually have a translation of this specific post.
 */
export function getBlogAlternateUrls(slug: string): Record<string, string> {
  const translations = findBlogTranslations(slug);
  if (!translations) return {};
  const result: Record<string, string> = {};
  for (const [langCode, postSlug] of Object.entries(translations)) {
    result[langCode] = `${SITE}/${langCode}/blog/${postSlug}`;
  }
  return result;
}
