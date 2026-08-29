# Briefing: Landingspagina Ombouw — Adviesgesprek €47

**Project:** Antigravity (Astro, Netlify)  
**Bestaande pagina (niet overschrijven):** `go.crystalhelder.nl/germaanse-geneeskunde-begeleiding/`  
**Nieuwe pagina:** `go.crystalhelder.nl/germaanse-geneeskunde-adviesgesprek/`  
**Datum:** 20 maart 2026  
**Auteur:** Ivo Sillé — RE+CONNECT  
**Bestemd voor:** Claude Code — implementatie in Astro-codebase

---

## Aanpak

Maak een kopie van de bestaande pagina-component (`/germaanse-geneeskunde-begeleiding/`) en bouw de kopie om tot een nieuwe pagina op de slug `/germaanse-geneeskunde-adviesgesprek/`. De bestaande pagina blijft ongewijzigd staan — beide pagina's draaien naast elkaar op Netlify totdat de oude wordt uitgezet.

## Wat verandert en waarom

Het aanbod verandert van een trajectaanbod (12-16 weken, €1.747) naar een betaald adviesgesprek (30 minuten, €47) via Cal.com Paid Bookings + Stripe.

De zoekintentie is "germaanse geneeskunde + [specifieke klacht]" — knie, hart, schildklier, darmen, eczeem, etc. Mensen willen begrijpen wat hun klacht hen vertelt. Een 12-weken traject is een mismatch met die intentie. Een adviesgesprek van 30 minuten matcht wel. Het traject wordt de backend upsell die Crystal in het gesprek zelf aanbiedt — niet op de pagina.

De pagina wordt single-product: adviesgesprek €47. Alle CTA-knoppen krijgen de tekst "Plan je adviesgesprek — €47". De Cal.com embed in de closing sectie blijft als embed maar wijst naar het nieuwe event. Alle Cal.com verwijzingen (knoppen én embed) gebruiken: `https://cal.com/crystalhelder/adviesgesprek`. De prijs staat er als feit — geen doorgestreepte prijs, geen "normaal €X."

---

## Wijzigingen per sectie

| # | Sectie | Actie |
|---|--------|-------|
| 1 | Hero | AANPASSEN |
| 2 | Intro | AANPASSEN |
| 3 | Klachten volgen een patroon | BEHOUDEN — ongewijzigd |
| NEW | Wat je krijgt in 30 minuten | TOEVOEGEN |
| NEW | Zo werkt het | TOEVOEGEN |
| 4 | Aanpak | AANPASSEN |
| 5 | Over Crystal | BEHOUDEN — ongewijzigd |
| 6 | Traject-blok | VERWIJDEREN — volledig |
| 7 | Testimonials | BEHOUDEN — ongewijzigd |
| 8 | FAQ | AANPASSEN — volledig vervangen |
| 9 | Closing CTA | AANPASSEN |

---

## Exacte nieuwe copy

**BELANGRIJK: Onderstaande copy is definitief. Niets wijzigen, herformuleren of "verbeteren." Exact overnemen.**

---

### 1. HERO (aanpassen)

**Koptekst boven H1 (klein, subtiel):**
Germaanse geneeskunde

**H1:**
Wat vertelt jouw klacht je?

**Subkop:**
In een persoonlijk adviesgesprek van 30 minuten kijk ik met je mee naar jouw specifieke situatie. Op basis van de vijf biologische natuurwetten laat ik je zien welk conflict er speelt — en geef ik je een eerlijk beeld van hoe je hiermee verder kunt.

**CTA-knop:**
Plan je adviesgesprek — €47

**CTA-link:** `https://cal.com/crystalhelder/adviesgesprek`

**Tweede link (onder CTA, kleiner):**
Lees meer over de aanpak *(anchor link naar aanpak-sectie)*

---

### 2. INTRO (aanpassen)

Behoud de bestaande tekst tot en met "omdat het toepassen op jezelf een ander niveau vraagt." Vervang alleen de laatste alinea.

**Bestaande tekst (behouden):**

> Je hebt de theorie gelezen. Je begrijpt de logica.
>
> Je weet dat klachten niet willekeurig zijn, maar een biologisch programma volgen. Maar dan staat je eigen situatie voor je.
>
> Welk conflict is het precies? Zit ik in de stressfase of de herstelfase? Wanneer is het begonnen — was dat echt dat moment, of lag het eerder? En als ik het weet: wat doe ik er dan mee?
>
> Precies dat gat — tussen de theorie die klopt en de vertaalslag naar jouw eigen klacht, jouw eigen geschiedenis — is waar mensen vastlopen. Niet omdat ze het niet begrijpen, maar omdat het toepassen op jezelf een ander niveau vraagt.

**Nieuwe laatste alinea (vervang wat er nu staat):**

> Daarom bied ik een persoonlijk adviesgesprek aan. In 30 minuten kijk ik met je mee naar jouw situatie — en geef ik je niet alleen inzicht in wat er speelt, maar ook een eerlijk beeld van hoe je hiermee verder kunt.

---

### 3. "KLACHTEN VOLGEN EEN PATROON" (behouden)

Ongewijzigd.

---

### NEW: WAT JE KRIJGT IN 30 MINUTEN (toevoegen — na "Klachten volgen een patroon")

**H2:**
Wat je krijgt in 30 minuten

**Drie blokken (visuele cards, vergelijkbaar met de huidige aanpak-stappen):**

**→ Een eerste analyse van jouw klacht**
Op basis van de vijf biologische natuurwetten kijk ik naar jouw specifieke situatie. Welk biologisch programma is actief? Welk conflict ligt eraan ten grondslag?

**→ Inzicht in waar je staat**
Zit je in de stressfase of de herstelfase? Hoe lang speelt dit al? Wat vertelt het verloop je over het onderliggende conflict?

**→ Een eerlijk advies over hoe verder**
Na het gesprek weet je niet alleen wat er speelt, maar ook wat voor jou een logische weg vooruit is. Soms is dat iets wat je zelf kunt doen. Soms is daar meer begeleiding voor nodig. Ik ben daar eerlijk over.

**Prijs (prominent, onder de blokken):**
€47

**CTA-knop:**
Plan je adviesgesprek

---

### NEW: ZO WERKT HET (toevoegen — na waardepropositie)

**H2:**
Zo werkt het

**Drie stappen (visueel genummerd, vergelijkbaar met de huidige aanpak-nummering):**

**1. Je plant je adviesgesprek**
Kies een moment dat je uitkomt en vertel kort over je klacht. Zo kan ik me voorbereiden.

**2. We kijken samen naar jouw situatie**
In 30 minuten analyseer ik wat er speelt op basis van de vijf biologische natuurwetten. Je krijgt inzicht in welk conflict er actief is en in welke fase je je bevindt.

**3. Je weet waar je staat — en hoe verder**
Na het gesprek heb je helderheid over wat er speelt en wat voor jou een logische weg vooruit is.

**CTA-knop (onder de stappen):**
Plan je adviesgesprek — €47

---

### 4. AANPAK (aanpassen)

**H2 behouden:**
Niet alleen begrijpen wat er speelt — maar er ook doorheen komen.

**Intro-alinea vervangen. Oud:**

> Veel mensen die de 5 biologische natuurwetten ontdekken, lopen tegen hetzelfde aan: de theorie is logisch, maar de vertaalslag naar je eigen situatie is lastig. Welk conflict is het precies? Zit ik in de stressfase of de herstelfase? En wat doe ik ermee als ik het eenmaal weet?

**Nieuw:**

> Veel mensen krijgen na een analyse een verklaring, maar weten niet hoe ze daarmee verder moeten. Bij mij krijg je niet alleen inzicht — ik help je ook begrijpen wat je ermee kunt doen.

**Stap 1 — Conflictanalyse: behouden zoals het staat.**

**Stap 2 — Begeleiding: vervangen. Oud verwijderen, nieuw:**

> Als de analyse helder is, is de vraag: wat nu? Afhankelijk van je situatie kan dat betekenen dat één gesprek genoeg is — of dat er meer nodig is. Dat bespreek ik eerlijk met je. Met mijn achtergrond in emotieregulatie, lichaamswerk en opstellingen heb ik een breed repertoire om je verder te helpen. Geen dogma, geen "één methode voor alles" — maar de aanpak die voor jouw situatie het beste werkt.

---

### 5. OVER CRYSTAL (behouden)

Ongewijzigd.

---

### 6. TRAJECT-BLOK (verwijderen)

Verwijder de volledige sectie die begint met "12 tot 16 / Weken" en eindigt met de CTA "Vraag een kennismakingsgesprek aan." Dit omvat het grote "12 tot 16 / Weken" display, de kop "Geen losse sessie. Een volledig begeleidingstraject.", alle bullet points over het traject, en de bijbehorende CTA.

Volledig weg. Geen vervanging.

---

### 7. TESTIMONIALS (behouden)

Ongewijzigd.

---

### 8. FAQ (volledig vervangen)

Verwijder alle bestaande FAQ-items. Nieuwe set:

**Q: Wat kan ik verwachten in 30 minuten?**
A: Een gerichte analyse van jouw specifieke klacht op basis van de vijf biologische natuurwetten. Ik kijk naar welk biologisch programma er actief is, welk conflict eraan ten grondslag ligt, en in welke fase je je bevindt. Je gaat weg met een helder beeld van wat er speelt en hoe je hiermee verder kunt.

**Q: Is één gesprek genoeg?**
A: Dat hangt af van je situatie. Voor sommige mensen is één gesprek voldoende om te begrijpen wat er speelt en zelf verder te kunnen. Voor anderen is meer begeleiding nodig. Dat bespreek ik eerlijk met je in het gesprek — ik adviseer nooit meer dan nodig is.

**Q: Waarom kost het adviesgesprek €47?**
A: Ik vraag een bijdrage voor dit gesprek omdat ik me voorbereid op jouw specifieke situatie en je mijn volledige aandacht geef. Het is geen vrijblijvend kennismakingsgesprek — het is een inhoudelijk adviesgesprek met een ervaren practitioner.

**Q: Is dit een vervanging voor medische zorg?**
A: Nee. Ik werk altijd naast de reguliere zorg, nooit ertegen. Ik adviseer nooit om behandelingen te stoppen of medicatie af te bouwen. Wat ik bied is aanvullend: inzicht in de biologische processen achter je klachten.

**Q: Is dit wetenschappelijk bewezen?**
A: De vijf biologische natuurwetten zijn een framework gebaseerd op klinische observaties, geen door gerandomiseerde studies bewezen methode. Wat ik je kan vertellen is dat ik in meer dan tien jaar dagelijks met dit kader werk, en dat de systematiek keer op keer klopt. Veel mensen ervaren voor het eerst begrip voor wat er in hun lichaam gebeurt — en dat begrip is op zichzelf al waardevol.

**Q: Kan dit ook online?**
A: Ja, volledig. De meeste gesprekken doe ik online. Als je liever in persoon werkt, kan dat ook — ik werk vanuit Tienhoven of Utrecht.

**Q: Ik heb nog nooit van de vijf biologische natuurwetten gehoord. Is dit gesprek dan geschikt voor mij?**
A: Ja. Ik leg je tijdens het gesprek uit wat je nodig hebt om je eigen situatie te begrijpen. Je hoeft geen voorkennis te hebben. Wat je nodig hebt is de bereidheid om op een andere manier naar je klachten te kijken.

---

### 9. CLOSING CTA (aanpassen)

**H2:**
Wil je weten wat jouw klacht je vertelt?

**Tekst:**
Plan een adviesgesprek van 30 minuten. Ik kijk met je mee naar jouw specifieke situatie, laat je zien wat er speelt, en geef je een eerlijk beeld van hoe je hiermee verder kunt.

De Cal.com embed blijft hier staan zoals die nu is, maar wijst naar het nieuwe event: `https://cal.com/crystalhelder/adviesgesprek`
