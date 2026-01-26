#!/usr/bin/env node
/**
 * Generate Privacy Policy pages for all languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const translations = {
  en: {
    metaTitle: "Privacy Policy - SMSPM",
    metaDescription: "Learn how SMSPM protects your privacy and handles your personal data in compliance with GDPR.",
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 21, 2026",
    intro: {
      title: "1. Introduction",
      text: 'iSMS Solutions OÜ ("we", "our", or "us") operates the SMSPM platform. We are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, and protect your information when you use our services.',
    },
    dataCollection: {
      title: "2. Data Collection",
      text: "We collect information you provide directly to us, including:",
      items: [
        "Account information (name, email, organization)",
        "Payment and billing information",
        "Message content and recipient numbers",
        "Technical data (IP address, browser type, device info)",
      ],
    },
    useOfInfo: {
      title: "3. Use of Information",
      text: "We use the collected information to:",
      items: [
        "Provide and maintain our SMS services",
        "Process transactions and send billing notifications",
        "Comply with legal and regulatory requirements",
        "Improve our platform and developer tools",
      ],
    },
    gdpr: {
      title: "4. GDPR Compliance",
      text: "As an Estonian company, we strictly adhere to the General Data Protection Regulation (GDPR). We process all personal data within the EEA or under standard contractual clauses that ensure an equivalent level of protection.",
    },
    rights: {
      title: "5. Your Rights",
      text: "Under GDPR, you have the right to:",
      items: [
        "Access your personal data",
        "Rectify inaccurate data",
        'Request erasure of your data ("right to be forgotten")',
        "Export your data in a portable format",
      ],
    },
    contact: {
      title: "6. Contact Us",
      text: "If you have any questions about this Privacy Policy, please contact us at",
    },
  },
  et: {
    metaTitle: "Privaatsuspoliitika - SMSPM",
    metaDescription: "Õppige, kuidas SMSPM kaitseb teie privaatsust ja käsitleb isikuandmeid vastavalt GDPR-ile.",
    title: "Privaatsuspoliitika",
    lastUpdated: "Viimati uuendatud: 21. jaanuar 2026",
    intro: {
      title: "1. Sissejuhatus",
      text: 'iSMS Solutions OÜ ("meie") haldab SMSPM platvormi. Oleme pühendunud teie privaatsuse kaitsele ja teie isikuandmete turvalisuse tagamisele. See privaatsuspoliitika selgitab, kuidas me kogume, kasutame ja kaitseme teie teavet, kui kasutate meie teenuseid.',
    },
    dataCollection: {
      title: "2. Andmete kogumine",
      text: "Kogume teavet, mille te meile otse esitate, sealhulgas:",
      items: [
        "Konto teave (nimi, e-post, organisatsioon)",
        "Makse- ja arveldusinfo",
        "Sõnumi sisu ja saajate numbrid",
        "Tehnilised andmed (IP-aadress, brauseri tüüp, seadme info)",
      ],
    },
    useOfInfo: {
      title: "3. Teabe kasutamine",
      text: "Kasutame kogutud teavet järgmiseks:",
      items: [
        "SMS-teenuste pakkumine ja haldamine",
        "Tehingute töötlemine ja arvete saatmine",
        "Õiguslike ja regulatiivsete nõuete täitmine",
        "Meie platvormi ja arendajatööriistade täiustamine",
      ],
    },
    gdpr: {
      title: "4. GDPR vastavus",
      text: "Eesti ettevõttena järgime rangelt Üldist Andmekaitsemäärust (GDPR). Töötleme kõiki isikuandmeid EMP-s või standardlepinguliste klauslite alusel, mis tagavad samaväärse kaitse taseme.",
    },
    rights: {
      title: "5. Teie õigused",
      text: "GDPR alusel on teil õigus:",
      items: [
        "Juurdepääs oma isikuandmetele",
        "Ebatäpsete andmete parandamine",
        'Taotleda oma andmete kustutamist ("õigus olla unustatud")',
        "Eksportida oma andmeid kantavas vormingus",
      ],
    },
    contact: {
      title: "6. Võtke ühendust",
      text: "Kui teil on küsimusi selle privaatsuspoliitika kohta, võtke meiega ühendust aadressil",
    },
  },
  ru: {
    metaTitle: "Политика конфиденциальности - SMSPM",
    metaDescription: "Узнайте, как SMSPM защищает вашу конфиденциальность и обрабатывает персональные данные в соответствии с GDPR.",
    title: "Политика конфиденциальности",
    lastUpdated: "Последнее обновление: 21 января 2026 г.",
    intro: {
      title: "1. Введение",
      text: 'iSMS Solutions OÜ ("мы") управляет платформой SMSPM. Мы стремимся защищать вашу конфиденциальность и обеспечивать безопасность ваших персональных данных. Эта Политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу информацию при использовании наших услуг.',
    },
    dataCollection: {
      title: "2. Сбор данных",
      text: "Мы собираем информацию, которую вы предоставляете нам напрямую, включая:",
      items: [
        "Информация об учетной записи (имя, электронная почта, организация)",
        "Платежная и расчетная информация",
        "Содержание сообщений и номера получателей",
        "Технические данные (IP-адрес, тип браузера, информация об устройстве)",
      ],
    },
    useOfInfo: {
      title: "3. Использование информации",
      text: "Мы используем собранную информацию для:",
      items: [
        "Предоставления и поддержки наших SMS-услуг",
        "Обработки транзакций и отправки уведомлений о выставлении счетов",
        "Соблюдения юридических и нормативных требований",
        "Улучшения нашей платформы и инструментов разработчика",
      ],
    },
    gdpr: {
      title: "4. Соответствие GDPR",
      text: "Как эстонская компания, мы строго соблюдаем Общий регламент по защите данных (GDPR). Мы обрабатываем все персональные данные в пределах ЕЭЗ или в соответствии со стандартными договорными оговорками, которые обеспечивают эквивалентный уровень защиты.",
    },
    rights: {
      title: "5. Ваши права",
      text: "В соответствии с GDPR вы имеете право:",
      items: [
        "Получить доступ к своим персональным данным",
        "Исправить неточные данные",
        'Запросить удаление своих данных ("право быть забытым")',
        "Экспортировать свои данные в переносимом формате",
      ],
    },
    contact: {
      title: "6. Свяжитесь с нами",
      text: "Если у вас есть вопросы об этой Политике конфиденциальности, свяжитесь с нами по адресу",
    },
  },
  es: {
    metaTitle: "Política de Privacidad - SMSPM",
    metaDescription: "Descubra cómo SMSPM protege su privacidad y maneja sus datos personales en cumplimiento con GDPR.",
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 21 de enero de 2026",
    intro: {
      title: "1. Introducción",
      text: 'iSMS Solutions OÜ ("nosotros") opera la plataforma SMSPM. Estamos comprometidos a proteger su privacidad y garantizar la seguridad de sus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información cuando utiliza nuestros servicios.',
    },
    dataCollection: {
      title: "2. Recopilación de Datos",
      text: "Recopilamos información que nos proporciona directamente, incluyendo:",
      items: [
        "Información de la cuenta (nombre, correo electrónico, organización)",
        "Información de pago y facturación",
        "Contenido de mensajes y números de destinatarios",
        "Datos técnicos (dirección IP, tipo de navegador, información del dispositivo)",
      ],
    },
    useOfInfo: {
      title: "3. Uso de la Información",
      text: "Utilizamos la información recopilada para:",
      items: [
        "Proporcionar y mantener nuestros servicios SMS",
        "Procesar transacciones y enviar notificaciones de facturación",
        "Cumplir con requisitos legales y regulatorios",
        "Mejorar nuestra plataforma y herramientas para desarrolladores",
      ],
    },
    gdpr: {
      title: "4. Cumplimiento de GDPR",
      text: "Como empresa estonia, cumplimos estrictamente con el Reglamento General de Protección de Datos (GDPR). Procesamos todos los datos personales dentro del EEE o bajo cláusulas contractuales estándar que garantizan un nivel equivalente de protección.",
    },
    rights: {
      title: "5. Sus Derechos",
      text: "Bajo GDPR, usted tiene derecho a:",
      items: [
        "Acceder a sus datos personales",
        "Rectificar datos inexactos",
        'Solicitar la eliminación de sus datos ("derecho al olvido")',
        "Exportar sus datos en un formato portátil",
      ],
    },
    contact: {
      title: "6. Contáctenos",
      text: "Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en",
    },
  },
  de: {
    metaTitle: "Datenschutzrichtlinie - SMSPM",
    metaDescription: "Erfahren Sie, wie SMSPM Ihre Privatsphäre schützt und Ihre persönlichen Daten gemäß DSGVO verarbeitet.",
    title: "Datenschutzrichtlinie",
    lastUpdated: "Zuletzt aktualisiert: 21. Januar 2026",
    intro: {
      title: "1. Einführung",
      text: 'iSMS Solutions OÜ ("wir") betreibt die SMSPM-Plattform. Wir verpflichten uns, Ihre Privatsphäre zu schützen und die Sicherheit Ihrer persönlichen Daten zu gewährleisten. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden und schützen, wenn Sie unsere Dienste nutzen.',
    },
    dataCollection: {
      title: "2. Datenerfassung",
      text: "Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, einschließlich:",
      items: [
        "Kontoinformationen (Name, E-Mail, Organisation)",
        "Zahlungs- und Rechnungsinformationen",
        "Nachrichteninhalte und Empfängernummern",
        "Technische Daten (IP-Adresse, Browsertyp, Geräteinformationen)",
      ],
    },
    useOfInfo: {
      title: "3. Verwendung von Informationen",
      text: "Wir verwenden die gesammelten Informationen für:",
      items: [
        "Bereitstellung und Wartung unserer SMS-Dienste",
        "Verarbeitung von Transaktionen und Versand von Rechnungsbenachrichtigungen",
        "Einhaltung gesetzlicher und behördlicher Anforderungen",
        "Verbesserung unserer Plattform und Entwicklertools",
      ],
    },
    gdpr: {
      title: "4. DSGVO-Konformität",
      text: "Als estnisches Unternehmen halten wir uns strikt an die Datenschutz-Grundverordnung (DSGVO). Wir verarbeiten alle personenbezogenen Daten innerhalb des EWR oder unter Standardvertragsklauseln, die ein gleichwertiges Schutzniveau gewährleisten.",
    },
    rights: {
      title: "5. Ihre Rechte",
      text: "Gemäß DSGVO haben Sie das Recht:",
      items: [
        "Auf Ihre personenbezogenen Daten zuzugreifen",
        "Unrichtige Daten zu berichtigen",
        'Die Löschung Ihrer Daten zu beantragen ("Recht auf Vergessenwerden")',
        "Ihre Daten in einem portablen Format zu exportieren",
      ],
    },
    contact: {
      title: "6. Kontaktieren Sie uns",
      text: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns unter",
    },
  },
  fr: {
    metaTitle: "Politique de Confidentialité - SMSPM",
    metaDescription: "Découvrez comment SMSPM protège votre vie privée et traite vos données personnelles conformément au RGPD.",
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : 21 janvier 2026",
    intro: {
      title: "1. Introduction",
      text: 'iSMS Solutions OÜ ("nous") exploite la plateforme SMSPM. Nous nous engageons à protéger votre vie privée et à garantir la sécurité de vos données personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez nos services.',
    },
    dataCollection: {
      title: "2. Collecte de Données",
      text: "Nous collectons les informations que vous nous fournissez directement, notamment :",
      items: [
        "Informations de compte (nom, e-mail, organisation)",
        "Informations de paiement et de facturation",
        "Contenu des messages et numéros des destinataires",
        "Données techniques (adresse IP, type de navigateur, informations sur l'appareil)",
      ],
    },
    useOfInfo: {
      title: "3. Utilisation des Informations",
      text: "Nous utilisons les informations collectées pour :",
      items: [
        "Fournir et maintenir nos services SMS",
        "Traiter les transactions et envoyer des notifications de facturation",
        "Respecter les exigences légales et réglementaires",
        "Améliorer notre plateforme et nos outils pour développeurs",
      ],
    },
    gdpr: {
      title: "4. Conformité au RGPD",
      text: "En tant qu'entreprise estonienne, nous respectons strictement le Règlement Général sur la Protection des Données (RGPD). Nous traitons toutes les données personnelles au sein de l'EEE ou sous des clauses contractuelles types qui garantissent un niveau de protection équivalent.",
    },
    rights: {
      title: "5. Vos Droits",
      text: "En vertu du RGPD, vous avez le droit de :",
      items: [
        "Accéder à vos données personnelles",
        "Rectifier les données inexactes",
        'Demander l\'effacement de vos données ("droit à l\'oubli")',
        "Exporter vos données dans un format portable",
      ],
    },
    contact: {
      title: "6. Nous Contacter",
      text: "Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter à",
    },
  },
  lv: {
    metaTitle: "Privātuma politika - SMSPM",
    metaDescription: "Uzziniet, kā SMSPM aizsargā jūsu privātumu un apstrādā jūsu personas datus atbilstoši VDAR.",
    title: "Privātuma politika",
    lastUpdated: "Pēdējo reizi atjaunināts: 2026. gada 21. janvārī",
    intro: {
      title: "1. Ievads",
      text: 'iSMS Solutions OÜ ("mēs") darbojas SMSPM platformā. Mēs esam apņēmušies aizsargāt jūsu privātumu un nodrošināt jūsu personas datu drošību. Šī Privātuma politika izskaidro, kā mēs vācam, izmantojam un aizsargājam jūsu informāciju, kad izmantojat mūsu pakalpojumus.',
    },
    dataCollection: {
      title: "2. Datu vākšana",
      text: "Mēs vācam informāciju, ko jūs mums tieši sniedzat, tai skaitā:",
      items: [
        "Konta informācija (vārds, e-pasts, organizācija)",
        "Maksājumu un norēķinu informācija",
        "Ziņojumu saturs un saņēmēju numuri",
        "Tehniskie dati (IP adrese, pārlūkprogrammas veids, ierīces informācija)",
      ],
    },
    useOfInfo: {
      title: "3. Informācijas izmantošana",
      text: "Mēs izmantojam savākto informāciju, lai:",
      items: [
        "Nodrošinātu un uzturētu mūsu SMS pakalpojumus",
        "Apstrādātu darījumus un nosūtītu rēķinu paziņojumus",
        "Ievērotu juridiskās un regulējošās prasības",
        "Uzlabotu mūsu platformu un izstrādātāju rīkus",
      ],
    },
    gdpr: {
      title: "4. VDAR atbilstība",
      text: "Kā Igaunijas uzņēmums, mēs stingri ievērojam Vispārīgo datu aizsardzības regulu (VDAR). Mēs apstrādājam visus personas datus EEZ ietvaros vai saskaņā ar standarta līguma klauzulām, kas nodrošina līdzvērtīgu aizsardzības līmeni.",
    },
    rights: {
      title: "5. Jūsu tiesības",
      text: "Saskaņā ar VDAR jums ir tiesības:",
      items: [
        "Piekļūt saviem personas datiem",
        "Labot neprecīzus datus",
        'Pieprasīt savu datu dzēšanu ("tiesības tikt aizmirstam")',
        "Eksportēt savus datus pārnesamā formātā",
      ],
    },
    contact: {
      title: "6. Sazinieties ar mums",
      text: "Ja jums ir kādi jautājumi par šo Privātuma politiku, lūdzu, sazinieties ar mums",
    },
  },
  lt: {
    metaTitle: "Privatumo politika - SMSPM",
    metaDescription: "Sužinokite, kaip SMSPM apsaugo jūsų privatumą ir tvarko asmens duomenis laikydamasis BDAR.",
    title: "Privatumo politika",
    lastUpdated: "Paskutinį kartą atnaujinta: 2026 m. sausio 21 d.",
    intro: {
      title: "1. Įvadas",
      text: 'iSMS Solutions OÜ ("mes") valdome SMSPM platformą. Esame įsipareigoję apsaugoti jūsų privatumą ir užtikrinti jūsų asmens duomenų saugumą. Ši Privatumo politika paaiškina, kaip renkame, naudojame ir saugome jūsų informaciją, kai naudojatės mūsų paslaugomis.',
    },
    dataCollection: {
      title: "2. Duomenų rinkimas",
      text: "Renkame informaciją, kurią mums tiesiogiai pateikiate, įskaitant:",
      items: [
        "Paskyros informacija (vardas, el. paštas, organizacija)",
        "Mokėjimo ir atsiskaitymo informacija",
        "Pranešimų turinys ir gavėjų numeriai",
        "Techniniai duomenys (IP adresas, naršyklės tipas, įrenginio informacija)",
      ],
    },
    useOfInfo: {
      title: "3. Informacijos naudojimas",
      text: "Surinktą informaciją naudojame, kad:",
      items: [
        "Teiktume ir palaikytume savo SMS paslaugas",
        "Tvarkytume sandorius ir siųstume atsiskaitymo pranešimus",
        "Laikytumės teisinių ir reguliavimo reikalavimų",
        "Tobulintume savo platformą ir kūrėjų įrankius",
      ],
    },
    gdpr: {
      title: "4. BDAR atitiktis",
      text: "Kaip Estijos įmonė, griežtai laikomės Bendrojo duomenų apsaugos reglamento (BDAR). Visus asmens duomenis tvarkome EEE ribose arba pagal standartines sutarties sąlygas, kurios užtikrina lygiavertį apsaugos lygį.",
    },
    rights: {
      title: "5. Jūsų teisės",
      text: "Pagal BDAR turite teisę:",
      items: [
        "Gauti prieigą prie savo asmens duomenų",
        "Ištaisyti netikslus duomenis",
        'Prašyti ištrinti savo duomenis ("teisė būti pamirštam")',
        "Eksportuoti savo duomenis perkeliamu formatu",
      ],
    },
    contact: {
      title: "6. Susisiekite su mumis",
      text: "Jei turite klausimų apie šią Privatumo politiką, susisiekite su mumis",
    },
  },
};

const template = (lang, t) => `---
import Layout from "../../layouts/Layout.astro";
import Navigation from "../../components/Navigation.astro";
import Footer from "../../components/Footer.astro";

const lang = '${lang}';
---

<Layout title="${t.metaTitle}" description="${t.metaDescription}">
    <Navigation lang={lang} />

    <main class="pt-[120px] pb-20">
        <section class="py-16">
            <div class="container mx-auto px-8 max-w-4xl">
                <h1 class="text-4xl lg:text-6xl font-extrabold mb-8 text-dynamic-primary">
                    ${t.title}
                </h1>
                <div class="prose prose-lg dark:prose-invert max-w-none text-dynamic-secondary space-y-6">
                    <p class="text-sm text-dynamic-tertiary">${t.lastUpdated}</p>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.intro.title}
                        </h2>
                        <p>${t.intro.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.dataCollection.title}
                        </h2>
                        <p>${t.dataCollection.text}</p>
                        <ul class="list-disc pl-6 space-y-2">
${t.dataCollection.items.map(item => `                            <li>${item}</li>`).join('\n')}
                        </ul>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.useOfInfo.title}
                        </h2>
                        <p>${t.useOfInfo.text}</p>
                        <ul class="list-disc pl-6 space-y-2">
${t.useOfInfo.items.map(item => `                            <li>${item}</li>`).join('\n')}
                        </ul>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.gdpr.title}
                        </h2>
                        <p>${t.gdpr.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.rights.title}
                        </h2>
                        <p>${t.rights.text}</p>
                        <ul class="list-disc pl-6 space-y-2">
${t.rights.items.map(item => `                            <li>${item}</li>`).join('\n')}
                        </ul>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.contact.title}
                        </h2>
                        <p>
                            ${t.contact.text} <a href="mailto:support@smspm.com" class="text-cyan font-semibold">support@smspm.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </section>
    </main>

    <Footer lang={lang} />
</Layout>
`;

const baseDir = join(__dirname, '../src/pages');

Object.entries(translations).forEach(([lang, t]) => {
  const langDir = join(baseDir, lang);
  if (!existsSync(langDir)) {
    mkdirSync(langDir, { recursive: true });
  }
  
  const filepath = join(langDir, 'privacy.astro');
  writeFileSync(filepath, template(lang, t));
  console.log(`✅ Created: ${lang}/privacy.astro`);
});

console.log('\n✨ All privacy pages created successfully!');
