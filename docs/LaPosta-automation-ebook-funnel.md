# LaPosta-automation — e-book funnel "De Taal van je Lichaam"

*Bouwspec voor de e-mail-automation in LaPosta. Datum: 19 mei 2026.*

## Context

De e-book funnel: bezoeker meldt zich aan op `https://go.crystalhelder.nl/de-taal-van-je-lichaam/`
→ n8n zet de persoon in de LaPosta-lijst (id `wf7opjgslg`) → die inschrijving start deze automation.
De persoon krijgt het e-book niet als bijlage, maar een mail met een link naar een downloadpagina
(`/de-taal-van-je-lichaam/e-book/`).

Bij de aanmelding genereert n8n een unieke `download_token` en zet die in het LaPosta-veld
**`downloadtoken`** (let op: veld-tag zonder underscore). Daarmee kan de downloadlink per persoon
gepersonaliseerd worden.

## 1. De bouwstukken die LaPosta biedt

- **Start (trigger):** een automation start automatisch zodra iemand wordt ingeschreven op een
  lijst. (Kan ook starten op een datumveld of een link-klik — voor ons is inschrijving de trigger.)
- **E-mail versturen:** verstuurt een e-mail binnen de automation.
- **Wacht tot…:** pauzeert tot een voorwaarde klopt — een veldwaarde, een actie (e-mail geopend of
  link geklikt, eventueel een *specifieke* link in een *specifieke* mail), of een tijdstip. Je kunt
  een **maximale wachttijd** instellen: daarna loopt de automation sowieso door, ook als de
  voorwaarde niet gehaald is.
- **Als/dan:** splitst de automation in twee paden — één voor wie aan een voorwaarde voldoet, één
  voor de rest. Voorwaarde: veldwaarde, actie (verzonden/geopend/geklikt) of tijd.
- **Conditionele inhoud:** losse blokken binnen één e-mail aan/uit op een veldwaarde (niet nodig
  voor deze funnel).

## 2. Hoe de automation gebouwd wordt — stap voor stap

**Trigger:** start bij inschrijving op de e-book-lijst (`wf7opjgslg`).

**Stap 1 — Mail 1: het e-book**
De eerste e-mail, met de downloadlink:
`https://go.crystalhelder.nl/de-taal-van-je-lichaam/e-book/?id={{downloadtoken}}`
De merge-tag **`{{downloadtoken}}`** is verplicht — zonder die parameter kan de downloadpagina de
persoon niet herkennen en blijft de "Opgehaald"-kolom in de spreadsheet leeg.

**Stap 2 — Wacht tot**
"Wacht tot": wacht tot de relatie **op de downloadlink in Mail 1 heeft geklikt**, met een
**maximale wachttijd van ± 3 dagen**. Klikt iemand → de wachttijd stopt meteen. Klikt iemand niet
→ na 3 dagen loopt 'ie sowieso door.

**Stap 3 — Als/dan: op de downloadlink in Mail 1 geklikt?**
- **Ja** → meteen door naar de nurturingreeks (Stap 5).
- **Nee** → door naar de herinneringen (Stap 4).

**Stap 4 — Herinneringen (alleen het "nee"-pad)**
- **Herinnering 1:** korte e-mail — "je e-book staat nog voor je klaar" + de link.
- **Wacht tot:** op de downloadlink geklikt, max ± 3 dagen.
- **Als/dan:** geklikt? → **Ja:** door naar nurturing (Stap 5). **Nee:** **Herinnering 2** (laatste).
- Daarna: → nurturing (Stap 5).

**Stap 5 — Nurturing-/conversiereeks**
De inhoudelijke vervolgmails richting het adviesgesprek. **Iedereen** komt hier uiteindelijk
terecht — ook wie niet klikte. Zet in de eerste nurturingmail een vriendelijke regel met de
e-booklink er nóg een keer bij. (De inhoud van de nurturingmails staat los van deze structuur.)

## 3. De principes erachter — niet "wegoptimaliseren"

- **Vertak op "link geklikt", niet op een hard download-slot.** LaPosta ziet alléén of iemand op
  de link in de e-mail klikte — een betrouwbaar, ingebouwd signaal. Of iemand op de downloadpagina
  ook echt de knop indrukte staat in de spreadsheet (voor analyse), niet in LaPosta. Bouw de
  automation dus op de link-klik.
- **De maximale wachttijd is het vangnet.** Niemand blijft eindeloos hangen — na de max-tijd loopt
  iedereen door. Belangrijk, want het klik-signaal mist soms iemand.
- **Eén herinneringsspoor, maximaal 2 herinneringen.** Geen sub-flows, niet blijven zeuren.
- **Iedereen eindigt in de nurturing.** De klik versnelt of vertraagt alleen — het is geen poort
  die mensen buitensluit. Wie niet klikte is nog steeds een geïnteresseerde lead.

Wachttijden (± 3 dagen) zijn richtwaarden — vrij te tunen.

## Bron

LaPosta-documentatie: [Wat is automation](https://docs.laposta.nl/article/466-wat-is-automation) ·
[Wacht tot](https://docs.laposta.nl/article/486-wacht-tot) ·
[Als/dan](https://docs.laposta.nl/article/487-als-dan) ·
[Conditionele inhoud](https://docs.laposta.nl/article/1091-hoe-stel-ik-conditionele-inhoud-in)
