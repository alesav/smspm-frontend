/**
 * Country metadata - ISO codes, flags, population, currency, etc.
 * This is the master data source for all country pages
 */

export const COUNTRY_METADATA = {
  // Manually curated list - expand as needed
  'Estonia': {
    code: 'ee', flag: '🇪🇪', currency: 'EUR', callingCode: '+372', timezone: 'Europe/Tallinn', population: '1.3M', mobileUsers: '1.9M', slug: 'estonia',
    name_et: 'Eesti', slug_et: 'eestisse',
    name_ru: 'Эстония', slug_ru: 'estoniyu',
    name_es: 'Estonia', slug_es: 'estonia',
    name_de: 'Estland', slug_de: 'estland',
    name_fr: 'Estonie', slug_fr: 'estonie',
    name_lv: 'Igaunija', slug_lv: 'igauniju',
    name_lt: 'Estija', slug_lt: 'estija'
  },
  'Finland': {
    code: 'fi', flag: '🇫🇮', currency: 'EUR', callingCode: '+358', timezone: 'Europe/Helsinki', population: '5.5M', mobileUsers: '7.2M', slug: 'finland',
    name_et: 'Soome', slug_et: 'soome',
    name_ru: 'Финляндия', slug_ru: 'finlyandiyu',
    name_es: 'Finlandia', slug_es: 'finlandia',
    name_de: 'Finnland', slug_de: 'finnland',
    name_fr: 'Finlande', slug_fr: 'finlande',
    name_lv: 'Somija', slug_lv: 'somiju',
    name_lt: 'Suomija', slug_lt: 'suomija'
  },
  'Albania': {
    code: 'al', flag: '🇦🇱', currency: 'ALL', callingCode: '+355', timezone: 'Europe/Tirane', population: '2.8M', mobileUsers: '3.5M', slug: 'albania',
    name_et: 'Albaania', slug_et: 'albaaniasse',
    name_ru: 'Албания', slug_ru: 'albaniyu',
    name_es: 'Albania', slug_es: 'albania',
    name_de: 'Albanien', slug_de: 'albanien',
    name_fr: 'Albanie', slug_fr: 'albanie',
    name_lv: 'Albānija', slug_lv: 'albaniju',
    name_lt: 'Albanija', slug_lt: 'albanija'
  },
  'Algeria': {
    code: 'dz', flag: '🇩🇿', currency: 'DZD', callingCode: '+213', timezone: 'Africa/Algiers', population: '44M', mobileUsers: '46M', slug: 'algeria',
    name_et: 'Alžeeria', slug_et: 'alžeeriasse',
    name_ru: 'Алжир', slug_ru: 'alzhir',
    name_es: 'Argelia', slug_es: 'argelia',
    name_de: 'Algerien', slug_de: 'algerien',
    name_fr: 'Algérie', slug_fr: 'algerie',
    name_lv: 'Alžīrija', slug_lv: 'alziriju',
    name_lt: 'Alžyras', slug_lt: 'alzyra'
  },
  'Angola': {
    code: 'ao', flag: '🇦🇴', currency: 'AOA', callingCode: '+244', timezone: 'Africa/Luanda', population: '33M', mobileUsers: '14M', slug: 'angola',
    name_et: 'Angola', slug_et: 'angolasse',
    name_ru: 'Ангола', slug_ru: 'angolu',
    name_es: 'Angola', slug_es: 'angola',
    name_de: 'Angola', slug_de: 'angola',
    name_fr: 'Angola', slug_fr: 'angola',
    name_lv: 'Angola', slug_lv: 'angolu',
    name_lt: 'Angola', slug_lt: 'angola'
  },
  'Armenia': {
    code: 'am', flag: '🇦🇲', currency: 'AMD', callingCode: '+374', timezone: 'Asia/Yerevan', population: '3M', mobileUsers: '3.8M', slug: 'armenia',
    name_et: 'Armeenia', slug_et: 'armeeniasse',
    name_ru: 'Армения', slug_ru: 'armeniyu',
    name_es: 'Armenia', slug_es: 'armenia',
    name_de: 'Armenien', slug_de: 'armenien',
    name_fr: 'Arménie', slug_fr: 'armenie',
    name_lv: 'Armēnija', slug_lv: 'armeniju',
    name_lt: 'Armėnija', slug_lt: 'armenija'
  },
  'Aruba': {
    code: 'aw', flag: '🇦🇼', currency: 'AWG', callingCode: '+297', timezone: 'America/Aruba', population: '107K', mobileUsers: '140K', slug: 'aruba',
    name_et: 'Aruba', slug_et: 'arubale',
    name_ru: 'Аруба', slug_ru: 'arubu',
    name_es: 'Aruba', slug_es: 'aruba',
    name_de: 'Aruba', slug_de: 'aruba',
    name_fr: 'Aruba', slug_fr: 'aruba',
    name_lv: 'Aruba', slug_lv: 'arubu',
    name_lt: 'Aruba', slug_lt: 'aruba'
  },
  'Australia': {
    code: 'au', flag: '🇦🇺', currency: 'AUD', callingCode: '+61', timezone: 'Australia/Sydney', population: '26M', mobileUsers: '30M', slug: 'australia',
    name_et: 'Austraalia', slug_et: 'austraaliasse',
    name_ru: 'Австралия', slug_ru: 'avstraliyu',
    name_es: 'Australia', slug_es: 'australia',
    name_de: 'Australien', slug_de: 'australien',
    name_fr: 'Australie', slug_fr: 'australie',
    name_lv: 'Austrālija', slug_lv: 'australiju',
    name_lt: 'Australija', slug_lt: 'australija'
  },
  'Austria': {
    code: 'at', flag: '🇦🇹', currency: 'EUR', callingCode: '+43', timezone: 'Europe/Vienna', population: '9M', mobileUsers: '11M', slug: 'austria',
    name_et: 'Austria', slug_et: 'austriasse',
    name_ru: 'Австрия', slug_ru: 'avstriyu',
    name_es: 'Austria', slug_es: 'austria',
    name_de: 'Österreich', slug_de: 'osterreich',
    name_fr: 'Autriche', slug_fr: 'autriche',
    name_lv: 'Austrija', slug_lv: 'austriju',
    name_lt: 'Austrija', slug_lt: 'austrija'
  },
  'Belgium': {
    code: 'be', flag: '🇧🇪', currency: 'EUR', callingCode: '+32', timezone: 'Europe/Brussels', population: '11.6M', mobileUsers: '13M', slug: 'belgium',
    name_et: 'Belgia', slug_et: 'belgiasse',
    name_ru: 'Бельгия', slug_ru: 'belgiyu',
    name_es: 'Bélgica', slug_es: 'belgica',
    name_de: 'Belgien', slug_de: 'belgien',
    name_fr: 'Belgique', slug_fr: 'belgique',
    name_lv: 'Beļģija', slug_lv: 'belgiju',
    name_lt: 'Belgija', slug_lt: 'belgija'
  },
  'Brazil': {
    code: 'br', flag: '🇧🇷', currency: 'BRL', callingCode: '+55', timezone: 'America/Sao_Paulo', population: '215M', mobileUsers: '230M', slug: 'brazil',
    name_et: 'Brasiilia', slug_et: 'brasiiliasse',
    name_ru: 'Бразилия', slug_ru: 'braziliyu',
    name_es: 'Brasil', slug_es: 'brasil',
    name_de: 'Brasilien', slug_de: 'brasilien',
    name_fr: 'Brésil', slug_fr: 'bresil',
    name_lv: 'Brazīlija', slug_lv: 'braziliju',
    name_lt: 'Brazilija', slug_lt: 'brazilija'
  },
  'Bulgaria': {
    code: 'bg', flag: '🇧🇬', currency: 'BGN', callingCode: '+359', timezone: 'Europe/Sofia', population: '6.9M', mobileUsers: '8M', slug: 'bulgaria',
    name_et: 'Bulgaaria', slug_et: 'bulgaariasse',
    name_ru: 'Болгария', slug_ru: 'bolgariyu',
    name_es: 'Bulgaria', slug_es: 'bulgaria',
    name_de: 'Bulgarien', slug_de: 'bulgarien',
    name_fr: 'Bulgarie', slug_fr: 'bulgarie',
    name_lv: 'Bulgārija', slug_lv: 'bulgariju',
    name_lt: 'Bulgarija', slug_lt: 'bulgarija'
  },
  'Cambodia': {
    code: 'kh', flag: '🇰🇭', currency: 'KHR', callingCode: '+855', timezone: 'Asia/Phnom_Penh', population: '17M', mobileUsers: '20M', slug: 'cambodia',
    name_et: 'Kambodža', slug_et: 'kambodžasse',
    name_ru: 'Камбоджа', slug_ru: 'kambodzhu',
    name_es: 'Camboya', slug_es: 'camboya',
    name_de: 'Kambodscha', slug_de: 'kambodscha',
    name_fr: 'Cambodge', slug_fr: 'cambodge',
    name_lv: 'Kambodža', slug_lv: 'kambodzu',
    name_lt: 'Kambodža', slug_lt: 'kambodza'
  },
  'Canada': {
    code: 'ca', flag: '🇨🇦', currency: 'CAD', callingCode: '+1', timezone: 'America/Toronto', population: '38M', mobileUsers: '35M', slug: 'canada',
    name_et: 'Kanada', slug_et: 'kanadasse',
    name_ru: 'Канада', slug_ru: 'kanadu',
    name_es: 'Canadá', slug_es: 'canada',
    name_de: 'Kanada', slug_de: 'kanada',
    name_fr: 'Canada', slug_fr: 'canada',
    name_lv: 'Kanāda', slug_lv: 'kanadu',
    name_lt: 'Kanada', slug_lt: 'kanada'
  },
  'China': {
    code: 'cn', flag: '🇨🇳', currency: 'CNY', callingCode: '+86', timezone: 'Asia/Shanghai', population: '1.4B', mobileUsers: '1.7B', slug: 'china',
    name_et: 'Hiina', slug_et: 'hiinasse',
    name_ru: 'Китай', slug_ru: 'kitay',
    name_es: 'China', slug_es: 'china',
    name_de: 'China', slug_de: 'china',
    name_fr: 'Chine', slug_fr: 'chine',
    name_lv: 'Ķīna', slug_lv: 'kinu',
    name_lt: 'Kinija', slug_lt: 'kinija'
  },
  'Colombia': {
    code: 'co', flag: '🇨🇴', currency: 'COP', callingCode: '+57', timezone: 'America/Bogota', population: '51M', mobileUsers: '70M', slug: 'colombia',
    name_et: 'Colombia', slug_et: 'colombiasse',
    name_ru: 'Колумбия', slug_ru: 'kolumbiyu',
    name_es: 'Colombia', slug_es: 'colombia',
    name_de: 'Kolumbien', slug_de: 'kolumbien',
    name_fr: 'Colombie', slug_fr: 'colombie',
    name_lv: 'Kolumbija', slug_lv: 'kolumbiju',
    name_lt: 'Kolumbija', slug_lt: 'kolumbija'
  },
  'Croatia': {
    code: 'hr', flag: '🇭🇷', currency: 'EUR', callingCode: '+385', timezone: 'Europe/Zagreb', population: '4M', mobileUsers: '4.5M', slug: 'croatia',
    name_et: 'Horvaatia', slug_et: 'horvaatiasse',
    name_ru: 'Хорватия', slug_ru: 'khorvatiyu',
    name_es: 'Croacia', slug_es: 'croacia',
    name_de: 'Kroatien', slug_de: 'kroatien',
    name_fr: 'Croatie', slug_fr: 'croatie',
    name_lv: 'Horvātija', slug_lv: 'horvatiju',
    name_lt: 'Kroatija', slug_lt: 'kroatija'
  },
  'Cyprus': {
    code: 'cy', flag: '🇨🇾', currency: 'EUR', callingCode: '+357', timezone: 'Asia/Nicosia', population: '1.2M', mobileUsers: '1.3M', slug: 'cyprus',
    name_et: 'Küpros', slug_et: 'küprosele',
    name_ru: 'Кипр', slug_ru: 'kipr',
    name_es: 'Chipre', slug_es: 'chipre',
    name_de: 'Zypern', slug_de: 'zypern',
    name_fr: 'Chypre', slug_fr: 'chypre',
    name_lv: 'Kipra', slug_lv: 'kipru',
    name_lt: 'Kipras', slug_lt: 'kipra'
  },
  'Czech Republic': {
    code: 'cz', flag: '🇨🇿', currency: 'CZK', callingCode: '+420', timezone: 'Europe/Prague', population: '10.5M', mobileUsers: '13M', slug: 'czech-republic',
    name_et: 'Tšehhi', slug_et: 'tšehhisse',
    name_ru: 'Чехия', slug_ru: 'chekhiyu',
    name_es: 'República Checa', slug_es: 'republica-checa',
    name_de: 'Tschechien', slug_de: 'tschechien',
    name_fr: 'République Tchèque', slug_fr: 'republique-tcheque',
    name_lv: 'Čehija', slug_lv: 'cehiju',
    name_lt: 'Čekija', slug_lt: 'cekija'
  },
  'Denmark': {
    code: 'dk', flag: '🇩🇰', currency: 'DKK', callingCode: '+45', timezone: 'Europe/Copenhagen', population: '5.9M', mobileUsers: '7.2M', slug: 'denmark',
    name_et: 'Taani', slug_et: 'taani',
    name_ru: 'Дания', slug_ru: 'daniyu',
    name_es: 'Dinamarca', slug_es: 'dinamarca',
    name_de: 'Dänemark', slug_de: 'danemark',
    name_fr: 'Danemark', slug_fr: 'danemark',
    name_lv: 'Dānija', slug_lv: 'daniju',
    name_lt: 'Danija', slug_lt: 'danija'
  },
  'France': {
    code: 'fr', flag: '🇫🇷', currency: 'EUR', callingCode: '+33', timezone: 'Europe/Paris', population: '68M', mobileUsers: '70M', slug: 'france',
    name_et: 'Prantsusmaa', slug_et: 'prantsusmaale',
    name_ru: 'Франция', slug_ru: 'frantsiyu',
    name_es: 'Francia', slug_es: 'francia',
    name_de: 'Frankreich', slug_de: 'frankreich',
    name_fr: 'France', slug_fr: 'france',
    name_lv: 'Francija', slug_lv: 'franciju',
    name_lt: 'Prancūzija', slug_lt: 'prancuzija'
  },
  'Germany': {
    code: 'de', flag: '🇩🇪', currency: 'EUR', callingCode: '+49', timezone: 'Europe/Berlin', population: '83M', mobileUsers: '84M', slug: 'germany',
    name_et: 'Saksamaa', slug_et: 'saksamaale',
    name_ru: 'Германия', slug_ru: 'germaniyu',
    name_es: 'Alemania', slug_es: 'alemania',
    name_de: 'Deutschland', slug_de: 'deutschland',
    name_fr: 'Allemagne', slug_fr: 'allemagne',
    name_lv: 'Vācija', slug_lv: 'vaciju',
    name_lt: 'Vokietija', slug_lt: 'vokietija'
  },
  'Greece': {
    code: 'gr', flag: '🇬🇷', currency: 'EUR', callingCode: '+30', timezone: 'Europe/Athens', population: '10.7M', mobileUsers: '11M', slug: 'greece',
    name_et: 'Kreeka', slug_et: 'kreekasse',
    name_ru: 'Греция', slug_ru: 'gretsiyu',
    name_es: 'Grecia', slug_es: 'grecia',
    name_de: 'Griechenland', slug_de: 'griechenland',
    name_fr: 'Grèce', slug_fr: 'grece',
    name_lv: 'Grieķija', slug_lv: 'griekiju',
    name_lt: 'Graikija', slug_lt: 'graikija'
  },
  'India': {
    code: 'in', flag: '🇮🇳', currency: 'INR', callingCode: '+91', timezone: 'Asia/Kolkata', population: '1.4B', mobileUsers: '1.2B', slug: 'india',
    name_et: 'India', slug_et: 'indiasse',
    name_ru: 'Индия', slug_ru: 'indiyu',
    name_es: 'India', slug_es: 'india',
    name_de: 'Indien', slug_de: 'indien',
    name_fr: 'Inde', slug_fr: 'inde',
    name_lv: 'Indija', slug_lv: 'indiju',
    name_lt: 'Indija', slug_lt: 'indija'
  },
  'Indonesia': {
    code: 'id', flag: '🇮🇩', currency: 'IDR', callingCode: '+62', timezone: 'Asia/Jakarta', population: '275M', mobileUsers: '370M', slug: 'indonesia',
    name_et: 'Indoneesia', slug_et: 'indoneesiasse',
    name_ru: 'Индонезия', slug_ru: 'indoneziyu',
    name_es: 'Indonesia', slug_es: 'indonesia',
    name_de: 'Indonesien', slug_de: 'indonesien',
    name_fr: 'Indonésie', slug_fr: 'indonesie',
    name_lv: 'Indonēzija', slug_lv: 'indoneziju',
    name_lt: 'Indonezija', slug_lt: 'indonezija'
  },
  'Ireland': {
    code: 'ie', flag: '🇮🇪', currency: 'EUR', callingCode: '+353', timezone: 'Europe/Dublin', population: '5.1M', mobileUsers: '5.7M', slug: 'ireland',
    name_et: 'Iirimaa', slug_et: 'iirimaale',
    name_ru: 'Ирландия', slug_ru: 'irlandiyu',
    name_es: 'Irlanda', slug_es: 'irlanda',
    name_de: 'Irland', slug_de: 'irland',
    name_fr: 'Irlande', slug_fr: 'irlande',
    name_lv: 'Īrija', slug_lv: 'iriju',
    name_lt: 'Airija', slug_lt: 'airija'
  },
  'Israel': {
    code: 'il', flag: '🇮🇱', currency: 'ILS', callingCode: '+972', timezone: 'Asia/Jerusalem', population: '9.5M', mobileUsers: '13M', slug: 'israel',
    name_et: 'Iisrael', slug_et: 'iisraeli',
    name_ru: 'Израиль', slug_ru: 'izrail',
    name_es: 'Israel', slug_es: 'israel',
    name_de: 'Israel', slug_de: 'israel',
    name_fr: 'Israël', slug_fr: 'israel',
    name_lv: 'Izraēla', slug_lv: 'izraelu',
    name_lt: 'Izraelis', slug_lt: 'izraeli'
  },
  'Italy': {
    code: 'it', flag: '🇮🇹', currency: 'EUR', callingCode: '+39', timezone: 'Europe/Rome', population: '59M', mobileUsers: '78M', slug: 'italy',
    name_et: 'Itaalia', slug_et: 'itaaliasse',
    name_ru: 'Италия', slug_ru: 'italiyu',
    name_es: 'Italia', slug_es: 'italia',
    name_de: 'Italien', slug_de: 'italien',
    name_fr: 'Italie', slug_fr: 'italie',
    name_lv: 'Itālija', slug_lv: 'italiju',
    name_lt: 'Italija', slug_lt: 'italija'
  },
  'Japan': {
    code: 'jp', flag: '🇯🇵', currency: 'JPY', callingCode: '+81', timezone: 'Asia/Tokyo', population: '125M', mobileUsers: '190M', slug: 'japan',
    name_et: 'Jaapan', slug_et: 'jaapanisse',
    name_ru: 'Япония', slug_ru: 'yaponiyu',
    name_es: 'Japón', slug_es: 'japon',
    name_de: 'Japan', slug_de: 'japan',
    name_fr: 'Japon', slug_fr: 'japon',
    name_lv: 'Japāna', slug_lv: 'japanu',
    name_lt: 'Japonija', slug_lt: 'japonija'
  },
  'Korea, Republic of South Korea': {
    code: 'kr', flag: '🇰🇷', currency: 'KRW', callingCode: '+82', timezone: 'Asia/Seoul', population: '52M', mobileUsers: '70M', slug: 'south-korea',
    name_et: 'Lõuna-Korea', slug_et: 'louna-koreasse',
    name_ru: 'Южная Корея', slug_ru: 'yuzhnuyu-koreyu',
    name_es: 'Corea del Sur', slug_es: 'corea-del-sur',
    name_de: 'Südkorea', slug_de: 'sudkorea',
    name_fr: 'Corée du Sud', slug_fr: 'coree-du-sud',
    name_lv: 'Dienvidkoreja', slug_lv: 'dienvidkoreju',
    name_lt: 'Pietų Korėja', slug_lt: 'pietu-koreja'
  },
  'Latvia': {
    code: 'lv', flag: '🇱🇻', currency: 'EUR', callingCode: '+371', timezone: 'Europe/Riga', population: '1.9M', mobileUsers: '2.3M', slug: 'latvia',
    name_et: 'Läti', slug_et: 'lätti',
    name_ru: 'Латвия', slug_ru: 'latviyu',
    name_es: 'Letonia', slug_es: 'letonia',
    name_de: 'Lettland', slug_de: 'lettland',
    name_fr: 'Lettonie', slug_fr: 'lettonie',
    name_lv: 'Latvija', slug_lv: 'latviju',
    name_lt: 'Latvija', slug_lt: 'latvija'
  },
  'Lithuania': {
    code: 'lt', flag: '🇱🇹', currency: 'EUR', callingCode: '+370', timezone: 'Europe/Vilnius', population: '2.8M', mobileUsers: '3.8M', slug: 'lithuania',
    name_et: 'Leedu', slug_et: 'leetu',
    name_ru: 'Литва', slug_ru: 'litvu',
    name_es: 'Lituania', slug_es: 'lituania',
    name_de: 'Litauen', slug_de: 'litauen',
    name_fr: 'Lituanie', slug_fr: 'lituanie',
    name_lv: 'Lietuva', slug_lv: 'lietuva',
    name_lt: 'Lietuva', slug_lt: 'lietuva'
  },
  'Malaysia': {
    code: 'my', flag: '🇲🇾', currency: 'MYR', callingCode: '+60', timezone: 'Asia/Kuala_Lumpur', population: '33M', mobileUsers: '44M', slug: 'malaysia',
    name_et: 'Malaisia', slug_et: 'malaisiasse',
    name_ru: 'Малайзия', slug_ru: 'malayziyu',
    name_es: 'Malasia', slug_es: 'malasia',
    name_de: 'Malaysia', slug_de: 'malaysia',
    name_fr: 'Malaisie', slug_fr: 'malaisie',
    name_lv: 'Malaizija', slug_lv: 'malaiziju',
    name_lt: 'Malaizija', slug_lt: 'malaizija'
  },
  'Mexico': {
    code: 'mx', flag: '🇲🇽', currency: 'MXN', callingCode: '+52', timezone: 'America/Mexico_City', population: '130M', mobileUsers: '127M', slug: 'mexico',
    name_et: 'Mehhiko', slug_et: 'mehhikosse',
    name_ru: 'Мексика', slug_ru: 'meksiku',
    name_es: 'México', slug_es: 'mexico',
    name_de: 'Mexiko', slug_de: 'mexiko',
    name_fr: 'Mexique', slug_fr: 'mexique',
    name_lv: 'Meksika', slug_lv: 'meksiku',
    name_lt: 'Meksika', slug_lt: 'meksika'
  },
  'Netherlands': {
    code: 'nl', flag: '🇳🇱', currency: 'EUR', callingCode: '+31', timezone: 'Europe/Amsterdam', population: '17.5M', mobileUsers: '21M', slug: 'netherlands',
    name_et: 'Holland', slug_et: 'hollandisse',
    name_ru: 'Нидерланды', slug_ru: 'niderlandy',
    name_es: 'Países Bajos', slug_es: 'paises-bajos',
    name_de: 'Niederlande', slug_de: 'niederlande',
    name_fr: 'Pays-Bas', slug_fr: 'pays-bas',
    name_lv: 'Nīderlande', slug_lv: 'niderlandi',
    name_lt: 'Nyderlandai', slug_lt: 'nyderlandus'
  },
  'New Zealand': {
    code: 'nz', flag: '🇳🇿', currency: 'NZD', callingCode: '+64', timezone: 'Pacific/Auckland', population: '5.1M', mobileUsers: '6.4M', slug: 'new-zealand',
    name_et: 'Uus-Meremaa', slug_et: 'uus-meremaale',
    name_ru: 'Новая Зеландия', slug_ru: 'novuyu-zelandiyu',
    name_es: 'Nueva Zelanda', slug_es: 'nueva-zelanda',
    name_de: 'Neuseeland', slug_de: 'neuseeland',
    name_fr: 'Nouvelle-Zélande', slug_fr: 'nouvelle-zelande',
    name_lv: 'Jaunzēlande', slug_lv: 'jaunzelandi',
    name_lt: 'Naujoji Zelandija', slug_lt: 'naujaja-zelandija'
  },
  'Norway': {
    code: 'no', flag: '🇳🇴', currency: 'NOK', callingCode: '+47', timezone: 'Europe/Oslo', population: '5.5M', mobileUsers: '5.9M', slug: 'norway',
    name_et: 'Norra', slug_et: 'norrasse',
    name_ru: 'Норвегия', slug_ru: 'norvegiyu',
    name_es: 'Noruega', slug_es: 'noruega',
    name_de: 'Norwegen', slug_de: 'norwegen',
    name_fr: 'Norvège', slug_fr: 'norvege',
    name_lv: 'Norvēģija', slug_lv: 'norvegiju',
    name_lt: 'Norvegija', slug_lt: 'norvegija'
  },
  'Poland': {
    code: 'pl', flag: '🇵🇱', currency: 'PLN', callingCode: '+48', timezone: 'Europe/Warsaw', population: '38M', mobileUsers: '50M', slug: 'poland',
    name_et: 'Poola', slug_et: 'poolasse',
    name_ru: 'Польша', slug_ru: 'polshu',
    name_es: 'Polonia', slug_es: 'polonia',
    name_de: 'Polen', slug_de: 'polen',
    name_fr: 'Pologne', slug_fr: 'pologne',
    name_lv: 'Polija', slug_lv: 'poliju',
    name_lt: 'Lenkija', slug_lt: 'lenkija'
  },
  'Portugal': {
    code: 'pt', flag: '🇵🇹', currency: 'EUR', callingCode: '+351', timezone: 'Europe/Lisbon', population: '10.3M', mobileUsers: '12M', slug: 'portugal',
    name_et: 'Portugal', slug_et: 'portugalisse',
    name_ru: 'Португалия', slug_ru: 'portugaliyu',
    name_es: 'Portugal', slug_es: 'portugal',
    name_de: 'Portugal', slug_de: 'portugal',
    name_fr: 'Portugal', slug_fr: 'portugal',
    name_lv: 'Portugāle', slug_lv: 'portugaliju',
    name_lt: 'Portugalija', slug_lt: 'portugalija'
  },
  'Romania': {
    code: 'ro', flag: '🇷🇴', currency: 'RON', callingCode: '+40', timezone: 'Europe/Bucharest', population: '19M', mobileUsers: '23M', slug: 'romania',
    name_et: 'Rumeenia', slug_et: 'rumeeniasse',
    name_ru: 'Румыния', slug_ru: 'rumyniyu',
    name_es: 'Rumania', slug_es: 'rumania',
    name_de: 'Rumänien', slug_de: 'rumanien',
    name_fr: 'Roumanie', slug_fr: 'roumanie',
    name_lv: 'Rumānija', slug_lv: 'rumaniju',
    name_lt: 'Rumunija', slug_lt: 'rumunija'
  },
  'Russian Federation': {
    code: 'ru', flag: '🇷🇺', currency: 'RUB', callingCode: '+7', timezone: 'Europe/Moscow', population: '144M', mobileUsers: '230M', slug: 'russia',
    name_et: 'Venemaa', slug_et: 'venemaale',
    name_ru: 'Россия', slug_ru: 'rossiyu',
    name_es: 'Rusia', slug_es: 'rusia',
    name_de: 'Russland', slug_de: 'russland',
    name_fr: 'Russie', slug_fr: 'russie',
    name_lv: 'Krievija', slug_lv: 'krieviju',
    name_lt: 'Rusija', slug_lt: 'rusija'
  },
  'Singapore': {
    code: 'sg', flag: '🇸🇬', currency: 'SGD', callingCode: '+65', timezone: 'Asia/Singapore', population: '5.9M', mobileUsers: '9M', slug: 'singapore',
    name_et: 'Singapur', slug_et: 'singapuri',
    name_ru: 'Сингапур', slug_ru: 'singapur',
    name_es: 'Singapur', slug_es: 'singapur',
    name_de: 'Singapur', slug_de: 'singapur',
    name_fr: 'Singapour', slug_fr: 'singapour',
    name_lv: 'Singapūra', slug_lv: 'singapuru',
    name_lt: 'Singapūras', slug_lt: 'singapura'
  },
  'Spain': {
    code: 'es', flag: '🇪🇸', currency: 'EUR', callingCode: '+34', timezone: 'Europe/Madrid', population: '47M', mobileUsers: '54M', slug: 'spain',
    name_et: 'Hispaania', slug_et: 'hispaaniasse',
    name_ru: 'Испания', slug_ru: 'ispaniyu',
    name_es: 'España', slug_es: 'españa',
    name_de: 'Spanien', slug_de: 'spanien',
    name_fr: 'Espagne', slug_fr: 'espagne',
    name_lv: 'Spānija', slug_lv: 'spaniju',
    name_lt: 'Ispanija', slug_lt: 'ispanija'
  },
  'Sweden': {
    code: 'se', flag: '🇸🇪', currency: 'SEK', callingCode: '+46', timezone: 'Europe/Stockholm', population: '10.5M', mobileUsers: '13M', slug: 'sweden',
    name_et: 'Rootsi', slug_et: 'rootsi',
    name_ru: 'Швеция', slug_ru: 'shvetsiyu',
    name_es: 'Suecia', slug_es: 'suecia',
    name_de: 'Schweden', slug_de: 'schweden',
    name_fr: 'Suède', slug_fr: 'suede',
    name_lv: 'Zviedrija', slug_lv: 'zviedriju',
    name_lt: 'Švedija', slug_lt: 'svedija'
  },
  'Switzerland': {
    code: 'ch', flag: '🇨🇭', currency: 'CHF', callingCode: '+41', timezone: 'Europe/Zurich', population: '8.7M', mobileUsers: '11M', slug: 'switzerland',
    name_et: 'Šveits', slug_et: 'šveitsi',
    name_ru: 'Швейцария', slug_ru: 'shveytsariyu',
    name_es: 'Suiza', slug_es: 'suiza',
    name_de: 'Schweiz', slug_de: 'schweiz',
    name_fr: 'Suisse', slug_fr: 'suisse',
    name_lv: 'Šveice', slug_lv: 'sveici',
    name_lt: 'Šveicarija', slug_lt: 'sveicarija'
  },
  'Thailand': {
    code: 'th', flag: '🇹🇭', currency: 'THB', callingCode: '+66', timezone: 'Asia/Bangkok', population: '70M', mobileUsers: '130M', slug: 'thailand',
    name_et: 'Tai', slug_et: 'taisse',
    name_ru: 'Таиланд', slug_ru: 'tailand',
    name_es: 'Tailandia', slug_es: 'tailandia',
    name_de: 'Thailand', slug_de: 'thailand',
    name_fr: 'Thaïlande', slug_fr: 'thailande',
    name_lv: 'Taizeme', slug_lv: 'taizemi',
    name_lt: 'Tailandas', slug_lt: 'tailanda'
  },
  'Turkey': {
    code: 'tr', flag: '🇹🇷', currency: 'TRY', callingCode: '+90', timezone: 'Europe/Istanbul', population: '85M', mobileUsers: '87M', slug: 'turkey',
    name_et: 'Türgi', slug_et: 'türgisse',
    name_ru: 'Турция', slug_ru: 'turtsiyu',
    name_es: 'Turquía', slug_es: 'turquia',
    name_de: 'Türkei', slug_de: 'turkei',
    name_fr: 'Turquie', slug_fr: 'turquie',
    name_lv: 'Turcija', slug_lv: 'turciju',
    name_lt: 'Turkija', slug_lt: 'turkija'
  },
  'Ukraine': {
    code: 'ua', flag: '🇺🇦', currency: 'UAH', callingCode: '+380', timezone: 'Europe/Kiev', population: '41M', mobileUsers: '54M', slug: 'ukraine',
    name_et: 'Ukraina', slug_et: 'ukrainasse',
    name_ru: 'Украина', slug_ru: 'ukrainu',
    name_es: 'Ucrania', slug_es: 'ucrania',
    name_de: 'Ukraine', slug_de: 'ukraine',
    name_fr: 'Ukraine', slug_fr: 'ukraine',
    name_lv: 'Ukraina', slug_lv: 'ukrainu',
    name_lt: 'Ukraina', slug_lt: 'ukraina'
  },
  'United Arab Emirates': {
    code: 'ae', flag: '🇦🇪', currency: 'AED', callingCode: '+971', timezone: 'Asia/Dubai', population: '10M', mobileUsers: '19M', slug: 'united-arab-emirates',
    name_et: 'Araabia Ühendemiraadid', slug_et: 'araabia-uhendemiraatidesse',
    name_ru: 'ОАЭ', slug_ru: 'oae',
    name_es: 'Emiratos Árabes Unidos', slug_es: 'emiratos-arabes-unidos',
    name_de: 'Vereinigte Arabische Emirate', slug_de: 'vae',
    name_fr: 'Émirats Arabes Unis', slug_fr: 'eau',
    name_lv: 'Apvienotie Arābu Emirāti', slug_lv: 'aae',
    name_lt: 'Jungtiniai Arabų Emyratai', slug_lt: 'jae'
  },
  'United Kingdom': {
    code: 'gb', flag: '🇬🇧', currency: 'GBP', callingCode: '+44', timezone: 'Europe/London', population: '67M', mobileUsers: '72M', slug: 'united-kingdom',
    name_et: 'Suurbritannia', slug_et: 'suurbritanniasse',
    name_ru: 'Великобритания', slug_ru: 'velikobritaniyu',
    name_es: 'Reino Unido', slug_es: 'reino-unido',
    name_de: 'Vereinigtes Königreich', slug_de: 'vereinigtes-konigreich',
    name_fr: 'Royaume-Uni', slug_fr: 'royaume-uni',
    name_lv: 'Lielbritānija', slug_lv: 'lielbritaniju',
    name_lt: 'Jungtinė Karalystė', slug_lt: 'jungtine-karalyste'
  },
  'United States': {
    code: 'us', flag: '🇺🇸', currency: 'USD', callingCode: '+1', timezone: 'America/New_York', population: '333M', mobileUsers: '327M', slug: 'united-states',
    name_et: 'Ameerika Ühendriigid', slug_et: 'ameerika-uhendriikidesse',
    name_ru: 'США', slug_ru: 'ssha',
    name_es: 'Estados Unidos', slug_es: 'estados-unidos',
    name_de: 'Vereinigte Staaten', slug_de: 'usa',
    name_fr: 'États-Unis', slug_fr: 'etats-unis',
    name_lv: 'ASV', slug_lv: 'asv',
    name_lt: 'JAV', slug_lt: 'jav'
  },
  'Vietnam': {
    code: 'vn', flag: '🇻🇳', currency: 'VND', callingCode: '+84', timezone: 'Asia/Ho_Chi_Minh', population: '98M', mobileUsers: '140M', slug: 'vietnam',
    name_et: 'Vietnam', slug_et: 'vietnami',
    name_ru: 'Вьетнам', slug_ru: 'vyetnam',
    name_es: 'Vietnam', slug_es: 'vietnam',
    name_de: 'Vietnam', slug_de: 'vietnam',
    name_fr: 'Vietnam', slug_fr: 'vietnam',
    name_lv: 'Vjetnama', slug_lv: 'vjetnamu',
    name_lt: 'Vietnamas', slug_lt: 'vietnama'
  },
};

/**
 * Get metadata for a country by name
 */
export function getCountryMetadata(countryName) {
  return COUNTRY_METADATA[countryName] || generateFallbackMetadata(countryName);
}

/**
 * Generate fallback metadata for countries not in our curated list
 */
function generateFallbackMetadata(countryName) {
  return {
    code: countryName.toLowerCase().substring(0, 2),
    flag: '🌍',
    currency: 'USD',
    callingCode: '+?',
    timezone: 'UTC',
    population: 'N/A',
    mobileUsers: 'N/A',
    slug: countryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  };
}

/**
 * Get all country names that have metadata
 */
export function getAllCountryNames() {
  return Object.keys(COUNTRY_METADATA);
}
