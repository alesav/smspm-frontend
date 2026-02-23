#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const M = {
  en: { title: 'Free Text Case Converter for SMS - UPPERCASE, lowercase, Title Case | SMSPM', h1: 'Text Case <span class="gradient-text">Converter</span>', subtitle: 'Convert text to different cases instantly - UPPERCASE, lowercase, Title Case, camelCase, snake_case and more for your SMS messages.', keywords: ['text case converter', 'uppercase converter', 'lowercase converter', 'title case converter', 'camel case converter', 'snake case converter'] },
  et: { title: 'Tasuta Teksti Registri Teisendaja SMS jaoks | SMSPM', h1: 'Teksti Registri <span class="gradient-text">Teisendaja</span>', subtitle: 'Teisenda tekst koheselt erinevateks registriteks - SUURTÄHED, väiketähed, Pealkirja Stiil ja muud SMS sõnumite jaoks.', keywords: ['teksti registri teisendaja', 'suurtähtede teisendaja', 'väiketähtede teisendaja'] },
  ru: { title: 'Бесплатный Конвертер Регистра Текста для SMS | SMSPM', h1: 'Конвертер Регистра <span class="gradient-text">Текста</span>', subtitle: 'Конвертируйте текст в разные регистры мгновенно - ВЕРХНИЙ, нижний, Заглавные Буквы, camelCase и другие для SMS.', keywords: ['конвертер регистра текста', 'верхний регистр конвертер', 'нижний регистр конвертер'] },
  es: { title: 'Convertidor de Mayúsculas y Minúsculas Gratis para SMS | SMSPM', h1: 'Convertidor de <span class="gradient-text">Mayúsculas</span>', subtitle: 'Convierte texto a diferentes casos instantáneamente - MAYÚSCULAS, minúsculas, Título, camelCase y más para tus SMS.', keywords: ['convertidor mayúsculas minúsculas', 'convertidor texto sms', 'convertidor camel case'] },
  de: { title: 'Kostenloser Textfall-Konverter für SMS | SMSPM', h1: 'Textfall <span class="gradient-text">Konverter</span>', subtitle: 'Konvertiere Text sofort in verschiedene Fälle - GROSSBUCHSTABEN, kleinbuchstaben, Titelfall, camelCase und mehr für SMS.', keywords: ['textfall konverter', 'grossbuchstaben konverter', 'kleinbuchstaben konverter'] },
  fr: { title: 'Convertisseur de Casse de Texte Gratuit pour SMS | SMSPM', h1: 'Convertisseur de <span class="gradient-text">Casse</span>', subtitle: 'Convertissez le texte en différentes casses instantanément - MAJUSCULES, minuscules, Titre, camelCase et plus pour vos SMS.', keywords: ['convertisseur casse texte', 'convertisseur majuscules', 'convertisseur minuscules'] },
  lv: { title: 'Bezmaksas Teksta Reģistra Pārveidotājs SMS | SMSPM', h1: 'Teksta Reģistra <span class="gradient-text">Pārveidotājs</span>', subtitle: 'Pārveidojiet tekstu dažādos reģistros uzreiz - LIELIE BURTI, mazie burti, Virsraksta Stils, camelCase un vairāk SMS ziņojumiem.', keywords: ['teksta reģistra pārveidotājs', 'lielo burtu pārveidotājs', 'mazo burtu pārveidotājs'] },
  lt: { title: 'Nemokamas Teksto Raidžių Dydžio Keitiklis SMS | SMSPM', h1: 'Teksto Raidžių <span class="gradient-text">Keitiklis</span>', subtitle: 'Konvertuokite tekstą į skirtingus dydžius akimirksniu - DIDŽIOSIOS, mažosios, Pavadinimo Stilius, camelCase ir daugiau SMS žinutėms.', keywords: ['teksto raidžių keitiklis', 'didžiųjų raidžių keitiklis', 'mažųjų raidžių keitiklis'] },
};

function gen(l) {
  const m = M[l];
  const hrefs = LANGUAGES.map(x => `    <link rel="alternate" hreflang="${x}" href="https://smspm.com/${x}/tools/text-case-converter" />`).join('\n');

  return `---
import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import TextCaseConverterComponent from '../../../components/tools/TextCaseConverter.astro';
import Footer from '../../../components/Footer.astro';

const title = '${m.title}';
const description = '${m.subtitle}';
const keywords = ${JSON.stringify(m.keywords)};
---

<Layout title={title} description={description}>
  <head>
    <meta name="keywords" content={keywords.join(', ')} />
    <link rel="canonical" href="https://smspm.com/${l}/tools/text-case-converter" />
${hrefs}
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools/text-case-converter" />
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
        <TextCaseConverterComponent lang="${l}" />
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
  .gradient-text { background: linear-gradient(135deg, #7c4dff 0%, #536dfe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-description { font-size: 1.25rem; color: #666; max-width: 800px; margin: 0 auto; }
  .tool-section { padding: 2rem 0 4rem; }
  @media (max-width: 768px) { .hero-title { font-size: 2rem; } }
</style>`;
}

console.log('🚀 Generating Text Case Converter pages...\n');
const base = join(__dirname, '../src/pages');
for (const l of LANGUAGES) {
  const dir = join(base, l, 'tools');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'text-case-converter.astro'), gen(l));
  console.log(`✅ /${l}/tools/text-case-converter`);
}
console.log('\n✨ Done! 8 pages created');
