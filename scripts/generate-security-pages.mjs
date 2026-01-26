#!/usr/bin/env node
/**
 * Generate Security pages for all languages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const translations = {
  en: {
    metaTitle: "Security - SMSPM | Global SMS Infrastructure",
    metaDescription: "Learn about SMSPM's comprehensive security measures including encryption, API security, and GDPR compliance.",
    title: "Security",
    intro: "At SMSPM, security isn't a feature—it's the foundation of everything we build. We employ industry-leading standards to ensure your data and messages remain private and secure.",
    encryption: {
      title: "Advanced Encryption",
      text: "All data in transit is encrypted using TLS 1.3, and sensitive data at rest is protected with AES-256 encryption.",
    },
    api: {
      title: "Secure API",
      text: "API access is managed via scoped keys and optional IP whitelisting to prevent unauthorized usage.",
    },
    infrastructure: {
      title: "Infrastructure Security",
      text: "Our infrastructure is hosted on ISO 27001 certified data centers. We use a multi-layered approach to security, including automated threat detection, distributed denial-of-service (DDoS) protection via Cloudflare, and regular vulnerability scanning.",
    },
    compliance: {
      title: "Regulatory Compliance",
      text: "As an EU-based operator, we are fully compliant with GDPR. We also follow OWASP security best practices for web application security and conduct internal security audits twice a year.",
    },
    reporting: {
      title: "Reporting Vulnerabilities",
      text: "We welcome security researchers. If you believe you've found a security vulnerability in our platform, please report it to us at",
      text2: ". We will respond promptly and work with you to resolve the issue.",
    },
  },
  et: {
    metaTitle: "Turvalisus - SMSPM | Globaalne SMS infrastruktuur",
    metaDescription: "Õppige tundma SMSPM-i põhjalikke turvameetmeid, sealhulgas krüpteerimist, API turvalisust ja GDPR vastavust.",
    title: "Turvalisus",
    intro: "SMSPM-is ei ole turvalisus funktsioon – see on kõige alus, mida me ehitame. Kasutame valdkonna juhtivaid standardeid, et tagada teie andmete ja sõnumite privaatsus ja turvalisus.",
    encryption: {
      title: "Täiustatud krüpteerimine",
      text: "Kõik edastatavad andmed on krüpteeritud TLS 1.3 abil ja tundlikud salvestatud andmed on kaitstud AES-256 krüpteerimisega.",
    },
    api: {
      title: "Turvaline API",
      text: "API juurdepääsu hallatakse piiritletud võtmete ja valikulise IP valge nimekirja kaudu, et vältida volitamata kasutamist.",
    },
    infrastructure: {
      title: "Infrastruktuuri turvalisus",
      text: "Meie infrastruktuur on majutatud ISO 27001 sertifitseeritud andmekeskustes. Kasutame mitmetasandilist lähenemist turvalisusele, sealhulgas automatiseeritud ohtude tuvastamist, hajutatud teenusest keeldumise (DDoS) kaitset läbi Cloudflare'i ja regulaarset haavatavuse skaneerimist.",
    },
    compliance: {
      title: "Regulatiivne vastavus",
      text: "EL-põhise operaatorina oleme täielikult GDPR-iga kooskõlas. Järgime ka OWASP turvalisuse parimaid tavasid veebirakenduste turvalisuse jaoks ja viime läbi sisemisi turvaauditeid kaks korda aastas.",
    },
    reporting: {
      title: "Haavatavuste teatamine",
      text: "Tervitame turvauurijaid. Kui arvate, et olete leidnud turvahaavatavuse meie platvormil, palun teatage sellest meile aadressil",
      text2: ". Vastame kiiresti ja teeme teiega koostööd probleemi lahendamiseks.",
    },
  },
  ru: {
    metaTitle: "Безопасность - SMSPM | Глобальная SMS-инфраструктура",
    metaDescription: "Узнайте о комплексных мерах безопасности SMSPM, включая шифрование, безопасность API и соответствие GDPR.",
    title: "Безопасность",
    intro: "В SMSPM безопасность — это не функция, а основа всего, что мы создаем. Мы применяем ведущие отраслевые стандарты, чтобы ваши данные и сообщения оставались конфиденциальными и защищенными.",
    encryption: {
      title: "Продвинутое шифрование",
      text: "Все передаваемые данные шифруются с использованием TLS 1.3, а конфиденциальные данные в покое защищены шифрованием AES-256.",
    },
    api: {
      title: "Безопасный API",
      text: "Доступ к API управляется через ограниченные ключи и опциональную белую список IP-адресов для предотвращения несанкционированного использования.",
    },
    infrastructure: {
      title: "Безопасность инфраструктуры",
      text: "Наша инфраструктура размещена в центрах обработки данных, сертифицированных по ISO 27001. Мы используем многоуровневый подход к безопасности, включая автоматическое обнаружение угроз, защиту от распределенных атак отказа в обслуживании (DDoS) через Cloudflare и регулярное сканирование уязвимостей.",
    },
    compliance: {
      title: "Соответствие требованиям",
      text: "Как оператор, базирующийся в ЕС, мы полностью соответствуем GDPR. Мы также следуем лучшим практикам безопасности OWASP для безопасности веб-приложений и проводим внутренние аудиты безопасности дважды в год.",
    },
    reporting: {
      title: "Сообщение об уязвимостях",
      text: "Мы приветствуем исследователей безопасности. Если вы считаете, что обнаружили уязвимость безопасности на нашей платформе, сообщите нам об этом по адресу",
      text2: ". Мы оперативно ответим и будем работать с вами над решением проблемы.",
    },
  },
  es: {
    metaTitle: "Seguridad - SMSPM | Infraestructura SMS Global",
    metaDescription: "Conozca las medidas de seguridad integrales de SMSPM, incluido el cifrado, la seguridad de API y el cumplimiento de GDPR.",
    title: "Seguridad",
    intro: "En SMSPM, la seguridad no es una característica, es la base de todo lo que construimos. Empleamos estándares líderes en la industria para garantizar que sus datos y mensajes permanezcan privados y seguros.",
    encryption: {
      title: "Cifrado Avanzado",
      text: "Todos los datos en tránsito se cifran mediante TLS 1.3, y los datos confidenciales en reposo están protegidos con cifrado AES-256.",
    },
    api: {
      title: "API Segura",
      text: "El acceso a la API se gestiona mediante claves de ámbito limitado y listas blancas de IP opcionales para evitar el uso no autorizado.",
    },
    infrastructure: {
      title: "Seguridad de Infraestructura",
      text: "Nuestra infraestructura está alojada en centros de datos certificados ISO 27001. Utilizamos un enfoque de seguridad multicapa, que incluye detección automatizada de amenazas, protección contra ataques de denegación de servicio distribuido (DDoS) a través de Cloudflare y análisis de vulnerabilidades regulares.",
    },
    compliance: {
      title: "Cumplimiento Regulatorio",
      text: "Como operador con sede en la UE, cumplimos plenamente con GDPR. También seguimos las mejores prácticas de seguridad de OWASP para la seguridad de aplicaciones web y realizamos auditorías de seguridad internas dos veces al año.",
    },
    reporting: {
      title: "Informe de Vulnerabilidades",
      text: "Damos la bienvenida a los investigadores de seguridad. Si cree que ha encontrado una vulnerabilidad de seguridad en nuestra plataforma, infórmenos en",
      text2: ". Responderemos con prontitud y trabajaremos con usted para resolver el problema.",
    },
  },
  de: {
    metaTitle: "Sicherheit - SMSPM | Globale SMS-Infrastruktur",
    metaDescription: "Erfahren Sie mehr über die umfassenden Sicherheitsmaßnahmen von SMSPM, einschließlich Verschlüsselung, API-Sicherheit und DSGVO-Konformität.",
    title: "Sicherheit",
    intro: "Bei SMSPM ist Sicherheit keine Funktion – sie ist die Grundlage von allem, was wir bauen. Wir setzen branchenführende Standards ein, um sicherzustellen, dass Ihre Daten und Nachrichten privat und sicher bleiben.",
    encryption: {
      title: "Erweiterte Verschlüsselung",
      text: "Alle übertragenen Daten werden mit TLS 1.3 verschlüsselt, und sensible ruhende Daten sind durch AES-256-Verschlüsselung geschützt.",
    },
    api: {
      title: "Sichere API",
      text: "Der API-Zugriff wird über begrenzte Schlüssel und optionale IP-Whitelisting verwaltet, um unbefugte Nutzung zu verhindern.",
    },
    infrastructure: {
      title: "Infrastruktursicherheit",
      text: "Unsere Infrastruktur wird in ISO 27001-zertifizierten Rechenzentren gehostet. Wir verwenden einen mehrschichtigen Sicherheitsansatz, einschließlich automatisierter Bedrohungserkennung, Schutz vor verteilten Denial-of-Service-Angriffen (DDoS) über Cloudflare und regelmäßigen Schwachstellen-Scans.",
    },
    compliance: {
      title: "Regulatorische Compliance",
      text: "Als EU-basierter Betreiber sind wir vollständig DSGVO-konform. Wir folgen auch den OWASP-Sicherheits-Best-Practices für Webanwendungssicherheit und führen zweimal jährlich interne Sicherheitsaudits durch.",
    },
    reporting: {
      title: "Melden von Schwachstellen",
      text: "Wir begrüßen Sicherheitsforscher. Wenn Sie glauben, eine Sicherheitslücke in unserer Plattform gefunden zu haben, melden Sie diese bitte an",
      text2: ". Wir werden umgehend antworten und mit Ihnen zusammenarbeiten, um das Problem zu lösen.",
    },
  },
  fr: {
    metaTitle: "Sécurité - SMSPM | Infrastructure SMS Mondiale",
    metaDescription: "Découvrez les mesures de sécurité complètes de SMSPM, y compris le chiffrement, la sécurité des API et la conformité RGPD.",
    title: "Sécurité",
    intro: "Chez SMSPM, la sécurité n'est pas une fonctionnalité, c'est le fondement de tout ce que nous construisons. Nous employons des normes de pointe pour garantir que vos données et messages restent privés et sécurisés.",
    encryption: {
      title: "Chiffrement Avancé",
      text: "Toutes les données en transit sont chiffrées à l'aide de TLS 1.3, et les données sensibles au repos sont protégées par un chiffrement AES-256.",
    },
    api: {
      title: "API Sécurisée",
      text: "L'accès à l'API est géré via des clés à portée limitée et un filtrage IP optionnel pour éviter toute utilisation non autorisée.",
    },
    infrastructure: {
      title: "Sécurité de l'Infrastructure",
      text: "Notre infrastructure est hébergée dans des centres de données certifiés ISO 27001. Nous utilisons une approche de sécurité multicouche, incluant la détection automatique des menaces, la protection contre les attaques par déni de service distribué (DDoS) via Cloudflare et des analyses régulières des vulnérabilités.",
    },
    compliance: {
      title: "Conformité Réglementaire",
      text: "En tant qu'opérateur basé dans l'UE, nous sommes entièrement conformes au RGPD. Nous suivons également les meilleures pratiques de sécurité OWASP pour la sécurité des applications web et effectuons des audits de sécurité internes deux fois par an.",
    },
    reporting: {
      title: "Signalement de Vulnérabilités",
      text: "Nous accueillons les chercheurs en sécurité. Si vous pensez avoir trouvé une vulnérabilité de sécurité sur notre plateforme, veuillez nous la signaler à",
      text2: ". Nous répondrons rapidement et travaillerons avec vous pour résoudre le problème.",
    },
  },
  lv: {
    metaTitle: "Drošība - SMSPM | Globālā SMS infrastruktūra",
    metaDescription: "Uzziniet par SMSPM visaptverošajiem drošības pasākumiem, ieskaitot šifrēšanu, API drošību un VDAR atbilstību.",
    title: "Drošība",
    intro: "SMSPM drošība nav funkcija — tā ir visu, ko mēs veidojam, pamats. Mēs izmantojam nozares vadošos standartus, lai nodrošinātu, ka jūsu dati un ziņojumi paliek privāti un droši.",
    encryption: {
      title: "Uzlabota šifrēšana",
      text: "Visi pārraidāmie dati tiek šifrēti, izmantojot TLS 1.3, un sensitīvie uzglabātie dati ir aizsargāti ar AES-256 šifrēšanu.",
    },
    api: {
      title: "Droša API",
      text: "API piekļuve tiek pārvaldīta, izmantojot ierobežotas atslēgas un neobligātu IP baltā sarakstu, lai novērstu nesankcionētu izmantošanu.",
    },
    infrastructure: {
      title: "Infrastruktūras drošība",
      text: "Mūsu infrastruktūra tiek mitināta ISO 27001 sertificētos datu centros. Mēs izmantojam daudzslāņu drošības pieeju, ieskaitot automatizētu draudu noteikšanu, aizsardzību pret izkliedētiem pakalpojuma atteikuma (DDoS) uzbrukumiem caur Cloudflare un regulāru ievainojamības skenēšanu.",
    },
    compliance: {
      title: "Regulējošā atbilstība",
      text: "Kā ES bāzēts operators, mēs pilnībā atbilstam VDAR. Mēs arī ievērojam OWASP drošības labākās prakses tīmekļa lietojumprogrammu drošībai un veicam iekšējās drošības auditus divreiz gadā.",
    },
    reporting: {
      title: "Ievainojamību ziņošana",
      text: "Mēs atzinīgi vērtējam drošības pētniekus. Ja uzskatāt, ka esat atradis drošības ievainojamību mūsu platformā, lūdzu, ziņojiet mums par to",
      text2: ". Mēs ātri atbildēsim un strādāsim ar jums, lai atrisinātu problēmu.",
    },
  },
  lt: {
    metaTitle: "Saugumas - SMSPM | Pasaulinė SMS infrastruktūra",
    metaDescription: "Sužinokite apie išsamias SMSPM saugumo priemones, įskaitant šifravimą, API saugumą ir BDAR atitiktį.",
    title: "Saugumas",
    intro: "SMSPM saugumas nėra funkcija – tai viso, ką kuriame, pagrindas. Naudojame pirmaujančius pramonės standartus, kad užtikrintume jūsų duomenų ir pranešimų privatumą ir saugumą.",
    encryption: {
      title: "Išplėstinis šifravimas",
      text: "Visi perduodami duomenys šifruojami naudojant TLS 1.3, o jautrūs saugomi duomenys apsaugoti AES-256 šifravimu.",
    },
    api: {
      title: "Saugi API",
      text: "API prieiga valdoma per apribotus raktus ir pasirenkamą IP baltąjį sąrašą, kad būtų užkirstas kelias neleistinam naudojimui.",
    },
    infrastructure: {
      title: "Infrastruktūros saugumas",
      text: "Mūsų infrastruktūra talpinama ISO 27001 sertifikuotuose duomenų centruose. Naudojame daugiasluoksnį saugumo požiūrį, įskaitant automatizuotą grėsmių aptikimą, apsaugą nuo paskirstytų atsisakymo aptarnauti (DDoS) atakų per Cloudflare ir reguliarų pažeidžiamumų skenavimą.",
    },
    compliance: {
      title: "Reguliavimo atitiktis",
      text: "Kaip ES operatorius, visiškai atitinkame BDAR. Taip pat laikomės OWASP saugumo geriausios praktikos žiniatinklio programų saugumui ir du kartus per metus atliekame vidinius saugumo auditus.",
    },
    reporting: {
      title: "Pažeidžiamumų pranešimas",
      text: "Sveikiname saugumo tyrėjus. Jei manote, kad radote saugumo pažeidžiamumą mūsų platformoje, praneškite mums",
      text2: ". Nedelsdami atsakysime ir dirbsime su jumis problemai išspręsti.",
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
                <div class="prose prose-lg dark:prose-invert max-w-none text-dynamic-secondary space-y-8">
                    <p class="text-xl">${t.intro}</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
                        <div class="p-8 rounded-2xl border border-dynamic-primary bg-dynamic-primary">
                            <div class="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center text-cyan mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-dynamic-primary mb-2">${t.encryption.title}</h3>
                            <p class="text-sm text-dynamic-secondary text-balance">${t.encryption.text}</p>
                        </div>
                        <div class="p-8 rounded-2xl border border-dynamic-primary bg-dynamic-primary">
                            <div class="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center text-purple mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-dynamic-primary mb-2">${t.api.title}</h3>
                            <p class="text-sm text-dynamic-secondary text-balance">${t.api.text}</p>
                        </div>
                    </div>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">${t.infrastructure.title}</h2>
                        <p>${t.infrastructure.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">${t.compliance.title}</h2>
                        <p>${t.compliance.text}</p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-dynamic-primary mb-4">${t.reporting.title}</h2>
                        <p>
                            ${t.reporting.text} <a href="mailto:security@smspm.com" class="text-cyan font-semibold">security@smspm.com</a>${t.reporting.text2}
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
  
  const filepath = join(langDir, 'security.astro');
  writeFileSync(filepath, template(lang, t));
  console.log(`✅ Created: ${lang}/security.astro`);
});

console.log('\n✨ All security pages created successfully!');
