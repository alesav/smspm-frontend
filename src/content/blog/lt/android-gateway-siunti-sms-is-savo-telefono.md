---
title: "Siųskite masinę SMS už €0,01 naudodami savo Android telefoną — pradėkite nemokamai"
description: "SMSPM Android Gateway paverčia bet kurį Android išmanųjį telefoną asmenine SMS siuntimo priemone. Nukreipkite pasirinktus operatorius per savo SIM kortelę, mokėkite tik €0,01 už žinutę ir leiskite gavėjams matyti jūsų tikrą numerį."
pubDate: 2025-07-01
author: "SMSPM komanda"
tags: ["android-gateway", "masine-sms", "taupymas", "vadovas"]
draft: false
---

Dauguma masinių SMS platformų ima nuo €0,05 iki €0,45 už žinutę, priklausomai nuo šalies. SMSPM turi funkciją, kuri gali sumažinti šią kainą iki **€0,01 už SMS** bet kuriam operatoriui, kuriame turite vietinę SIM kortelę — naudojant savo Android telefoną kaip siuntimo įrenginį. Štai kaip tai veikia ir kodėl verta išbandyti.

## Kas yra Android Gateway?

Android Gateway yra SMSPM maršruto parinkimo parinktis. Vietoj to, kad SMS būtų siunčiamos per komercinį tiekėją, platforma perduoda žinutę per Firebase Cloud Messaging prijungtam Android telefonui, kuris ją išsiunčia iš telefono SIM kortelės — lygiai kaip įprasta tekstinė žinutė.

Gavėjo požiūriu, SMS ateina iš tikro, paskambinamo numerio. Ne iš "Info", "Authmsg" ar atsitiktinio trumpojo kodo. Iš jūsų tikrojo numerio.

## Kodėl tai svarbiau nei manote

Mobiliojo ryšio operatoriai vis labiau šalina raidinių ir skaitmeninių siuntėjų ID iš gaunamų SMS srautų. Jūsų siunčiama žinutė pavadinimu "JūsųĮmonė" dažnai ateina kaip "Info" ar bendras žymėjimas — priklausomai nuo operatoriaus ir šalies.

Kai siunčiate per Android Gateway, gavėjas mato jūsų SIM kortelės numerį — tikrą mobiliojo ryšio numerį, su kuriuo jis gali:
- Jums tiesiogiai perskambinti
- Išsaugoti numerį kontaktuose
- Atsakyti (atsakymai ateina į telefono gautuosius)

Vietinėms įmonėms, siunčiančioms priminimus apie susitikimus, pristatymo pranešimus ar akcijas, tai daro pastebimą skirtumą pasitikėjime ir atidarymo rodiklyje.

## Kiek tai iš tikrųjų kainuoja

| Maršrutas | Kaina už SMS |
|---|---|
| SMSPM komercinis tinklų sietuvas | €0,02 – €0,45 (priklausomai nuo operatoriaus) |
| Android Gateway | **€0,01 fiksuotas** |

€0,01 yra SMSPM platformos mokestis — jis dengia infrastruktūrą, "push" pristatymą per FCM ir maršruto parinkimo logiką. **Jūsų SIM kortelės mokesčiai yra atskiri ir priklauso nuo jūsų mobiliojo ryšio plano.** Daugelyje šalių standartiniai planai apima didelę mėnesinę SMS kvotą (paprastai 1 000) — praktiškai dažnai mokate tik €0,01 platformos mokestį už žinutę.

**Pavyzdys:** 1 000 SMS Turkijos operatoriui per komercinį tinklų sietuvą po €0,12 = **€120**. Per Android Gateway su planu, apimančiu 1 000 nemokamų SMS = **€10**. Tai 92% mažiau.

## Galite pradėti nemokamai

SMSPM neturi mėnesinio mokesčio ir minimalios išlaidos. [Susikurkite nemokamą paskyrą](https://app.smspm.com/app/register), papildykite norimą sumą ir galite iš karto išbandyti Android Gateway. Sąranka trunka apie 5 minutes.

Jums reikia tik:
- Android telefono su Android 8.0 ar naujesnio (dauguma telefonų nuo 2017 m. atitinka reikalavimus)
- SIM kortelės jame
- SMSPM Gateway programėlės (APK atsisiuntimas iš jūsų valdymo skydelio → Įrenginiai)

## Kaip tai nustatyti

**1 žingsnis — Atsisiųskite ir įdiekite programėlę**  
Eikite į savo SMSPM valdymo skydelį → Įrenginiai ir atsisiųskite SMSPM Gateway APK. Įdiekite jį Android telefone, kurį norite naudoti kaip tinklų sietuvą.

**2 žingsnis — Suteikite leidimus**  
Programėlei reikia leidimų siųsti SMS, telefono būsenai ir pranešimams, taip pat akumuliatoriaus optimizavimo išimties, kad ji veiktų fone.

**3 žingsnis — Sugeneruokite susiejimo kodą**  
Valdymo skydelyje → Įrenginiai spustelėkite **Generuoti susiejimo kodą**. Pasirodo 6 skaitmenų kodas, galiojantis 15 minučių.

**4 žingsnis — Susiekite telefoną**  
Įveskite kodą programėlėje ir bakstelėkite **Susieti įrenginį**. Valdymo skydelis automatiškai aptinka susiejimą ir rodo jūsų įrenginį.

**5 žingsnis — Nustatykite maršrutą**  
Eikite į valdymo skydelį → Kainos. Kiekvienam operatoriui, kurį norite nukreipti per savo telefoną, raskite jį lentelėje ir pakeiskite Maršruto išskleidžiamąjį meniu iš "SMSPM (numatytasis)" į savo telefoną.

**6 žingsnis — Siųskite**  
Siųskite SMS įprastai per valdymo skydelį arba API. Žinutės, atitinkančios jūsų telefono maršrutą, automatiškai persiunčiamos į įrenginį ir išsiunčiamos iš jūsų SIM kortelės.

## Kas atsitinka, jei telefonas neprisijungęs?

Pagal numatytuosius nustatymus **atsarginis maršrutas įjungtas**: jei telefonas nepasiekiamas, žinutė automatiškai persiunčiama per SMSPM komercinį tiekėją per 10 minučių. Nė viena SMS neprarandama.

Jei išjungiate atsarginį maršrutą, žinutė laukia pakartojimų eilėje iki 24 valandų. Kai telefonas vėl prisijungs, atidarykite programėlę ir bakstelėkite **"↓ Gauti eilę"**, kad iš karto iš naujo išsiųstumėte visas laukiančias žinutes.

## Pasirengę išbandyti?

[Susikurkite nemokamą SMSPM paskyrą](https://app.smspm.com/app/register) ir prijunkite savo pirmąjį Android įrenginį. Be prenumeratos, be minimalios išlaidos — tik €0,01 už SMS per savo SIM kortelę.

[Peržiūrėti kainas pagal šalį →](/lt/sms-kainos)  
[Visa Android Gateway dokumentacija →](https://app.smspm.com/app/devices)
