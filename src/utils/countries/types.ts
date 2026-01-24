// Country data types with multi-language support

export interface UseCase {
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

export interface Regulation {
  title: string;
  description: string;
  icon: string;
}

export interface CountryStats {
  deliveryRate: string;
  responseTime: string;
  uptime: string;
}

export interface CountrySEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface CountryTranslation {
  name: string;
  marketDescription: string;
  useCases: UseCase[];
  regulations: Regulation[];
  seo: CountrySEO;
}

export interface CountryDataBase {
  code: string;
  flag: string;
  population: string;
  mobileUsers: string;
  mobilePenetration: string;
  networkCoverage: string;
  timezone: string;
  currency: string;
  callingCode: string;
  stats: CountryStats;
}

export interface CountryData extends CountryDataBase {
  translations: {
    [lang: string]: CountryTranslation;
  };
}
