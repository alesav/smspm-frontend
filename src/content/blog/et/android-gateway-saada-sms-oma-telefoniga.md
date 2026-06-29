---
title: "Saada hulk-SMS-e €0,01 eest oma Android-telefoniga — alusta tasuta"
description: "SMSPM-i Android Gateway muudab su Android-telefoni isiklikuks SMS-saatjaks. Suuna valitud operaatorid läbi oma SIM-kaardi, maksa vaid €0,01 sõnumi kohta ja lase saajal näha sinu päris numbrit."
pubDate: 2025-07-01
author: "SMSPM meeskond"
tags: ["android-gateway", "hulk-sms", "kulud", "juhend"]
draft: false
---

Enamik hulk-SMS-i platvorme küsib €0,05 kuni €0,45 sõnumi kohta olenevalt riigist. SMSPM-il on funktsioon, mis võimaldab seda viia **€0,01 peale SMS-i kohta** iga operaatori jaoks, kus sul on kohalik SIM-kaart — kasutades oma Android-telefoni saatmisseadmena. Siin on selgitus, kuidas see töötab ja miks tasub proovida.

## Mis on Android Gateway?

Android Gateway on SMSPM-i marsruutimisvalik. Selle asemel, et saata SMS kaubandusliku pakkuja kaudu, suunab platvorm sõnumi Firebase Cloud Messaging kaudu ühendatud Android-telefonile, mis saadab selle telefoni SIM-kaardilt — täpselt nagu tavaline tekstsõnum.

Saaja vaatenurgast saabub SMS päris, helistatavalt numbrit. Mitte "Info", "Authmsg" ega juhuslikult lühikoodilt. Sinu tegelikult numbrilt.

## Miks see rohkem tähendab, kui arvad

Mobiilsideoperaatorid on järjest rohkem eemaldanud tähtnumbrilisi saatja ID-sid sissetulevast SMS-liiklusest. Sinu saadetud sõnum ettevõtte nime alt jõuab saajani tihti siltidega "Info" või mõne üldise märgistusega — olenevalt operaatorist ja riigist.

Kui kasutad Android Gateway't, näeb saaja sinu SIM-kaardi numbrit — päris mobiilnumbrit, millele ta saab:
- Otse tagasi helistada
- Selle kontaktidesse salvestada
- Vastata (vastused jõuavad telefoni postkasti)

Kohalikele ettevõtetele, kes saadavad kohtumise meeldetuletusi, tarneteatisi või reklaame, teeb see usalduse ja avamismäära osas märgatava vahe.

## Mida see tegelikult maksab

| Marsruut | Hind SMS-i kohta |
|---|---|
| SMSPM kommertsgateway | €0,02 – €0,45 (operaatorist sõltuv) |
| Android Gateway | **€0,01 fikseeritud** |

€0,01 on SMSPM-i platvormitasu — see katab infrastruktuuri, FCM-i kaudu push-tarne ja marsruutimisloogika. **Sinu SIM-kaardi kulud on eraldi ja sõltuvad sinu mobiilsidelepingust.** Enamikus riikides sisaldavad tavapärased mobiilsidelepingud suurt igakuist SMS-i mahtu (tavaliselt 1000) — seega maksad praktikas tihti ainult €0,01 platvormi tasu sõnumi kohta.

**Näide:** 1000 SMS Türgi operaatorile kaubandusliku gateway kaudu €0,12 tükk = **€120**. Android Gateway kaudu lepinguga, mis sisaldab 1000 tasuta SMS-i = **€10**. See on 92% odavam.

## Saad alustada tasuta

SMSPM-il ei ole kuutasusid ega miinimumsummat. [Loo tasuta konto](https://app.smspm.com/app/register), laadi rahakott soovitud summa ulatuses ja saad kohe Android Gateway'd testida. Seadistamine võtab umbes 5 minutit.

Vajad ainult:
- Android 8.0 või uuemat Android-telefoni (enamik 2017. aasta ja hilisemaid telefone sobib)
- SIM-kaarti selles
- SMSPM Gateway rakendust (APK allalaadimine armatuurlaualt → Seadmed)

## Kuidas seadistada

**1. samm — Laadi alla ja installi rakendus**  
Mine SMSPM armatuurlauale → Seadmed ja laadi alla SMSPM Gateway APK. Installi see Android-telefonile, mida soovid lüüsina kasutada.

**2. samm — Anna load**  
Rakendus vajab SMS-i saatmise, telefoni oleku ja teavituste lubasid, samuti aku optimeerimise erandit, et see taustal ellu jääks.

**3. samm — Genereeri paarimiskood**  
Armatuurlaual → Seadmed klõpsa **Genereeri paarimiskood**. Ilmub 6-kohaline kood, mis kehtib 15 minutit.

**4. samm — Paari telefon**  
Sisesta kood rakendusse ja vajuta **Paari seade**. Armatuurlaud tuvastab paarimise automaatselt ja kuvab sinu seadme.

**5. samm — Seadista marsruutimine**  
Mine armatuurlauale → Hinnad. Iga operaatori jaoks, mida soovid oma telefoni kaudu marsruutida, leia see tabelist ja muuda Marsruudi rippmenüü "SMSPM (vaikimisi)" asemele oma telefon.

**6. samm — Saada**  
Saada SMS-e tavapäraselt armatuurlaua või API kaudu. Sinu telefoni marsruudile vastavad sõnumid suunatakse automaatselt seadmesse ja saadetakse sinu SIM-kaardilt.

## Mis juhtub, kui telefon on võrguühenduseta?

Vaikimisi on **tagavararsruut lubatud**: kui telefon on kättesaamatu, suunatakse sõnum automaatselt uuesti SMSPM-i kaubandusliku pakkuja kaudu 10 minuti jooksul. Ühtegi SMS-i ei kaotata.

Kui keelad tagavararsruudi, ootab sõnum korduskatse järjekorras kuni 24 tundi, proovides üha suurema intervalliga uuesti. Kui telefon tuleb tagasi võrku, avades rakenduse ja vajutades **"↓ Tõmba järjekord"**, lähetatakse kõik ootavad sõnumid kohe uuesti.

## Kas oled valmis proovima?

[Loo oma tasuta SMSPM konto](https://app.smspm.com/app/register) ja ühenda oma esimene Android-seade. Kuutasuta, miinimumsummata — ainult €0,01 SMS-i kohta läbi oma SIM-kaardi.

[Vaata hindasid riigiti →](/et/sms-hinnad)  
[Loe täielikku Android Gateway dokumentatsiooni →](https://app.smspm.com/app/devices)
