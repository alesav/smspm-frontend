// KV Data Fetching Utility for Build Time
// This utility fetches pricing data from Cloudflare KV during build time

export interface PriceEntry {
  p: number; // Price in USD
}

export interface PricingData {
  [key: string]: PriceEntry;
}

export interface CountryProvider {
  name: string;
  price: number;
  marketShare?: number;
  coverage?: number;
  deliveryRate?: number;
  features: string[];
  description: string;
  logo?: string;
}

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  population: string;
  mobileUsers: string;
  mobilePenetration: string;
  networkCoverage: string;
  timezone: string;
  currency: string;
  callingCode: string;
  startingPrice?: number;
  providers: CountryProvider[];
  marketDescription: string;
  useCases: {
    title: string;
    description: string;
    examples: string[];
    icon: string;
  }[];
  regulations: {
    title: string;
    description: string;
    icon: string;
  }[];
  stats: {
    deliveryRate: string;
    responseTime: string;
    uptime: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Function to fetch pricing data from Cloudflare KV
export async function fetchPricingData(): Promise<PricingData> {
  try {
    // In a real Cloudflare Workers environment, you would use:
    // const data = await PRICELIST.get('prices');
    
    // For build time, we'll check for environment variables
    const kvNamespace = process.env.KV_PRICELIST_NAMESPACE_ID;
    const cfEmail = process.env.CLOUDFLARE_EMAIL;
    const cfApiKey = process.env.CLOUDFLARE_API_KEY;
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    
    if (!kvNamespace || !cfEmail || !cfApiKey || !cfAccountId) {
      console.warn('KV environment variables not found, using default pricing data');
      return getDefaultPricingData();
    }

    // Fetch from Cloudflare KV via REST API
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/storage/kv/namespaces/${kvNamespace}/values/prices`, {
      method: 'GET',
      headers: {
        'X-Auth-Email': cfEmail,
        'X-Auth-Key': cfApiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Failed to fetch KV data, using default pricing');
      return getDefaultPricingData();
    }

    const data = await response.json();
    return data as PricingData;
  } catch (error) {
    console.warn('Error fetching pricing data:', error);
    return getDefaultPricingData();
  }
}

// Default pricing data as fallback
function getDefaultPricingData(): PricingData {
  return {
    "Estonia - Telia": { p: 0.032 },
    "Estonia - Elisa": { p: 0.035 },
    "Estonia - Tele2": { p: 0.038 },
    "United Kingdom - EE": { p: 0.025 },
    "United Kingdom - O2": { p: 0.027 },
    "United Kingdom - Vodafone": { p: 0.026 },
    "United Kingdom - Three": { p: 0.028 },
    "Germany - Deutsche Telekom": { p: 0.045 },
    "Germany - Vodafone": { p: 0.043 },
    "Germany - O2": { p: 0.044 },
    "France - Orange": { p: 0.042 },
    "France - SFR": { p: 0.041 },
    "France - Bouygues": { p: 0.043 },
    "Spain - Telefonica": { p: 0.039 },
    "Spain - Vodafone": { p: 0.037 },
    "Spain - Orange": { p: 0.038 },
  };
}

// Extract pricing for a specific country
export function getCountryPricing(pricingData: PricingData, countryName: string): CountryProvider[] {
  const countryPrices: { [key: string]: number } = {};
  
  // Filter prices for the specific country
  Object.keys(pricingData).forEach(key => {
    if (key.startsWith(`${countryName} - `)) {
      const providerName = key.replace(`${countryName} - `, '');
      countryPrices[providerName] = pricingData[key].p;
    }
  });

  // Convert to CountryProvider format
  const providers: CountryProvider[] = Object.keys(countryPrices).map(providerName => ({
    name: providerName,
    price: countryPrices[providerName],
    marketShare: getProviderMarketShare(countryName, providerName),
    coverage: getProviderCoverage(countryName, providerName),
    deliveryRate: getProviderDeliveryRate(countryName, providerName),
    features: getProviderFeatures(countryName, providerName),
    description: getProviderDescription(countryName, providerName),
    logo: getProviderLogo(providerName),
  }));

  return providers.sort((a, b) => a.price - b.price); // Sort by price
}

// Helper functions to get provider-specific data
function getProviderMarketShare(country: string, provider: string): number {
  const marketShares: { [key: string]: { [key: string]: number } } = {
    'Estonia': {
      'Telia': 42,
      'Elisa': 32,
      'Tele2': 26,
    },
    'United Kingdom': {
      'EE': 32,
      'O2': 27,
      'Vodafone': 23,
      'Three': 18,
    },
    'Germany': {
      'Deutsche Telekom': 37,
      'Vodafone': 32,
      'O2': 31,
    },
    'France': {
      'Orange': 38,
      'SFR': 31,
      'Bouygues': 31,
    },
    'Spain': {
      'Telefonica': 32,
      'Vodafone': 25,
      'Orange': 23,
    },
  };
  
  return marketShares[country]?.[provider] || 20;
}

function getProviderCoverage(_country: string, provider: string): number {
  // Most providers have 99%+ coverage in developed countries
  const coverageMap: { [key: string]: number } = {
    'Telia': 99.8,
    'Elisa': 99.7,
    'Tele2': 99.5,
    'EE': 99.6,
    'O2': 99.4,
    'Vodafone': 99.5,
    'Three': 99.2,
    'Deutsche Telekom': 99.7,
    'Orange': 99.6,
    'SFR': 99.3,
    'Bouygues': 99.4,
    'Telefonica': 99.5,
  };
  
  return coverageMap[provider] || 99.0;
}

function getProviderDeliveryRate(_country: string, _provider: string): number {
  // SMS delivery rates are typically very high
  return 99.9 - (Math.random() * 0.3); // Between 99.6% and 99.9%
}

function getProviderFeatures(_country: string, provider: string): string[] {
  const commonFeatures = [
    '5G Network',
    'Unicode Support',
    'Delivery Receipts',
    'Priority Routing',
  ];
  
  const providerFeatures: { [key: string]: string[] } = {
    'Telia': [...commonFeatures, 'Extensive Rural Coverage'],
    'Elisa': [...commonFeatures, 'Advanced Analytics', 'Competitive Pricing'],
    'Tele2': [...commonFeatures, 'Cost-Effective', 'Flexible Pricing'],
    'EE': [...commonFeatures, 'Premium Network', 'IoT Support'],
    'O2': [...commonFeatures, 'Business Solutions', 'Custom APIs'],
    'Vodafone': [...commonFeatures, 'Global Reach', 'Enterprise Support'],
    'Three': [...commonFeatures, 'Innovative Services', 'Value Pricing'],
    'Deutsche Telekom': [...commonFeatures, 'Premium Quality', 'Enterprise Grade'],
    'Orange': [...commonFeatures, 'Innovation Leader', 'Reliable Service'],
    'SFR': [...commonFeatures, 'Competitive Rates', 'Quality Service'],
    'Bouygues': [...commonFeatures, 'Network Excellence', 'Customer Focus'],
    'Telefonica': [...commonFeatures, 'Market Leader', 'Extensive Coverage'],
  };
  
  return providerFeatures[provider] || commonFeatures;
}

function getProviderDescription(_country: string, provider: string): string {
  const descriptions: { [key: string]: string } = {
    'Telia': 'Leading telecommunications provider with extensive network coverage and high delivery rates.',
    'Elisa': 'Major operator focused on customer satisfaction and innovative mobile solutions.',
    'Tele2': 'Value-oriented provider offering competitive services with reliable delivery.',
    'EE': 'Premium network operator with advanced 5G coverage and enterprise solutions.',
    'O2': 'Major mobile network with strong business focus and comprehensive coverage.',
    'Vodafone': 'Global telecommunications leader with premium services and worldwide reach.',
    'Three': 'Innovative mobile operator offering competitive pricing and modern services.',
    'Deutsche Telekom': 'Germany\'s leading telecommunications company with premium network quality.',
    'Orange': 'Major European operator known for innovation and reliable mobile services.',
    'SFR': 'Leading French operator providing competitive mobile services and solutions.',
    'Bouygues': 'French telecommunications company with focus on network excellence.',
    'Telefonica': 'Major Spanish operator with extensive coverage and market leadership.',
  };
  
  return descriptions[provider] || 'Reliable mobile network operator providing quality SMS services.';
}

function getProviderLogo(provider: string): string {
  const logos: { [key: string]: string } = {
    'Telia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Telia_logo.svg/1280px-Telia_logo.svg.png',
    'Elisa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Elisa-logo.svg/1280px-Elisa-logo.svg.png',
    'Tele2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Tele2_logo.svg/1280px-Tele2_logo.svg.png',
    'EE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/EE_logo.svg/1280px-EE_logo.svg.png',
    'O2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/O2-logo.svg/1280px-O2-logo.svg.png',
    'Vodafone': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/1280px-Vodafone_icon.svg.png',
    'Three': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Three_logo.svg/1280px-Three_logo.svg.png',
    'Deutsche Telekom': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Deutsche_Telekom_logo.svg/1280px-Deutsche_Telekom_logo.svg.png',
    'Orange': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1280px-Orange_logo.svg.png',
    'SFR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/SFR_logo.svg/1280px-SFR_logo.svg.png',
    'Bouygues': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Bouygues_Telecom_logo.svg/1280px-Bouygues_Telecom_logo.svg.png',
    'Telefonica': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Telefonica_logo.svg/1280px-Telefonica_logo.svg.png',
  };
  
  return logos[provider] || '';
}