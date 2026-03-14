#!/usr/bin/env node
/**
 * Tools Index Pages Generator
 * Generates SEO-optimized /tools index pages in all 8 languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGES = ['en', 'et', 'ru', 'es', 'de', 'fr', 'lv', 'lt'];

const TOOLS = [
    {
        id: 'sms-character-counter',
        path: 'sms-character-counter',
        icon: '📊',
        color: 'linear-gradient(135deg, #26c6da 0%, #7c4dff 100%)',
        translations: {
            en: { name: 'SMS Character Counter', desc: 'Calculate SMS length, parts and cost.' },
            et: { name: 'SMS tähemärkide loendur', desc: 'Arvuta SMS-i pikkus, osad ja maksumus.' },
            ru: { name: 'Счетчик символов SMS', desc: 'Рассчитайте длину SMS, части и стоимость.' },
            es: { name: 'Contador de caracteres SMS', desc: 'Calcula la longitud del SMS, las partes y el costo.' },
            de: { name: 'SMS Zeichenzähler', desc: 'Berechnen Sie SMS-Länge, Teile und Kosten.' },
            fr: { name: 'Compteur de caractères SMS', desc: 'Calculez la longueur du SMS, les parties et le coût.' },
            lv: { name: 'SMS rakstzīmju skaitītājs', desc: 'Aprēķiniet SMS garumu, daļas un izmaksas.' },
            lt: { name: 'SMS simbolių skaitiklis', desc: 'Apskaičiuokite SMS ilgį, dalis ir kainą.' }
        }
    },
    {
        id: 'phone-formatter',
        path: 'phone-formatter',
        icon: '📱',
        color: 'linear-gradient(135deg, #26c6da 0%, #1e88e5 100%)',
        translations: {
            en: { name: 'Phone Formatter', desc: 'Format numbers to E.164 international standard.' },
            et: { name: 'Telefoni vormindaja', desc: 'Vorminda numbrid E.164 standardile.' },
            ru: { name: 'Форматировщик телефонов', desc: 'Форматируйте номера по стандарту E.164.' },
            es: { name: 'Formateador de teléfono', desc: 'Formatea números al estándar E.164.' },
            de: { name: 'Telefon-Formatierer', desc: 'Formatieren Sie Nummern nach E.164-Standard.' },
            fr: { name: 'Formateur de téléphone', desc: 'Formatez les numéros au standard E.164.' },
            lv: { name: 'Tālruņa formatētājs', desc: 'Formatējiet numurus pēc E.164 standarta.' },
            lt: { name: 'Telefono formatavimas', desc: 'Formatuokite numerius pagal E.164 standartą.' }
        }
    },
    {
        id: 'sms-text-optimizer',
        path: 'sms-text-optimizer',
        icon: '⚡',
        color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        translations: {
            en: { name: 'SMS Text Optimizer', desc: 'Convert Unicode to GSM-7 to reduce costs.' },
            et: { name: 'SMS teksti optimeerija', desc: 'Teisenda Unicode GSM-7-ks kulude säästmiseks.' },
            ru: { name: 'Оптимизатор SMS текста', desc: 'Конвертируйте Unicode в GSM-7 для экономии.' },
            es: { name: 'Optimizador de texto SMS', desc: 'Convierte Unicode a GSM-7 para ahorrar costos.' },
            de: { name: 'SMS Text Optimierer', desc: 'Unicode zu GSM-7 konvertieren.' },
            fr: { name: 'Optimiseur de texte SMS', desc: 'Convertissez Unicode en GSM-7 pour économiser.' },
            lv: { name: 'SMS teksta optimizētājs', desc: 'Pārveidojiet Unicode uz GSM-7.' },
            lt: { name: 'SMS teksto optimizatorius', desc: 'Keiskite Unicode į GSM-7 kaštų taupymui.' }
        }
    },
    {
        id: 'unicode-gsm-checker',
        path: 'unicode-gsm-checker',
        icon: '🔍',
        color: 'linear-gradient(135deg, #26c6da 0%, #7c4dff 100%)',
        translations: {
            en: { name: 'Unicode / GSM Checker', desc: 'Verify SMS encoding and compatibility.' },
            et: { name: 'Unicode / GSM kontrollija', desc: 'Kontrolli SMS kodeeringut ja ühilduvust.' },
            ru: { name: 'Проверка Unicode / GSM', desc: 'Проверьте кодировку и совместимость SMS.' },
            es: { name: 'Verificador Unicode / GSM', desc: 'Verifica la codificación y compatibilidad.' },
            de: { name: 'Unicode / GSM Prüfer', desc: 'SMS-Codierung und Kompatibilität prüfen.' },
            fr: { name: 'Vérificateur Unicode / GSM', desc: "Vérifiez l'encodage et la compatibilité." },
            lv: { name: 'Unicode / GSM pārbaudītājs', desc: 'Pārbaudiet SMS kodējumu un saderību.' },
            lt: { name: 'Unicode / GSM tikrintuvas', desc: 'Tikrinkite SMS kodavimą ir suderinamumą.' }
        }
    },
    {
        id: 'phone-extractor',
        path: 'phone-extractor',
        icon: '✂️',
        color: 'linear-gradient(135deg, #7c4dff 0%, #26c6da 100%)',
        translations: {
            en: { name: 'Phone Extractor', desc: 'Extract phone numbers from any text.' },
            et: { name: 'Telefoni eraldaja', desc: 'Eralda telefoninumbrid mis tahes tekstist.' },
            ru: { name: 'Извлекатель телефонов', desc: 'Извлекайте номера телефонов из любого текста.' },
            es: { name: 'Extractor de teléfonos', desc: 'Extrae números de teléfono de cualquier texto.' },
            de: { name: 'Telefon-Extraktor', desc: 'Extrahiere Telefonnummern aus beliebigem Text.' },
            fr: { name: 'Extracteur de téléphone', desc: 'Extrayez les numéros de téléphone de tout texte.' },
            lv: { name: 'Tālruņa izvilcējs', desc: 'Izvelciet tālruņa numurus no jebkura teksta.' },
            lt: { name: 'Telefonų ištraukiklis', desc: 'Ištraukite telefonų numerius iš bet kokio teksto.' }
        }
    },
    {
        id: 'text-case-converter',
        path: 'text-case-converter',
        icon: 'Aa',
        color: 'linear-gradient(135deg, #7c4dff 0%, #536dfe 100%)',
        translations: {
            en: { name: 'Text Case Converter', desc: 'Convert text to UPPERCASE, lowercase, etc.' },
            et: { name: 'Teksti registri teisendaja', desc: 'Teisenda tekst SUURTÄHTEDEKS, väiketähtedeks jne.' },
            ru: { name: 'Конвертер регистра текста', desc: 'Конвертируйте текст в ВЕРХНИЙ, нижний регистр и т.д.' },
            es: { name: 'Convertidorde mayúsculas', desc: 'Convierte texto a MAYÚSCULAS, minúsculas, etc.' },
            de: { name: 'Textfall-Konverter', desc: 'Konvertieren Sie Text in GROSSBUCHSTABEN usw.' },
            fr: { name: 'Convertisseur de casse', desc: 'Convertissez le texte en MAJUSCULES, minuscules, etc.' },
            lv: { name: 'Teksta reģistra pārveidotājs', desc: 'Pārveidojiet tekstu LIELAJOS BURTOS utt.' },
            lt: { name: 'Teksto raidžių dydžio keitiklis', desc: 'Keiskite tekstą į DIDŽIĄSIAS, mažąsias ir kt.' }
        }
    },
    {
        id: 'mcp-server',
        path: 'mcp-server',
        icon: '🤖',
        color: 'linear-gradient(135deg, #26c6da 0%, #7c4dff 100%)',
        translations: {
            en: { name: 'MCP Server for Claude AI', desc: 'Send SMS directly from Claude Desktop via AI.' },
            et: { name: 'MCP Server Claude AI jaoks', desc: 'Saada SMS otse Claude Desktopist AI kaudu.' },
            ru: { name: 'MCP Сервер для Claude AI', desc: 'Отправляйте SMS прямо из Claude Desktop через AI.' },
            es: { name: 'Servidor MCP para Claude AI', desc: 'Envía SMS directamente desde Claude Desktop con IA.' },
            de: { name: 'MCP-Server für Claude AI', desc: 'SMS direkt aus Claude Desktop per KI senden.' },
            fr: { name: 'Serveur MCP pour Claude AI', desc: 'Envoyez des SMS depuis Claude Desktop via IA.' },
            lv: { name: 'MCP Serveris Claude AI', desc: 'Sūtiet SMS tieši no Claude Desktop ar AI.' },
            lt: { name: 'MCP Serveris Claude AI', desc: 'Siųskite SMS tiesiogiai iš Claude Desktop su AI.' }
        }
    }
];

const INDEX_METADATA = {
    en: {
        title: 'Free SMS Tools & Utilities | SMSPM',
        description: 'A collection of free tools for SMS marketers and developers. SMS character counters, phone formatters, extractors, and optimizers.',
        h1: 'Free SMS <span class="gradient-text">Tools & Utilities</span>',
        subtitle: 'Powerful, simple, and free tools to help you optimize your SMS campaigns and improve delivery rates.',
        keywords: ['sms tools', 'sms character counter', 'phone extractor', 'phone formatter', 'sms optimizer', 'free utility tools']
    },
    et: {
        title: 'Tasuta SMS tööriistad ja utiliidid | SMSPM',
        description: 'Tasuta tööriistade komplekt SMS-turundajatele ja arendajatele. SMS-i tähemärkide loendurid, telefoninumbrite vormindajad, eraldajad ja optimeerijad.',
        h1: 'Tasuta SMS <span class="gradient-text">Tööriistad</span>',
        subtitle: 'Võimsad ja tasuta tööriistad, mis aitavad sul optimeerida SMS-kampaaniaid ja parandada kättetoimetamise määra.',
        keywords: ['sms tööriistad', 'sms tähemärkide loendur', 'telefoni eraldaja', 'telefoni vormindaja']
    },
    ru: {
        title: 'Бесплатные SMS инструменты и утилиты | SMSPM',
        description: 'Коллекция бесплатных инструментов для SMS-маркетологов и разработчиков. Счетчики символов, форматировщики телефонов и оптимизаторы.',
        h1: 'Бесплатные SMS <span class="gradient-text">Инструменты</span>',
        subtitle: 'Мощные и бесплатные инструменты для оптимизации ваших SMS-кампаний и улучшения показателей доставки.',
        keywords: ['sms инструменты', 'счетчик символов sms', 'извлекатель телефонов', 'форматировщик телефонов']
    },
    es: {
        title: 'Herramientas y utilidades SMS gratuitas | SMSPM',
        description: 'Colección de herramientas gratuitas para desarrolladores y profesionales de marketing SMS. Contadores de caracteres, formateadores y más.',
        h1: 'Herramientas SMS <span class="gradient-text">Gratuitas</span>',
        subtitle: 'Herramientas potentes y gratuitas para ayudarte a optimizar tus campañas de SMS y mejorar las tasas de entrega.',
        keywords: ['herramientas sms', 'contador caracteres sms', 'extractor telefonos', 'formateador telefonos']
    },
    de: {
        title: 'Kostenlose SMS-Tools & Dienstprogramme | SMSPM',
        description: 'Eine Sammlung kostenloser Tools für SMS-Vermarkter und Entwickler. SMS-Zeichenzähler, Telefon-Formatierer, Extraktoren und Optimierer.',
        h1: 'Kostenlose SMS <span class="gradient-text">Tools</span>',
        subtitle: 'Leistungsstarke und kostenlose Tools zur Optimierung Ihrer SMS-Kampagnen und zur Verbesserung der Zustellraten.',
        keywords: ['sms tools', 'sms zeichenzähler', 'telefon extraktor', 'telefon formatierer']
    },
    fr: {
        title: 'Outils et utilitaires SMS gratuits | SMSPM',
        description: "Une collection d'outils gratuits pour les spécialistes du marketing SMS et les développeurs. Compteurs de caractères, formateurs et plus.",
        h1: 'Outils SMS <span class="gradient-text">Gratuits</span>',
        subtitle: 'Des outils puissants et gratuits pour vous aider à optimiser vos campagnes SMS et à améliorer les taux de livraison.',
        keywords: ['outils sms', 'compteur caractères sms', 'extracteur téléphone', 'formateur téléphone']
    },
    lv: {
        title: 'Bezmaksas SMS rīki un komunālpakalpojumi | SMSPM',
        description: 'Bezmaksas rīku kolekcija SMS tirgotājiem un izstrādātājiem. SMS rakstzīmju skaitītāji, tālruņa formatētāji un optimizētāji.',
        h1: 'Bezmaksas SMS <span class="gradient-text">Rīki</span>',
        subtitle: 'Jaudīgi un bezmaksas rīki, kas palīdzēs optimizēt SMS kampaņas un uzlabot piegādes rādītājus.',
        keywords: ['sms rīki', 'sms rakstzīmju skaitītājs', 'tālruņa izvilcējs', 'tālruņa formatētājs']
    },
    lt: {
        title: 'Nemokami SMS įrankiai ir pagalbinės programos | SMSPM',
        description: 'Nemokamų įrankių kolekcija SMS rinkodaros specialistams ir kūrėjams. SMS simbolių skaitikliai, telefonų formatavimas ir kt.',
        h1: 'Nemokami SMS <span class="gradient-text">Įrankiai</span>',
        subtitle: 'Galingi ir nemokami įrankiai, padėsiantys optimizuoti SMS kampanijas ir pagerinti pristatymo rodiklius.',
        keywords: ['sms įrankiai', 'sms simbolių skaitiklis', 'telefonų ištraukiklis', 'telefonų formatavimas']
    }
};

function generateIndexPage(lang) {
    const meta = INDEX_METADATA[lang];
    const urlPath = `/${lang}/tools`;

    const hreflangLinks = LANGUAGES.map(l =>
        `    <link rel="alternate" hreflang="${l}" href="https://smspm.com/${l}/tools" />`
    ).join('\n');

    const toolsList = TOOLS.map(tool => {
        const t = tool.translations[lang] || tool.translations.en;
        return {
            name: t.name,
            description: t.desc,
            url: `/${lang}/tools/${tool.path}`,
            icon: tool.icon,
            color: tool.color
        };
    });

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": meta.title,
        "description": meta.description,
        "url": `https://smspm.com${urlPath}`,
        "itemListElement": toolsList.map((tool, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://smspm.com${tool.url}`,
            "name": tool.name
        }))
    };

    return `---
/**
 * Tools Index Page
 * Language: ${lang}
 */

import Layout from '../../layouts/Layout.astro';
import Navigation from '../../components/Navigation.astro';
import Footer from '../../components/Footer.astro';

const lang = '${lang}';
const title = '${meta.title}';
const description = "${meta.description}";
const keywords = ${JSON.stringify(meta.keywords)};

const tools = ${JSON.stringify(toolsList, null, 2)};
---

<Layout title={title} description={description}>
  <head>
    <meta name="keywords" content={keywords.join(', ')} />
    <link rel="canonical" href="https://smspm.com${urlPath}" />
    <script type="application/ld+json" set:html={JSON.stringify(${JSON.stringify(structuredData)})} />
    
${hreflangLinks}
    <link rel="alternate" hreflang="x-default" href="https://smspm.com/en/tools" />
    
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://smspm.com${urlPath}" />
    <meta property="og:type" content="website" />
    
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </head>

  <Navigation />
  
  <main class="tools-index">
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

    <section class="tools-grid-section">
      <div class="container">
        <div class="tools-grid">
          {tools.map(tool => (
            <a href={tool.url} class="tool-card">
              <div class="tool-icon-wrapper" style={{ background: tool.color }}>
                <span class="tool-icon">{tool.icon}</span>
              </div>
              <div class="tool-content">
                <h3 class="tool-name">{tool.name}</h3>
                <p class="tool-desc">{tool.description}</p>
              </div>
              <div class="tool-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer />
</Layout>

<style>
  .tools-index {
    min-height: 100vh;
    background-color: #f8fafc;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero-section {
    padding: 8rem 0 4rem;
    text-align: center;
    background: white;
    border-bottom: 1px solid #e2e8f0;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: #0f172a;
  }

  .gradient-text {
    background: linear-gradient(135deg, #26c6da 0%, #7c4dff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.25rem;
    color: #64748b;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .tools-grid-section {
    padding: 4rem 0 8rem;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .tool-card {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .tool-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
  }

  .tool-icon-wrapper {
    width: 60px;
    height: 60px;
    min-width: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    color: white;
  }

  .tool-icon {
    font-size: 1.75rem;
    font-weight: bold;
  }

  .tool-content {
    flex-grow: 1;
  }

  .tool-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
    transition: color 0.3s ease;
  }

  .tool-card:hover .tool-name {
    color: #7c4dff;
  }

  .tool-desc {
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.5;
  }

  .tool-arrow {
    margin-left: 1rem;
    color: #94a3b8;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateX(-10px);
  }

  .tool-card:hover .tool-arrow {
    opacity: 1;
    transform: translateX(0);
    color: #7c4dff;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .tools-grid {
      grid-template-columns: 1fr;
    }

    .container {
      padding: 0 1.5rem;
    }

    .hero-section {
      padding: 6rem 0 3rem;
    }
  }
</style>
`;
}

async function generateAllPages() {
    console.log('🚀 Generating tools index pages for all languages...\n');

    const baseDir = join(__dirname, '../src/pages');

    for (const lang of LANGUAGES) {
        const langDir = join(baseDir, lang, 'tools');

        // Create directory if it doesn't exist
        if (!existsSync(langDir)) {
            mkdirSync(langDir, { recursive: true });
        }

        const filePath = join(langDir, 'index.astro');
        const content = generateIndexPage(lang);

        writeFileSync(filePath, content);
        console.log(`✅ Generated: /${lang}/tools`);
    }

    console.log('\n✨ All tools index pages generated successfully!');
    console.log(`\n📊 Total pages: ${LANGUAGES.length}`);
}

generateAllPages().catch(console.error);
