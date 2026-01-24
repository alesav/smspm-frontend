import type { CountryData, CountryTranslation } from './types';
import { estoniaData } from './ee';

// Export all country data
export const COUNTRIES: { [code: string]: CountryData } = {
  ee: estoniaData,
  // Add other countries: gb, de, fr, es
};

// Helper function to get country data with specific language translation
export function getCountryData(
  countryCode: string,
  lang: string = 'en'
): (Omit<CountryData, 'translations'> & CountryTranslation) | null {
  const country = COUNTRIES[countryCode];
  if (!country) return null;

  const translation = country.translations[lang] || country.translations['en'];
  
  return {
    code: country.code,
    flag: country.flag,
    population: country.population,
    mobileUsers: country.mobileUsers,
    mobilePenetration: country.mobilePenetration,
    networkCoverage: country.networkCoverage,
    timezone: country.timezone,
    currency: country.currency,
    callingCode: country.callingCode,
    stats: country.stats,
    ...translation
  };
}

// Helper function to get available languages for a country
export function getAvailableLanguages(countryCode: string): string[] {
  const country = COUNTRIES[countryCode];
  if (!country) return ['en'];
  return Object.keys(country.translations);
}

export * from './types';
