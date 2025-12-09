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
  return COUNTRY_CONFIGS[countryCode] || null;
}

// Get all available country codes
export function getAvailableCountries(): string[] {
  return Object.keys(COUNTRY_CONFIGS);
}