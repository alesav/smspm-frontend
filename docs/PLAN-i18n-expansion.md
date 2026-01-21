# i18n Expansion Plan (RU, ES, DE, FR, LV, LT)

This plan outlines the steps required to add Russian, Spanish, German, French, Latvian, and Lithuanian language support to the SMSPM website.

## 1. Update Country Metadata
Update `data/country-metadata.js` to include translated names and slugs for the new languages.
- Languages: `ru`, `es`, `de`, `fr`, `lv`, `lt`
- Fields per language: `name_{lang}`, `slug_{lang}`

## 2. Update Generator Script
Modify `scripts/generate-country-pages-smart.mjs`:
- Add new languages to `CONFIG.languages`.
- Populate `TRANSLATIONS` object with translations for all new languages.
- Update `generatePageTemplate` to handle multi-language localization more dynamically.
- Update SEO logic in the template for all languages.

## 3. Update core application files
- **src/components/Navigation.astro**: Update the language switcher to include new languages.
- **src/pages/[lang]/countries.astro**: Update `getStaticPaths` to include new language codes.
- **src/utils/country-data.js**: (Optional) Check if updates are needed for localized helper functions.

## 4. Create localized static pages
For each new language (`ru`, `es`, `de`, `fr`, `lv`, `lt`):
- Create `src/pages/{lang}/index.astro` (translated homepage).
- Create `src/pages/{lang}/hinnad.astro` (redirect to countries directory).

## 5. Execution & Verification
- Run the regeneration script: `npm run countries:regenerate -- --force`
- Verify the generated pages in `src/pages/{lang}/country/`.
- Verify the landing pages and language switcher.

## 6. Translations to be used

### Global UI Strings
| Key | ru | es | de | fr | lv | lt |
|-----|----|----|----|----|----|----|
| heroBadge | Глобальный охват | Cobertura Global | Globale Abdeckung | Couverture Mondiale | Globāls pārklājums | Visuotinis padengimas |
| heroTitle | Отправить SMS в | Enviar SMS a | SMS senden nach | Envoyer un SMS à | Sūtīt SMS uz | Siųsti SMS į |
| heroSubtitle | Мгновенно связывайтесь с клиентами с вероятностью доставки 99,9%. | Llegue a los clientes al instante con una tasa de entrega del 99,9%. | Erreichen Sie Kunden sofort mit einer Zustellrate von 99,9%. | Touchez vos clients instantanément avec un taux de délivrabilité de 99,9%. | Sasniedziet klientus nekavējoties ar 99,9% piegādes līmeni. | Pasiekite klientus akimirksniu su 99,9% pristatymo lygiu. |
| ctaTitle | Готовы отправить SMS в | ¿Listo para enviar SMS a? | Bereit, SMS zu senden an | Prêt à envoyer des SMS vers | Gatavs sūtīt SMS uz | Esate pasiruošę siųsti SMS į |
| ctaSubtitle | Присоединяйтесь к тысячам компаний, использующих SMSPM для надежной доставки сообщений | Únase a miles de empresas que utilizan SMSPM para una entrega de mensajes confiable | Schließen Sie sich Tausenden von Unternehmen an, die SMSPM für eine zuverlässige Nachrichtenübermittlung nutzen | Rejoignez des milliers d'entreprises qui utilisent SMSPM pour une livraison de messages fiable | Pievienojieties tūkstošiem uzņēmumu, kas izmanto SMSPM drošai ziņojumu piegādei | Prisijunkite prie tūkstančių įmonių, naudojančių SMSPM patikimam pranešimų pristatymui |
| ctaButton | Начать бесплатный период | Iniciar prueba gratuita | Kostenlose Testversion starten | Commencer l'essai gratuit | Sākt bezmaksas izmēģinājumu | Pradėti nemokamą bandomąjį laikotarpį |
| ctaDemo | Запросить демо | Solicitar Demo | Demo anfordern | Demander une démo | Pieprasīt demo | Prašyti demo versijos |
| ctaNote | Без кредитной карты · 50 бесплатных сообщений · Полный доступ к API | Sin tarjeta de crédito · 50 mensajes gratuitos · Acceso completo a la API | Keine Kreditkarte erforderlich · 50 kostenlose Nachrichten · Voller API-Zugriff | Aucune carte de crédit requise · 50 messages gratuits · Accès complet à l'API | Nav nepieciešama kredītkarte · 50 bezmaksas ziņapmaiņas · Pilna piekļuve API | Nereikia kredito kortelės · 50 nemokamų pranešimų · Pilna prieiga prie API |
| viewApi | Просмотреть документацию API | Ver documentos de la API | API-Dokumentation ansehen | Voir la documentation API | Skatīt API dokumentāciju | Peržiūrėti API dokumentaciją |
| perMessage | за сообщение | por mensaje | pro Nachricht | par message | par ziņu | už pranešimą |
| pricingFrom | Цена от | Precios desde | Preise ab | Tarifs à partir de | Cena no | Kaina nuo |
| breadcrumbHome | Главная | Inicio | Home | Accueil | Sākums | Pradžia |
