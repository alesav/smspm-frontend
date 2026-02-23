#!/usr/bin/env node
/**
 * Phone Number Formatter & Validator Pages Generator
 * Generates SEO-optimized pages in all 8 languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const METADATA = {
  en: {
    title: 'Free Phone Number Formatter & Validator for SMS | SMSPM',
    description: 'Format and validate phone numbers to E.164 international standard. Instantly convert any phone number format for reliable SMS delivery worldwide.',
    h1: 'Phone Number <span class="gradient-text">Formatter</span>',
    subtitle: 'Format and validate phone numbers to E.164 standard for SMS delivery. Supports international formats from 200+ countries.',
    keywords: ['phone number formatter', 'e164 formatter', 'phone validator', 'international phone format', 'sms phone number'],
  },
  et: {
    title: 'Tasuta Telefoninumbri Vormindaja SMS jaoks | SMSPM',
    description: 'Vorminda ja valideeri telefoninumbrid E.164 rahvusvaheliseks standardiks. Teisenda kiiresti iga telefoninumbri formaat usaldusväärseks SMS saatmiseks.',
    h1: 'Telefoninumbri <span class="gradient-text">Vormindaja</span>',
    subtitle: 'Vorminda ja valideeri telefoninumbrid E.164 standardiks SMS saatmiseks. Toetab rahvusvahelisi formaate 200+ riigist.',
    keywords: ['telefoninumbri vormindaja', 'e164 vormindaja', 'telefoni validaator'],
  },
  ru: {
    title: 'Бесплатный Форматировщик Телефонных Номеров для SMS | SMSPM',
    description: 'Форматируйте и проверяйте телефонные номера по международному стандарту E.164. Мгновенно конвертируйте любой формат номера для надёжной доставки SMS.',
    h1: 'Форматировщик <span class="gradient-text">Телефонных Номеров</span>',
    subtitle: 'Форматируйте и проверяйте телефонные номера по стандарту E.164 для SMS. Поддерживает международные форматы из 200+ стран.',
    keywords: ['форматировщик номеров', 'e164 форматировщик', 'валидатор телефонов'],
  },
  es: {
    title: 'Formateador de Números Telefónicos Gratis para SMS | SMSPM',
    description: 'Formatea y valida números telefónicos al estándar internacional E.164. Convierte instantáneamente cualquier formato de número para SMS confiable.',
    h1: 'Formateador de <span class="gradient-text">Números Telefónicos</span>',
    subtitle: 'Formatea y valida números telefónicos al estándar E.164 para SMS. Compatible con formatos internacionales de 200+ países.',
    keywords: ['formateador números telefónicos', 'e164 formateador', 'validador teléfono'],
  },
  de: {
    title: 'Kostenloser Telefonnummer-Formatierer für SMS | SMSPM',
    description: 'Formatieren und validieren Sie Telefonnummern nach dem internationalen E.164-Standard. Konvertieren Sie sofort jedes Nummernformat für zuverlässige SMS-Zustellung.',
    h1: 'Telefonnummer <span class="gradient-text">Formatierer</span>',
    subtitle: 'Formatieren und validieren Sie Telefonnummern nach E.164 für SMS. Unterstützt internationale Formate aus 200+ Ländern.',
    keywords: ['telefonnummer formatierer', 'e164 formatierer', 'telefon validator'],
  },
  fr: {
    title: 'Formateur de Numéros de Téléphone Gratuit pour SMS | SMSPM',
    description: 'Formatez et validez les numéros de téléphone selon la norme internationale E.164. Convertissez instantanément tout format de numéro pour SMS fiable.',
    h1: 'Formateur de <span class="gradient-text">Numéros de Téléphone</span>',
    subtitle: 'Formatez et validez les numéros de téléphone selon la norme E.164 pour SMS. Compatible avec les formats internationaux de 200+ pays.',
    keywords: ['formateur numéros téléphone', 'e164 formateur', 'validateur téléphone'],
  },
  lv: {
    title: 'Bezmaksas Tālruņa Numura Formatētājs SMS | SMSPM',
    description: 'Formatējiet un validējiet tālruņa numurus pēc starptautiskā E.164 standarta. Uzreiz konvertējiet jebkuru numura formātu uzticamai SMS piegādei.',
    h1: 'Tālruņa Numura <span class="gradient-text">Formatētājs</span>',
    subtitle: 'Formatējiet un validējiet tālruņa numurus pēc E.164 standarta SMS piegādei. Atbalsta starptautiskos formātus no 200+ valstīm.',
    keywords: ['tālruņa numura formatētājs', 'e164 formatētājs', 'telefona validātors'],
  },
  lt: {
    title: 'Nemokamas Telefono Numerio Formatavimo Įrankis SMS | SMSPM',
    description: 'Formatuokite ir tikrinkite telefono numerius pagal tarptautinį E.164 standartą. Akimirksniu konvertuokite bet kokį numerio formatą patikimam SMS pristatymui.',
    h1: 'Telefono Numerio <span class="gradient-text">Formatavimas</span>',
    subtitle: 'Formatuokite ir tikrinkite telefono numerius pagal E.164 standartą SMS pristatymui. Palaiko tarptautinius formatus iš 200+ šalių.',
    keywords: ['telefono numerio formatavimas', 'e164 formatavimas', 'telefono tikrintojas'],
  },
};

function generatePage(lang) {
  const meta = METADATA[lang];
  const urlPath = `/${lang}/tools/phone-formatter`;

  const hreflangLinks = LANGUAGES.map(l =>
    `    <link rel="alternate" hreflang="${l}" href="https://smspm.com/${l}/tools/phone-formatter" />`
  ).join('\n');

  return `---
import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import PhoneFormatterComponent from '../../../components/tools/PhoneFormatter.astro';
import Footer from '../../../components/Footer.astro';

const lang = '${lang}';
const title = '${meta.title}';
const description = '${meta.description}';
const keywords = ${JSON.stringify(meta.keywords)};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Phone Number Formatter",
  "description": description,
  "url": "https://smspm.com${urlPath}",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "provider": {
    "@type": "Organization",
    "name": "SMSPM",
    "url": "https://smspm.com"
  }
};
---

<Layout title={title} description={description}>
  <head>
    <meta name="keywords" content={keywords.join(', ')} />
    <link rel="canonical" href="https://smspm.com${urlPath}" />
    <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />

${hreflangLinks}
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools/phone-formatter" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://smspm.com${urlPath}" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </head>

  <Navigation />

  <main class="tool-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">
          ${meta.h1}
        </h1>
        <p class="hero-description">
          ${meta.subtitle}
        </p>
      </div>
    </section>

    <section class="tool-section">
      <div class="container">
        <PhoneFormatterComponent lang={lang} />
      </div>
    </section>
  </main>

  <Footer />
</Layout>

<style>
  .tool-page { min-height: 100vh; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .hero-section { padding: 6rem 0 4rem; text-align: center; }
  .hero-title { font-size: 3rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; color: #1a1a1a; }
  .gradient-text { background: linear-gradient(135deg, #26c6da 0%, #1e88e5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-description { font-size: 1.25rem; color: #666; max-width: 800px; margin: 0 auto; line-height: 1.6; }
  .tool-section { padding: 2rem 0 4rem; }
  @media (max-width: 768px) {
    .hero-title { font-size: 2rem; }
    .hero-description { font-size: 1rem; }
  }
</style>`;
}

async function generateAllPages() {
  console.log('🚀 Generating Phone Formatter pages...\n');

  const baseDir = join(__dirname, '../src/pages');

  for (const lang of LANGUAGES) {
    const langDir = join(baseDir, lang, 'tools');

    if (!existsSync(langDir)) {
      mkdirSync(langDir, { recursive: true });
    }

    const filePath = join(langDir, 'phone-formatter.astro');
    writeFileSync(filePath, generatePage(lang));
    console.log(`✅ Generated: /${lang}/tools/phone-formatter`);
  }

  console.log('\n✨ All pages generated successfully!');
  console.log(`\n📊 Total pages: ${LANGUAGES.length}`);
  console.log('🔗 URLs:');
  LANGUAGES.forEach(lang => {
    console.log(`   https://smspm.com/${lang}/tools/phone-formatter`);
  });
}

generateAllPages().catch(console.error);
