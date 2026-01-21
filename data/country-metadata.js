/**
 * Country metadata - ISO codes, flags, population, currency, etc.
 * This is the master data source for all country pages
 */

export const COUNTRY_METADATA = {
  // Manually curated list - expand as needed
  'Estonia': { code: 'ee', flag: '🇪🇪', currency: 'EUR', callingCode: '+372', timezone: 'Europe/Tallinn', population: '1.3M', mobileUsers: '1.9M', slug: 'estonia' },
  'Finland': { code: 'fi', flag: '🇫🇮', currency: 'EUR', callingCode: '+358', timezone: 'Europe/Helsinki', population: '5.5M', mobileUsers: '7.2M', slug: 'finland' },
  'Albania': { code: 'al', flag: '🇦🇱', currency: 'ALL', callingCode: '+355', timezone: 'Europe/Tirane', population: '2.8M', mobileUsers: '3.5M', slug: 'albania' },
  'Algeria': { code: 'dz', flag: '🇩🇿', currency: 'DZD', callingCode: '+213', timezone: 'Africa/Algiers', population: '44M', mobileUsers: '46M', slug: 'algeria' },
  'Angola': { code: 'ao', flag: '🇦🇴', currency: 'AOA', callingCode: '+244', timezone: 'Africa/Luanda', population: '33M', mobileUsers: '14M', slug: 'angola' },
  'Armenia': { code: 'am', flag: '🇦🇲', currency: 'AMD', callingCode: '+374', timezone: 'Asia/Yerevan', population: '3M', mobileUsers: '3.8M', slug: 'armenia' },
  'Aruba': { code: 'aw', flag: '🇦🇼', currency: 'AWG', callingCode: '+297', timezone: 'America/Aruba', population: '107K', mobileUsers: '140K', slug: 'aruba' },
  'Australia': { code: 'au', flag: '🇦🇺', currency: 'AUD', callingCode: '+61', timezone: 'Australia/Sydney', population: '26M', mobileUsers: '30M', slug: 'australia' },
  'Austria': { code: 'at', flag: '🇦🇹', currency: 'EUR', callingCode: '+43', timezone: 'Europe/Vienna', population: '9M', mobileUsers: '11M', slug: 'austria' },
  'Belgium': { code: 'be', flag: '🇧🇪', currency: 'EUR', callingCode: '+32', timezone: 'Europe/Brussels', population: '11.6M', mobileUsers: '13M', slug: 'belgium' },
  'Brazil': { code: 'br', flag: '🇧🇷', currency: 'BRL', callingCode: '+55', timezone: 'America/Sao_Paulo', population: '215M', mobileUsers: '230M', slug: 'brazil' },
  'Bulgaria': { code: 'bg', flag: '🇧🇬', currency: 'BGN', callingCode: '+359', timezone: 'Europe/Sofia', population: '6.9M', mobileUsers: '8M', slug: 'bulgaria' },
  'Cambodia': { code: 'kh', flag: '🇰🇭', currency: 'KHR', callingCode: '+855', timezone: 'Asia/Phnom_Penh', population: '17M', mobileUsers: '20M', slug: 'cambodia' },
  'Canada': { code: 'ca', flag: '🇨🇦', currency: 'CAD', callingCode: '+1', timezone: 'America/Toronto', population: '38M', mobileUsers: '35M', slug: 'canada' },
  'China': { code: 'cn', flag: '🇨🇳', currency: 'CNY', callingCode: '+86', timezone: 'Asia/Shanghai', population: '1.4B', mobileUsers: '1.7B', slug: 'china' },
  'Colombia': { code: 'co', flag: '🇨🇴', currency: 'COP', callingCode: '+57', timezone: 'America/Bogota', population: '51M', mobileUsers: '70M', slug: 'colombia' },
  'Croatia': { code: 'hr', flag: '🇭🇷', currency: 'EUR', callingCode: '+385', timezone: 'Europe/Zagreb', population: '4M', mobileUsers: '4.5M', slug: 'croatia' },
  'Cyprus': { code: 'cy', flag: '🇨🇾', currency: 'EUR', callingCode: '+357', timezone: 'Asia/Nicosia', population: '1.2M', mobileUsers: '1.3M', slug: 'cyprus' },
  'Czech Republic': { code: 'cz', flag: '🇨🇿', currency: 'CZK', callingCode: '+420', timezone: 'Europe/Prague', population: '10.5M', mobileUsers: '13M', slug: 'czech-republic' },
  'Denmark': { code: 'dk', flag: '🇩🇰', currency: 'DKK', callingCode: '+45', timezone: 'Europe/Copenhagen', population: '5.9M', mobileUsers: '7.2M', slug: 'denmark' },
  'France': { code: 'fr', flag: '🇫🇷', currency: 'EUR', callingCode: '+33', timezone: 'Europe/Paris', population: '68M', mobileUsers: '70M', slug: 'france' },
  'Germany': { code: 'de', flag: '🇩🇪', currency: 'EUR', callingCode: '+49', timezone: 'Europe/Berlin', population: '83M', mobileUsers: '84M', slug: 'germany' },
  'Greece': { code: 'gr', flag: '🇬🇷', currency: 'EUR', callingCode: '+30', timezone: 'Europe/Athens', population: '10.7M', mobileUsers: '11M', slug: 'greece' },
  'India': { code: 'in', flag: '🇮🇳', currency: 'INR', callingCode: '+91', timezone: 'Asia/Kolkata', population: '1.4B', mobileUsers: '1.2B', slug: 'india' },
  'Indonesia': { code: 'id', flag: '🇮🇩', currency: 'IDR', callingCode: '+62', timezone: 'Asia/Jakarta', population: '275M', mobileUsers: '370M', slug: 'indonesia' },
  'Ireland': { code: 'ie', flag: '🇮🇪', currency: 'EUR', callingCode: '+353', timezone: 'Europe/Dublin', population: '5.1M', mobileUsers: '5.7M', slug: 'ireland' },
  'Israel': { code: 'il', flag: '🇮🇱', currency: 'ILS', callingCode: '+972', timezone: 'Asia/Jerusalem', population: '9.5M', mobileUsers: '13M', slug: 'israel' },
  'Italy': { code: 'it', flag: '🇮🇹', currency: 'EUR', callingCode: '+39', timezone: 'Europe/Rome', population: '59M', mobileUsers: '78M', slug: 'italy' },
  'Japan': { code: 'jp', flag: '🇯🇵', currency: 'JPY', callingCode: '+81', timezone: 'Asia/Tokyo', population: '125M', mobileUsers: '190M', slug: 'japan' },
  'Korea, Republic of South Korea': { code: 'kr', flag: '🇰🇷', currency: 'KRW', callingCode: '+82', timezone: 'Asia/Seoul', population: '52M', mobileUsers: '70M', slug: 'south-korea' },
  'Latvia': { code: 'lv', flag: '🇱🇻', currency: 'EUR', callingCode: '+371', timezone: 'Europe/Riga', population: '1.9M', mobileUsers: '2.3M', slug: 'latvia' },
  'Lithuania': { code: 'lt', flag: '🇱🇹', currency: 'EUR', callingCode: '+370', timezone: 'Europe/Vilnius', population: '2.8M', mobileUsers: '3.8M', slug: 'lithuania' },
  'Malaysia': { code: 'my', flag: '🇲🇾', currency: 'MYR', callingCode: '+60', timezone: 'Asia/Kuala_Lumpur', population: '33M', mobileUsers: '44M', slug: 'malaysia' },
  'Mexico': { code: 'mx', flag: '🇲🇽', currency: 'MXN', callingCode: '+52', timezone: 'America/Mexico_City', population: '130M', mobileUsers: '127M', slug: 'mexico' },
  'Netherlands': { code: 'nl', flag: '🇳🇱', currency: 'EUR', callingCode: '+31', timezone: 'Europe/Amsterdam', population: '17.5M', mobileUsers: '21M', slug: 'netherlands' },
  'New Zealand': { code: 'nz', flag: '🇳🇿', currency: 'NZD', callingCode: '+64', timezone: 'Pacific/Auckland', population: '5.1M', mobileUsers: '6.4M', slug: 'new-zealand' },
  'Norway': { code: 'no', flag: '🇳🇴', currency: 'NOK', callingCode: '+47', timezone: 'Europe/Oslo', population: '5.5M', mobileUsers: '5.9M', slug: 'norway' },
  'Poland': { code: 'pl', flag: '🇵🇱', currency: 'PLN', callingCode: '+48', timezone: 'Europe/Warsaw', population: '38M', mobileUsers: '50M', slug: 'poland' },
  'Portugal': { code: 'pt', flag: '🇵🇹', currency: 'EUR', callingCode: '+351', timezone: 'Europe/Lisbon', population: '10.3M', mobileUsers: '12M', slug: 'portugal' },
  'Romania': { code: 'ro', flag: '🇷🇴', currency: 'RON', callingCode: '+40', timezone: 'Europe/Bucharest', population: '19M', mobileUsers: '23M', slug: 'romania' },
  'Russian Federation': { code: 'ru', flag: '🇷🇺', currency: 'RUB', callingCode: '+7', timezone: 'Europe/Moscow', population: '144M', mobileUsers: '230M', slug: 'russia' },
  'Singapore': { code: 'sg', flag: '🇸🇬', currency: 'SGD', callingCode: '+65', timezone: 'Asia/Singapore', population: '5.9M', mobileUsers: '9M', slug: 'singapore' },
  'Spain': { code: 'es', flag: '🇪🇸', currency: 'EUR', callingCode: '+34', timezone: 'Europe/Madrid', population: '47M', mobileUsers: '54M', slug: 'spain' },
  'Sweden': { code: 'se', flag: '🇸🇪', currency: 'SEK', callingCode: '+46', timezone: 'Europe/Stockholm', population: '10.5M', mobileUsers: '13M', slug: 'sweden' },
  'Switzerland': { code: 'ch', flag: '🇨🇭', currency: 'CHF', callingCode: '+41', timezone: 'Europe/Zurich', population: '8.7M', mobileUsers: '11M', slug: 'switzerland' },
  'Thailand': { code: 'th', flag: '🇹🇭', currency: 'THB', callingCode: '+66', timezone: 'Asia/Bangkok', population: '70M', mobileUsers: '130M', slug: 'thailand' },
  'Turkey': { code: 'tr', flag: '🇹🇷', currency: 'TRY', callingCode: '+90', timezone: 'Europe/Istanbul', population: '85M', mobileUsers: '87M', slug: 'turkey' },
  'Ukraine': { code: 'ua', flag: '🇺🇦', currency: 'UAH', callingCode: '+380', timezone: 'Europe/Kiev', population: '41M', mobileUsers: '54M', slug: 'ukraine' },
  'United Arab Emirates': { code: 'ae', flag: '🇦🇪', currency: 'AED', callingCode: '+971', timezone: 'Asia/Dubai', population: '10M', mobileUsers: '19M', slug: 'united-arab-emirates' },
  'United Kingdom': { code: 'gb', flag: '🇬🇧', currency: 'GBP', callingCode: '+44', timezone: 'Europe/London', population: '67M', mobileUsers: '72M', slug: 'united-kingdom' },
  'United States': { code: 'us', flag: '🇺🇸', currency: 'USD', callingCode: '+1', timezone: 'America/New_York', population: '333M', mobileUsers: '327M', slug: 'united-states' },
  'Vietnam': { code: 'vn', flag: '🇻🇳', currency: 'VND', callingCode: '+84', timezone: 'Asia/Ho_Chi_Minh', population: '98M', mobileUsers: '140M', slug: 'vietnam' },
};

/**
 * Get metadata for a country by name
 */
export function getCountryMetadata(countryName) {
  return COUNTRY_METADATA[countryName] || generateFallbackMetadata(countryName);
}

/**
 * Generate fallback metadata for countries not in our curated list
 */
function generateFallbackMetadata(countryName) {
  return {
    code: countryName.toLowerCase().substring(0, 2),
    flag: '🌍',
    currency: 'USD',
    callingCode: '+?',
    timezone: 'UTC',
    population: 'N/A',
    mobileUsers: 'N/A',
    slug: countryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  };
}

/**
 * Get all country names that have metadata
 */
export function getAllCountryNames() {
  return Object.keys(COUNTRY_METADATA);
}
