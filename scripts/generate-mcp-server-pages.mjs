#!/usr/bin/env node
/**
 * MCP Server Tool Pages Generator
 * Generates SEO-optimized /tools/mcp-server pages in all 8 languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const METADATA = {
  en: {
    title: 'Send SMS from Claude AI with MCP Server | SMSPM',
    description: 'Install the SMSPM MCP server and send SMS messages directly from Claude Desktop. Step-by-step setup guide for AI-powered SMS automation.',
    h1: 'Send SMS from Claude AI with <span class="gradient-text">MCP Server</span>',
    subtitle: 'Connect SMSPM to Claude Desktop using the Model Context Protocol. Send SMS messages by simply asking Claude — no code required.',
    keywords: ['smspm mcp', 'send sms claude ai', 'mcp server sms', 'claude desktop sms', 'ai sms automation', 'model context protocol sms'],
  },
  et: {
    title: 'Saada SMS Claude AI kaudu MCP Serveriga | SMSPM',
    description: 'Installi SMSPM MCP server ja saada SMS-sõnumeid otse Claude Desktopist. Samm-sammuline seadistusjuhend AI-toega SMS automatiseerimiseks.',
    h1: 'Saada SMS Claude AI kaudu <span class="gradient-text">MCP Serveriga</span>',
    subtitle: 'Ühenda SMSPM Claude Desktopiga Model Context Protocoli abil. Saada SMS-sõnumeid lihtsalt Claudelt küsides — koodi pole vaja.',
    keywords: ['smspm mcp', 'saada sms claude ai', 'mcp server sms', 'claude desktop sms', 'ai sms automatiseerimine'],
  },
  ru: {
    title: 'Отправка SMS через Claude AI с MCP Сервером | SMSPM',
    description: 'Установите SMSPM MCP сервер и отправляйте SMS прямо из Claude Desktop. Пошаговое руководство по настройке AI-автоматизации SMS.',
    h1: 'Отправка SMS через Claude AI с <span class="gradient-text">MCP Сервером</span>',
    subtitle: 'Подключите SMSPM к Claude Desktop через Model Context Protocol. Отправляйте SMS просто попросив Claude — без кода.',
    keywords: ['smspm mcp', 'отправка sms claude ai', 'mcp сервер sms', 'claude desktop sms', 'ai автоматизация sms'],
  },
  es: {
    title: 'Enviar SMS desde Claude AI con Servidor MCP | SMSPM',
    description: 'Instala el servidor MCP de SMSPM y envía mensajes SMS directamente desde Claude Desktop. Guía paso a paso para automatización de SMS con IA.',
    h1: 'Enviar SMS desde Claude AI con <span class="gradient-text">Servidor MCP</span>',
    subtitle: 'Conecta SMSPM a Claude Desktop usando el Model Context Protocol. Envía SMS simplemente pidiéndoselo a Claude — sin código.',
    keywords: ['smspm mcp', 'enviar sms claude ai', 'servidor mcp sms', 'claude desktop sms', 'automatización sms ia'],
  },
  de: {
    title: 'SMS von Claude AI mit MCP-Server senden | SMSPM',
    description: 'Installieren Sie den SMSPM MCP-Server und senden Sie SMS-Nachrichten direkt aus Claude Desktop. Schritt-für-Schritt-Anleitung für KI-gestützte SMS-Automatisierung.',
    h1: 'SMS von Claude AI mit <span class="gradient-text">MCP-Server</span> senden',
    subtitle: 'Verbinden Sie SMSPM mit Claude Desktop über das Model Context Protocol. Senden Sie SMS einfach durch Bitten von Claude — kein Code erforderlich.',
    keywords: ['smspm mcp', 'sms senden claude ai', 'mcp server sms', 'claude desktop sms', 'ki sms automatisierung'],
  },
  fr: {
    title: 'Envoyer des SMS depuis Claude AI avec Serveur MCP | SMSPM',
    description: "Installez le serveur MCP SMSPM et envoyez des SMS directement depuis Claude Desktop. Guide d'installation étape par étape pour l'automatisation SMS par IA.",
    h1: 'Envoyer des SMS depuis Claude AI avec <span class="gradient-text">Serveur MCP</span>',
    subtitle: 'Connectez SMSPM à Claude Desktop via le Model Context Protocol. Envoyez des SMS en demandant simplement à Claude — sans code.',
    keywords: ['smspm mcp', 'envoyer sms claude ai', 'serveur mcp sms', 'claude desktop sms', 'automatisation sms ia'],
  },
  lv: {
    title: 'Sūtīt SMS no Claude AI ar MCP Serveri | SMSPM',
    description: 'Instalējiet SMSPM MCP serveri un sūtiet SMS ziņojumus tieši no Claude Desktop. Soli pa solim uzstādīšanas rokasgrāmata AI SMS automatizācijai.',
    h1: 'Sūtīt SMS no Claude AI ar <span class="gradient-text">MCP Serveri</span>',
    subtitle: 'Savienojiet SMSPM ar Claude Desktop, izmantojot Model Context Protocol. Sūtiet SMS, vienkārši lūdzot Claude — bez koda.',
    keywords: ['smspm mcp', 'sūtīt sms claude ai', 'mcp serveris sms', 'claude desktop sms', 'ai sms automatizācija'],
  },
  lt: {
    title: 'Siųsti SMS iš Claude AI su MCP Serveriu | SMSPM',
    description: 'Įdiekite SMSPM MCP serverį ir siųskite SMS žinutes tiesiogiai iš Claude Desktop. Žingsnis po žingsnio diegimo vadovas AI SMS automatizavimui.',
    h1: 'Siųsti SMS iš Claude AI su <span class="gradient-text">MCP Serveriu</span>',
    subtitle: 'Prijunkite SMSPM prie Claude Desktop naudodami Model Context Protocol. Siųskite SMS tiesiog prašydami Claude — be kodo.',
    keywords: ['smspm mcp', 'siųsti sms claude ai', 'mcp serveris sms', 'claude desktop sms', 'ai sms automatizavimas'],
  },
};

function generatePage(lang) {
  const meta = METADATA[lang];
  const urlPath = `/${lang}/tools/mcp-server`;

  const hreflangLinks = LANGUAGES.map(l =>
    `    <link rel="alternate" hreflang="${l}" href="https://smspm.com/${l}/tools/mcp-server" />`
  ).join('\n');

  return `---
import Layout from '../../../layouts/Layout.astro';
import Navigation from '../../../components/Navigation.astro';
import MCPServerComponent from '../../../components/tools/MCPServer.astro';
import Footer from '../../../components/Footer.astro';

const lang = '${lang}';
const title = '${meta.title}';
const description = '${meta.description}';
const keywords = ${JSON.stringify(meta.keywords)};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": title,
  "description": description,
  "url": "https://smspm.com${urlPath}",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Install Node.js", "text": "Install Node.js 18 or newer" },
    { "@type": "HowToStep", "position": 2, "name": "Configure Claude Desktop", "text": "Add SMSPM to claude_desktop_config.json" },
    { "@type": "HowToStep", "position": 3, "name": "Add credentials", "text": "Set your SMSPM_HASH and SMSPM_TOKEN" },
    { "@type": "HowToStep", "position": 4, "name": "Restart Claude Desktop", "text": "Restart to activate the MCP server" }
  ]
};
---

<Layout title={title} description={description}>
  <head>
    <meta name="keywords" content={keywords.join(', ')} />
    <link rel="canonical" href="https://smspm.com${urlPath}" />
    <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />

${hreflangLinks}
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools/mcp-server" />

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
        <MCPServerComponent lang={lang} />
      </div>
    </section>
  </main>

  <Footer />
</Layout>

<style>
  .tool-page { min-height: 100vh; background: #f8fafc; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .hero-section { padding: 6rem 0 4rem; text-align: center; background: white; border-bottom: 1px solid #e2e8f0; }
  .hero-title { font-size: 3rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; color: #0f172a; }
  .gradient-text { background: linear-gradient(135deg, #26c6da 0%, #7c4dff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-description { font-size: 1.25rem; color: #64748b; max-width: 800px; margin: 0 auto; line-height: 1.6; }
  .tool-section { padding: 3rem 0 5rem; }
  @media (max-width: 768px) {
    .hero-title { font-size: 2rem; }
    .hero-description { font-size: 1rem; }
  }
</style>`;
}

console.log('🚀 Generating MCP Server tool pages...\n');
const base = join(__dirname, '../src/pages');
for (const l of LANGUAGES) {
  const dir = join(base, l, 'tools');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'mcp-server.astro'), generatePage(l));
  console.log(`✅ /${l}/tools/mcp-server`);
}
console.log('\n✨ Done! 8 pages created');
console.log('\n🔗 URLs:');
LANGUAGES.forEach(l => console.log(`   https://smspm.com/${l}/tools/mcp-server`));
