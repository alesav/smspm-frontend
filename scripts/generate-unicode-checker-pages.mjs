#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const M = {
  en: { title: 'Free Unicode / GSM SMS Checker & Validator | SMSPM', h1: 'Unicode / GSM <span class="gradient-text">SMS Checker</span>', subtitle: 'Instantly verify SMS encoding compatibility. Identify non-GSM characters and convert to GSM-7 for cost savings.', keywords: ['gsm sms checker', 'unicode sms checker', 'sms encoding validator', 'gsm 7 bit checker', 'unicode checker', 'sms compatibility'] },
  et: { title: 'Tasuta Unicode / GSM SMS Kontrollija | SMSPM', h1: 'Unicode / GSM <span class="gradient-text">SMS Kontrollija</span>', subtitle: 'Kontrolli koheselt SMS kodeeringu ühilduvust. Tuvasta mitte-GSM tähemärke ja teisenda GSM-7-ks kulude säästmiseks.', keywords: ['gsm sms kontrollija', 'unicode sms kontrollija'] },
  ru: { title: 'Бесплатная Проверка Unicode / GSM SMS | SMSPM', h1: 'Проверка Unicode / GSM <span class="gradient-text">SMS</span>', subtitle: 'Мгновенно проверяйте совместимость кодировки SMS. Определяйте не-GSM символы и конвертируйте в GSM-7 для экономии.', keywords: ['проверка gsm sms', 'проверка unicode sms'] },
  es: { title: 'Verificador Unicode / GSM SMS Gratis | SMSPM', h1: 'Verificador Unicode / GSM <span class="gradient-text">SMS</span>', subtitle: 'Verifica instantáneamente la compatibilidad de codificación SMS. Identifica caracteres no-GSM y convierte a GSM-7 para ahorrar costos.', keywords: ['verificador gsm sms', 'verificador unicode sms'] },
  de: { title: 'Kostenloser Unicode / GSM SMS Checker | SMSPM', h1: 'Unicode / GSM <span class="gradient-text">SMS Prüfer</span>', subtitle: 'Prüfen Sie sofort die SMS-Codierungskompatibilität. Identifizieren Sie Nicht-GSM-Zeichen und konvertieren Sie zu GSM-7 für Kosteneinsparungen.', keywords: ['gsm sms prüfer', 'unicode sms prüfer'] },
  fr: { title: 'Vérificateur Unicode / GSM SMS Gratuit | SMSPM', h1: 'Vérificateur Unicode / GSM <span class="gradient-text">SMS</span>', subtitle: "Vérifiez instantanément la compatibilité d'encodage SMS. Identifiez les caractères non-GSM et convertissez en GSM-7 pour économiser.", keywords: ['vérificateur gsm sms', 'vérificateur unicode sms'] },
  lv: { title: 'Bezmaksas Unicode / GSM SMS Pārbaudītājs | SMSPM', h1: 'Unicode / GSM <span class="gradient-text">SMS Pārbaudītājs</span>', subtitle: 'Uzreiz pārbaudiet SMS kodējuma saderību. Identificējiet ne-GSM rakstzīmes un pārveidojiet uz GSM-7 izmaksu ietaupīšanai.', keywords: ['gsm sms pārbaudītājs', 'unicode sms pārbaudītājs'] },
  lt: { title: 'Nemokamas Unicode / GSM SMS Tikrintuvas | SMSPM', h1: 'Unicode / GSM <span class="gradient-text">SMS Tikrintuvas</span>', subtitle: 'Akimirksniu patikrinkite SMS kodavimo suderinamumą. Identifikuokite ne-GSM simbolius ir konvertuokite į GSM-7 kaštų taupymui.', keywords: ['gsm sms tikrintuvas', 'unicode sms tikrintuvas'] },
};

function gen(l) {
  const m = M[l];
  const hrefs = LANGUAGES.map(x => `    <link rel="alternate" hreflang="${x}" href="https://smspm.com/${x}/tools/unicode-gsm-checker" />`).join('\n');
  
  return `---
import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import UnicodeGsmCheckerComponent from '../../../components/tools/UnicodeGsmChecker.astro';
import Footer from '../../../components/Footer.astro';

const title = '${m.title}';
const description = "${m.subtitle}";
const keywords = ${JSON.stringify(m.keywords)};
---

<Layout title={title} description={description}>
  <head>
    <meta name="keywords" content={keywords.join(', ')} />
    <link rel="canonical" href="https://smspm.com/${l}/tools/unicode-gsm-checker" />
${hrefs}
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools/unicode-gsm-checker" />
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
        <UnicodeGsmCheckerComponent lang="${l}" />
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
  .gradient-text { background: linear-gradient(135deg, #26c6da 0%, #7c4dff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-description { font-size: 1.25rem; color: #666; max-width: 800px; margin: 0 auto; }
  .tool-section { padding: 2rem 0 4rem; }
  @media (max-width: 768px) { .hero-title { font-size: 2rem; } }
</style>`;
}

console.log('🚀 Generating Unicode/GSM Checker pages...\n');
const base = join(__dirname, '../src/pages');
for (const l of LANGUAGES) {
  const dir = join(base, l, 'tools');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'unicode-gsm-checker.astro'), gen(l));
  console.log(`✅ /${l}/tools/unicode-gsm-checker`);
}
console.log('\n✨ Done! 8 pages created');
