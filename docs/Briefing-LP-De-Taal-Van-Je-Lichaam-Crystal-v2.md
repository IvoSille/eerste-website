# Briefing v2: Nieuwe Landingspagina — De Taal van je Lichaam (E-book Opt-in)

**Project:** Antigravity (Astro, Netlify)
**Nieuwe pagina:** `https://go.crystalhelder.nl/de-taal-van-je-lichaam/`
**Bestaande referentie-pagina's:**
- `https://go.crystalhelder.nl/begrijp-de-taal-van-je-klacht/` (oude video-LP, dichtste blueprint)
- `https://go.crystalhelder.nl/germaanse-geneeskunde-adviesgesprek/` (huidige adviesgesprek-LP, blijft staan)

**Datum:** 18 mei 2026 (v2)
**Auteur:** Ivo Sillé — RE+CONNECT
**Bestemd voor:** Claude Code — implementatie in Astro-codebase

---

## Wat we maken en waarom

Een nieuwe opt-in landingspagina voor Google Ads Campagne 1 (Germaanse Geneeskunde Algemeen). Doel: bezoeker schrijft zich in voor het e-book "De Taal van je Lichaam" door e-mailadres achter te laten.

**Strategische context — wie is de bezoeker:**

Iemand die op "Germaanse geneeskunde" zoekt is al door drie filters heen:
1. Ze heeft erkend dat reguliere zorg geen antwoord geeft op haar klachten
2. Ze heeft hier eerder over gehoord — een boek, een YouTube-video, een vriendin
3. Ze heeft een **bewuste keuze** gemaakt om erop te zoeken

Dat betekent: ze is verder dan een willekeurige zoeker met chronische klachten. Ze zit niet meer in *"is mijn pijn wel echt?"* — ze zit in *"is dit voor mij toepasbaar, en wie helpt mij dat doen?"*

**Data van Campagne 1 (7–29 maart 2026):**
- 74% van klikken (waarvan leeftijd bekend) van vrouwen 55+
- 39% van klikken uit 65+ specifiek
- 84% vrouw
- Beste ad (CTR 8,86%) gebruikte "Begrijp Waarom Je Dit Hebt" + "Concreet, niet zweverig"
- Procesgerichte ads ("12-16 weken traject") presteerden duidelijk minder

**De doelgroep is gefilterd door zoekgedrag, niet door demografie.** We schrijven voor wie de innerlijke beweging maakt om zelf te willen begrijpen wat haar lichaam vertelt — ongeacht leeftijd, sekse, of levensfase. De data toont waar het zwaartepunt nu zit, maar de copy mag niet kunstmatig uitsluiten.

**Wat dit betekent voor de LP:**

Geen kale opt-in. Geen verkooppagina. Wel een **mini-essay met opt-in** — een pagina die inzicht levert in plaats van inzicht belooft. De bezoeker krijgt op de pagina al een eerste laag begrip, en wordt nieuwsgierig naar de verdieping in het e-book. Het e-mailadres wordt het logische pad naar meer, niet de prijs voor entreebewijs.

De doelgroep is cognitief al ver — geen overtuigingsslag nodig. Wel impliciete validatie verweven in toon en tekst (niet expliciete "ik geloof je"-statements). Validatie blijft welkom, ook bij iemand die de theorie kent — de emotionele wond van jaren niet-geloofd-worden zit in het lichaam, niet in het hoofd.

---

## Aanpak voor implementatie

Maak een nieuwe pagina-component op de slug `/de-taal-van-je-lichaam/`. Hergebruik componenten en styling uit `/begrijp-de-taal-van-je-klacht/` (dezelfde structuur: hero met opt-in, inzicht-secties, voor-wie-sectie, Crystal-introductie, FAQ, footer). Pas copy en CTA's aan zoals hieronder. Beide bestaande pagina's blijven ongewijzigd staan tijdens deze implementatie.

**Cruciaal onderscheid:** dit is **geen** ombouw van een bestaande pagina, maar een nieuwe pagina naast de bestaande twee. De adviesgesprek-LP blijft beschikbaar voor wie direct wil boeken; de oude video-LP wordt straks gepauzeerd zodra de nieuwe LP live is.

---

## Sectie-overzicht

| # | Sectie | Status |
|---|--------|--------|
| 1 | Hero | Nieuw |
| 2 | Wat als je lichaam niet tegen je werkt? | Nieuw (gebaseerd op e-book) |
| 3 | Klachten volgen een patroon | Hergebruik uit `/germaanse-geneeskunde-adviesgesprek/` |
| 4 | Voor wie is dit e-book | Vier innerlijke-beweging blokken |
| 5 | Hoe je lichaam werkt | Nieuw (gebaseerd op e-book) |
| 6 | Crystal-introductie | Hergebruik uit oude video-LP, lichte aanpassing |
| 7 | Twee testimonials | Hergebruik uit `/germaanse-geneeskunde-adviesgesprek/` |
| 8 | Invite + Opt-in formulier | Nieuw |
| 9 | FAQ | Aanpassing oude video-LP |
| 10 | Disclaimer + footer | Hergebruik |

---

## Exacte copy per sectie

**BELANGRIJK: Onderstaande copy is definitief. Niets wijzigen, herformuleren of "verbeteren." Exact overnemen.**

---

### 1. HERO

**Koptekst boven H1 (klein, subtiel):**
Germaanse geneeskunde — een introductie

**H1:**
Begrijp waarom je lichaam dit doet

**Subkop:**
Je bent hier niet zomaar terechtgekomen. Je voelt dat er meer aan de hand is dan wat een arts je heeft kunnen vertellen. Achter elke reactie van je lichaam zit een biologische logica — een patroon dat te begrijpen valt. In dit e-book lees je hoe dat werkt, in gewone taal.

**CTA-knop (primair):**
Vraag het e-book aan

**CTA-link:** anker `#vraag-e-book-aan` (naar opt-in sectie verderop op de pagina)

**Onder de CTA (kleine tekst, sober):**
12 pagina's. Geen verplichtingen. Concreet, niet zweverig.

---

### 2. WAT ALS JE LICHAAM NIET TEGEN JE WERKT? (Inzicht-sectie 1)

**H2:**
Wat als je lichaam niet tegen je werkt?

**Bodytekst:**

Misschien is dit een gedachte die je al een tijd bij je draagt. Een vermoeden dat er meer aan de hand is dan wat je tot nu toe hebt gehoord.

Veel mensen hebben geleerd om klachten te zien als iets vervelends. Iets wat weg moet. Iets wat opgelost moet worden. Bij pijn schiet je in een kramp, ga je zoeken naar wat er verkeerd is gegaan en wat vanaf nu anders moet.

Maar wat als we daar anders naar kijken? Wat als je lichaam niet tegen je werkt, maar juist vóór je? Ook op de momenten dat het onlogisch voelt — als je lichaam het lijkt op te geven en je klachten je beperken.

Veel klachten lijken uit het niets te komen. Die verkoudheid. Die buikpijn. Die nekklachten. We willen het verklaren vanuit het weer, verkeerd eten of een verkeerde houding.

Maar je lichaam doet niets zomaar. Achter elke reactie zit een innerlijke beleving. Een situatie. Iets dat je geraakt heeft, bewust of onbewust. En je lichaam reageert daarop — vaak sneller dan je hoofd kan bijhouden.

Niet om je dwars te zitten. Maar om je ergens doorheen te helpen.

---

### 3. KLACHTEN VOLGEN EEN PATROON (hergebruik)

Gebruik exact dezelfde tekst als de bestaande adviesgesprek-LP `/germaanse-geneeskunde-adviesgesprek/` voor deze sectie:

**H2:**
Klachten volgen een patroon. Dat patroon is te begrijpen.

**Bodytekst:**

De 5 biologische natuurwetten beschrijven hoe je lichaam reageert op ingrijpende gebeurtenissen. Niet willekeurig, maar volgens vaste patronen die in elk menselijk lichaam hetzelfde werken.

Elke klacht — van huidproblemen tot darmklachten, van rugpijn tot hormonale verstoringen — is terug te voeren op een specifiek biologisch programma dat is geactiveerd door iets wat je hebt meegemaakt. Iets dat indruk heeft gemaakt. Een conflict, een schok, een situatie die je niet zag aankomen.

Als je weet welk conflict er speelt, begrijp je waarom je lichaam doet wat het doet. En pas dan kun je gericht iets veranderen.

Dit is geen alternatieve geneeskunde. Dit is een systematisch kader dat je helpt de taal van je lichaam te leren lezen.

---

### 4. VOOR WIE IS DIT E-BOOK (vier blokken — innerlijke beweging)

**H2:**
Voor wie is dit e-book

**Vier blokken (visueel naast elkaar of 2x2, vergelijkbaar met "voor wie"-sectie op oude video-LP):**

**→ Voor jou als je voelt dat er meer aan de hand is**

Je hebt onderzoeken laten doen. Soms een naam voor je klachten, vaker niet. Je voelt je niet altijd gehoord. Je weet dat er iets is — je voelt het — maar het lukt niemand het echt te benoemen.

**→ Voor jou als je iets gehoord hebt over Germaanse geneeskunde**

Je hebt er over gelezen of iemand heeft het je verteld. De logica spreekt je aan, maar het is veel om te overzien. Dit e-book is geschreven als een rustige introductie — in gewone taal, met aandacht voor jouw situatie.

**→ Voor jou als je zelf wilt begrijpen**

Niet langer afhankelijk zijn van wie wat zegt. Niet langer wachten op een antwoord dat niet komt. Je wilt zelf kunnen lezen wat je lichaam je vertelt, zodat je weet wat je nodig hebt.

**→ Voor jou die voelt dat de tijd nu telt**

In welke fase van je leven je ook bent — er komt een moment waarop je beseft dat de jaren die voor je liggen van jou zijn. Niet om afgewacht te worden in een lichaam dat niet meewerkt.

---

### 5. HOE JE LICHAAM WERKT (Inzicht-sectie 2)

**H2:**
Je lichaam reageert op wat je meemaakt

**Bodytekst:**

Je lichaam reageert altijd op een moment in je leven dat indruk maakt. Een moment dat je overvalt, raakt, of waar je geen directe oplossing voor hebt.

Dat hoeft niet groot of dramatisch te zijn. Juist kleine, onverwachte momenten kunnen veel impact hebben. Zeker als je ze alleen beleeft, of niet direct kunt uiten wat er in je gebeurt.

Op zo'n moment slaat je lichaam het op en gaat het voor je proberen op te lossen. Niet via je hoofd, maar via een dieper, automatisch deel. Een deel dat één doel heeft: jou helpen omgaan met de situatie.

Je lichaam past zich aan. Soms door extra spanning op te bouwen. Soms door iets juist te verminderen. Soms door je alerter te maken, of je juist terug te trekken.

En terwijl jij doorgaat met je dag, blijft dat proces op de achtergrond actief.

**Citaat-blok (visueel afgezet, sober vormgegeven):**

> Wat je durft te voelen, hoef je niet langer te dragen.

**Afsluiting bodytekst onder citaat:**

In het e-book lees je hoe dit precies werkt voor jouw situatie. Welke fases je lichaam doorloopt, waarom klachten juist voelbaar worden in de herstelfase, en hoe je leert herkennen wat er bij jou speelt.

---

### 6. CRYSTAL-INTRODUCTIE

**H2:**
Mijn naam is Crystal

**Bodytekst:**

Mijn broer overleed toen hij vijf maanden oud was. Hij had een hartafwijking. Mijn moeder voelde dat er iets mis was en trok aan de bel — maar het consultatiebureau wilde niet luisteren. De diagnose kwam te laat. Op de dag dat hij zijn harttransplantatie zou krijgen, was het voorbij.

Dat heeft me gevormd. Ik ben opgegroeid met het gevoel: ze weten het niet altijd. Ze luisteren niet altijd. En soms heeft dat gevolgen die niet meer terug te draaien zijn.

Die ervaring heeft me op een zoektocht gezet die nooit meer stopte. Niet uit wantrouwen naar de reguliere zorg — maar uit de overtuiging dat er meer te begrijpen valt dan wat de standaardroute biedt. Toen ik de vijf biologische natuurwetten leerde kennen, viel alles op zijn plek. Niet omdat iemand me een pilletje gaf, maar omdat ik voor het eerst begreep waarom een lichaam doet wat het doet.

Inmiddels werk ik al meer dan tien jaar dagelijks met dit kader en heb ik honderden conflictanalyses gedaan — van chronische pijn tot huidproblemen, van hormonale klachten tot darmissues. Daarnaast breng ik twintig jaar ervaring mee in emotieregulatie, pedagogie en lichaamswerk.

Ik geloof dat begrip de eerste stap is. Voor jezelf, en voor je lichaam. Dit e-book is geschreven om die eerste stap toegankelijk te maken — voor wie er klaar voor is.

---

### 7. TWEE TESTIMONIALS (hergebruik uit adviesgesprek-LP)

Gebruik exact dezelfde opmaak en visuele stijl als op `/germaanse-geneeskunde-adviesgesprek/`. Selecteer deze twee testimonials:

**Testimonial 1 — Kinga Sidor:**

"De sessie met Crystal was geweldig. Het heeft me alle inzichten en verheldering gegeven in mijn klachten, die binnen paar dagen na ons online consult geheel zijn verdwenen. Ze bereidt zich grondig voor en de sessie heeft ook wel flink wat informatie nodig van jezelf vooraf, maar dan heb je ook wat. Ik vond Crystal zeer scherp in verbanden leggen, heel helder uitleg geven over wat ik te doen had en met welke thema's mijn klachten verbonden waren in mijn leven."

— Kinga Sidor

**Testimonial 2 — Marinka van Aken:**

"We gingen terug in de tijd naar de oorsprong van bepaalde thema's en wauw, ik kan alleen maar zeggen: wat een geschenk en verademing om op deze manier meegenomen te worden. Heel straight en helder, zoals zij zelf ook belichaamd. Ik heb hier enorm veel aan gehad."

— Marinka van Aken

---

### 8. INVITE + OPT-IN FORMULIER

**Anker ID op deze sectie:** `vraag-e-book-aan`

**H2:**
Vraag het e-book aan

**Bodytekst (boven formulier):**

Als wat je tot hier hebt gelezen resoneert, vraag dan het e-book aan. In twaalf pagina's lees je hoe je lichaam reageert op wat je meemaakt, welke logica er achter klachten zit, en hoe je leert herkennen wat er bij jou speelt.

Je ontvangt het e-book direct in je mailbox, plus in de weken erna nog een aantal mails met verdieping en concrete voorbeelden uit de praktijk.

**Formulier-velden:**
- Voornaam (verplicht)
- E-mailadres (verplicht)

**Knop:**
Stuur me het e-book

**Onder de knop (klein, subtiel):**
Geen verplichtingen. Je kunt je op elk moment uitschrijven. Door aan te melden ga je akkoord met [onze privacyverklaring](https://go.crystalhelder.nl/algemene-voorwaarden/).

---

### 9. FAQ

**H2:**
Veelgestelde vragen

**Q: Wat zit er precies in het e-book?**
A: Een rustige, persoonlijke introductie in de vijf biologische natuurwetten (Germaanse geneeskunde). Je leest hoe je lichaam reageert op wat je meemaakt, welke fasen het doorloopt, en waarom klachten een biologische logica hebben. Geschreven in gewone taal, twaalf pagina's, online te lezen of te bewaren.

**Q: Wat gebeurt er nadat ik het e-book heb ontvangen?**
A: Je ontvangt over een periode van ongeveer tien dagen een aantal mails met verdieping, voorbeelden uit de praktijk, en antwoorden op vragen die vaak terugkomen. Geen verkoop-mails — wel begeleidende inhoud. Als je daarna wilt kijken wat er bij jouw specifieke situatie speelt, kun je een adviesgesprek plannen. Geen druk; alleen als jij dat wilt.

**Q: Ik ken de Germaanse geneeskunde nog niet. Is dit e-book dan geschikt voor mij?**
A: Ja, juist dan. Het e-book is geschreven als introductie. Je hoeft geen voorkennis te hebben — wel de bereidheid om op een andere manier naar je lichaam te kijken.

**Q: Is dit een vervanging voor medische zorg?**
A: Nee. Ik werk altijd náást de reguliere zorg, nooit ertegen. Ik adviseer nooit om behandelingen te stoppen of medicatie af te bouwen. Wat ik bied is aanvullend: inzicht in de biologische processen achter klachten.

**Q: Wat doe je met mijn e-mailadres?**
A: Ik gebruik het om je het e-book te sturen en om de begeleidende mails in de weken erna te sturen. Niet meer dan dat. Ik deel je gegevens niet met derden. Je kunt je op elk moment uitschrijven met één klik onderaan elke mail.

---

### 10. DISCLAIMER + FOOTER (hergebruik)

Gebruik exact dezelfde disclaimer-tekst, KVK-info en footer als de bestaande pagina's:

**Disclaimer:** De begeleiding die ik bied is educatief en coachend van aard. Het is geen medische behandeling en vervangt geen advies van een arts of specialist. Ik stel geen diagnoses, schrijf geen medicatie voor, en adviseer nooit om lopende medische behandelingen te stoppen. Bij acute klachten of twijfel raad ik altijd aan om contact op te nemen met je huisarts.

Crystal Helder
KVK 70630879
Tienhoven / Utrecht

[Algemene voorwaarden & privacy](https://go.crystalhelder.nl/algemene-voorwaarden/)

© 2026 Crystal Helder. Alle rechten voorbehouden.

---

## Technische aandachtspunten

### Opt-in formulier
- Backend: Netlify serverless function → LaPosta API (zelfde patroon als bestaande wachtlijst-form op de oude video-LP)
- Nieuwe LaPosta-lijst aanmaken specifiek voor deze funnel: `crystal-helder-e-book-de-taal-van-je-lichaam`
- Trigger automation voor e-mailreeks (volgt in apart document) op basis van toevoeging aan deze lijst
- Velden: Voornaam + E-mailadres
- Bedankpagina: aparte route `/de-taal-van-je-lichaam/bedankt/` — daar maakt Claude Code een eenvoudige bevestigings-pagina met link naar het e-book PDF

### E-book hosting
- E-book PDF (`E_book_de_taal_van_je_lichaam.pdf`) hosten op Netlify als statisch asset
- Op de bedankpagina: directe link én knop om te downloaden
- E-book wordt óók in de eerste e-mail (mail 1) meegestuurd als link

### Conversie-tracking
- Conversie-event toevoegen aan Google Ads: "ebook-leadmagnet-opt-in" (categorie: Sign-up)
- Trigger via GTM op bedankpagina-bezoek
- Integreren met bestaande Stape.io server-side setup

### Naamgeving Crystal
Op deze pagina **Crystal Helder** aanhouden (consistent met domeinnaam en bestaande pagina's). Het feit dat de e-book is gesigneerd "Crystal Molenaar" wordt vóór live-gang met Crystal afgestemd — mogelijk past zij de e-book aan.

### Hero CTA-gedrag
De CTA-knop in de hero ("Vraag het e-book aan") moet een **smooth scroll** doen naar het opt-in formulier op `#vraag-e-book-aan`. Geen modal, geen pop-up. Bezoeker moet de pagina van A tot Z kunnen lezen als ze dat wil, maar ook direct kunnen springen naar het formulier.

### Quality Score & performance
- Behoud Astro-componentstijl en CSS-strategie van bestaande pagina's
- LCP < 2,5 seconden
- Mobile-first (deze doelgroep gebruikt vaak iPad of grote-scherm-telefoon)
- WebP voor alle afbeeldingen
- Geen onnodige JavaScript

### Visuele assets
Hergebruik de foto's van Crystal die op `/begrijp-de-taal-van-je-klacht/` staan:
- `foto_1.CZspwo8g_vIHN2.jpg` (hero-rechterkant of bij eerste inzicht-sectie)
- `foto_3.Dh3Z5l_p_1OOzzE.jpg` (bij Crystal-introductie)

---

## Bijlage: Google Ads varianten voor deze LP

Na implementatie van de LP komen er nieuwe Google Ads varianten in Campagne 1 (GNM-Specifiek, customer ID 1406922044, campagne ID 23608993667, ad group "Germaanse geneeskunde" 190954069862). Gebaseerd op de bewezen winnende ad-copy uit maart 2026 (CTR 8,86%, 2 conversies).

**Strategie:** uitkomst-georiënteerd, niet aanbod-georiënteerd. Geen "gratis" framing in de ad-copy zelf — de prijs ontbreekt simpelweg, en de LP communiceert kosteloosheid sober.

**Nieuwe Responsive Search Ad — varianten:**

**Gepinde koppen (3):**
- H1: Germaanse geneeskunde
- H2: Begrijp waarom je dit hebt
- H3: Lees de introductie van Crystal

**Aanvullende koppen (12, niet gepind):**
- 5 biologische natuurwetten
- Wat vertelt jouw klacht?
- Jouw klacht, jouw verhaal
- Concreet, niet zweverig
- Geen standaardaanpak
- 10+ jaar praktijkervaring
- Crystal Helder
- Online beschikbaar
- Persoonlijk geschreven
- E-book in je mailbox
- Inzicht in 12 pagina's
- Voor wie er klaar voor is

**Gepinde beschrijvingen (2):**
- D1: Een persoonlijke introductie in hoe je lichaam reageert op wat je meemaakt. Concreet, niet zweverig.
- D2: 12 pagina's, in je mailbox, geschreven door Crystal Helder. Lees op je eigen tempo.

**Aanvullende beschrijvingen (2):**
- 10+ jaar ervaring met de vijf biologische natuurwetten. Honderden conflictanalyses.
- Niet anti-arts. Wel een andere manier om naar je lichaam te kijken.

**Final URL:** `https://go.crystalhelder.nl/de-taal-van-je-lichaam/`

**Voorgestelde A/B-test (later):** een tweede ad-variant met "Wat vertelt jouw klacht?" als H2 in plaats van "Begrijp waarom je dit hebt", om te zien of vraag-vorm versus stelling-vorm verschillende segmenten triggert.

**Niet meer gebruiken:** de oude varianten met "12-16 Weken Traject" of "Volledig Begeleidingstraject" — die zijn proces-georiënteerd en presteerden duidelijk minder.

---

## Wijzigingen ten opzichte van v1

1. **Hero subkop verbreed** met validatie-laag ("Je bent hier niet zomaar terechtgekomen. Je voelt dat er meer aan de hand is dan wat een arts je heeft kunnen vertellen.")
2. **Inzicht-sectie 1 opent met validatie** ("Misschien is dit een gedachte die je al een tijd bij je draagt.")
3. **"Voor wie is dit" sectie herzien** van drie informatieve blokken naar vier blokken op innerlijke beweging — laatste blok ("voor jou die voelt dat de tijd nu telt") raakt levensfase-pijn zonder leeftijd te benoemen
4. **Crystal-introductie slot afgekort** van "in welke fase van het leven dan ook" naar "voor wie er klaar voor is"
5. **Geen agitatie-sectie toegevoegd** — doelgroep is cognitief al ver, herhaling van wat ze weet zou afstandelijk werken
6. **Geen "gestolen gouden jaren" als concrete frase** — onderliggende emotie verweven in blok vier zonder uitsluiting van jongere doelgroep
7. **Validatie blijft impliciet en verweven**, geen expliciete "ik geloof je"-statements

---

## Wat volgt na deze briefing

1. Claude Code bouwt de pagina volgens deze briefing
2. Ivo finetune-t copy waar nodig vóór live-gang
3. Naam Crystal Helder vs Molenaar afstemmen met Crystal
4. LaPosta-lijst aanmaken + e-mailflow voorbereiden (separate briefing volgt)
5. Google Ads varianten live na pagina-launch
6. Conversie-tracking valideren
7. Eerste week na launch: data monitoren, A/B-testen voorbereiden
