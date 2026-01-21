import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LANGUAGES = ['ru', 'es', 'de', 'fr', 'lv', 'lt'];
const BASE_PAGES_DIR = join(__dirname, '../src/pages');

// Translation map for Homepages
const HOMEPAGE_TRANSLATIONS = {
    ru: {
        title: 'SMSPM - Глобальный SMS API и платформа массовых рассылок',
        heroBadge: 'Нам доверяют 10 000+ компаний по всему миру',
        heroTitle: 'Глобальные SMS-рассылки',
        heroTitleGradient: 'Сделано просто',
        heroSubtitle: 'Отправляйте SMS-сообщения по всему миру с помощью мощного API. Охватите клиентов мгновенно в 190+ странах с вероятностью доставки 99,9%.',
        getStartedFree: 'Начать бесплатно',
        viewDemo: 'Смотреть демо',
        statsDeliveryRate: 'Вероятность доставки',
        statsCountries: 'Стран',
        statsResponseTime: 'Время отклика'
    },
    es: {
        title: 'SMSPM - API de SMS global y plataforma de mensajería masiva',
        heroBadge: 'Con la confianza de más de 10.000 empresas en todo el mundo',
        heroTitle: 'Mensajería SMS global',
        heroTitleGradient: 'Hecho simple',
        heroSubtitle: 'Envíe mensajes SMS a nivel mundial con una potente API. Llegue a los clientes al instante en más de 190 países con una tasa de entrega del 99,9%.',
        getStartedFree: 'Empieza gratis',
        viewDemo: 'Ver Demo',
        statsDeliveryRate: 'Tasa de entrega',
        statsCountries: 'Países',
        statsResponseTime: 'Tiempo de respuesta'
    },
    de: {
        title: 'SMSPM - Globale SMS-API & Massen-Messaging-Plattform',
        heroBadge: 'Mehr als 10.000 Unternehmen weltweit vertrauen uns',
        heroTitle: 'Globales SMS-Messaging',
        heroTitleGradient: 'Ganz einfach',
        heroSubtitle: 'Senden Sie SMS-Nachrichten weltweit mit einer leistungsstarken API. Erreichen Sie Kunden sofort in über 190 Ländern mit einer Zustellrate von 99,9%.',
        getStartedFree: 'Kostenlos starten',
        viewDemo: 'Demo ansehen',
        statsDeliveryRate: 'Zustellrate',
        statsCountries: 'Länder',
        statsResponseTime: 'Reaktionszeit'
    },
    fr: {
        title: 'SMSPM - API SMS mondiale et plateforme de messagerie en masse',
        heroBadge: 'Plus de 10 000 entreprises nous font confiance dans le monde entier',
        heroTitle: 'Messagerie SMS mondiale',
        heroTitleGradient: 'Simplifiée',
        heroSubtitle: 'Envoyez des messages SMS dans le monde entier grâce à une API puissante. Touchez vos clients instantanément dans plus de 190 pays avec un taux de délivrabilité de 99,9%.',
        getStartedFree: 'Commencer gratuitement',
        viewDemo: 'Voir la démo',
        statsDeliveryRate: 'Taux de délivrabilité',
        statsCountries: 'Pays',
        statsResponseTime: 'Temps de réponse'
    },
    lv: {
        title: 'SMSPM - Globāls SMS API un lielapjoma ziņapmaiņas platforma',
        heroBadge: 'Mums uzticas vairāk nekā 10 000 uzņēmumu visā pasaulē',
        heroTitle: 'Globāla SMS ziņapmaiņa',
        heroTitleGradient: 'Padarīta vienkārša',
        heroSubtitle: 'Sūtiet SMS ziņojumus visā pasaulē ar jaudīgu API. Sasniedziet klientus nekavējoties vairāk nekā 190 valstīs ar 99,9% piegādes līmeni.',
        getStartedFree: 'Sākt bezmaksas',
        viewDemo: 'Skatīt demo',
        statsDeliveryRate: 'Piegādes līmenis',
        statsCountries: 'Valstis',
        statsResponseTime: 'Reakcijas laiks'
    },
    lt: {
        title: 'SMSPM - Visuotinis SMS API ir masinių pranešimų platforma',
        heroBadge: 'Mumis pasitiki daugiau nei 10 000 įmonių visame pasaulyje',
        heroTitle: 'Visuotinis SMS pranešimų siuntimas',
        heroTitleGradient: 'Paprasta',
        heroSubtitle: 'Siųskite SMS pranešimus visame pasaulyje naudodami galingą API. Pasiekite klientus akimirksniu daugiau nei 190 šalių, užtikrindami 99,9 % pristatymo lygį.',
        getStartedFree: 'Pradėti nemokamai',
        viewDemo: 'Peržiūrėti demo',
        statsDeliveryRate: 'Pristatymo lygis',
        statsCountries: 'Šalys',
        statsResponseTime: 'Reakcijos laikas'
    }
};

function generateHomepage(lang) {
    const t = HOMEPAGE_TRANSLATIONS[lang];
    const template = `---
import Layout from "../../layouts/Layout.astro";
import Navigation from "../../components/Navigation.astro";
import Footer from "../../components/Footer.astro";
---

<Layout title="${t.title}">
  <Navigation />

  <!-- Hero Section -->
  <section class="hero relative pt-[140px] pb-20 overflow-hidden">
    <div class="hero-gradient-bg absolute top-0 left-0 right-0 bottom-0 -z-10">
    </div>
    <div class="container mx-auto px-8">
      <div
        class="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div class="hero-text">
          <div
            class="hero-badge inline-flex items-center gap-2 px-6 py-2 bg-cyan/10 border border-cyan/30 rounded-full text-sm text-cyan font-medium mb-8"
          >
            <span
              class="badge-dot w-2 h-2 bg-gradient-1 rounded-full animate-pulse-slow"
            ></span>
            ${t.heroBadge}
          </div>
          <h1
            class="hero-title text-4xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-dynamic-primary"
          >
            ${t.heroTitle}
            <span class="gradient-text block">${t.heroTitleGradient}</span>
          </h1>
          <p
            class="hero-subtitle text-xl text-dynamic-secondary leading-relaxed mb-8 max-w-[540px]"
          >
            ${t.heroSubtitle}
          </p>
          <div class="hero-actions flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="https://app.smspm.com/app/register"
              class="btn btn-primary btn-large"
            >
              ${t.getStartedFree}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 3L15 10L7 17"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </svg>
            </a>
            <a href="#demo" class="btn btn-secondary btn-large">
              ${t.viewDemo}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  stroke-width="2"></path>
                <path d="M8 7L13 10L8 13V7Z" fill="currentColor"></path>
              </svg>
            </a>
          </div>
          <div class="hero-stats flex flex-wrap gap-8">
            <div class="stat-item">
              <div
                class="stat-value text-3xl lg:text-4xl font-bold gradient-text"
              >
                99.9%
              </div>
              <div class="stat-label text-sm text-dynamic-tertiary">
                ${t.statsDeliveryRate}
              </div>
            </div>
            <div class="stat-item">
              <div
                class="stat-value text-3xl lg:text-4xl font-bold gradient-text"
              >
                190+
              </div>
              <div class="stat-label text-sm text-dynamic-tertiary">${t.statsCountries}</div>
            </div>
            <div class="stat-item">
              <div
                class="stat-value text-3xl lg:text-4xl font-bold gradient-text"
              >
                &lt;200ms
              </div>
              <div class="stat-label text-sm text-dynamic-tertiary">
                ${t.statsResponseTime}
              </div>
            </div>
          </div>
        </div>
        <div class="hero-visual relative h-[500px] hidden lg:block">
          <!-- Floating cards similar to English dashboard -->
          <div
            class="floating-card absolute top-5 left-10 w-[280px] bg-dynamic-primary border-dynamic-primary rounded-2xl p-6 shadow-2xl animate-float"
          >
            <div class="card-header flex justify-between items-center mb-4">
              <span class="card-icon text-2xl">📱</span>
              <span
                class="card-status px-3 py-1 bg-cyan/10 text-cyan rounded-lg text-xs font-semibold"
                >Sent</span
              >
            </div>
            <div class="card-content">
              <p class="card-message text-[15px] text-dynamic-secondary mb-2">
                Your order #12345 has been shipped!
              </p>
              <span class="card-time text-xs text-dynamic-tertiary"
                >Just now</span
              >
            </div>
          </div>
          <!-- ... rest of visual elements ... -->
        </div>
      </div>
    </div>
  </section>

  <!-- More sections can be added here or linked to original components -->
</Layout>
`;
    return template;
}

function generatePricingRedirect(lang) {
    return `---
export const prerender = true;
---
<meta http-equiv="refresh" content={"0;url=/" + "${lang}" + "/countries"} />
`;
}

// Main execution
LANGUAGES.forEach(lang => {
    const langDir = join(BASE_PAGES_DIR, lang);
    if (!existsSync(langDir)) {
        mkdirSync(langDir, { recursive: true });
    }

    // Generate index.astro
    const indexPath = join(langDir, 'index.astro');
    writeFileSync(indexPath, generateHomepage(lang));
    console.log('Generated index.astro for ' + lang);

    // Generate hinnad.astro (localized pricing redirect)
    const pricingPath = join(langDir, 'hinnad.astro');
    writeFileSync(pricingPath, generatePricingRedirect(lang));
    console.log('Generated hinnad.astro for ' + lang);
});

console.log('Static page generation complete.');
