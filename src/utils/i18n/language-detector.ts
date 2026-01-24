/**
 * Language detection utility for SMSPM frontend
 * Detects user's preferred language from browser Accept-Language header
 */

export const SUPPORTED_LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * Parse Accept-Language header and return array of language codes with quality scores
 * Example: "en-US,en;q=0.9,et;q=0.8" -> [{code: 'en', quality: 1}, {code: 'en', quality: 0.9}, {code: 'et', quality: 0.8}]
 */
function parseAcceptLanguage(acceptLanguage: string): Array<{ code: string; quality: number }> {
  if (!acceptLanguage) return [];

  return acceptLanguage
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';');
      const code = parts[0].split('-')[0].toLowerCase(); // Get primary language code (en-US -> en)
      const qualityMatch = parts[1]?.match(/q=([\d.]+)/);
      const quality = qualityMatch ? parseFloat(qualityMatch[1]) : 1.0;
      
      return { code, quality };
    })
    .filter(lang => lang.code.length === 2) // Only keep valid 2-letter codes
    .sort((a, b) => b.quality - a.quality); // Sort by quality (highest first)
}

/**
 * Detect the best matching language from Accept-Language header
 * @param acceptLanguage - The Accept-Language header value
 * @returns The detected language code or default language
 */
export function detectLanguage(acceptLanguage: string | null | undefined): SupportedLanguage {
  if (!acceptLanguage) {
    return DEFAULT_LANGUAGE;
  }

  const parsedLanguages = parseAcceptLanguage(acceptLanguage);
  
  // Find first supported language
  for (const { code } of parsedLanguages) {
    if (SUPPORTED_LANGUAGES.includes(code as SupportedLanguage)) {
      return code as SupportedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Get stored language preference from cookie
 * @param cookieHeader - The Cookie header value
 * @returns The stored language or null
 */
export function getStoredLanguage(cookieHeader: string | null | undefined): SupportedLanguage | null {
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/preferred-language=([a-z]{2})/);
  if (match) {
    const lang = match[1];
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
  }

  return null;
}

/**
 * Get the final language to display, considering:
 * 1. User's stored preference (cookie)
 * 2. Browser language detection
 * 3. Default language
 */
export function getFinalLanguage(
  acceptLanguage: string | null | undefined,
  cookieHeader: string | null | undefined
): SupportedLanguage {
  // Priority 1: Stored preference
  const stored = getStoredLanguage(cookieHeader);
  if (stored) return stored;

  // Priority 2: Browser detection
  return detectLanguage(acceptLanguage);
}
