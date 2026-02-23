#!/usr/bin/env node
/**
 * Tool Pages Generator
 * Generates SEO-optimized tool pages in all 8 languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const TOOL_METADATA = {
  'sms-character-counter': {
    en: {
      title: 'Free SMS Character Counter & Cost Calculator | SMSPM',
      description: 'Calculate SMS length, message segments, and cost instantly. Free tool supporting GSM-7 and Unicode encoding. Check if your message fits in one SMS or multiple parts.',
      h1: 'SMS Character Counter & <span class="gradient-text">Cost Calculator</span>',
      subtitle: 'Calculate your SMS message length, number of parts, and estimated cost in real-time. Supports both GSM-7 and Unicode encoding with automatic detection.',
      keywords: ['sms character counter', 'sms length calculator', 'gsm unicode checker', 'sms cost calculator', 'message segment calculator', 'sms parts calculator', 'text message counter'],
    },
    et: {
      title: 'Tasuta SMS Tähemärkide Loendur ja Hinnakalkulaator | SMSPM',
      description: 'Arvuta SMS-i pikkus, sõnumi segmendid ja maksumus koheselt. Tasuta tööriist, mis toetab GSM-7 ja Unicode kodeeringut. Kontrolli, kas sõnum mahub ühte SMS-i või mitmeks osaks.',
      h1: 'SMS Tähemärkide Loendur ja <span class="gradient-text">Hinnakalkulaator</span>',
      subtitle: 'Arvuta oma SMS-sõnumi pikkus, osade arv ja hinnanguline maksumus reaalajas. Toetab nii GSM-7 kui ka Unicode kodeeringut automaatse tuvastamisega.',
      keywords: ['sms tähemärkide loendur', 'sms pikkuse kalkulaator', 'gsm unicode kontrollija', 'sms hinnakalkulaator', 'sõnumi segmendi kalkulaator'],
    },
    ru: {
      title: 'Бесплатный Счетчик Символов SMS и Калькулятор Стоимости | SMSPM',
      description: 'Рассчитайте длину SMS, сегменты сообщения и стоимость мгновенно. Бесплатный инструмент с поддержкой GSM-7 и Unicode. Проверьте, поместится ли ваше сообщение в одно SMS или несколько частей.',
      h1: 'Счетчик Символов SMS и <span class="gradient-text">Калькулятор Стоимости</span>',
      subtitle: 'Рассчитайте длину вашего SMS-сообщения, количество частей и примерную стоимость в реальном времени. Поддерживает кодировку GSM-7 и Unicode с автоматическим определением.',
      keywords: ['счетчик символов sms', 'калькулятор длины sms', 'проверка gsm unicode', 'калькулятор стоимости sms', 'калькулятор сегментов сообщений'],
    },
    es: {
      title: 'Contador de Caracteres SMS y Calculadora de Costos Gratis | SMSPM',
      description: 'Calcula la longitud de SMS, segmentos de mensaje y costo al instante. Herramienta gratuita compatible con codificación GSM-7 y Unicode. Verifica si tu mensaje cabe en un SMS o varias partes.',
      h1: 'Contador de Caracteres SMS y <span class="gradient-text">Calculadora de Costos</span>',
      subtitle: 'Calcula la longitud de tu mensaje SMS, número de partes y costo estimado en tiempo real. Compatible con codificación GSM-7 y Unicode con detección automática.',
      keywords: ['contador caracteres sms', 'calculadora longitud sms', 'verificador gsm unicode', 'calculadora costo sms', 'calculadora segmentos mensaje'],
    },
    de: {
      title: 'Kostenloser SMS Zeichenzähler & Kostenrechner | SMSPM',
      description: 'Berechnen Sie SMS-Länge, Nachrichtensegmente und Kosten sofort. Kostenloses Tool mit Unterstützung für GSM-7 und Unicode-Codierung. Prüfen Sie, ob Ihre Nachricht in eine SMS oder mehrere Teile passt.',
      h1: 'SMS Zeichenzähler & <span class="gradient-text">Kostenrechner</span>',
      subtitle: 'Berechnen Sie die Länge Ihrer SMS-Nachricht, Anzahl der Teile und geschätzte Kosten in Echtzeit. Unterstützt GSM-7 und Unicode-Codierung mit automatischer Erkennung.',
      keywords: ['sms zeichenzähler', 'sms längenrechner', 'gsm unicode prüfer', 'sms kostenrechner', 'nachrichtensegment rechner'],
    },
    fr: {
      title: 'Compteur de Caractères SMS et Calculateur de Coûts Gratuit | SMSPM',
      description: 'Calculez la longueur SMS, les segments de message et le coût instantanément. Outil gratuit prenant en charge l\'encodage GSM-7 et Unicode. Vérifiez si votre message tient dans un SMS ou plusieurs parties.',
      h1: 'Compteur de Caractères SMS et <span class="gradient-text">Calculateur de Coûts</span>',
      subtitle: 'Calculez la longueur de votre message SMS, le nombre de parties et le coût estimé en temps réel. Prend en charge l\'encodage GSM-7 et Unicode avec détection automatique.',
      keywords: ['compteur caractères sms', 'calculateur longueur sms', 'vérificateur gsm unicode', 'calculateur coût sms', 'calculateur segments message'],
    },
    lv: {
      title: 'Bezmaksas SMS Rakstzīmju Skaitītājs un Izmaksu Kalkulators | SMSPM',
      description: 'Aprēķiniet SMS garumu, ziņojuma segmentus un izmaksas uzreiz. Bezmaksas rīks ar GSM-7 un Unicode kodējuma atbalstu. Pārbaudiet, vai ziņojums ietilpst vienā SMS vai vairākās daļās.',
      h1: 'SMS Rakstzīmju Skaitītājs un <span class="gradient-text">Izmaksu Kalkulators</span>',
      subtitle: 'Aprēķiniet SMS ziņojuma garumu, daļu skaitu un aptuvenas izmaksas reāllaikā. Atbalsta GSM-7 un Unicode kodējumu ar automātisku noteikšanu.',
      keywords: ['sms rakstzīmju skaitītājs', 'sms garuma kalkulators', 'gsm unicode pārbaudītājs', 'sms izmaksu kalkulators'],
    },
    lt: {
      title: 'Nemokamas SMS Simbolių Skaitiklis ir Kainų Kalkuliatorius | SMSPM',
      description: 'Apskaičiuokite SMS ilgį, pranešimo segmentus ir kainą akimirksniu. Nemokamas įrankis su GSM-7 ir Unicode kodavimo palaikymu. Patikrinkite, ar pranešimas telpa į vieną SMS ar kelias dalis.',
      h1: 'SMS Simbolių Skaitiklis ir <span class="gradient-text">Kainų Kalkuliatorius</span>',
      subtitle: 'Apskaičiuokite SMS pranešimo ilgį, dalių skaičių ir apytikslę kainą realiuoju laiku. Palaiko GSM-7 ir Unicode kodavimą su automatiniu aptikimu.',
      keywords: ['sms simbolių skaitiklis', 'sms ilgio kalkuliatorius', 'gsm unicode tikrintuvas', 'sms kainų kalkuliatorius'],
    },
  },
};

function generateToolPage(tool, lang) {
  const meta = TOOL_METADATA[tool][lang];
  const urlPath = `/${lang}/tools/${tool}`;
  
  // Generate hreflang links
  const hreflangLinks = LANGUAGES.map(l => 
    `    <link rel="alternate" hreflang="${l}" href="https://smspm.com/${l}/tools/${tool}" />`
  ).join('\n');
  
  return `---
/**
 * ${tool} Tool Page
 * SEO-optimized lead magnet page
 * Language: ${lang}
 */

import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import SMSCharacterCounterComponent from '../../../components/tools/SMSCharacterCounter.astro';
import Footer from '../../../components/Footer.astro';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load pricelist for average price calculation
let averagePrice = 0.045;
try {
  const pricelistPath = join(process.cwd(), 'pricelist.json');
  const pricelist = JSON.parse(readFileSync(pricelistPath, 'utf-8'));
  
  let totalPrice = 0;
  let count = 0;
  for (const country of pricelist.countries) {
    if (country.providers && country.providers.length > 0) {
      for (const provider of country.providers) {
        totalPrice += provider.price;
        count++;
      }
    }
  }
  averagePrice = count > 0 ? totalPrice / count : 0.045;
} catch (e) {
  console.warn('Could not load pricelist, using default price');
}

const lang = '${lang}';
const title = '${meta.title}';
const description = "${meta.description}";
const keywords = ${JSON.stringify(meta.keywords)};

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SMS Character Counter",
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
  },
  "featureList": [
    "GSM-7 and Unicode detection",
    "Character count with extended characters",
    "Message segmentation calculation",
    "Cost estimation",
    "Real-time analysis"
  ]
};
---

<Layout title={title} description={description}>
  <head>
    <meta name="keywords" content={keywords.join(', ')} />
    <link rel="canonical" href="https://smspm.com${urlPath}" />
    <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
    
    <!-- Hreflang tags for all languages -->
${hreflangLinks}
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools/${tool}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://smspm.com${urlPath}" />
    <meta property="og:type" content="website" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </head>

  <Navigation />
  
  <main class="tool-page">
    <!-- Hero Section -->
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

    <!-- Calculator Section -->
    <section class="calculator-section">
      <div class="container">
        <SMSCharacterCounterComponent lang={lang} averagePrice={averagePrice} currency="EUR" />
      </div>
    </section>
  </main>

  <Footer />
</Layout>

<style>
  .tool-page {
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero-section {
    padding: 6rem 0 4rem;
    text-align: center;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .gradient-text {
    background: linear-gradient(135deg, #26c6da 0%, #7c4dff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.25rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .calculator-section {
    padding: 2rem 0 4rem;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }

    .hero-description {
      font-size: 1rem;
    }
  }
</style>`;
}

async function generateAllPages() {
  console.log('🚀 Generating tool pages for all languages...\n');
  
  const baseDir = join(__dirname, '../src/pages');
  const tool = 'sms-character-counter';
  
  for (const lang of LANGUAGES) {
    const langDir = join(baseDir, lang, 'tools');
    
    // Create directory if it doesn't exist
    if (!existsSync(langDir)) {
      mkdirSync(langDir, { recursive: true });
    }
    
    const filePath = join(langDir, `${tool}.astro`);
    const content = generateToolPage(tool, lang);
    
    writeFileSync(filePath, content);
    console.log(`✅ Generated: /${lang}/tools/${tool}`);
  }
  
  console.log('\n✨ All tool pages generated successfully!');
  console.log(`\n📊 Total pages: ${LANGUAGES.length}`);
  console.log('🔗 URLs:');
  LANGUAGES.forEach(lang => {
    console.log(`   https://smspm.com/${lang}/tools/${tool}`);
  });
}

generateAllPages().catch(console.error);
