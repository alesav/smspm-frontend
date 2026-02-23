#!/usr/bin/env node
/**
 * SMS Text Optimizer Pages Generator
 * Generates SEO-optimized optimizer pages in all 8 languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const METADATA = {
  en: {
    title: 'Free SMS Text Optimizer - Convert Unicode to GSM-7 | SMSPM',
    description: 'Optimize your SMS text to reduce costs. Convert Unicode characters to GSM-7 equivalents automatically. Save money by reducing message segments.',
    h1: 'SMS Text <span class="gradient-text">Optimizer</span>',
    subtitle: 'Convert Unicode text to GSM-7 encoding and reduce SMS costs. Automatically replace smart quotes, em dashes, and special characters with GSM-compatible alternatives.',
    keywords: ['sms text optimizer', 'unicode to gsm converter', 'sms cost reducer', 'gsm text converter', 'sms character optimizer', 'reduce sms costs'],
  },
  et: {
    title: 'Tasuta SMS Teksti Optimeerija - Teisenda Unicode GSM-7-ks | SMSPM',
    description: 'Optimeeri oma SMS tekst kulude vähendamiseks. Teisenda Unicode tähemärgid automaatselt GSM-7 ekvivalentideks. Säästa raha vähendades sõnumisegmente.',
    h1: 'SMS Teksti <span class="gradient-text">Optimeerija</span>',
    subtitle: 'Teisenda Unicode tekst GSM-7 kodeeringuks ja vähenda SMS kulusid. Asenda automaatselt nutikad jutumärgid, pikad kriipsud ja erimärgid GSM-ühilduvate alternatiividega.',
    keywords: ['sms teksti optimeerija', 'unicode gsm teisendaja', 'sms kulude vähendaja', 'gsm teksti teisendaja'],
  },
  ru: {
    title: 'Бесплатный Оптимизатор SMS Текста - Конвертер Unicode в GSM-7 | SMSPM',
    description: 'Оптимизируйте ваш SMS текст для снижения затрат. Автоматически конвертируйте Unicode символы в GSM-7 эквиваленты. Экономьте, уменьшая количество сегментов сообщений.',
    h1: 'Оптимизатор SMS <span class="gradient-text">Текста</span>',
    subtitle: 'Конвертируйте Unicode текст в кодировку GSM-7 и снижайте стоимость SMS. Автоматически заменяйте умные кавычки, длинные тире и специальные символы на GSM-совместимые альтернативы.',
    keywords: ['оптимизатор sms текста', 'конвертер unicode в gsm', 'снижение стоимости sms', 'конвертер gsm текста'],
  },
  es: {
    title: 'Optimizador de Texto SMS Gratis - Convertir Unicode a GSM-7 | SMSPM',
    description: 'Optimiza tu texto SMS para reducir costos. Convierte caracteres Unicode a equivalentes GSM-7 automáticamente. Ahorra dinero reduciendo segmentos de mensajes.',
    h1: 'Optimizador de Texto <span class="gradient-text">SMS</span>',
    subtitle: 'Convierte texto Unicode a codificación GSM-7 y reduce costos de SMS. Reemplaza automáticamente comillas inteligentes, guiones largos y caracteres especiales con alternativas compatibles con GSM.',
    keywords: ['optimizador texto sms', 'convertidor unicode a gsm', 'reductor costo sms', 'convertidor texto gsm'],
  },
  de: {
    title: 'Kostenloser SMS Text Optimierer - Unicode zu GSM-7 Konverter | SMSPM',
    description: 'Optimieren Sie Ihren SMS-Text zur Kostensenkung. Konvertieren Sie Unicode-Zeichen automatisch in GSM-7-Äquivalente. Sparen Sie Geld durch Reduzierung von Nachrichtensegmenten.',
    h1: 'SMS Text <span class="gradient-text">Optimierer</span>',
    subtitle: 'Konvertieren Sie Unicode-Text in GSM-7-Codierung und reduzieren Sie SMS-Kosten. Ersetzen Sie automatisch typographische Anführungszeichen, Geviertstriche und Sonderzeichen durch GSM-kompatible Alternativen.',
    keywords: ['sms text optimierer', 'unicode zu gsm konverter', 'sms kosten reduzierer', 'gsm text konverter'],
  },
  fr: {
    title: 'Optimiseur de Texte SMS Gratuit - Convertir Unicode en GSM-7 | SMSPM',
    description: 'Optimisez votre texte SMS pour réduire les coûts. Convertissez automatiquement les caractères Unicode en équivalents GSM-7. Économisez en réduisant les segments de messages.',
    h1: 'Optimiseur de Texte <span class="gradient-text">SMS</span>',
    subtitle: 'Convertissez le texte Unicode en encodage GSM-7 et réduisez les coûts SMS. Remplacez automatiquement les guillemets typographiques, tirets cadratins et caractères spéciaux par des alternatives compatibles GSM.',
    keywords: ['optimiseur texte sms', 'convertisseur unicode vers gsm', 'réducteur coût sms', 'convertisseur texte gsm'],
  },
  lv: {
    title: 'Bezmaksas SMS Teksta Optimizētājs - Unicode uz GSM-7 Pārveidotājs | SMSPM',
    description: 'Optimizējiet savu SMS tekstu izmaksu samazināšanai. Automātiski pārveidojiet Unicode rakstzīmes GSM-7 ekvivalentos. Ietaupiet naudu, samazinot ziņojumu segmentus.',
    h1: 'SMS Teksta <span class="gradient-text">Optimizētājs</span>',
    subtitle: 'Pārveidojiet Unicode tekstu GSM-7 kodējumā un samaziniet SMS izmaksas. Automātiski aizstājiet viedos pēdiņas, garos domuzīmes un speciālos simbolus ar GSM saderīgām alternatīvām.',
    keywords: ['sms teksta optimizētājs', 'unicode uz gsm pārveidotājs', 'sms izmaksu samazinātājs'],
  },
  lt: {
    title: 'Nemokamas SMS Teksto Optimizatorius - Unicode į GSM-7 Keitiklis | SMSPM',
    description: 'Optimizuokite savo SMS tekstą kaštų mažinimui. Automatiškai konvertuokite Unicode simbolius į GSM-7 ekvivalentus. Taupykite pinigus mažindami pranešimų segmentus.',
    h1: 'SMS Teksto <span class="gradient-text">Optimizatorius</span>',
    subtitle: 'Konvertuokite Unicode tekstą į GSM-7 kodavimą ir sumažinkite SMS kaštus. Automatiškai pakeiskite išmaniąsias kabutes, ilgus brūkšnius ir specialius simbolius GSM suderinamomis alternatyvomis.',
    keywords: ['sms teksto optimizatorius', 'unicode į gsm keitiklis', 'sms kaštų mažintojas'],
  },
};

function generatePage(lang) {
  const meta = METADATA[lang];
  const urlPath = `/${lang}/tools/sms-text-optimizer`;
  
  const hreflangLinks = LANGUAGES.map(l => 
    `    <link rel="alternate" hreflang="${l}" href="https://smspm.com/${l}/tools/sms-text-optimizer" />`
  ).join('\n');
  
  return `---
import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import SMSTextOptimizerComponent from '../../../components/tools/SMSTextOptimizer.astro';
import Footer from '../../../components/Footer.astro';

const lang = '${lang}';
const title = '${meta.title}';
const description = '${meta.description}';
const keywords = ${JSON.stringify(meta.keywords)};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SMS Text Optimizer",
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
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools/sms-text-optimizer" />
    
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
        <SMSTextOptimizerComponent lang={lang} />
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
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.25rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .tool-section {
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
  console.log('🚀 Generating SMS Text Optimizer pages...\n');
  
  const baseDir = join(__dirname, '../src/pages');
  
  for (const lang of LANGUAGES) {
    const langDir = join(baseDir, lang, 'tools');
    
    if (!existsSync(langDir)) {
      mkdirSync(langDir, { recursive: true });
    }
    
    const filePath = join(langDir, 'sms-text-optimizer.astro');
    const content = generatePage(lang);
    
    writeFileSync(filePath, content);
    console.log(`✅ Generated: /${lang}/tools/sms-text-optimizer`);
  }
  
  console.log('\n✨ All pages generated successfully!');
  console.log(`\n📊 Total pages: ${LANGUAGES.length}`);
  console.log('🔗 URLs:');
  LANGUAGES.forEach(lang => {
    console.log(`   https://smspm.com/${lang}/tools/sms-text-optimizer`);
  });
}

generateAllPages().catch(console.error);
