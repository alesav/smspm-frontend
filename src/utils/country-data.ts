import type { CountryData } from './kv-pricing';

// Complete country data configuration with SEO-optimized content
export const COUNTRY_CONFIGS: { [key: string]: Omit<CountryData, 'providers' | 'startingPrice'> } = {
  ee: {
    code: 'ee',
    name: 'Estonia',
    flag: '🇪🇪',
    population: '1.33M',
    mobileUsers: '1.9M',
    mobilePenetration: '98.5%',
    networkCoverage: '99.8%',
    timezone: 'Europe/Tallinn (GMT+2)',
    currency: 'EUR',
    callingCode: '+372',
    marketDescription: 'Estonia has one of the most advanced digital infrastructures in Europe with 99% mobile coverage and high smartphone adoption. The country is known for its tech-savvy population and digital government services. Estonians are early adopters of technology, making SMS an effective communication channel for businesses across e-commerce, banking, healthcare, and education sectors.',
    useCases: [
      {
        title: 'E-commerce & Retail',
        description: 'Order confirmations, delivery updates, and promotional campaigns for Estonia\'s growing online retail market',
        examples: ['Order confirmations', 'Shipping notifications', 'Delivery updates', 'Review requests', 'Flash sale alerts'],
        icon: 'fas fa-shopping-cart'
      },
      {
        title: 'Banking & FinTech',
        description: 'Transaction alerts, OTP codes, and security notifications for Estonia\'s advanced digital banking sector',
        examples: ['Transaction alerts', 'OTP verification codes', 'Security notifications', 'Balance updates', 'Payment confirmations'],
        icon: 'fas fa-university'
      },
      {
        title: 'Healthcare',
        description: 'Appointment reminders and health notifications in Estonia\'s digital-first healthcare system',
        examples: ['Appointment reminders', 'Prescription alerts', 'Health tips', 'Emergency notifications', 'Test results'],
        icon: 'fas fa-heartbeat'
      },
      {
        title: 'Education & Gov Services',
        description: 'Student notifications and government service alerts in Estonia\'s digital society',
        examples: ['Class notifications', 'Exam reminders', 'Grade updates', 'Government service alerts', 'Emergency notifications'],
        icon: 'fas fa-graduation-cap'
      }
    ],
    regulations: [
      {
        title: 'GDPR Compliance',
        description: 'All SMS campaigns must comply with EU GDPR regulations. Ensure proper consent collection, data processing transparency, and provide easy opt-out mechanisms for Estonian recipients.',
        icon: 'fas fa-shield-alt'
      },
      {
        title: 'Time Restrictions',
        description: 'Promotional messages are restricted between 9 PM and 9 AM local time (Europe/Tallinn) to respect user privacy. Emergency and transactional messages are exempt from this restriction.',
        icon: 'fas fa-clock'
      },
      {
        title: 'Opt-in Requirements',
        description: 'Marketing messages require explicit opt-in consent from Estonian users. Provide clear unsubscribe options in Estonian language ("STOP" or "LÕPETA") and maintain opt-out lists.',
        icon: 'fas fa-user-check'
      }
    ],
    stats: {
      deliveryRate: '99.9%',
      responseTime: '<200ms',
      uptime: '99.95%'
    },
    seo: {
      title: 'Send SMS to Estonia - Bulk Messaging & API Services | SMSPM',
      description: 'Send SMS to Estonia with 99.9% delivery rate. Connect with 1.9M mobile users through Telia, Elisa, and Tele2 networks. Competitive pricing from €0.032 per message.',
      keywords: [
        'SMS Estonia',
        'bulk SMS Estonia',
        'SMS API Estonia',
        'send messages Estonia',
        'Estonian SMS service',
        'SMS marketing Estonia',
        'Telia SMS',
        'Elisa SMS',
        'Tele2 SMS',
        'Estonia mobile marketing',
        'SMS delivery Estonia',
        'SMS gateway Estonia'
      ]
    }
  },

  gb: {
    code: 'gb',
    name: 'United Kingdom',
    flag: '🇬🇧',
    population: '67.5M',
    mobileUsers: '71.8M',
    mobilePenetration: '106.4%',
    networkCoverage: '99.5%',
    timezone: 'Europe/London (GMT+0/+1)',
    currency: 'GBP',
    callingCode: '+44',
    marketDescription: 'The United Kingdom has a mature and highly competitive mobile market with excellent coverage and high smartphone adoption. With over 71 million mobile users and strong digital commerce adoption, SMS remains a crucial communication channel for businesses across all sectors, from financial services to retail and healthcare.',
    useCases: [
      {
        title: 'Financial Services',
        description: 'Banking alerts, payment confirmations, and fraud prevention for the UK\'s advanced financial sector',
        examples: ['Banking alerts', 'Payment confirmations', 'Fraud notifications', 'Account updates', 'Investment alerts'],
        icon: 'fas fa-pound-sign'
      },
      {
        title: 'Retail & E-commerce',
        description: 'Order updates, promotional campaigns, and customer service for the UK\'s massive retail market',
        examples: ['Order confirmations', 'Delivery tracking', 'Sales notifications', 'Loyalty rewards', 'Customer surveys'],
        icon: 'fas fa-store'
      },
      {
        title: 'NHS & Healthcare',
        description: 'Appointment reminders and health notifications integrated with the NHS digital services',
        examples: ['NHS appointment reminders', 'Prescription notifications', 'Health screenings', 'Vaccination reminders', 'Test results'],
        icon: 'fas fa-stethoscope'
      },
      {
        title: 'Travel & Hospitality',
        description: 'Booking confirmations and travel updates for the UK\'s tourism and business travel sectors',
        examples: ['Flight updates', 'Hotel confirmations', 'Check-in reminders', 'Travel alerts', 'Booking modifications'],
        icon: 'fas fa-plane'
      }
    ],
    regulations: [
      {
        title: 'UK GDPR & Data Protection',
        description: 'Comply with UK GDPR and Data Protection Act 2018. Obtain clear consent, maintain records, and provide transparent privacy policies for UK SMS recipients.',
        icon: 'fas fa-shield-alt'
      },
      {
        title: 'CAP Code Compliance',
        description: 'Follow UK Committee of Advertising Practice (CAP) codes for marketing messages. Include clear opt-out instructions and sender identification.',
        icon: 'fas fa-gavel'
      },
      {
        title: 'Time-based Restrictions',
        description: 'Respect quiet hours for promotional messages (typically 9 PM - 8 AM) unless recipient has specifically opted in for out-of-hours communications.',
        icon: 'fas fa-clock'
      }
    ],
    stats: {
      deliveryRate: '99.8%',
      responseTime: '<150ms',
      uptime: '99.97%'
    },
    seo: {
      title: 'Send SMS to United Kingdom - UK Bulk Messaging & API | SMSPM',
      description: 'Send SMS to UK with 99.8% delivery rate. Connect with 71.8M mobile users through EE, O2, Vodafone, and Three networks. Competitive pricing from £0.021 per message.',
      keywords: [
        'SMS UK',
        'bulk SMS United Kingdom',
        'SMS API UK',
        'send messages UK',
        'UK SMS service',
        'SMS marketing UK',
        'EE SMS',
        'O2 SMS',
        'Vodafone SMS',
        'Three SMS',
        'UK mobile marketing',
        'SMS delivery UK',
        'SMS gateway UK',
        'British SMS service'
      ]
    }
  },

  de: {
    code: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    population: '83.2M',
    mobileUsers: '84.3M',
    mobilePenetration: '101.3%',
    networkCoverage: '99.2%',
    timezone: 'Europe/Berlin (GMT+1/+2)',
    currency: 'EUR',
    callingCode: '+49',
    marketDescription: 'Germany represents Europe\'s largest economy with a sophisticated mobile market dominated by three major operators. German consumers are privacy-conscious and prefer transparent, high-quality communication. SMS remains essential for business communications, particularly in automotive, manufacturing, and financial services sectors.',
    useCases: [
      {
        title: 'Automotive Industry',
        description: 'Service reminders and updates for Germany\'s massive automotive sector including BMW, Mercedes, Volkswagen',
        examples: ['Service appointments', 'Vehicle updates', 'Recall notifications', 'Maintenance reminders', 'Delivery confirmations'],
        icon: 'fas fa-car'
      },
      {
        title: 'Manufacturing & Industry',
        description: 'Supply chain alerts and workforce communications for Germany\'s industrial backbone',
        examples: ['Production updates', 'Supply chain alerts', 'Safety notifications', 'Shift reminders', 'Quality alerts'],
        icon: 'fas fa-industry'
      },
      {
        title: 'Banking & Insurance',
        description: 'Secure communications for Germany\'s conservative but digital-savvy financial sector',
        examples: ['Transaction alerts', 'Insurance notifications', 'Security codes', 'Policy updates', 'Payment reminders'],
        icon: 'fas fa-piggy-bank'
      },
      {
        title: 'Healthcare & Wellness',
        description: 'Patient communications integrated with Germany\'s comprehensive healthcare system',
        examples: ['Appointment confirmations', 'Prescription reminders', 'Health check alerts', 'Insurance notifications', 'Emergency contacts'],
        icon: 'fas fa-heartbeat'
      }
    ],
    regulations: [
      {
        title: 'DSGVO (German GDPR)',
        description: 'Strict compliance with German implementation of GDPR. Explicit consent required, with clear data usage explanations in German language.',
        icon: 'fas fa-shield-alt'
      },
      {
        title: 'Telemediengesetz (TMG)',
        description: 'Comply with German telecommunications law requiring opt-in consent for marketing messages and clear sender identification.',
        icon: 'fas fa-gavel'
      },
      {
        title: 'Werbezeitenregelung',
        description: 'Respect German advertising time regulations - promotional SMS restricted between 8 PM and 8 AM unless explicitly consented.',
        icon: 'fas fa-clock'
      }
    ],
    stats: {
      deliveryRate: '99.7%',
      responseTime: '<180ms',
      uptime: '99.94%'
    },
    seo: {
      title: 'SMS nach Deutschland senden - Bulk Messaging & API | SMSPM',
      description: 'SMS nach Deutschland mit 99.7% Zustellrate. Erreichen Sie 84.3M Mobilfunknutzer über Deutsche Telekom, Vodafone und O2. Wettbewerbsfähige Preise ab €0.043.',
      keywords: [
        'SMS Deutschland',
        'Bulk SMS Deutschland',
        'SMS API Deutschland',
        'Nachrichten Deutschland',
        'SMS Service Deutschland',
        'SMS Marketing Deutschland',
        'Deutsche Telekom SMS',
        'Vodafone SMS',
        'O2 SMS',
        'Mobile Marketing Deutschland',
        'SMS Gateway Deutschland',
        'Deutscher SMS Service'
      ]
    }
  },

  fr: {
    code: 'fr',
    name: 'France',
    flag: '🇫🇷',
    population: '68.0M',
    mobileUsers: '69.9M',
    mobilePenetration: '102.8%',
    networkCoverage: '99.4%',
    timezone: 'Europe/Paris (GMT+1/+2)',
    currency: 'EUR',
    callingCode: '+33',
    marketDescription: 'France has a well-developed mobile ecosystem with strong regulatory framework and high digital adoption. French consumers value quality and style, making SMS an important channel for luxury brands, fashion, and lifestyle communications alongside traditional business use cases.',
    useCases: [
      {
        title: 'Fashion & Luxury',
        description: 'Exclusive offers and event invitations for France\'s world-renowned luxury and fashion brands',
        examples: ['Exclusive sales', 'Fashion week invites', 'New collection alerts', 'VIP events', 'Personal shopping'],
        icon: 'fas fa-gem'
      },
      {
        title: 'Tourism & Hospitality',
        description: 'Travel confirmations and local experiences for France\'s massive tourism industry',
        examples: ['Hotel confirmations', 'Tour updates', 'Restaurant reservations', 'Event tickets', 'Local recommendations'],
        icon: 'fas fa-camera'
      },
      {
        title: 'Retail & Commerce',
        description: 'Shopping updates and customer service for France\'s diverse retail landscape',
        examples: ['Order confirmations', 'Pickup notifications', 'Sale alerts', 'Loyalty rewards', 'Customer feedback'],
        icon: 'fas fa-shopping-bag'
      },
      {
        title: 'Public Services',
        description: 'Government communications and civic notifications integrated with French digital services',
        examples: ['Tax notifications', 'Voting reminders', 'Public service updates', 'Emergency alerts', 'Document renewals'],
        icon: 'fas fa-landmark'
      }
    ],
    regulations: [
      {
        title: 'RGPD (French GDPR)',
        description: 'Strict compliance with French data protection regulations. Clear consent in French language required for all marketing communications.',
        icon: 'fas fa-shield-alt'
      },
      {
        title: 'Code de la Consommation',
        description: 'Follow French consumer protection laws requiring clear pricing, terms, and opt-out procedures for commercial SMS.',
        icon: 'fas fa-gavel'
      },
      {
        title: 'Restrictions Horaires',
        description: 'Commercial SMS restricted between 8 PM and 8 AM on weekdays, and Sundays/holidays unless specifically authorized.',
        icon: 'fas fa-clock'
      }
    ],
    stats: {
      deliveryRate: '99.6%',
      responseTime: '<170ms',
      uptime: '99.93%'
    },
    seo: {
      title: 'Envoyer des SMS en France - Messagerie en masse & API | SMSPM',
      description: 'Envoyez des SMS en France avec un taux de livraison de 99.6%. Connectez-vous à 69.9M d\'utilisateurs via Orange, SFR et Bouygues. Prix compétitifs dès €0.041.',
      keywords: [
        'SMS France',
        'SMS en masse France',
        'API SMS France',
        'envoyer messages France',
        'service SMS France',
        'marketing SMS France',
        'Orange SMS',
        'SFR SMS',
        'Bouygues SMS',
        'marketing mobile France',
        'passerelle SMS France',
        'service SMS français'
      ]
    }
  },

  es: {
    code: 'es',
    name: 'Spain',
    flag: '🇪🇸',
    population: '47.4M',
    mobileUsers: '53.6M',
    mobilePenetration: '113.1%',
    networkCoverage: '99.3%',
    timezone: 'Europe/Madrid (GMT+1/+2)',
    currency: 'EUR',
    callingCode: '+34',
    marketDescription: 'Spain features a dynamic mobile market with high penetration rates and strong smartphone adoption. Spanish businesses leverage SMS for customer engagement across tourism, retail, and financial services, with particular strength in hospitality and leisure communications.',
    useCases: [
      {
        title: 'Tourism & Travel',
        description: 'Booking confirmations and travel updates for Spain\'s world-class tourism industry',
        examples: ['Flight confirmations', 'Hotel bookings', 'Tour schedules', 'Event tickets', 'Weather alerts'],
        icon: 'fas fa-suitcase'
      },
      {
        title: 'Banking & Finance',
        description: 'Secure communications for Spain\'s modern banking sector including mobile payments and fintech',
        examples: ['Bank alerts', 'Payment confirmations', 'Security notifications', 'Account updates', 'Investment news'],
        icon: 'fas fa-credit-card'
      },
      {
        title: 'Retail & E-commerce',
        description: 'Customer engagement for Spain\'s growing online retail and traditional commerce sectors',
        examples: ['Order updates', 'Delivery notifications', 'Sales events', 'Loyalty programs', 'Customer service'],
        icon: 'fas fa-store-alt'
      },
      {
        title: 'Healthcare & Wellness',
        description: 'Patient communications integrated with Spain\'s public and private healthcare systems',
        examples: ['Medical appointments', 'Prescription reminders', 'Test results', 'Health tips', 'Emergency notifications'],
        icon: 'fas fa-notes-medical'
      }
    ],
    regulations: [
      {
        title: 'RGPD Español',
        description: 'Comply with Spanish implementation of GDPR including specific requirements for consent management and data processing transparency.',
        icon: 'fas fa-shield-alt'
      },
      {
        title: 'Ley de Servicios de Comunicación',
        description: 'Follow Spanish telecommunications regulations requiring opt-in consent and sender identification for commercial messages.',
        icon: 'fas fa-gavel'
      },
      {
        title: 'Horarios Comerciales',
        description: 'Commercial SMS messages restricted during siesta hours (2-4 PM) and after 9 PM to respect Spanish cultural practices.',
        icon: 'fas fa-clock'
      }
    ],
    stats: {
      deliveryRate: '99.5%',
      responseTime: '<160ms',
      uptime: '99.92%'
    },
    seo: {
      title: 'Enviar SMS a España - Mensajería masiva y API | SMSPM',
      description: 'Envía SMS a España con 99.5% de entrega. Conecta con 53.6M usuarios móviles a través de Telefónica, Vodafone y Orange. Precios competitivos desde €0.037.',
      keywords: [
        'SMS España',
        'SMS masivo España',
        'API SMS España',
        'enviar mensajes España',
        'servicio SMS España',
        'marketing SMS España',
        'Telefónica SMS',
        'Vodafone SMS',
        'Orange SMS',
        'marketing móvil España',
        'gateway SMS España',
        'servicio SMS español'
      ]
    }
  }
};

// Helper function to get country config by code
export function getCountryConfig(countryCode: string): Omit<CountryData, 'providers' | 'startingPrice'> | null {
  // 1. Check primary manual configs (with SEO, regulations, etc)
  if (COUNTRY_CONFIGS[countryCode]) {
    return COUNTRY_CONFIGS[countryCode];
  }

  // 2. Check basic fallback metadata
  const fallback = COUNTRY_METADATA_FALLBACK[countryCode];
  if (fallback) {
    // Generate a basic config based on metadata
    const name = fallback.name || Object.keys(COUNTRY_NAME_TO_CODE).find(key => COUNTRY_NAME_TO_CODE[key] === countryCode) || "Unknown Country";
    return {
      code: fallback.code,
      name: name,
      flag: fallback.flag || "🌍",
      population: fallback.population || "Unknown",
      mobileUsers: fallback.mobileUsers || "Unknown",
      mobilePenetration: '95%+', // Default premium-feel fallback
      networkCoverage: '99%+',
      timezone: fallback.timezone || "UTC",
      currency: fallback.currency || "USD",
      callingCode: fallback.callingCode || "+?",
      marketDescription: `${name} has a sophisticated mobile market with ${fallback.mobileUsers || 'widespread'} mobile users and high digital adoption. SMS messaging is a crucial channel for businesses to engage with customers through order updates, security codes, and marketing campaigns.`,
      useCases: [
        {
          title: 'Business Alerts',
          description: `Deliver critical notifications and updates to customers in ${name} via reliable SMS gateways.`,
          examples: ['Order updates', 'Shipping alerts', 'Appointment reminders'],
          icon: 'fas fa-bell'
        },
        {
          title: 'Security & Verification',
          description: `Protect your users with secure One-Time Passwords (OTP) and two-factor authentication (2FA) for ${name}.`,
          examples: ['Verification codes', 'Login alerts', 'Password resets'],
          icon: 'fas fa-shield-alt'
        }
      ],
      regulations: [
        {
          title: 'Local Compliance',
          description: `Ensure your SMS campaigns follow ${name}'s telecommunications guidelines and data protection laws.`,
          icon: 'fas fa-gavel'
        }
      ],
      stats: {
        deliveryRate: '99.5%',
        responseTime: '<250ms',
        uptime: '99.9%'
      },
      seo: {
        title: `Send SMS to ${name} - API & Bulk Messaging | SMSPM`,
        description: `Reliable SMS delivery to ${name} with 99.5% success rate. Connect with local networks starting from low competitive rates.`,
        keywords: [`SMS ${name}`, `Bulk SMS ${name}`, `SMS API ${name}`]
      }
    };
  }

  return null;
}

// Get all available country codes
export function getAvailableCountries(): string[] {
  return Object.keys(COUNTRY_CONFIGS);
}
// Fallback mapping for country names to ISO codes (2-letter)
// Covers major countries to ensure flag orbs work even without full manual config
export const COUNTRY_NAME_TO_CODE: { [key: string]: string } = {
  'Afghanistan': 'af',
  'Albania': 'al',
  'Algeria': 'dz',
  'Andorra': 'ad',
  'Angola': 'ao',
  'Argentina': 'ar',
  'Armenia': 'am',
  'Australia': 'au',
  'Austria': 'at',
  'Azerbaijan': 'az',
  'Bahamas': 'bs',
  'Bahrain': 'bh',
  'Bangladesh': 'bd',
  'Barbados': 'bb',
  'Belarus': 'by',
  'Belgium': 'be',
  'Belize': 'bz',
  'Benin': 'bj',
  'Bhutan': 'bt',
  'Bolivia': 'bo',
  'Bosnia and Herzegovina': 'ba',
  'Botswana': 'bw',
  'Brazil': 'br',
  'Brunei Darussalam': 'bn',
  'Bulgaria': 'bg',
  'Burkina Faso': 'bf',
  'Burundi': 'bi',
  'Cambodia': 'kh',
  'Cameroon': 'cm',
  'Canada': 'ca',
  'Cape Verde': 'cv',
  'Central African Republic': 'cf',
  'Chad': 'td',
  'Chile': 'cl',
  'China': 'cn',
  'Colombia': 'co',
  'Comoros': 'km',
  'Congo': 'cg',
  'Costa Rica': 'cr',
  'Croatia': 'hr',
  'Cuba': 'cu',
  'Cyprus': 'cy',
  'Czech Republic': 'cz',
  'Denmark': 'dk',
  'Djibouti': 'dj',
  'Dominica': 'dm',
  'Dominican Republic': 'do',
  'Ecuador': 'ec',
  'Egypt': 'eg',
  'El Salvador': 'sv',
  'Equatorial Guinea': 'gq',
  'Eritrea': 'er',
  'Estonia': 'ee',
  'Ethiopia': 'et',
  'Fiji': 'fj',
  'Finland': 'fi',
  'France': 'fr',
  'Gabon': 'ga',
  'Gambia': 'gm',
  'Georgia': 'ge',
  'Germany': 'de',
  'Ghana': 'gh',
  'Greece': 'gr',
  'Grenada': 'gd',
  'Guatemala': 'gt',
  'Guinea': 'gn',
  'Guinea-Bissau': 'gw',
  'Guyana': 'gy',
  'Haiti': 'ht',
  'Honduras': 'hn',
  'Hungary': 'hu',
  'Iceland': 'is',
  'India': 'in',
  'Indonesia': 'id',
  'Iran': 'ir',
  'Iraq': 'iq',
  'Ireland': 'ie',
  'Israel': 'il',
  'Italy': 'it',
  'Jamaica': 'jm',
  'Japan': 'jp',
  'Jordan': 'jo',
  'Kazakhstan': 'kz',
  'Kenya': 'ke',
  'Kiribati': 'ki',
  'Korea, North': 'kp',
  'Korea, South': 'kr',
  'Kuwait': 'kw',
  'Kyrgyzstan': 'kg',
  'Laos': 'la',
  'Latvia': 'lv',
  'Lebanon': 'lb',
  'Lesotho': 'ls',
  'Liberia': 'lr',
  'Libya': 'ly',
  'Liechtenstein': 'li',
  'Lithuania': 'lt',
  'Luxembourg': 'lu',
  'Macedonia': 'mk',
  'Madagascar': 'mg',
  'Malawi': 'mw',
  'Malaysia': 'my',
  'Maldives': 'mv',
  'Mali': 'ml',
  'Malta': 'mt',
  'Marshall Islands': 'mh',
  'Mauritania': 'mr',
  'Mauritius': 'mu',
  'Mexico': 'mx',
  'Micronesia': 'fm',
  'Moldova': 'md',
  'Monaco': 'mc',
  'Mongolia': 'mn',
  'Montenegro': 'me',
  'Morocco': 'ma',
  'Mozambique': 'mz',
  'Myanmar': 'mm',
  'Namibia': 'na',
  'Nauru': 'nr',
  'Nepal': 'np',
  'Netherlands': 'nl',
  'New Zealand': 'nz',
  'Nicaragua': 'ni',
  'Niger': 'ne',
  'Nigeria': 'ng',
  'Norway': 'no',
  'Oman': 'om',
  'Pakistan': 'pk',
  'Palau': 'pw',
  'Panama': 'pa',
  'Papua New Guinea': 'pg',
  'Paraguay': 'py',
  'Peru': 'pe',
  'Philippines': 'ph',
  'Poland': 'pl',
  'Portugal': 'pt',
  'Qatar': 'qa',
  'Romania': 'ro',
  'Russian Federation': 'ru',
  'Russia': 'ru',
  'Rwanda': 'rw',
  'Saint Kitts and Nevis': 'kn',
  'Saint Lucia': 'lc',
  'Saint Vincent and the Grenadines': 'vc',
  'Samoa': 'ws',
  'San Marino': 'sm',
  'Sao Tome and Principe': 'st',
  'Saudi Arabia': 'sa',
  'Senegal': 'sn',
  'Serbia': 'rs',
  'Seychelles': 'sc',
  'Sierra Leone': 'sl',
  'Singapore': 'sg',
  'Slovakia': 'sk',
  'Slovenia': 'si',
  'Solomon Islands': 'sb',
  'Somalia': 'so',
  'South Africa': 'za',
  'South Sudan': 'ss',
  'Spain': 'es',
  'Sri Lanka': 'lk',
  'Sudan': 'sd',
  'Suriname': 'sr',
  'Swaziland': 'sz',
  'Sweden': 'se',
  'Switzerland': 'ch',
  'Syria': 'sy',
  'Taiwan': 'tw',
  'Tajikistan': 'tj',
  'Tanzania': 'tz',
  'Thailand': 'th',
  'Togo': 'tg',
  'Tonga': 'to',
  'Trinidad and Tobago': 'tt',
  'Tunisia': 'tn',
  'Turkey': 'tr',
  'Turkmenistan': 'tm',
  'Tuvalu': 'tv',
  'Uganda': 'ug',
  'Ukraine': 'ua',
  'United Arab Emirates': 'ae',
  'United Kingdom': 'gb',
  'United States': 'us',
  'Uruguay': 'uy',
  'Uzbekistan': 'uz',
  'Vanuatu': 'vu',
  'Vatican City': 'va',
  'Venezuela': 've',
  'Vietnam': 'vn',
  'Yemen': 'ye',
  'Zambia': 'zm',
  'Zimbabwe': 'zw',
  'Tanzania, United Republic of Tanzania': 'tz',
  'Moldova, Republic of': 'md',
  'Macao': 'mo',
  'Macau': 'mo',
  'Hong Kong': 'hk',
  'Taiwan, Province of China': 'tw',
  'Bolivia, Plurinational State of': 'bo',
  'Venezuela, Bolivarian Republic of': 've',
  'Vietnam, Socialist Republic of': 'vn',
  'USA': 'us',
  'UK': 'gb'
};

/**
 * Basic metadata fallback for countries not in COUNTRY_CONFIGS
 */
export const COUNTRY_METADATA_FALLBACK: { [key: string]: any } = {
  'ee': { code: 'ee', flag: '🇪🇪', currency: 'EUR', callingCode: '+372', timezone: 'Europe/Tallinn', population: '1.3M', mobileUsers: '1.9M' },
  'fi': { code: 'fi', flag: '🇫🇮', currency: 'EUR', callingCode: '+358', timezone: 'Europe/Helsinki', population: '5.5M', mobileUsers: '7.2M' },
  'al': { code: 'al', flag: '🇦🇱', currency: 'ALL', callingCode: '+355', timezone: 'Europe/Tirane', population: '2.8M', mobileUsers: '3.5M' },
  'dz': { code: 'dz', flag: '🇩🇿', currency: 'DZD', callingCode: '+213', timezone: 'Africa/Algiers', population: '44M', mobileUsers: '46M' },
  'ao': { code: 'ao', flag: '🇦🇴', currency: 'AOA', callingCode: '+244', timezone: 'Africa/Luanda', population: '33M', mobileUsers: '14M' },
  'am': { code: 'am', flag: '🇦🇲', currency: 'AMD', callingCode: '+374', timezone: 'Asia/Yerevan', population: '3M', mobileUsers: '3.8M' },
  'aw': { code: 'aw', flag: '🇦🇼', currency: 'AWG', callingCode: '+297', timezone: 'America/Aruba', population: '107K', mobileUsers: '140K' },
  'au': { code: 'au', flag: '🇦🇺', currency: 'AUD', callingCode: '+61', timezone: 'Australia/Sydney', population: '26M', mobileUsers: '30M' },
  'at': { code: 'at', flag: '🇦🇹', currency: 'EUR', callingCode: '+43', timezone: 'Europe/Vienna', population: '9M', mobileUsers: '11M' },
  'be': { code: 'be', flag: '🇧🇪', currency: 'EUR', callingCode: '+32', timezone: 'Europe/Brussels', population: '11.6M', mobileUsers: '13M' },
  'br': { code: 'br', flag: '🇧🇷', currency: 'BRL', callingCode: '+55', timezone: 'America/Sao_Paulo', population: '215M', mobileUsers: '230M' },
  'bg': { code: 'bg', flag: '🇧🇬', currency: 'BGN', callingCode: '+359', timezone: 'Europe/Sofia', population: '6.9M', mobileUsers: '8M' },
  'kh': { code: 'kh', flag: '🇰🇭', currency: 'KHR', callingCode: '+855', timezone: 'Asia/Phnom_Penh', population: '17M', mobileUsers: '20M' },
  'ca': { code: 'ca', flag: '🇨🇦', currency: 'CAD', callingCode: '+1', timezone: 'America/Toronto', population: '38M', mobileUsers: '35M' },
  'cn': { code: 'cn', flag: '🇨🇳', currency: 'CNY', callingCode: '+86', timezone: 'Asia/Shanghai', population: '1.4B', mobileUsers: '1.7B' },
  'co': { code: 'co', flag: '🇨🇴', currency: 'COP', callingCode: '+57', timezone: 'America/Bogota', population: '51M', mobileUsers: '70M' },
  'hr': { code: 'hr', flag: '🇭🇷', currency: 'EUR', callingCode: '+385', timezone: 'Europe/Zagreb', population: '4M', mobileUsers: '4.5M' },
  'cy': { code: 'cy', flag: '🇨🇾', currency: 'EUR', callingCode: '+357', timezone: 'Asia/Nicosia', population: '1.2M', mobileUsers: '1.3M' },
  'cz': { code: 'cz', flag: '🇨🇿', currency: 'CZK', callingCode: '+420', timezone: 'Europe/Prague', population: '10.5M', mobileUsers: '13M' },
  'dk': { code: 'dk', flag: '🇩🇰', currency: 'DKK', callingCode: '+45', timezone: 'Europe/Copenhagen', population: '5.9M', mobileUsers: '7.2M' },
  'fr': { code: 'fr', flag: '🇫🇷', currency: 'EUR', callingCode: '+33', timezone: 'Europe/Paris', population: '68M', mobileUsers: '70M' },
  'de': { code: 'de', flag: '🇩🇪', currency: 'EUR', callingCode: '+49', timezone: 'Europe/Berlin', population: '83M', mobileUsers: '84M' },
  'gr': { code: 'gr', flag: '🇬🇷', currency: 'EUR', callingCode: '+30', timezone: 'Europe/Athens', population: '10.7M', mobileUsers: '11M' },
  'in': { code: 'in', flag: '🇮🇳', currency: 'INR', callingCode: '+91', timezone: 'Asia/Kolkata', population: '1.4B', mobileUsers: '1.2B' },
  'id': { code: 'id', flag: '🇮🇩', currency: 'IDR', callingCode: '+62', timezone: 'Asia/Jakarta', population: '275M', mobileUsers: '370M' },
  'ie': { code: 'ie', flag: '🇮🇪', currency: 'EUR', callingCode: '+353', timezone: 'Europe/Dublin', population: '5.1M', mobileUsers: '5.7M' },
  'il': { code: 'il', flag: '🇮🇱', currency: 'ILS', callingCode: '+972', timezone: 'Asia/Jerusalem', population: '9.5M', mobileUsers: '13M' },
  'it': { code: 'it', flag: '🇮🇹', currency: 'EUR', callingCode: '+39', timezone: 'Europe/Rome', population: '59M', mobileUsers: '78M' },
  'jp': { code: 'jp', flag: '🇯🇵', currency: 'JPY', callingCode: '+81', timezone: 'Asia/Tokyo', population: '125M', mobileUsers: '190M' },
  'kr': { code: 'kr', flag: '🇰🇷', currency: 'KRW', callingCode: '+82', timezone: 'Asia/Seoul', population: '52M', mobileUsers: '70M' },
  'lv': { code: 'lv', flag: '🇱🇻', currency: 'EUR', callingCode: '+371', timezone: 'Europe/Riga', population: '1.9M', mobileUsers: '2.3M' },
  'lt': { code: 'lt', flag: '🇱🇹', currency: 'EUR', callingCode: '+370', timezone: 'Europe/Vilnius', population: '2.8M', mobileUsers: '3.8M' },
  'my': { code: 'my', flag: '🇲🇾', currency: 'MYR', callingCode: '+60', timezone: 'Asia/Kuala_Lumpur', population: '33M', mobileUsers: '44M' },
  'mx': { code: 'mx', flag: '🇲🇽', currency: 'MXN', callingCode: '+52', timezone: 'America/Mexico_City', population: '130M', mobileUsers: '127M' },
  'nl': { code: 'nl', flag: '🇳🇱', currency: 'EUR', callingCode: '+31', timezone: 'Europe/Amsterdam', population: '17.5M', mobileUsers: '21M' },
  'nz': { code: 'nz', flag: '🇳🇿', currency: 'NZD', callingCode: '+64', timezone: 'Pacific/Auckland', population: '5.1M', mobileUsers: '6.4M' },
  'no': { code: 'no', flag: '🇳🇴', currency: 'NOK', callingCode: '+47', timezone: 'Europe/Oslo', population: '5.5M', mobileUsers: '5.9M' },
  'pl': { code: 'pl', flag: '🇵🇱', currency: 'PLN', callingCode: '+48', timezone: 'Europe/Warsaw', population: '38M', mobileUsers: '50M' },
  'pt': { code: 'pt', flag: '🇵🇹', currency: 'EUR', callingCode: '+351', timezone: 'Europe/Lisbon', population: '10.3M', mobileUsers: '12M' },
  'ro': { code: 'ro', flag: '🇷🇴', currency: 'RON', callingCode: '+40', timezone: 'Europe/Bucharest', population: '19M', mobileUsers: '23M' },
  'ru': { code: 'ru', flag: '🇷🇺', currency: 'RUB', callingCode: '+7', timezone: 'Europe/Moscow', population: '144M', mobileUsers: '230M' },
  'sg': { code: 'sg', flag: '🇸🇬', currency: 'SGD', callingCode: '+65', timezone: 'Asia/Singapore', population: '5.9M', mobileUsers: '9M' },
  'es': { code: 'es', flag: '🇪🇸', currency: 'EUR', callingCode: '+34', timezone: 'Europe/Madrid', population: '47M', mobileUsers: '54M' },
  'se': { code: 'se', flag: '🇸🇪', currency: 'SEK', callingCode: '+46', timezone: 'Europe/Stockholm', population: '10.5M', mobileUsers: '13M' },
  'ch': { code: 'ch', flag: '🇨🇭', currency: 'CHF', callingCode: '+41', timezone: 'Europe/Zurich', population: '8.7M', mobileUsers: '11M' },
  'th': { code: 'th', flag: '🇹🇭', currency: 'THB', callingCode: '+66', timezone: 'Asia/Bangkok', population: '70M', mobileUsers: '130M' },
  'tr': { code: 'tr', flag: '🇹🇷', currency: 'TRY', callingCode: '+90', timezone: 'Europe/Istanbul', population: '85M', mobileUsers: '87M' },
  'ua': { code: 'ua', flag: '🇺🇦', currency: 'UAH', callingCode: '+380', timezone: 'Europe/Kiev', population: '41M', mobileUsers: '54M' },
  'ae': { code: 'ae', flag: '🇦🇪', currency: 'AED', callingCode: '+971', timezone: 'Asia/Dubai', population: '10M', mobileUsers: '19M' },
  'gb': { code: 'gb', flag: '🇬🇧', currency: 'GBP', callingCode: '+44', timezone: 'Europe/London', population: '67M', mobileUsers: '72M' },
  'us': { code: 'us', flag: '🇺🇸', currency: 'USD', callingCode: '+1', timezone: 'America/New_York', population: '333M', mobileUsers: '327M' },
  'vn': { code: 'vn', flag: '🇻🇳', currency: 'VND', callingCode: '+84', timezone: 'Asia/Ho_Chi_Minh', population: '98M', mobileUsers: '140M' },
};

/**
 * Robustly resolve a country code from its name
 */
export function getCountryCodeByName(name: string): string {
  if (!name) return "gl";

  // 1. Check exact match in manual config
  const manualCode = Object.keys(COUNTRY_CONFIGS).find(
    code => COUNTRY_CONFIGS[code].name.toLowerCase() === name.toLowerCase()
  );
  if (manualCode) return manualCode;

  // 2. Check exact match in mapping
  if (COUNTRY_NAME_TO_CODE[name]) return COUNTRY_NAME_TO_CODE[name];

  // 3. Check case-insensitive match in mapping
  const nameLower = name.toLowerCase();
  const mappingMatch = Object.keys(COUNTRY_NAME_TO_CODE).find(
    key => key.toLowerCase() === nameLower
  );
  if (mappingMatch) return COUNTRY_NAME_TO_CODE[mappingMatch];

  // 4. Check if the name contains any of the keys or vice-versa (fuzzy)
  // Only if the name is reasonably long to avoid false positives
  if (name.length > 3) {
    const fuzzyMatch = Object.keys(COUNTRY_NAME_TO_CODE).find(
      key => (key.length > 3 && (nameLower.includes(key.toLowerCase()) || key.toLowerCase().includes(nameLower)))
    );
    if (fuzzyMatch) return COUNTRY_NAME_TO_CODE[fuzzyMatch];
  }

  return "gl";
}
