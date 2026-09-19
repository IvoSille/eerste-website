# Evaluatieformulier challenge "Je pijn is echt"

Specificatie van inhoud en gebruikerservaring. Bedoeld als bouwinstructie (o.a. voor Claude Code).

## 1. Doel en context

Na afloop van de 5-daagse WhatsApp-challenge van Crystal Helder (crystalhelder.nl) en de live sessie van vrijdag 18 september vragen we deelneemsters om feedback.

Doelen, in volgorde van prioriteit:

1. **Boekingen voor het inzichtgesprek versterken** (boekingsdeadline 25 september). Het formulier mag hier nooit mee concurreren.
2. **Reviews ophalen** met toestemming, voor de landingspagina van de volgende ronde.
3. **Voice of customer**: hoe vrouwen hun klachten in eigen woorden beschrijven.
4. **Segmentatie**: leeftijd, cyclusfase, bewustzijnsniveau, interesse.
5. **Funnel-diagnose**: live sessie wel/niet, redenen om (nog) niet te boeken.

Verspreiding: via WhatsApp-groep (niet te personaliseren) en via e-mail uit MailerLite (wel te personaliseren).

## 2. Uitgangspunten gebruikerservaring

- **Mobile first.** Het merendeel opent het formulier vanuit WhatsApp op de telefoon.
- **Eén vraag per scherm**, met een voortgangsbalk. Grote, tikbare antwoordknoppen.
- **Automatisch door** na een enkelvoudige keuze. Bij meerkeuze en open vragen een knop "Volgende".
- **Terug-knop** op elk scherm, zonder dataverlies.
- **Twee delen.** Deel 1 (kern, ± 2 minuten) wordt opgeslagen zodra het af is. Deel 2 (verdieping) is optioneel en wordt aan hetzelfde record toegevoegd. Wie na deel 1 stopt, levert dus toch bruikbare data op.
- **Laadtijd minimaal**, geen afleidende elementen, geen navigatie naar de rest van de site.
- **Vormgeving** volgens de Visual & UI Brand Style Guide van Crystal.
- **Copy letterlijk overnemen.** Formuleringen in dit document zijn bewust gekozen. Niet herschrijven, geen em dash (—) toevoegen, geen "wij": Crystal spreekt in de ik-vorm.

## 3. Flow in één oogopslag

```
[Introscherm]
   ↓
[Deel 1: vragen 1 t/m 10, met vertakking bij 1 en 9]
   ↓  → record opslaan (status: kern_ingevuld)
[Overgangsscherm: "Heb je nog 3 minuten?"]
   ├─ "Ja, graag"            → [Deel 2: vragen 11 t/m 14] → record bijwerken (status: volledig) → [Bedankpagina]
   └─ "Nee, naar mijn bedankje" → [Bedankpagina]
```

## 4. Schermen en vragen

### Introscherm

> Fijn dat je meedeed met de challenge. Met jouw antwoorden maak ik de challenge nog beter voor de vrouwen na jou. Het eerste deel duurt ongeveer 2 minuten. Als dank staat er daarna iets voor je klaar.

Knop: **Start**

---

### Deel 1: kern

**V1 · `live_sessie`** · enkelvoudig · verplicht
Was je bij de live sessie op vrijdag 18 september?
- Ja
- Nee

**V1a · `interesse_programma`** · enkelvoudig · alleen tonen als V1 = Ja
Hoe graag wil je meer horen over het programma dat ik noemde?
- Heel graag
- Misschien
- Nu niet

**V1b · `reden_niet_live`** · enkelvoudig + tekstveld bij "Anders" · alleen tonen als V1 = Nee
Wat maakte dat je er niet bij was?
- Het tijdstip kwam niet uit
- Ik was het vergeten
- Ik wist niet goed wat ik kon verwachten
- Anders: …

**V2 · `aanbevelen`** · schaal 0–10 · verplicht
Hoe waarschijnlijk is het dat je de challenge aanraadt aan een vriendin?
Labels onder de schaal: 0 = "Zeer onwaarschijnlijk", 10 = "Zeer waarschijnlijk".

**V3 · `wat_gebracht`** · open (meerregelig) · optioneel
Wat heeft de challenge jou gebracht?

**V4 · `toestemming_review`** · enkelvoudig · alleen tonen als V3 is ingevuld
Mag ik jouw antwoord op de vorige vraag delen op mijn website, zodat andere vrouwen weten wat ze kunnen verwachten?
- Ja, met mijn voornaam
- Ja, met mijn initialen
- Ja, zonder naam
- Liever niet

**V5 · `leeftijd`** · enkelvoudig · optioneel
Wat is je leeftijd?
- Jonger dan 30
- 30–39
- 40–49
- 50–59
- 60 of ouder

**V6 · `cyclusfase`** · enkelvoudig · optioneel
Welke fase past het best bij jou?
- Ik heb een regelmatige cyclus
- Mijn cyclus is onregelmatig
- Ik zit in de overgang
- Ik ben door de overgang heen
- Zeg ik liever niet

**V7 · `bekend_gg`** · enkelvoudig · optioneel
Hoe bekend was je met Germaanse Geneeskunde vóór de challenge?
- Ik werk er al mee
- Ik had ervan gehoord
- Het was nieuw voor mij

**V8 · `eerder_geprobeerd`** · meerkeuze + tekstveld bij "Anders" · optioneel
Wat heb je al geprobeerd voor je klachten? *(meerdere antwoorden mogelijk)*
- Huisarts of specialist
- Bekkenfysiotherapie
- Voeding en leefstijl
- Alternatieve therapie (bijv. acupunctuur, osteopathie)
- Coaching of therapie
- Nog niets
- Anders: …

Logica: "Nog niets" sluit de andere opties uit.

**V9 · `geboekt`** · enkelvoudig · verplicht
Heb je al een inzichtgesprek geboekt?
- Ja
- Nog niet

**V9a · `reden_niet_geboekt`** · enkelvoudig + tekstveld bij "Anders" · alleen tonen als V9 = Nog niet
Bovenaan dit scherm een opvallende knop **"Boek je inzichtgesprek"** → `[BOEKINGSLINK]`, opent in een nieuw tabblad zodat het formulier blijft staan.
Daaronder:
Wat maakt dat je nog niet geboekt hebt?
- Ik wil er nog over nadenken
- Ik weet niet goed wat het gesprek inhoudt
- Mijn agenda laat het nu niet toe
- Ik heb er nu geen behoefte aan
- Anders: …

Meet of de boekingsknop is aangeklikt (veld `klik_boekingslink`, ja/nee).

**V10 · `voornaam` + `email`** · twee tekstvelden · verplicht
Je voornaam en e-mailadres, zodat ik persoonlijk op je antwoorden kan reageren.

Logica:
- Is het e-mailadres via de URL meegegeven (zie §5), dan het e-mailveld voorinvullen en alleen de voornaam laten typen.
- Deze vraag staat bewust aan het eind van deel 1: wie al 9 vragen heeft beantwoord, vult het e-mailadres veel eerder in dan aan het begin.
- Validatie op geldig e-mailformaat.
- Sla de antwoorden van V1 t/m V9 tussentijds op (status `onvolledig`), zodat afhakers op V10 toch in de data zichtbaar zijn.

Onder V10 een korte privacyregel met link naar de privacyverklaring (zie §6).

Knop: **Verstuur** → record opslaan met status `kern_ingevuld`.

---

### Overgangsscherm

> Dank je wel, je antwoorden zijn verstuurd.
>
> Heb je nog 3 minuten? Dan help je de vrouwen na jou enorm.

Knoppen:
- **Ja, graag** → deel 2
- **Nee, naar mijn bedankje** → bedankpagina

---

### Deel 2: verdieping

Alle vragen open (meerregelig) en optioneel.

**V11 · `klachten_eigen_woorden`**
Hoe zou je je klachten omschrijven als je ze aan een goede vriendin vertelt?

**V12 · `reden_aanmelding`**
Wat maakte dat je je aanmeldde voor de challenge?

**V13 · `moment_bijgebleven`**
Welk moment uit de challenge is je het meest bijgebleven, en waarom?

**V14 · `verbetering`**
Wat zou de challenge voor jou nog waardevoller maken?

Knop: **Verstuur** → hetzelfde record bijwerken met status `volledig`.

---

### Bedankpagina

> Dank je wel voor je antwoorden. Zoals beloofd staat hier iets voor je klaar.

- Ingebedde **audio of video** van Crystal: `[MEDIA – volgt uiterlijk zondagavond 20 september]`. Speelt direct af op de pagina, zonder doorklikken naar een ander platform.
- Korte titel en één zin toelichting bij het fragment: `[TEKST – volgt samen met de media]`.
- **Alleen als V9 = Nog niet:** onder de media een knop **"Boek je inzichtgesprek"** → `[BOEKINGSLINK]`, met de regel: *Je kunt je gesprek boeken tot en met 25 september.*
- De bedankpagina moet ook direct bereikbaar zijn via een eigen URL, voor het geval iemand terug wil naar het fragment.

## 5. Techniek en data

- **URL-parameters:**
  - `bron` = `whatsapp` of `email`, om per kanaal de respons te meten.
  - `email` = e-mailadres van de ontvanger, alleen in de MailerLite-mail (merge tag; exacte syntax verifiëren in de MailerLite-documentatie).
- **Opslag:** één record per inzending met alle velden uit §4, plus `bron`, `status`, `klik_boekingslink`, tijdstempels van start, kern en volledig.
- **Export** naar een Google Sheet, zodat Ivo en Crystal de antwoorden kunnen inzien.
- **MailerLite-koppeling:** bij elke inzending (e-mailadres is verplicht):
  - de subscriber een tag of groep "evaluatie-ingevuld" geven, zodat deze persoon wordt uitgesloten van de e-mailreminders;
  - optioneel de velden `leeftijd`, `cyclusfase` en `bekend_gg` als custom fields wegschrijven voor latere segmentatie.
- **Tracking:** een event bij het versturen van de kern en een event bij klik op de boekingslink.

## 6. Privacy

- V6 (cyclusfase), V8 (eerder geprobeerd) en V11 (klachten) zijn **gezondheidsgegevens** onder de AVG. Houd de verwerking minimaal en vermeld onder V10 kort waarvoor de antwoorden gebruikt worden, met een link naar `[PRIVACYVERKLARING]`.
- Reviews (V3) alleen publiceren volgens de keuze in V4.

## 7. Placeholders om in te vullen

| Placeholder | Wat | Status |
|---|---|---|
| `[BOEKINGSLINK]` | Link naar Crystals agenda voor het inzichtgesprek | Beschikbaar |
| `[MEDIA]` | Audio of video van Crystal voor de bedankpagina | Uiterlijk zondagavond 20 september |
| `[TEKST]` | Titel en toelichting bij de media | Samen met de media |
| `[PRIVACYVERKLARING]` | Link naar privacyverklaring crystalhelder.nl | Checken |
| Domein/URL formulier | Bijv. onder go.crystalhelder.nl | Te bepalen |
