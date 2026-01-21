#!/usr/bin/env node
/**
 * Smart Country Pages Generator with Manual Override Protection
 * Supports Multi-language Generation
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  pricelistPath: join(__dirname, '../pricelist.json'),
  extractedCountriesPath: join(__dirname, '../data/extracted-countries.json'),
  metadataPath: join(__dirname, '../data/country-metadata.js'),
  baseOutputDir: join(__dirname, '../src/pages'),
  trackingFile: join(__dirname, '../data/generated-pages-tracking.json'),
  languages: ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'],
};

const TRANSLATIONS = {
  en: {
    heroBadge: 'Global Coverage',
    heroTitle: 'Send SMS to ',
    heroSubtitle: 'Reach customers instantly with 99.9% delivery rate.',
    ctaTitle: 'Ready to Send SMS to ',
    ctaSubtitle: 'Join thousands of businesses using SMSPM for reliable message delivery',
    ctaButton: 'Start Free Trial',
    ctaDemo: 'Request Demo',
    ctaNote: 'No credit card required · 50 free messages · Full API access',
    viewApi: 'View API Docs',
    perMessage: 'per message',
    pricingFrom: 'Pricing from',
    breadcrumbHome: 'Home',
  },
  et: {
    heroBadge: 'Globaalne haare',
    heroTitle: 'Saada SMS ',
    heroSubtitle: 'Jõua klientideni koheselt 99,9% kättetoimetamise määraga.',
    ctaTitle: 'Kas oled valmis saatma SMS-e sihtkohta ',
    ctaSubtitle: 'Liitu tuhandete ettevõtetega, kes kasutavad SMSPM-i usaldusväärseks sõnumivahetuseks',
    ctaButton: 'Alusta tasuta prooviperioodi',
    ctaDemo: 'Küsi demot',
    ctaNote: 'Krediitkaarti pole vaja · 50 tasuta sõnumit · Täielik API juurdepääs',
    viewApi: 'Vaata API dokumentatsiooni',
    perMessage: 'sõnumi kohta',
    pricingFrom: 'Hind alates',
    breadcrumbHome: 'Avaleht',
  },
  ru: {
    heroBadge: 'Глобальный охват',
    heroTitle: 'Отправить SMS в ',
    heroSubtitle: 'Мгновенно связывайтесь с клиентами с вероятностью доставки 99,9%.',
    ctaTitle: 'Готовы отправить SMS в ',
    ctaSubtitle: 'Присоединяйтесь к тысячам компаний, использующих SMSPM для надежной доставки сообщений',
    ctaButton: 'Начать бесплатный период',
    ctaDemo: 'Запросить демо',
    ctaNote: 'Без кредитной карты · 50 бесплатных сообщений · Полный доступ к API',
    viewApi: 'Просмотреть документацию API',
    perMessage: 'за сообщение',
    pricingFrom: 'Цена от',
    breadcrumbHome: 'Главная',
  },
  es: {
    heroBadge: 'Cobertura Global',
    heroTitle: 'Enviar SMS a ',
    heroSubtitle: 'Llegue a los clientes al instante con una tasa de entrega del 99,9%.',
    ctaTitle: '¿Listo para enviar SMS a ',
    ctaSubtitle: 'Únase a miles de empresas que utilizan SMSPM para una entrega de mensajes confiable',
    ctaButton: 'Iniciar prueba gratuita',
    ctaDemo: 'Solicitar Demo',
    ctaNote: 'Sin tarjeta de crédito · 50 mensajes gratuitos · Acceso completo a la API',
    viewApi: 'Ver documentos de la API',
    perMessage: 'por mensaje',
    pricingFrom: 'Precios desde',
    breadcrumbHome: 'Inicio',
  },
  de: {
    heroBadge: 'Globale Abdeckung',
    heroTitle: 'SMS senden nach ',
    heroSubtitle: 'Erreichen Sie Kunden sofort mit einer Zustellrate von 99,9%.',
    ctaTitle: 'Bereit, SMS zu senden an ',
    ctaSubtitle: 'Schließen Sie sich Tausenden von Unternehmen an, die SMSPM für eine zuverlässige Nachrichtenübermittlung nutzen',
    ctaButton: 'Kostenlose Testversion starten',
    ctaDemo: 'Demo anfordern',
    ctaNote: 'Keine Kreditkarte erforderlich · 50 kostenlose Nachrichten · Voller API-Zugriff',
    viewApi: 'API-Dokumentation ansehen',
    perMessage: 'pro Nachricht',
    pricingFrom: 'Preise ab',
    breadcrumbHome: 'Home',
  },
  fr: {
    heroBadge: 'Couverture Mondiale',
    heroTitle: 'Envoyer un SMS à ',
    heroSubtitle: 'Touchez vos clients instantanément avec un taux de délivrabilité de 99,9%.',
    ctaTitle: 'Prêt à envoyer des SMS vers ',
    ctaSubtitle: 'Rejoignez des milliers d\'entreprises qui utilisent SMSPM pour une livraison de messages fiable',
    ctaButton: 'Commencer l\'essai gratuit',
    ctaDemo: 'Demander une démo',
    ctaNote: 'Aucune carte de crédit requise · 50 messages gratuits · Accès complet à l\'API',
    viewApi: 'Voir la documentation API',
    perMessage: 'par message',
    pricingFrom: 'Tarifs à partir de',
    breadcrumbHome: 'Accueil',
  },
  lv: {
    heroBadge: 'Globāls pārklājums',
    heroTitle: 'Sūtīt SMS uz ',
    heroSubtitle: 'Sasniedziet klientus nekavējoties ar 99,9% piegādes līmeni.',
    ctaTitle: 'Gatavs sūtīt SMS uz ',
    ctaSubtitle: 'Pievienojieties tūkstošiem uzņēmumu, kas izmanto SMSPM drošai ziņojumu piegādei',
    ctaButton: 'Sākt bezmaksas izmēģinājumu',
    ctaDemo: 'Pieprasīt demo',
    ctaNote: 'Nav nepieciešama kredītkarte · 50 bezmaksas ziņapmaiņas · Pilna piekļuve API',
    viewApi: 'Skatīt API dokumentāciju',
    perMessage: 'par ziņu',
    pricingFrom: 'Cena no',
    breadcrumbHome: 'Sākums',
  },
  lt: {
    heroBadge: 'Visuotinis padengimas',
    heroTitle: 'Siųsti SMS į ',
    heroSubtitle: 'Pasiekite klientus akimirksniu su 99,9% pristatymo lygiu.',
    ctaTitle: 'Esate pasiruošę siųsti SMS į ',
    ctaSubtitle: 'Prisijunkite prie tūkstančių įmonių, naudojančių SMSPM patikimam pranešimų pristatymui',
    ctaButton: 'Pradėti nemokamą bandomąjį laikotarpį',
    ctaDemo: 'Prašyti demo versijos',
    ctaNote: 'Nereikia kredito kortelės · 50 nemokamų pranešimų · Pilna prieiga prie API',
    viewApi: 'Peržiūrėti API dokumentaciją',
    perMessage: 'už pranešimą',
    pricingFrom: 'Kaina nuo',
    breadcrumbHome: 'Pradžia',
  }
};

// Pages that should NEVER be regenerated
const PROTECTED_PAGES = [
  'en/country/send-sms-estonia.astro',
  'en/country/send-sms-united-kingdom.astro',
  'en/country/send-sms-germany.astro',
  'en/country/send-sms-france.astro',
  'en/country/send-sms-spain.astro',
];

/**
 * Load or initialize page tracking
 */
function loadTracking() {
  if (existsSync(CONFIG.trackingFile)) {
    return JSON.parse(readFileSync(CONFIG.trackingFile, 'utf-8'));
  }
  return {
    version: '1.1.0',
    templateHash: '',
    lastGenerated: null,
    pages: {},
  };
}

/**
 * Save tracking data
 */
function saveTracking(tracking) {
  const dir = dirname(CONFIG.trackingFile);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(CONFIG.trackingFile, JSON.stringify(tracking, null, 2));
}

/**
 * Calculate hash of template to detect changes
 */
function getTemplateHash() {
  const templateContent = generatePageTemplate('en', 'Test Country', [], {
    code: 'xx',
    flag: '🏴',
    currency: 'EUR',
    callingCode: '+999',
    timezone: 'UTC',
    population: '1M',
    mobileUsers: '1M',
    slug: 'test',
  });
  return createHash('md5').update(templateContent).digest('hex');
}

/**
 * Generate page template
 */
function generatePageTemplate(lang, countryName, providers, metadata) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const startingPrice = providers.length > 0
    ? Math.min(...providers.map(p => p.price)).toFixed(3)
    : '0.000';

  const localizedCountryName = metadata[`name_${lang}`] || countryName;
  const escapedCountryName = localizedCountryName.replace(/'/g, "\\'");

  const providersList = providers.map(p => {
    const escapedProviderName = p.name.replace(/'/g, "\\'");
    return `    { name: '${escapedProviderName}', price: ${p.price} },`;
  }).join('\n');

  // Slug logic for canonicals
  const slugLocalized = metadata[`slug_${lang}`] || metadata.slug;
  const urlPrefix = lang === 'et' ? 'saada-sms-' : 'send-sms-';

  const alternateLinks = [
    { lang: 'en', slug: metadata.slug, prefix: 'send-sms-' },
    { lang: 'et', slug: metadata.slug_et || metadata.slug, prefix: 'saada-sms-' },
    { lang: 'ru', slug: metadata.slug_ru || metadata.slug, prefix: 'send-sms-' },
    { lang: 'es', slug: metadata.slug_es || metadata.slug, prefix: 'send-sms-' },
    { lang: 'de', slug: metadata.slug_de || metadata.slug, prefix: 'send-sms-' },
    { lang: 'fr', slug: metadata.slug_fr || metadata.slug, prefix: 'send-sms-' },
    { lang: 'lv', slug: metadata.slug_lv || metadata.slug, prefix: 'send-sms-' },
    { lang: 'lt', slug: metadata.slug_lt || metadata.slug, prefix: 'send-sms-' },
  ].map(alt => `    <link rel="alternate" hreflang="${alt.lang}" href={\`https://smspm.com/${alt.lang}/country/${alt.prefix}${alt.slug}\`} />`).join('\n');

  return `---
/**
 * AUTO-GENERATED PAGE - Do not edit directly!
 * Language: ${lang}
 * Country: ${localizedCountryName}
 */

import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import CountryHero from '../../../components/country/CountryHero.astro';
import CountryInfo from '../../../components/country/CountryInfo.astro';
import MobileProviders from '../../../components/country/MobileProviders.astro';
import UseCases from '../../../components/country/UseCases.astro';
import ApiIntegration from '../../../components/country/ApiIntegration.astro';
import RegulatoryInfo from '../../../components/country/RegulatoryInfo.astro';
import Footer from '../../../components/Footer.astro';

// Language and Localization
const lang = '${lang}';

// Country metadata
const countryCode = '${metadata.code}';
const countryName = '${escapedCountryName}';
const countryFlag = '${metadata.flag}';
const currency = '${metadata.currency}';
const callingCode = '${metadata.callingCode}';
const timezone = '${metadata.timezone}';
const population = '${metadata.population}';
const mobileUsers = '${metadata.mobileUsers}';

// Provider pricing data
const providers = [
${providersList}
].sort((a, b) => a.price - b.price);

const startingPrice = ${startingPrice};

// Country configuration
const country = {
  code: countryCode,
  name: countryName,
  flag: countryFlag,
  population: population,
  mobileUsers: mobileUsers,
  mobilePenetration: 'N/A',
  networkCoverage: '99%+',
  timezone: timezone,
  currency: currency,
  callingCode: callingCode,
  startingPrice: startingPrice,
  providers: providers.map(p => ({
    name: p.name,
    price: p.price,
    marketShare: 20,
    coverage: 99.0,
    deliveryRate: 99.5,
    features: ['5G Network', 'Unicode Support', 'Delivery Receipts', 'Priority Routing'],
    description: \`Reliable mobile operator providing SMS services in \${countryName}.\`,
    logo: '',
  })),
  marketDescription: \`\${countryName} has a modern mobile infrastructure. SMS remains an effective communication channel for businesses.\`,
  useCases: [
    {
      title: 'E-commerce & Retail',
      description: \`Order confirmations and promotional campaigns for \${countryName}'s retail market\`,
      examples: ['Order confirmations', 'Shipping notifications', 'Flash sale alerts'],
      icon: 'fas fa-shopping-cart'
    },
    {
      title: 'Banking & FinTech',
      description: \`OTP verification and transaction alerts for \${countryName}'s financial sector\`,
      examples: ['OTP verification', 'Transaction alerts', 'Security notifications'],
      icon: 'fas fa-university'
    },
    {
      title: 'Healthcare',
      description: \`Appointment reminders in \${countryName}'s healthcare system\`,
      examples: ['Appointment reminders', 'Test results', 'Health tips'],
      icon: 'fas fa-heartbeat'
    },
    {
      title: 'Business Services',
      description: \`Customer engagement and notifications for businesses in \${countryName}\`,
      examples: ['Meeting reminders', 'Verification codes', 'Status updates'],
      icon: 'fas fa-briefcase'
    }
  ],
  regulations: [
    {
      title: 'Data Protection',
      description: \`Comply with local data protection regulations when sending SMS to \${countryName}.\`,
      icon: 'fas fa-shield-alt'
    },
    {
      title: 'Opt-out Requirements',
      description: \`Respect user preferences and maintain opt-out lists.\`,
      icon: 'fas fa-user-check'
    },
    {
      title: 'Content Guidelines',
      description: \`Follow local content regulations and cultural norms.\`,
      icon: 'fas fa-gavel'
    }
  ],
  stats: {
    deliveryRate: '99.5%',
    responseTime: '<200ms',
    uptime: '99.9%'
  },
  seo: {
    title: \`${t.heroTitle}${countryName} - Bulk Messaging & API | SMSPM\`,
    description: \`${t.heroTitle}${countryName} with 99.5% delivery rate. Pricing from €\${startingPrice} ${t.perMessage}.\`,
    keywords: [\`SMS \${countryName}\`, \`bulk SMS \${countryName}\`, \`SMS API \${countryName}\`]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": \`SMS Service to \${country.name}\`,
  "description": country.seo.description,
  "provider": { "@type": "Organization", "name": "SMSPM", "url": "https://smspm.com" },
  "areaServed": { "@type": "Country", "name": country.name },
  "offers": country.providers.slice(0, 5).map(provider => ({
    "@type": "Offer",
    "name": \`SMS via \${provider.name}\`,
    "price": provider.price,
    "priceCurrency": country.currency
  }))
};
---

<Layout title={country.seo.title} description={country.seo.description}>
  <head>
    <meta name="keywords" content={country.seo.keywords.join(', ')} />
    <link rel="canonical" href={\`https://smspm.com/${lang}/country/${urlPrefix}${slugLocalized}\`} />
    <script type="application/ld+json" is:inline set:html={JSON.stringify(structuredData)} />
${alternateLinks}
    <link rel="alternate" hreflang="x-default" href={\`https://smspm.com/en/country/send-sms-${metadata.slug}\`} />
  </head>

  <Navigation />
  
  <main>
    <CountryHero country={country} />
    <CountryInfo country={country} />
    <MobileProviders country={country} />
    <UseCases country={country} />
    <ApiIntegration country={country} />
    <RegulatoryInfo country={country} />
    
    <section class="cta-section relative py-16 lg:py-24 overflow-hidden">
      <div class="cta-gradient-bg absolute top-0 left-0 right-0 bottom-0 -z-10"></div>
      <div class="container mx-auto px-8 text-center max-w-[800px]">
        <h2 class="cta-title text-4xl lg:text-6xl font-extrabold text-white mb-4">
          ${t.ctaTitle}{country.name}?
        </h2>
        <p class="cta-subtitle text-xl text-white/90 mb-8">
          ${t.ctaSubtitle}
        </p>
        <div class="cta-actions flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a href="https://app.smspm.com/app/register" class="btn btn-primary btn-large">
            ${t.ctaButton}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 3L15 10L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/demo" class="btn btn-secondary btn-large light text-white border-white/30 hover:bg-white/10">
            ${t.ctaDemo}
          </a>
        </div>
        <p class="cta-note text-sm text-white/70">
          ${t.ctaNote}
        </p>
      </div>
    </section>
  </main>
  <Footer />
</Layout>

<style>
  .cta-gradient-bg {
    background: linear-gradient(135deg, #26c6da 0%, #7c4dff 50%, #0d47a1 100%);
  }
</style>`;
}

/**
 * Generate all country pages
 */
async function generatePages(options = {}) {
  const { force = false, dryRun = false } = options;
  console.log('🚀 Starting multi-language smart country page generation...\n');

  const extractedData = JSON.parse(readFileSync(CONFIG.extractedCountriesPath, 'utf-8'));
  const { countries } = extractedData;
  const tracking = loadTracking();
  const templateHash = getTemplateHash();
  const templateChanged = tracking.templateHash !== templateHash;

  const { getCountryMetadata } = await import('file://' + CONFIG.metadataPath);

  for (const lang of CONFIG.languages) {
    console.log(`\n🌐 Processing language: ${lang.toUpperCase()}`);
    const langOutputDir = join(CONFIG.baseOutputDir, lang, 'country');

    if (!existsSync(langOutputDir)) {
      mkdirSync(langOutputDir, { recursive: true });
    }

    for (const countryData of countries) {
      const { name, providers } = countryData;
      const metadata = getCountryMetadata(name);

      let filename;
      const slugLocalized = metadata[`slug_${lang}`] || metadata.slug;
      if (lang === 'et') {
        filename = `saada-sms-${slugLocalized}.astro`;
      } else {
        filename = `send-sms-${slugLocalized}.astro`;
      }

      const relativePath = `${lang}/country/${filename}`;
      const filepath = join(langOutputDir, filename);

      if (PROTECTED_PAGES.includes(relativePath)) {
        console.log(`🔒 PROTECTED: ${relativePath}`);
        continue;
      }

      const fileExists = existsSync(filepath);
      const pageTracking = tracking.pages[relativePath] || {};
      const isManual = fileExists && pageTracking.type === 'manual';

      if (isManual) {
        console.log(`✏️  MANUAL: ${relativePath}`);
        continue;
      }

      const shouldGenerate = force || !fileExists || (templateChanged && pageTracking.type === 'template');

      if (shouldGenerate) {
        const content = generatePageTemplate(lang, name, providers, metadata);
        if (!dryRun) {
          writeFileSync(filepath, content);
          console.log(`✅ GENERATED: ${relativePath}`);
          tracking.pages[relativePath] = {
            type: 'template',
            contentHash: createHash('md5').update(content).digest('hex'),
            generatedAt: new Date().toISOString(),
          };
        } else {
          console.log(`🔍 DRY-RUN: ${relativePath}`);
        }
      }
    }
  }

  if (!dryRun) {
    tracking.templateHash = templateHash;
    tracking.lastGenerated = new Date().toISOString();
    saveTracking(tracking);
  }
  console.log('\n✨ Generation Complete!\n');
}

const args = process.argv.slice(2);
const options = { force: args.includes('--force'), dryRun: args.includes('--dry-run') };

generatePages(options).catch(console.error);
