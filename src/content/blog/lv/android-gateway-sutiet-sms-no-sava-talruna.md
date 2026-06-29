---
title: "Sūtiet lielapjoma SMS par €0,01, izmantojot savu Android tālruni — sāciet bez maksas"
description: "SMSPM Android Gateway pārvērš jebkuru Android viedtālruni par personīgu SMS sūtītāju. Novirziet izvēlētos operatorus caur savu SIM karti, maksājiet tikai €0,01 par ziņu un ļaujiet saņēmējiem redzēt jūsu īsto numuru."
pubDate: 2025-07-01
author: "SMSPM komanda"
tags: ["android-gateway", "lielapjoma-sms", "ietaupijums", "celvedis"]
draft: false
---

Lielākā daļa lielapjoma SMS platformu iekasē no €0,05 līdz €0,45 par ziņu atkarībā no valsts. SMSPM ir funkcija, kas to var samazināt līdz **€0,01 par SMS** jebkuram operatoram, kuram ir vietējā SIM karte — izmantojot savu Android tālruni kā sūtīšanas ierīci. Lūk, kā tas darbojas un kāpēc vērts izmēģināt.

## Kas ir Android Gateway?

Android Gateway ir maršrutēšanas opcija SMSPM ietvaros. Tā vietā, lai SMS sūtītu caur komerciālu pakalpojumu sniedzēju, platforma nosūta ziņu caur Firebase Cloud Messaging uz pievienotu Android tālruni, kas to izsūta no tālruņa SIM kartes — tieši kā parasta teksta ziņa.

No saņēmēja viedokļa SMS pienāk no īsta, atzvaniāma numura. Nevis no "Info", "Authmsg" vai nejauša īsā koda. No jūsu īstā numura.

## Kāpēc tas ir svarīgāk, nekā domājat

Mobilo sakaru operatori arvien biežāk noņem burtciparu sūtītāja ID no ienākošās SMS satiksmes. Jūsu sūtīta ziņa no "JūsuUzņēmums" bieži nonāk kā "Info" vai vispārīga etiķete — atkarībā no operatora un valsts.

Sūtot caur Android Gateway, saņēmējs redz jūsu SIM kartes numuru — īstu mobilo numuru, ar kuru viņš var:
- Tieši atzvānīt
- Saglabāt numuru kontaktos
- Atbildēt (atbildes nonāk tālruņa iesūtnē)

Vietējiem uzņēmumiem, kas sūta randevu atgādinājumus, piegādes paziņojumus vai akcijas, tas rada ievērojamu atšķirību uzticamībā un atvēršanas rādītājā.

## Cik tas patiesībā maksā

| Maršruts | Cena par SMS |
|---|---|
| SMSPM komerciālais vārteja | €0,02 – €0,45 (atkarīgs no operatora) |
| Android Gateway | **€0,01 fiksēts** |

€0,01 ir SMSPM platformas maksa — tā sedz infrastruktūru, push piegādi caur FCM un maršrutēšanas loģiku. **Jūsu SIM kartes maksas ir atsevišķas un atkarīgas no jūsu mobilo sakaru plāna.** Lielākajā daļā valstu standarta plāni ietver lielu ikmēneša SMS kvotu (parasti 1 000) — praksē bieži maksājat tikai €0,01 platformas maksu par ziņu.

**Piemērs:** 1 000 SMS Turcijas operatoram caur komerciālo vārteju pa €0,12 = **€120**. Caur Android Gateway ar plānu, kas ietver 1 000 bezmaksas SMS = **€10**. Tas ir par 92% mazāk.

## Varat sākt bez maksas

SMSPM nav ikmēneša maksas un minimālā izdevuma. [Izveidojiet bezmaksas kontu](https://app.smspm.com/app/register), papildiniet ar jebkuru summu un varat nekavējoties izmēģināt Android Gateway. Iestatīšana aizņem apmēram 5 minūtes.

Jums nepieciešams tikai:
- Android tālrunis ar Android 8.0 vai jaunāku versiju (lielākā daļa tālruņu no 2017. gada atbilst prasībām)
- SIM karte tajā
- SMSPM Gateway lietotne (APK lejupielāde no informācijas paneļa → Ierīces)

## Kā to iestatīt

**1. solis — Lejupielādējiet un instalējiet lietotni**  
Dodieties uz savu SMSPM informācijas paneli → Ierīces un lejupielādējiet SMSPM Gateway APK. Instalējiet to Android tālrunī, kuru vēlaties izmantot kā vārteju.

**2. solis — Piešķiriet atļaujas**  
Lietotnei nepieciešamas SMS sūtīšanas, tālruņa statusa un paziņojumu atļaujas, kā arī akumulatora optimizācijas izņēmums, lai tā darbotos fonā.

**3. solis — Ģenerējiet savienošanas pārī kodu**  
Informācijas panelī → Ierīces noklikšķiniet uz **Ģenerēt savienošanas pārī kodu**. Parādās 6 ciparu kods, derīgs 15 minūtes.

**4. solis — Savienojiet tālruni pārī**  
Ievadiet kodu lietotnē un pieskarieties **Savienot ierīci pārī**. Informācijas panelis automātiski nosaka savienošanu pārī un parāda jūsu ierīci.

**5. solis — Iestatiet maršrutēšanu**  
Dodieties uz informācijas paneli → Cenas. Katram operatoram, kuru vēlaties maršrutēt caur savu tālruni, atrodiet to tabulā un nomainiet Route nolaižamo izvēlni no "SMSPM (noklusējums)" uz savu tālruni.

**6. solis — Sūtiet**  
Sūtiet SMS parasti caur informācijas paneli vai API. Ziņas, kas atbilst jūsu tālruņa maršrutam, automātiski tiek pārsūtītas uz ierīci un izsūtītas no jūsu SIM kartes.

## Kas notiek, ja tālrunis ir bezsaistē?

Pēc noklusējuma **rezerves maršruts ir iespējots**: ja tālrunis nav sasniedzams, ziņa automātiski tiek novirzīta caur SMSPM komerciālo pakalpojumu sniedzēju 10 minūšu laikā. Neviena SMS netiek zaudēta.

Ja atspējojat rezerves maršrutu, ziņa gaida atkārtojumu rindā līdz 24 stundām. Kad tālrunis atgriezīsies tiešsaistē, atveriet lietotni un pieskarieties **"↓ Iegūt rindu"**, lai nekavējoties atkārtoti nosūtītu visas gaidošās ziņas.

## Gatavi izmēģināt?

[Izveidojiet savu bezmaksas SMSPM kontu](https://app.smspm.com/app/register) un savienojiet savu pirmo Android ierīci. Bez abonēšanas, bez minimālā izdevuma — tikai €0,01 par SMS caur savu SIM karti.

[Skatīt cenas pēc valsts →](/lv/sms-cenas)  
[Pilna Android Gateway dokumentācija →](https://app.smspm.com/app/devices)
