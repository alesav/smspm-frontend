#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const M = {
  en: { title: 'Free Phone Numbers Extractor from Text | SMSPM', h1: 'Phone Numbers <span class="gradient-text">Extractor</span>', subtitle: 'Extract and format phone numbers from any text. Export to CSV or TXT for bulk SMS campaigns.', keywords: ['phone extractor', 'extract phone numbers from text', 'phone number parser', 'sms contact list extractor'] },
  et: { title: 'Tasuta Telefoninumbrite Eraldaja Tekstist | SMSPM', h1: 'Telefoninumbrite <span class="gradient-text">Eraldaja</span>', subtitle: 'Eralda ja vorminda telefoninumbrid tekstist. Ekspordi CSV või TXT formaati hulgi SMS kampaaniateks.', keywords: ['telefoninumbrite eraldaja', 'eralda telefoninumbrid', 'sms kontaktide loend'] },
  ru: { title: 'Бесплатный Извлекатель Телефонных Номеров из Текста | SMSPM', h1: 'Извлекатель Телефонных <span class="gradient-text">Номеров</span>', subtitle: 'Извлекайте и форматируйте номера телефонов из текста. Экспорт в CSV или TXT для массовых SMS кампаний.', keywords: ['извлекатель телефонных номеров', 'извлечь номера из текста', 'парсер номеров'] },
  es: { title: 'Extractor de Números Telefónicos del Texto Gratis | SMSPM', h1: 'Extractor de Números <span class="gradient-text">Telefónicos</span>', subtitle: 'Extrae y formatea números telefónicos del texto. Exporta a CSV o TXT para campañas SMS masivas.', keywords: ['extractor números telefónicos', 'extraer números de texto', 'lista contactos sms'] },
  de: { title: 'Kostenloser Telefonnummern-Extraktor aus Text | SMSPM', h1: 'Telefonnummern <span class="gradient-text">Extraktor</span>', subtitle: 'Extrahieren und formatieren Sie Telefonnummern aus Text. Export als CSV oder TXT für Massen-SMS-Kampagnen.', keywords: ['telefonnummern extraktor', 'telefonnummern aus text extrahieren', 'sms kontaktliste'] },
  fr: { title: 'Extracteur de Numéros de Téléphone Gratuit | SMSPM', h1: 'Extracteur de Numéros <span class="gradient-text">de Téléphone</span>', subtitle: 'Extrayez et formatez les numéros de téléphone du texte. Export CSV ou TXT pour campagnes SMS en masse.', keywords: ['extracteur numéros téléphone', 'extraire numéros du texte', 'liste contacts sms'] },
  lv: { title: 'Bezmaksas Tālruņa Numuru Izvilcējs no Teksta | SMSPM', h1: 'Tālruņa Numuru <span class="gradient-text">Izvilcējs</span>', subtitle: 'Izvelciet un formatējiet tālruņa numurus no teksta. Eksports CSV vai TXT masveida SMS kampaņām.', keywords: ['tālruņa numuru izvilcējs', 'izvilkt numurus no teksta', 'sms kontaktu saraksts'] },
  lt: { title: 'Nemokamas Telefonų Numerių Ištraukiklis iš Teksto | SMSPM', h1: 'Telefonų Numerių <span class="gradient-text">Ištraukiklis</span>', subtitle: 'Ištraukite ir formatuokite telefono numerius iš teksto. Eksportas CSV arba TXT masiniams SMS pranešimams.', keywords: ['telefonų numerių ištraukiklis', 'ištraukti numerius iš teksto', 'sms kontaktų sąrašas'] },
};

function gen(l) {
  const m = M[l];
  const hrefs = LANGUAGES.map(x => `    <link rel="alternate" hreflang="${x}" href="https://smspm.com/${x}/tools/phone-extractor" />`).join('\n');

  return `---
import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import PhoneExtractorComponent from '../../../components/tools/PhoneExtractor.astro';
import Footer from '../../../components/Footer.astro';

const title = '${m.title}';
const description = '${m.subtitle}';
const keywords = ${JSON.stringify(m.keywords)};
---

<Layout title={title} description={description}>
  <head>
    <meta name="keywords" content={keywords.join(', ')} />
    <link rel="canonical" href="https://smspm.com/${l}/tools/phone-extractor" />
${hrefs}
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools/phone-extractor" />
  </head>
  <Navigation />
  <main class="tool-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">${m.h1}</h1>
        <p class="hero-description">${m.subtitle}</p>
      </div>
    </section>
    <section class="tool-section">
      <div class="container">
        <PhoneExtractorComponent lang="${l}" />
      </div>
    </section>
  </main>
  <Footer />
</Layout>
<style>
  .tool-page { min-height: 100vh; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .hero-section { padding: 6rem 0 4rem; text-align: center; }
  .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; }
  .gradient-text { background: linear-gradient(135deg, #7c4dff 0%, #26c6da 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-description { font-size: 1.25rem; color: #666; max-width: 800px; margin: 0 auto; }
  .tool-section { padding: 2rem 0 4rem; }
  @media (max-width: 768px) { .hero-title { font-size: 2rem; } }
</style>`;
}

console.log('🚀 Generating Phone Extractor pages...\n');
const base = join(__dirname, '../src/pages');
for (const l of LANGUAGES) {
  const dir = join(base, l, 'tools');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'phone-extractor.astro'), gen(l));
  console.log(`✅ /${l}/tools/phone-extractor`);
}
console.log('\n✨ Done! 8 pages created');
