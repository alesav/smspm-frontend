#!/usr/bin/env node
/**
 * Smart Country Pages Generator with Manual Override Protection
 * Supports Multi-language Generation
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  pricelistPath: join(__dirname, "../pricelist.json"),
  extractedCountriesPath: join(__dirname, "../data/extracted-countries.json"),
  metadataPath: join(__dirname, "../data/country-metadata.js"),
  baseOutputDir: join(__dirname, "../src/pages"),
  trackingFile: join(__dirname, "../data/generated-pages-tracking.json"),
  languages: ["en", "et", "ru", "es", "de", "fr", "lv", "lt"],
};

const TRANSLATIONS = {
  en: {
    heroBadge: "Global Coverage",
    heroTitle: "Send SMS to ",
    heroSubtitle: "Reach customers instantly with 99.5% delivery rate.",
    ctaTitle: "Ready to Send SMS to ",
    ctaSubtitle:
      "Join thousands of businesses using SMSPM for reliable message delivery",
    ctaButton: "Start Free Trial",
    ctaNote: "No credit card required · 50 free messages · Full API access",
    viewApi: "View API Docs",
    perMessage: "per message",
    pricingFrom: "Pricing from",
    breadcrumbHome: "Home",
    contactSupport: "Contact Support",
    marketDescription: "has a modern mobile infrastructure. SMS remains an effective communication channel for businesses.",
    useCases: {
      ecommerce: {
        title: "E-commerce & Retail",
        description: "Order confirmations and promotional campaigns for {country}'s retail market",
        examples: ["Order confirmations", "Shipping notifications", "Flash sale alerts"],
      },
      banking: {
        title: "Banking & FinTech",
        description: "OTP verification and transaction alerts for {country}'s financial sector",
        examples: ["OTP verification", "Transaction alerts", "Security notifications"],
      },
      healthcare: {
        title: "Healthcare",
        description: "Appointment reminders in {country}'s healthcare system",
        examples: ["Appointment reminders", "Test results", "Health tips"],
      },
      business: {
        title: "Business Services",
        description: "Customer engagement and notifications for businesses in {country}",
        examples: ["Meeting reminders", "Verification codes", "Status updates"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Data Protection",
        description: "Comply with local data protection regulations when sending SMS to {country}.",
      },
      optOut: {
        title: "Opt-out Requirements",
        description: "Respect user preferences and maintain opt-out lists.",
      },
      content: {
        title: "Content Guidelines",
        description: "Follow local content regulations and cultural norms.",
      },
    },
  },
  et: {
    heroBadge: "Globaalne haare",
    heroTitle: "Saada SMS ",
    heroSubtitle: "Jõua klientideni koheselt 99,9% kättetoimetamise määraga.",
    ctaTitle: "Kas oled valmis saatma SMS-e sihtkohta ",
    ctaSubtitle:
      "Liitu tuhandete ettevõtetega, kes kasutavad SMSPM-i usaldusväärseks sõnumivahetuseks",
    ctaButton: "Alusta tasuta prooviperioodi",
    ctaNote:
      "Krediitkaarti pole vaja · 50 tasuta sõnumit · Täielik API juurdepääs",
    viewApi: "Vaata API dokumentatsiooni",
    perMessage: "sõnumi kohta",
    pricingFrom: "Hind alates",
    breadcrumbHome: "Avaleht",
    contactSupport: "Võta ühendust toega",
    marketDescription: "omab kaasaegset mobiilsidevõrku. SMS jääb ettevõtetele tõhusaks suhtluskanaliks.",
    useCases: {
      ecommerce: {
        title: "E-kaubandus ja jaemüük",
        description: "Tellimuste kinnitused ja reklaamikampaaniad {country} jaemüügiturul",
        examples: ["Tellimuste kinnitused", "Tarneteatised", "Välkmüügi hoiatused"],
      },
      banking: {
        title: "Pangandus ja FinTech",
        description: "OTP kinnitused ja tehinguteatised {country} finantssektoris",
        examples: ["OTP kinnitamine", "Tehinguteatised", "Turvalisusteatised"],
      },
      healthcare: {
        title: "Tervishoiuteenused",
        description: "Vastuvõtu meeldetuletused {country} tervishoiusüsteemis",
        examples: ["Vastuvõtu meeldetuletused", "Testitulemused", "Tervise nõuanded"],
      },
      business: {
        title: "Äriteenused",
        description: "Klientide kaasamine ja teavitused ettevõtetele {country}",
        examples: ["Kohtumiste meeldetuletused", "Kinnituskoodid", "Oleku uuendused"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Andmekaitse",
        description: "Järgige kohalikke andmekaitsenõudeid SMS-ide saatmisel {country}.",
      },
      optOut: {
        title: "Loobumise nõuded",
        description: "Austage kasutajate eelistusi ja haldage loobumise nimekirju.",
      },
      content: {
        title: "Sisu juhised",
        description: "Järgige kohalikke sisu eeskirju ja kultuurilisi norme.",
      },
    },
  },
  ru: {
    heroBadge: "Глобальный охват",
    heroTitle: "Отправить SMS в ",
    heroSubtitle:
      "Мгновенно связывайтесь с клиентами с вероятностью доставки 99,9%.",
    ctaTitle: "Готовы отправить SMS в ",
    ctaSubtitle:
      "Присоединяйтесь к тысячам компаний, использующих SMSPM для надежной доставки сообщений",
    ctaButton: "Начать бесплатный период",
    ctaNote:
      "Без кредитной карты · 50 бесплатных сообщений · Полный доступ к API",
    viewApi: "Просмотреть документацию API",
    perMessage: "за сообщение",
    pricingFrom: "Цена от",
    breadcrumbHome: "Главная",
    contactSupport: "Связаться с поддержкой",
    marketDescription: "имеет современную мобильную инфраструктуру. SMS остается эффективным каналом связи для бизнеса.",
    useCases: {
      ecommerce: {
        title: "Электронная коммерция и розничная торговля",
        description: "Подтверждения заказов и рекламные кампании для розничного рынка {country}",
        examples: ["Подтверждения заказов", "Уведомления о доставке", "Уведомления о распродажах"],
      },
      banking: {
        title: "Банковские услуги и FinTech",
        description: "OTP-верификация и уведомления о транзакциях для финансового сектора {country}",
        examples: ["OTP-верификация", "Уведомления о транзакциях", "Уведомления безопасности"],
      },
      healthcare: {
        title: "Здравоохранение",
        description: "Напоминания о приемах в системе здравоохранения {country}",
        examples: ["Напоминания о приемах", "Результаты анализов", "Советы по здоровью"],
      },
      business: {
        title: "Бизнес-услуги",
        description: "Взаимодействие с клиентами и уведомления для бизнеса в {country}",
        examples: ["Напоминания о встречах", "Коды подтверждения", "Обновления статуса"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Защита данных",
        description: "Соблюдайте местные правила защиты данных при отправке SMS в {country}.",
      },
      optOut: {
        title: "Требования отказа",
        description: "Уважайте предпочтения пользователей и ведите списки отказа.",
      },
      content: {
        title: "Рекомендации по содержанию",
        description: "Следуйте местным правилам содержания и культурным нормам.",
      },
    },
  },
  es: {
    heroBadge: "Cobertura Global",
    heroTitle: "Enviar SMS a ",
    heroSubtitle:
      "Llegue a los clientes al instante con una tasa de entrega del 99,9%.",
    ctaTitle: "¿Listo para enviar SMS a ",
    ctaSubtitle:
      "Únase a miles de empresas que utilizan SMSPM para una entrega de mensajes confiable",
    ctaButton: "Iniciar prueba gratuita",
    ctaNote:
      "Sin tarjeta de crédito · 50 mensajes gratuitos · Acceso completo a la API",
    viewApi: "Ver documentos de la API",
    perMessage: "por mensaje",
    pricingFrom: "Precios desde",
    breadcrumbHome: "Inicio",
    contactSupport: "Contactar Soporte",
    marketDescription: "cuenta con una moderna infraestructura móvil. Los SMS siguen siendo un canal de comunicación efectivo para las empresas.",
    useCases: {
      ecommerce: {
        title: "Comercio Electrónico y Retail",
        description: "Confirmaciones de pedidos y campañas promocionales para el mercado minorista de {country}",
        examples: ["Confirmaciones de pedidos", "Notificaciones de envío", "Alertas de ofertas flash"],
      },
      banking: {
        title: "Banca y FinTech",
        description: "Verificación OTP y alertas de transacciones para el sector financiero de {country}",
        examples: ["Verificación OTP", "Alertas de transacciones", "Notificaciones de seguridad"],
      },
      healthcare: {
        title: "Atención Médica",
        description: "Recordatorios de citas en el sistema de salud de {country}",
        examples: ["Recordatorios de citas", "Resultados de pruebas", "Consejos de salud"],
      },
      business: {
        title: "Servicios Empresariales",
        description: "Interacción con clientes y notificaciones para empresas en {country}",
        examples: ["Recordatorios de reuniones", "Códigos de verificación", "Actualizaciones de estado"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Protección de Datos",
        description: "Cumpla con las regulaciones locales de protección de datos al enviar SMS a {country}.",
      },
      optOut: {
        title: "Requisitos de Exclusión",
        description: "Respete las preferencias de los usuarios y mantenga listas de exclusión.",
      },
      content: {
        title: "Directrices de Contenido",
        description: "Siga las regulaciones locales de contenido y normas culturales.",
      },
    },
  },
  de: {
    heroBadge: "Globale Abdeckung",
    heroTitle: "SMS senden nach ",
    heroSubtitle:
      "Erreichen Sie Kunden sofort mit einer Zustellrate von 99,9%.",
    ctaTitle: "Bereit, SMS zu senden an ",
    ctaSubtitle:
      "Schließen Sie sich Tausenden von Unternehmen an, die SMSPM für eine zuverlässige Nachrichtenübermittlung nutzen",
    ctaButton: "Kostenlose Testversion starten",
    ctaNote:
      "Keine Kreditkarte erforderlich · 50 kostenlose Nachrichten · Voller API-Zugriff",
    viewApi: "API-Dokumentation ansehen",
    perMessage: "pro Nachricht",
    pricingFrom: "Preise ab",
    breadcrumbHome: "Home",
    contactSupport: "Support kontaktieren",
    marketDescription: "verfügt über eine moderne mobile Infrastruktur. SMS bleibt ein effektiver Kommunikationskanal für Unternehmen.",
    useCases: {
      ecommerce: {
        title: "E-Commerce & Einzelhandel",
        description: "Auftragsbestätigungen und Werbekampagnen für den Einzelhandelsmarkt in {country}",
        examples: ["Auftragsbestätigungen", "Versandbenachrichtigungen", "Blitzangebote"],
      },
      banking: {
        title: "Banking & FinTech",
        description: "OTP-Verifizierung und Transaktionswarnungen für den Finanzsektor in {country}",
        examples: ["OTP-Verifizierung", "Transaktionswarnungen", "Sicherheitsbenachrichtigungen"],
      },
      healthcare: {
        title: "Gesundheitswesen",
        description: "Terminerinnerungen im Gesundheitssystem von {country}",
        examples: ["Terminerinnerungen", "Testergebnisse", "Gesundheitstipps"],
      },
      business: {
        title: "Unternehmensdienstleistungen",
        description: "Kundenbindung und Benachrichtigungen für Unternehmen in {country}",
        examples: ["Besprechungserinnerungen", "Bestätigungscodes", "Statusaktualisierungen"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Datenschutz",
        description: "Beachten Sie die lokalen Datenschutzbestimmungen beim Versenden von SMS nach {country}.",
      },
      optOut: {
        title: "Opt-out-Anforderungen",
        description: "Respektieren Sie die Präferenzen der Benutzer und pflegen Sie Opt-out-Listen.",
      },
      content: {
        title: "Inhaltsrichtlinien",
        description: "Befolgen Sie lokale Inhaltsvorschriften und kulturelle Normen.",
      },
    },
  },
  fr: {
    heroBadge: "Couverture Mondiale",
    heroTitle: "Envoyer un SMS à ",
    heroSubtitle:
      "Touchez vos clients instantanément avec un taux de délivrabilité de 99,9%.",
    ctaTitle: "Prêt à envoyer des SMS vers ",
    ctaSubtitle:
      "Rejoignez des milliers d'entreprises qui utilisent SMSPM pour une livraison de messages fiable",
    ctaButton: "Commencer l'essai gratuit",
    ctaNote:
      "Aucune carte de crédit requise · 50 messages gratuits · Accès complet à l'API",
    viewApi: "Voir la documentation API",
    perMessage: "par message",
    pricingFrom: "Tarifs à partir de",
    breadcrumbHome: "Accueil",
    contactSupport: "Contacter le Support",
    marketDescription: "dispose d'une infrastructure mobile moderne. Le SMS reste un canal de communication efficace pour les entreprises.",
    useCases: {
      ecommerce: {
        title: "E-commerce et Vente au Détail",
        description: "Confirmations de commande et campagnes promotionnelles pour le marché de détail de {country}",
        examples: ["Confirmations de commande", "Notifications d'expédition", "Alertes de ventes flash"],
      },
      banking: {
        title: "Banque et FinTech",
        description: "Vérification OTP et alertes de transaction pour le secteur financier de {country}",
        examples: ["Vérification OTP", "Alertes de transaction", "Notifications de sécurité"],
      },
      healthcare: {
        title: "Santé",
        description: "Rappels de rendez-vous dans le système de santé de {country}",
        examples: ["Rappels de rendez-vous", "Résultats de tests", "Conseils santé"],
      },
      business: {
        title: "Services Professionnels",
        description: "Engagement client et notifications pour les entreprises en {country}",
        examples: ["Rappels de réunion", "Codes de vérification", "Mises à jour de statut"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Protection des Données",
        description: "Respectez les réglementations locales sur la protection des données lors de l'envoi de SMS vers {country}.",
      },
      optOut: {
        title: "Exigences de Désinscription",
        description: "Respectez les préférences des utilisateurs et maintenez des listes de désinscription.",
      },
      content: {
        title: "Directives de Contenu",
        description: "Suivez les réglementations locales sur le contenu et les normes culturelles.",
      },
    },
  },
  lv: {
    heroBadge: "Globāls pārklājums",
    heroTitle: "Sūtīt SMS uz ",
    heroSubtitle: "Sasniedziet klientus nekavējoties ar 99,9% piegādes līmeni.",
    ctaTitle: "Gatavs sūtīt SMS uz ",
    ctaSubtitle:
      "Pievienojieties tūkstošiem uzņēmumu, kas izmanto SMSPM drošai ziņojumu piegādei",
    ctaButton: "Sākt bezmaksas izmēģinājumu",
    ctaNote:
      "Nav nepieciešama kredītkarte · 50 bezmaksas ziņapmaiņas · Pilna piekļuve API",
    viewApi: "Skatīt API dokumentāciju",
    perMessage: "par ziņu",
    pricingFrom: "Cena no",
    breadcrumbHome: "Sākums",
    contactSupport: "Sazināties ar atbalstu",
    marketDescription: "ir moderna mobilo sakaru infrastruktūra. SMS joprojām ir efektīvs komunikācijas kanāls uzņēmumiem.",
    useCases: {
      ecommerce: {
        title: "E-komercija un Mazumtirdzniecība",
        description: "Pasūtījumu apstiprinājumi un reklāmas kampaņas {country} mazumtirdzniecības tirgum",
        examples: ["Pasūtījumu apstiprinājumi", "Piegādes paziņojumi", "Zibatlaižu brīdinājumi"],
      },
      banking: {
        title: "Banku un FinTech",
        description: "OTP verificēšana un darījumu brīdinājumi {country} finanšu sektoram",
        examples: ["OTP verificēšana", "Darījumu brīdinājumi", "Drošības paziņojumi"],
      },
      healthcare: {
        title: "Veselības aprūpe",
        description: "Pieraksta atgādinājumi {country} veselības aprūpes sistēmā",
        examples: ["Pieraksta atgādinājumi", "Testa rezultāti", "Veselības padomi"],
      },
      business: {
        title: "Biznesa pakalpojumi",
        description: "Klientu iesaiste un paziņojumi uzņēmumiem {country}",
        examples: ["Sanāksmju atgādinājumi", "Verificēšanas kodi", "Statusa atjauninājumi"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Datu aizsardzība",
        description: "Ievērojiet vietējos datu aizsardzības noteikumus, sūtot SMS uz {country}.",
      },
      optOut: {
        title: "Atteikšanās prasības",
        description: "Respektējiet lietotāju preferences un uzturiet atteikšanās sarakstus.",
      },
      content: {
        title: "Satura vadlīnijas",
        description: "Ievērojiet vietējos satura noteikumus un kultūras normas.",
      },
    },
  },
  lt: {
    heroBadge: "Visuotinis padengimas",
    heroTitle: "Siųsti SMS į ",
    heroSubtitle: "Pasiekite klientus akimirksniu su 99,9% pristatymo lygiu.",
    ctaTitle: "Esate pasiruošę siųsti SMS į ",
    ctaSubtitle:
      "Prisijunkite prie tūkstančių įmonių, naudojančių SMSPM patikimam pranešimų pristatymui",
    ctaButton: "Pradėti nemokamą bandomąjį laikotarpį",
    ctaNote:
      "Nereikia kredito kortelės · 50 nemokamų pranešimų · Pilna prieiga prie API",
    viewApi: "Peržiūrėti API dokumentaciją",
    perMessage: "už pranešimą",
    pricingFrom: "Kaina nuo",
    breadcrumbHome: "Pradžia",
    contactSupport: "Susisiekti su palaikymu",
    marketDescription: "turi modernią mobiliojo ryšio infrastruktūrą. SMS išlieka veiksmingu verslo komunikacijos kanalu.",
    useCases: {
      ecommerce: {
        title: "El. prekyba ir Mažmeninė prekyba",
        description: "Užsakymų patvirtinimai ir reklaminės kampanijos {country} mažmeninės prekybos rinkai",
        examples: ["Užsakymų patvirtinimai", "Pristatymo pranešimai", "Žaibo išpardavimų įspėjimai"],
      },
      banking: {
        title: "Bankininkystė ir FinTech",
        description: "OTP patvirtinimas ir sandorių įspėjimai {country} finansų sektoriui",
        examples: ["OTP patvirtinimas", "Sandorių įspėjimai", "Saugumo pranešimai"],
      },
      healthcare: {
        title: "Sveikatos priežiūra",
        description: "Vizitų priminimai {country} sveikatos priežiūros sistemoje",
        examples: ["Vizitų priminimai", "Tyrimų rezultatai", "Sveikatos patarimai"],
      },
      business: {
        title: "Verslo paslaugos",
        description: "Klientų įtraukimas ir pranešimai įmonėms {country}",
        examples: ["Susitikimų priminimai", "Patvirtinimo kodai", "Būsenos atnaujinimai"],
      },
    },
    regulations: {
      dataProtection: {
        title: "Duomenų apsauga",
        description: "Laikykitės vietinių duomenų apsaugos taisyklių siųsdami SMS į {country}.",
      },
      optOut: {
        title: "Atsisakymo reikalavimai",
        description: "Gerbkite vartotojų pageidavimus ir tvarkykite atsisakymo sąrašus.",
      },
      content: {
        title: "Turinio gairės",
        description: "Laikykitės vietinių turinio taisyklių ir kultūrinių normų.",
      },
    },
  },
};

// Pages that should NEVER be regenerated
const PROTECTED_PAGES = [
  // 'en/country/send-sms-estonia.astro',
  // 'en/country/send-sms-united-kingdom.astro',
  // 'en/country/send-sms-germany.astro',
  // 'en/country/send-sms-france.astro',
  // 'en/country/send-sms-spain.astro',
];

/**
 * Load or initialize page tracking
 */
function loadTracking() {
  if (existsSync(CONFIG.trackingFile)) {
    return JSON.parse(readFileSync(CONFIG.trackingFile, "utf-8"));
  }
  return {
    version: "1.1.0",
    templateHash: "",
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
  const templateContent = generatePageTemplate("en", "Test Country", [], {
    code: "xx",
    flag: "🏴",
    currency: "EUR",
    callingCode: "+999",
    timezone: "UTC",
    population: "1M",
    mobileUsers: "1M",
    slug: "test",
  });
  return createHash("md5").update(templateContent).digest("hex");
}

/**
 * Generate page template
 */
function generatePageTemplate(lang, countryName, providers, metadata) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const startingPrice =
    providers.length > 0
      ? Math.min(...providers.map((p) => p.price)).toFixed(3)
      : "0.000";

  const localizedCountryName = metadata[`name_${lang}`] || countryName;
  const escapedCountryName = localizedCountryName.replace(/'/g, "\\'");

  const providersList = providers
    .map((p) => {
      const escapedProviderName = p.name.replace(/'/g, "\\'");
      return `    { name: '${escapedProviderName}', price: ${p.price} },`;
    })
    .join("\n");

  // Slug logic for canonicals with localized URL prefixes
  const slugLocalized = metadata[`slug_${lang}`] || metadata.slug;

  // URL prefix mapping for each language
  const urlPrefixes = {
    en: "send-sms-",
    et: "saada-sms-",
    ru: "otpravit-sms-",
    es: "enviar-sms-",
    de: "sms-senden-",
    fr: "envoyer-sms-",
    lv: "sutit-sms-",
    lt: "siusti-sms-",
  };

  const urlPrefix = urlPrefixes[lang] || "send-sms-";

  const alternateLinks = [
    { lang: "en", slug: metadata.slug, prefix: "send-sms-" },
    {
      lang: "et",
      slug: metadata.slug_et || metadata.slug,
      prefix: "saada-sms-",
    },
    {
      lang: "ru",
      slug: metadata.slug_ru || metadata.slug,
      prefix: "otpravit-sms-",
    },
    {
      lang: "es",
      slug: metadata.slug_es || metadata.slug,
      prefix: "enviar-sms-",
    },
    {
      lang: "de",
      slug: metadata.slug_de || metadata.slug,
      prefix: "sms-senden-",
    },
    {
      lang: "fr",
      slug: metadata.slug_fr || metadata.slug,
      prefix: "envoyer-sms-",
    },
    {
      lang: "lv",
      slug: metadata.slug_lv || metadata.slug,
      prefix: "sutit-sms-",
    },
    {
      lang: "lt",
      slug: metadata.slug_lt || metadata.slug,
      prefix: "siusti-sms-",
    },
  ]
    .map(
      (alt) =>
        `    <link rel="alternate" hreflang="${alt.lang}" href={\`https://smspm.com/${alt.lang}/country/${alt.prefix}${alt.slug}\`} />`,
    )
    .join("\n");

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
import CountryFAQ from '../../../components/country/CountryFAQ.astro';
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
  marketDescription: \`\${countryName} ${t.marketDescription}\`,
  useCases: [
    {
      title: '${t.useCases.ecommerce.title.replace(/'/g, "\\'")}',
      description: \`${t.useCases.ecommerce.description.replace('{country}', "' + countryName + '")}\`,
      examples: ['${t.useCases.ecommerce.examples.join("', '")}'],
      icon: 'fas fa-shopping-cart'
    },
    {
      title: '${t.useCases.banking.title.replace(/'/g, "\\'")}',
      description: \`${t.useCases.banking.description.replace('{country}', "' + countryName + '")}\`,
      examples: ['${t.useCases.banking.examples.join("', '")}'],
      icon: 'fas fa-university'
    },
    {
      title: '${t.useCases.healthcare.title.replace(/'/g, "\\'")}',
      description: \`${t.useCases.healthcare.description.replace('{country}', "' + countryName + '")}\`,
      examples: ['${t.useCases.healthcare.examples.join("', '")}'],
      icon: 'fas fa-heartbeat'
    },
    {
      title: '${t.useCases.business.title.replace(/'/g, "\\'")}',
      description: \`${t.useCases.business.description.replace('{country}', "' + countryName + '")}\`,
      examples: ['${t.useCases.business.examples.join("', '")}'],
      icon: 'fas fa-briefcase'
    }
  ],
  regulations: [
    {
      title: '${t.regulations.dataProtection.title.replace(/'/g, "\\'")}',
      description: \`${t.regulations.dataProtection.description.replace('{country}', "' + countryName + '")}\`,
      icon: 'fas fa-shield-alt'
    },
    {
      title: '${t.regulations.optOut.title.replace(/'/g, "\\'")}',
      description: \`${t.regulations.optOut.description.replace(/'/g, "\\'")}.\`,
      icon: 'fas fa-user-check'
    },
    {
      title: '${t.regulations.content.title.replace(/'/g, "\\'")}',
      description: \`${t.regulations.content.description.replace(/'/g, "\\'")}.\`,
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
    <CountryHero country={country} lang={lang} />
    <CountryInfo country={country} lang={lang} />
    <MobileProviders country={country} lang={lang} />
    <UseCases country={country} lang={lang} />
    <ApiIntegration country={country} lang={lang} />
    <CountryFAQ country={country} lang={lang} />
    <RegulatoryInfo country={country} lang={lang} />
    
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
          <a href="https://smspm.freshdesk.com/support/tickets/new" class="btn btn-secondary btn-large light text-white border-white/30 hover:bg-white/10">
            ${t.contactSupport}
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
  console.log("🚀 Starting multi-language smart country page generation...\n");

  const extractedData = JSON.parse(
    readFileSync(CONFIG.extractedCountriesPath, "utf-8"),
  );
  const { countries } = extractedData;
  const tracking = loadTracking();
  const templateHash = getTemplateHash();
  const templateChanged = tracking.templateHash !== templateHash;

  const { getCountryMetadata } = await import("file://" + CONFIG.metadataPath);

  for (const lang of CONFIG.languages) {
    console.log(`\n🌐 Processing language: ${lang.toUpperCase()}`);
    const langOutputDir = join(CONFIG.baseOutputDir, lang, "country");

    if (!existsSync(langOutputDir)) {
      mkdirSync(langOutputDir, { recursive: true });
    }

    for (const countryData of countries) {
      const { name, providers } = countryData;
      const metadata = getCountryMetadata(name);

      // URL prefix mapping for each language
      const urlPrefixes = {
        en: "send-sms-",
        et: "saada-sms-",
        ru: "otpravit-sms-",
        es: "enviar-sms-",
        de: "sms-senden-",
        fr: "envoyer-sms-",
        lv: "sutit-sms-",
        lt: "siusti-sms-",
      };

      const slugLocalized = metadata[`slug_${lang}`] || metadata.slug;
      const urlPrefix = urlPrefixes[lang] || "send-sms-";
      const filename = `${urlPrefix}${slugLocalized}.astro`;

      const relativePath = `${lang}/country/${filename}`;
      const filepath = join(langOutputDir, filename);

      if (PROTECTED_PAGES.includes(relativePath)) {
        console.log(`🔒 PROTECTED: ${relativePath}`);
        continue;
      }

      const fileExists = existsSync(filepath);
      const pageTracking = tracking.pages[relativePath] || {};
      const isManual = fileExists && pageTracking.type === "manual";

      if (isManual) {
        console.log(`✏️  MANUAL: ${relativePath}`);
        continue;
      }

      const shouldGenerate =
        force ||
        !fileExists ||
        (templateChanged && pageTracking.type === "template");

      if (shouldGenerate) {
        const content = generatePageTemplate(lang, name, providers, metadata);
        if (!dryRun) {
          writeFileSync(filepath, content);
          console.log(`✅ GENERATED: ${relativePath}`);
          tracking.pages[relativePath] = {
            type: "template",
            contentHash: createHash("md5").update(content).digest("hex"),
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
  console.log("\n✨ Generation Complete!\n");
}

const args = process.argv.slice(2);
const options = {
  force: args.includes("--force"),
  dryRun: args.includes("--dry-run"),
};

generatePages(options).catch(console.error);
