#!/usr/bin/env node
/**
 * Generate Terms of Service pages for all languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const translations = {
  en: {
    metaTitle: "Terms of Service - SMSPM",
    metaDescription: "Read SMSPM's Terms of Service to understand your rights and obligations when using our SMS gateway platform.",
    title: "Terms of Service",
    lastUpdated: "Last Updated: January 21, 2026",
    acceptance: {
      title: "1. Acceptance of Terms",
      text: "By accessing or using the SMSPM platform, you agree to be bound by these Terms of Service and all applicable laws and regulations of Estonia and the European Union.",
    },
    service: {
      title: "2. Service Description",
      text: "SMSPM provides an API and web interface for sending global SMS messages. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.",
    },
    prohibited: {
      title: "3. Prohibited Activities",
      text: "Users are strictly prohibited from using the service for:",
      items: [
        "Sending unsolicited commercial messages (SPAM)",
        "Phishing, fraud, or activities intended to deceive",
        "Distributing hateful, threatening, or illegal content",
        "Unauthorized access to other systems or accounts",
      ],
      warning: "Violation of these rules will result in immediate account termination without refund.",
    },
    payments: {
      title: "4. Payments and Refunds",
      text: "Services are provided on a prepay (credit) basis. Credits are non-refundable unless otherwise required by law. Unused credits may expire if the account remains inactive for more than 12 months.",
    },
    liability: {
      title: "5. Limitation of Liability",
      text: "iSMS Solutions OÜ shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.",
    },
    governing: {
      title: "6. Governing Law",
      text: "These terms are governed by and construed in accordance with the laws of Estonia. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Tallinn, Estonia.",
    },
  },
  et: {
    metaTitle: "Teenuse tingimused - SMSPM",
    metaDescription: "Lugege SMSPM-i teenuse tingimusi, et mõista oma õigusi ja kohustusi meie SMS-lüüsi platvormi kasutamisel.",
    title: "Teenuse tingimused",
    lastUpdated: "Viimati uuendatud: 21. jaanuar 2026",
    acceptance: {
      title: "1. Tingimuste vastuvõtmine",
      text: "SMSPM platvormi kasutades nõustute olema seotud nende teenuse tingimustega ja kõigi kohaldatavate Eesti ja Euroopa Liidu seaduste ja määrustega.",
    },
    service: {
      title: "2. Teenuse kirjeldus",
      text: "SMSPM pakub API-d ja veebiliidest globaalsete SMS-sõnumite saatmiseks. Jätame endale õiguse teenuse mis tahes aspekti igal ajal muuta, peatada või lõpetada.",
    },
    prohibited: {
      title: "3. Keelatud tegevused",
      text: "Kasutajatel on rangelt keelatud teenust kasutada:",
      items: [
        "Soovimatute kaubandusteatiste (SPAM) saatmine",
        "Andmepüük, pettus või pettust soodustavad tegevused",
        "Vihkava, ähvardava või ebaseadusliku sisu levitamine",
        "Volitamata juurdepääs teistele süsteemidele või kontodele",
      ],
      warning: "Nende reeglite rikkumine toob kaasa konto viivitamatu lõpetamise ilma tagasimakseta.",
    },
    payments: {
      title: "4. Maksed ja tagasimaksed",
      text: "Teenuseid pakutakse ettemaksu (krediit) alusel. Krediidid ei ole tagastatavad, välja arvatud juhul, kui seadus nõuab teisiti. Kasutamata krediidid võivad aeguda, kui konto jääb enam kui 12 kuuks mitteaktiivseks.",
    },
    liability: {
      title: "5. Vastutuse piiramine",
      text: "iSMS Solutions OÜ ei vastuta mingite kaudsete, juhuslike, eriliste, kaudsete või karistuslike kahjude eest, mis tulenevad teenuse kasutamisest või kasutamise võimatusest.",
    },
    governing: {
      title: "6. Kohaldatav õigus",
      text: "Neid tingimusi reguleerib ja tõlgendatakse vastavalt Eesti seadustele. Kõik vaidlused alluvad Tallinna kohtute ainupädevusele.",
    },
  },
  ru: {
    metaTitle: "Условия обслуживания - SMSPM",
    metaDescription: "Ознакомьтесь с Условиями обслуживания SMSPM, чтобы понять свои права и обязанности при использовании нашей платформы SMS-шлюза.",
    title: "Условия обслуживания",
    lastUpdated: "Последнее обновление: 21 января 2026 г.",
    acceptance: {
      title: "1. Принятие условий",
      text: "Получая доступ к платформе SMSPM или используя ее, вы соглашаетесь соблюдать настоящие Условия обслуживания и все применимые законы и нормативные акты Эстонии и Европейского Союза.",
    },
    service: {
      title: "2. Описание услуги",
      text: "SMSPM предоставляет API и веб-интерфейс для отправки глобальных SMS-сообщений. Мы оставляем за собой право изменять, приостанавливать или прекращать любой аспект услуги в любое время.",
    },
    prohibited: {
      title: "3. Запрещенные действия",
      text: "Пользователям строго запрещено использовать сервис для:",
      items: [
        "Отправки нежелательных коммерческих сообщений (СПАМ)",
        "Фишинга, мошенничества или действий, направленных на обман",
        "Распространения ненавистного, угрожающего или незаконного контента",
        "Несанкционированного доступа к другим системам или учетным записям",
      ],
      warning: "Нарушение этих правил приведет к немедленному закрытию учетной записи без возврата средств.",
    },
    payments: {
      title: "4. Платежи и возвраты",
      text: "Услуги предоставляются на основе предоплаты (кредита). Кредиты не подлежат возврату, если иное не требуется по закону. Неиспользованные кредиты могут истечь, если учетная запись остается неактивной более 12 месяцев.",
    },
    liability: {
      title: "5. Ограничение ответственности",
      text: "iSMS Solutions OÜ не несет ответственности за любые косвенные, случайные, особые, последующие или штрафные убытки, возникшие в результате использования или невозможности использования услуги.",
    },
    governing: {
      title: "6. Применимое право",
      text: "Эти условия регулируются и толкуются в соответствии с законодательством Эстонии. Любые споры подлежат исключительной юрисдикции судов Таллинна, Эстония.",
    },
  },
  es: {
    metaTitle: "Términos de Servicio - SMSPM",
    metaDescription: "Lea los Términos de Servicio de SMSPM para comprender sus derechos y obligaciones al usar nuestra plataforma de pasarela SMS.",
    title: "Términos de Servicio",
    lastUpdated: "Última actualización: 21 de enero de 2026",
    acceptance: {
      title: "1. Aceptación de Términos",
      text: "Al acceder o utilizar la plataforma SMSPM, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables de Estonia y la Unión Europea.",
    },
    service: {
      title: "2. Descripción del Servicio",
      text: "SMSPM proporciona una API y una interfaz web para enviar mensajes SMS globales. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento.",
    },
    prohibited: {
      title: "3. Actividades Prohibidas",
      text: "Los usuarios tienen estrictamente prohibido utilizar el servicio para:",
      items: [
        "Enviar mensajes comerciales no solicitados (SPAM)",
        "Phishing, fraude o actividades destinadas a engañar",
        "Distribuir contenido odioso, amenazante o ilegal",
        "Acceso no autorizado a otros sistemas o cuentas",
      ],
      warning: "La violación de estas reglas resultará en la terminación inmediata de la cuenta sin reembolso.",
    },
    payments: {
      title: "4. Pagos y Reembolsos",
      text: "Los servicios se proporcionan en base a prepago (crédito). Los créditos no son reembolsables a menos que la ley lo requiera. Los créditos no utilizados pueden expirar si la cuenta permanece inactiva durante más de 12 meses.",
    },
    liability: {
      title: "5. Limitación de Responsabilidad",
      text: "iSMS Solutions OÜ no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo resultante del uso o la imposibilidad de usar el servicio.",
    },
    governing: {
      title: "6. Ley Aplicable",
      text: "Estos términos se rigen e interpretan de acuerdo con las leyes de Estonia. Cualquier disputa que surja estará sujeta a la jurisdicción exclusiva de los tribunales de Tallin, Estonia.",
    },
  },
  de: {
    metaTitle: "Nutzungsbedingungen - SMSPM",
    metaDescription: "Lesen Sie die Nutzungsbedingungen von SMSPM, um Ihre Rechte und Pflichten bei der Nutzung unserer SMS-Gateway-Plattform zu verstehen.",
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: 21. Januar 2026",
    acceptance: {
      title: "1. Annahme der Bedingungen",
      text: "Durch den Zugriff auf oder die Nutzung der SMSPM-Plattform erklären Sie sich mit diesen Nutzungsbedingungen und allen geltenden Gesetzen und Vorschriften Estlands und der Europäischen Union einverstanden.",
    },
    service: {
      title: "2. Dienstbeschreibung",
      text: "SMSPM bietet eine API und eine Weboberfläche zum Versenden globaler SMS-Nachrichten. Wir behalten uns das Recht vor, jeden Aspekt des Dienstes jederzeit zu ändern, auszusetzen oder einzustellen.",
    },
    prohibited: {
      title: "3. Verbotene Aktivitäten",
      text: "Benutzern ist die Nutzung des Dienstes streng untersagt für:",
      items: [
        "Versenden unerwünschter kommerzieller Nachrichten (SPAM)",
        "Phishing, Betrug oder betrügerische Aktivitäten",
        "Verbreitung hasserfüllter, bedrohlicher oder illegaler Inhalte",
        "Unbefugter Zugriff auf andere Systeme oder Konten",
      ],
      warning: "Die Verletzung dieser Regeln führt zur sofortigen Kontosperrung ohne Rückerstattung.",
    },
    payments: {
      title: "4. Zahlungen und Rückerstattungen",
      text: "Dienste werden auf Vorauszahlungsbasis (Guthaben) bereitgestellt. Guthaben sind nicht erstattungsfähig, es sei denn, dies ist gesetzlich vorgeschrieben. Ungenutztes Guthaben kann verfallen, wenn das Konto länger als 12 Monate inaktiv bleibt.",
    },
    liability: {
      title: "5. Haftungsbeschränkung",
      text: "iSMS Solutions OÜ haftet nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die aus der Nutzung oder Nichtnutzung des Dienstes resultieren.",
    },
    governing: {
      title: "6. Anwendbares Recht",
      text: "Diese Bedingungen unterliegen den Gesetzen Estlands und werden nach diesen ausgelegt. Alle Streitigkeiten unterliegen der ausschließlichen Gerichtsbarkeit der Gerichte in Tallinn, Estland.",
    },
  },
  fr: {
    metaTitle: "Conditions d'Utilisation - SMSPM",
    metaDescription: "Lisez les Conditions d'Utilisation de SMSPM pour comprendre vos droits et obligations lors de l'utilisation de notre plateforme de passerelle SMS.",
    title: "Conditions d'Utilisation",
    lastUpdated: "Dernière mise à jour : 21 janvier 2026",
    acceptance: {
      title: "1. Acceptation des Conditions",
      text: "En accédant à ou en utilisant la plateforme SMSPM, vous acceptez d'être lié par ces Conditions d'Utilisation et toutes les lois et réglementations applicables de l'Estonie et de l'Union européenne.",
    },
    service: {
      title: "2. Description du Service",
      text: "SMSPM fournit une API et une interface web pour envoyer des messages SMS globaux. Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect du service à tout moment.",
    },
    prohibited: {
      title: "3. Activités Interdites",
      text: "Il est strictement interdit aux utilisateurs d'utiliser le service pour :",
      items: [
        "Envoyer des messages commerciaux non sollicités (SPAM)",
        "Hameçonnage, fraude ou activités visant à tromper",
        "Distribuer du contenu haineux, menaçant ou illégal",
        "Accès non autorisé à d'autres systèmes ou comptes",
      ],
      warning: "La violation de ces règles entraînera la résiliation immédiate du compte sans remboursement.",
    },
    payments: {
      title: "4. Paiements et Remboursements",
      text: "Les services sont fournis sur la base du prépaiement (crédit). Les crédits ne sont pas remboursables sauf si la loi l'exige. Les crédits non utilisés peuvent expirer si le compte reste inactif pendant plus de 12 mois.",
    },
    liability: {
      title: "5. Limitation de Responsabilité",
      text: "iSMS Solutions OÜ ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation ou de votre impossibilité d'utiliser le service.",
    },
    governing: {
      title: "6. Loi Applicable",
      text: "Ces conditions sont régies et interprétées conformément aux lois de l'Estonie. Tout litige découlant sera soumis à la juridiction exclusive des tribunaux de Tallinn, Estonie.",
    },
  },
  lv: {
    metaTitle: "Pakalpojuma noteikumi - SMSPM",
    metaDescription: "Izlasiet SMSPM pakalpojuma noteikumus, lai saprastu savas tiesības un pienākumus, lietojot mūsu SMS vārtejas platformu.",
    title: "Pakalpojuma noteikumi",
    lastUpdated: "Pēdējo reizi atjaunināts: 2026. gada 21. janvārī",
    acceptance: {
      title: "1. Noteikumu pieņemšana",
      text: "Piekļūstot vai izmantojot SMSPM platformu, jūs piekrītat ievērot šos Pakalpojuma noteikumus un visus piemērojamos Igaunijas un Eiropas Savienības likumus un noteikumus.",
    },
    service: {
      title: "2. Pakalpojuma apraksts",
      text: "SMSPM nodrošina API un tīmekļa saskarni globālo SMS ziņojumu sūtīšanai. Mēs paturam tiesības jebkurā laikā modificēt, apturēt vai pārtraukt jebkuru pakalpojuma aspektu.",
    },
    prohibited: {
      title: "3. Aizliegtās darbības",
      text: "Lietotājiem ir stingri aizliegts izmantot pakalpojumu:",
      items: [
        "Nevēlamu komerciālu ziņojumu (SPAM) sūtīšanai",
        "Pikšķerēšanai, krāpšanai vai maldināšanas nolūkiem",
        "Naida, draudu vai nelikumīga satura izplatīšanai",
      "Nesankcionētai piekļuvei citām sistēmām vai kontiem",
      ],
      warning: "Šo noteikumu pārkāpšana izraisīs tūlītēju konta izbeigšanu bez atmaksas.",
    },
    payments: {
      title: "4. Maksājumi un atmaksas",
      text: "Pakalpojumi tiek sniegti avansa maksājuma (kredīta) veidā. Kredīti nav atmaksājami, ja vien to neprasa likums. Neizmantoti kredīti var beigties, ja konts paliek neaktīvs ilgāk par 12 mēnešiem.",
    },
    liability: {
      title: "5. Atbildības ierobežojums",
      text: "iSMS Solutions OÜ nav atbildīgs par jebkādiem netiešiem, nejauši radītiem, īpašiem, izrietošiem vai sodošiem zaudējumiem, kas rodas no pakalpojuma izmantošanas vai neiespējamības to izmantot.",
    },
    governing: {
      title: "6. Piemērojamie tiesību akti",
      text: "Šos noteikumus regulē un interpretē saskaņā ar Igaunijas likumiem. Visi strīdi būs Tallinas, Igaunija, tiesu ekskluzīvajā jurisdikcijā.",
    },
  },
  lt: {
    metaTitle: "Paslaugų teikimo sąlygos - SMSPM",
    metaDescription: "Perskaitykite SMSPM paslaugų teikimo sąlygas, kad suprastumėte savo teises ir pareigas naudojantis mūsų SMS šliuzo platforma.",
    title: "Paslaugų teikimo sąlygos",
    lastUpdated: "Paskutinį kartą atnaujinta: 2026 m. sausio 21 d.",
    acceptance: {
      title: "1. Sąlygų priėmimas",
      text: "Prisijungdami prie SMSPM platformos arba ją naudodami, jūs sutinkate laikytis šių Paslaugų teikimo sąlygų ir visų taikomų Estijos ir Europos Sąjungos įstatymų bei taisyklių.",
    },
    service: {
      title: "2. Paslaugos aprašymas",
      text: "SMSPM teikia API ir žiniatinklio sąsają globalių SMS pranešimų siuntimui. Pasiliekame teisę bet kuriuo metu keisti, sustabdyti ar nutraukti bet kurį paslaugos aspektą.",
    },
    prohibited: {
      title: "3. Draudžiama veikla",
      text: "Vartotojams griežtai draudžiama naudoti paslaugą:",
      items: [
        "Nepageidaujamiems komerciniams pranešimams (SPAM) siųsti",
        "Sukčiavimui, apgaulei ar klaidinančiai veiklai",
        "Neapykantos kurstančio, grasinančio ar neteisėto turinio platinimui",
        "Neleistinai prieigai prie kitų sistemų ar paskyrų",
      ],
      warning: "Šių taisyklių pažeidimas lems nedelsiantį paskyros uždarymą be pinigų grąžinimo.",
    },
    payments: {
      title: "4. Mokėjimai ir grąžinimai",
      text: "Paslaugos teikiamos išankstinio mokėjimo (kredito) pagrindu. Kreditai negrąžinami, nebent to reikalauja įstatymas. Nepanaudoti kreditai gali pasibaigti, jei paskyra lieka neaktyvi ilgiau nei 12 mėnesių.",
    },
    liability: {
      title: "5. Atsakomybės apribojimas",
      text: "iSMS Solutions OÜ nebus atsakinga už jokią netiesioginę, atsitiktinę, specialią, pasekminę ar baudžiamąją žalą, atsiradusią dėl paslaugos naudojimo ar galimybės jos naudoti.",
    },
    governing: {
      title: "6. Taikoma teisė",
      text: "Šios sąlygos reglamentuojamos ir aiškinamos pagal Estijos įstatymus. Visi ginčai bus sprendžiami išimtinėje Talino, Estija, teismų jurisdikcijoje.",
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
                            ${t.acceptance.title}
                        </h2>
                        <p>${t.acceptance.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.service.title}
                        </h2>
                        <p>${t.service.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.prohibited.title}
                        </h2>
                        <p>${t.prohibited.text}</p>
                        <ul class="list-disc pl-6 space-y-2">
${t.prohibited.items.map(item => `                            <li>${item}</li>`).join('\n')}
                        </ul>
                        <p class="mt-4 font-semibold text-dynamic-primary">
                            ${t.prohibited.warning}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.payments.title}
                        </h2>
                        <p>${t.payments.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.liability.title}
                        </h2>
                        <p>${t.liability.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">
                            ${t.governing.title}
                        </h2>
                        <p>${t.governing.text}</p>
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
  
  const filepath = join(langDir, 'terms.astro');
  writeFileSync(filepath, template(lang, t));
  console.log(`✅ Created: ${lang}/terms.astro`);
});

console.log('\n✨ All terms pages created successfully!');
