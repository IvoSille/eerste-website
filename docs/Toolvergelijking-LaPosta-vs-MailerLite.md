# E-mailtool: LaPosta vs. MailerLite

*Beslisdocument — opgesteld 19 mei 2026. Prijzen en features zijn op die datum live opgehaald van laposta.nl en mailerlite.com (zie §10 Bronnen).*

---

## 1. Samenvatting

De keuze voor een e-mailtool gaat hier niet over "welke is goedkoper". Hij gaat over **welk datamodel** je het komende jaar bouwt en wat Crystal daarna zelf kan onderhouden.

- **LaPosta** is **lijst-gericht**: een contact hoort bij een lijst, velden en segmenten zijn *per lijst*. Geen tags.
- **MailerLite** is **contact-gericht**: één contact, dat in meerdere **groepen** (= tags) kan zitten. Velden zijn globaal.

Alle wrijving die we tegenkwamen bij het idee "tag iemand die een afspraak boekt" — duplicaat-contacten, automations die niet bij een andere lijst kunnen — is **specifiek LaPosta**. In MailerLite bestaat dat probleem niet.

**Advies:** overstappen naar **MailerLite**. Starten kan gratis (Crystal heeft nu 441 contacten, net onder de gratis grens van 500), met als geplande eindsituatie het plan **Growing Business** (≈ €100–250/jaar in de groeifase). Het past bij hoe je gewend bent te werken (tags/groepen), het is de juiste basis voor een multi-funnel-aanpak met een groepsprogramma, en de overstap is nú nog klein omdat Crystals LaPosta-gebruik licht is.

**Eerlijk over de kosten:** omdat de reclameregel onder de mail voor deze doelgroep geen probleem is, is *puur op geld* LaPosta in het bereik 500–2.000 contacten goedkoper (gratis) dan MailerLite. Het advies om toch over te stappen is dus een bewuste keuze: ~€100–250/jaar betalen voor een tool die past bij wat je bouwt. Boven de 2.000 contacten draait het kostenplaatje sowieso om in het voordeel van MailerLite. §5 en §8 leggen dit uit; §8 bevat ook het eerlijke tegenargument vóór LaPosta.

---

## 2. Huidige situatie bij Crystal (LaPosta vandaag)

| Wat | Stand |
|---|---|
| Contacten | 441 unieke relaties, waarvan 413 actief |
| Verzonden campagnes | 89 nieuwsbrieven (historie) |
| Automations | 1 — "Bevestigings-E-mail": een simpele welkomstmail voor nieuwe nieuwsbrief-inschrijvers (laatst gewijzigd 1 okt 2025) |
| Nieuwsbrief-branding | Moet sowieso herzien worden |

Belangrijke gevolgen voor de afweging:

- **Crystals LaPosta-setup is licht.** Eén lijst, één simpele automation, broadcast-nieuwsbrieven. Ze heeft nog geen funnel-automations of complexe segmentatie gebouwd. De échte leercurve — funnels, automations, segmenten — ligt nog vóór haar, ongeacht de tool.
- **De branding moet toch worden aangepast.** Het opnieuw inrichten van de nieuwsbrief-look is dus geen weggegooid werk bij een overstap — je doet het meteen goed in de nieuwe tool.
- **441 contacten is geen "leeg account", maar ook geen blok aan het been.** Ze zijn met een export/import te verhuizen (zie §7).
- **441 zit dicht tegen de MailerLite-gratisgrens van 500 aan.** Zodra de funnels lopen en er een groepsprogramma met Meta-advertenties live gaat, gaat Crystal daar snel overheen. MailerLite-gratis is voor haar dus een korte aanloop, geen eindsituatie — reken op het betaalde plan.

---

## 3. Het echte verschil: lijsten vs. tags/groepen

Dit is de kern. Lees in elk geval deze paragraaf.

### LaPosta — lijst-gericht
Je organiseert alles rond **relatielijsten**. Elke lijst heeft z'n eigen velden en z'n eigen segmenten. Een contact "leeft" binnen een lijst.

Gevolg bij meerdere funnels (e-book, video, GNM-begeleiding, groepsprogramma):
- Dezelfde persoon die in twee funnels zit, staat als **twee aparte records** in twee lijsten. Velden van lijst A gaan niet automatisch mee naar lijst B.
- Een **automation hoort bij één lijst** en kan niet kijken of iemand óók op een andere lijst staat. Je kunt een e-mailflow op de e-book-lijst dus niet laten vertakken op basis van "heeft een adviesgesprek geboekt" als dat in een andere lijst zou staan.
- "Wie zit in funnel X én heeft Y gedaan" over funnels heen is omslachtig.

LaPosta kán wel automations, óók getriggerd door een veldwijziging — maar altijd binnen de grenzen van één lijst.

### MailerLite — contact-gericht
Eén abonnee = één record. Dat record kan in onbeperkt veel **groepen** zitten. Groepen werken precies als **tags**: vrij benoembare labels die je optelt en weer afhaalt. Velden zijn **globaal** per abonnee. **Segmenten** zijn dynamische filters over groepen + velden + gedrag heen.

Gevolg:
- Geen duplicaten. Iemand zit in `funnel-ebook` én `klant-adviesgesprek` — hetzelfde record.
- Automations triggeren én vertakken vrij op groep-lidmaatschap en veldwaarden.
- Het segment dat je eerder wilde — "adviesgesprek gehad maar geen vervolgtraject" — is in MailerLite één filter (zie §9). In LaPosta is dat een bouwwerk.

**Kort:** je bent niet tegen e-mailmarketing aan gelopen, je bent tegen LaPosta's model aan gelopen. MailerLite werkt zoals jij gewend bent — en zoals een multi-funnel-aanpak met een groepsprogramma het nodig heeft.

---

## 4. Prijzen (live opgehaald 19 mei 2026)

### LaPosta

| Plan | Prijs | Wat |
|---|---|---|
| **Gratis** | €0 | Tot **2.000 relaties**, tot 12.000 e-mails/mnd, 3 gebruikers, e-mailsupport. LaPosta-reclame onder elke mail. |
| **Abonnement** | vanaf **€210/jaar** | Onbeperkt mailen, geen reclame, telefonische support, onbeperkt gebruikers, eigen verwerkersovereenkomst. Prijs schaalt met aantal relaties (tabel hieronder). |
| Mailcredits | vanaf €9 | Betalen per verzonden nieuwsbrief — niet relevant voor een funnel. |

LaPosta-abonnement, tarief per jaar — **prijzen excl. 21% btw**:

| Relaties | Per jaar (excl. btw) |
|---|---|
| 1 – 500 | €210 |
| 501 – 750 | €260 |
| 751 – 1.000 | €310 |
| 1.001 – 1.250 | €360 |
| 1.251 – 1.500 | €400 |
| 1.501 – 2.000 | €465 |
| 2.001 – 2.500 | €520 |
| 4.001 – 5.000 | €735 |

### MailerLite

Vier plannen: Free, Growing Business, Advanced, Enterprise (Enterprise pas vanaf 100k abonnees). Prijs in **USD, per maand**; 10% korting bij jaarbetaling. Bedragen hieronder zijn maandbetaling.

| Abonnees | Free | Growing Business | Advanced |
|---|---|---|---|
| 500 | **$0** | $10/mnd | $20/mnd |
| 1.000 | n.v.t. | $15/mnd | $30/mnd |
| 2.500 | n.v.t. | $25/mnd | $40/mnd |
| 5.000 | n.v.t. | $39/mnd | $50/mnd |
| 10.000 | n.v.t. | $73/mnd | $110/mnd |

- **Free**: tot 500 abonnees, 12.000 e-mails/mnd, 1 gebruiker, automation builder, onbeperkt groepen/tags, 10 landingspagina's. MailerLite-logo in de mail. Volwaardige support alleen de eerste 14 dagen.
- **Growing Business**: onbeperkt mailen, geen MailerLite-logo, 3 gebruikers, 24/7 e-mailsupport.
- **Advanced**: + onbeperkt gebruikers, 24/7 live chat, multi-trigger automations, custom HTML.

> **In september 2025 heeft MailerLite het gratis plan verlaagd van 1.000 naar 500 abonnees.**

---

## 5. Wat kost het Crystal écht?

Je gaf aan dat een reclameregel onder de mail voor deze doelgroep geen issue is. Dat maakt het kostenplaatje eerlijk en simpel:

**In het bereik 441 – 2.000 contacten:**
- **LaPosta Gratis** = €0. Crystal kan haar hele nieuwsbrief + de e-book funnel hier gratis draaien, mét de reclameregel.
- **MailerLite** = gratis tot 500 contacten; daarboven verplicht Growing Business. Bij jaarbetaling, omgerekend naar euro (~€0,92/$): ≈ €99/jr bij 500, ≈ €149/jr bij 1.000, ≈ €248/jr bij 2.500 contacten.

→ In dit bereik is **LaPosta puur op geld goedkoper**: gratis tegenover ~€100–250/jaar.

**Vanaf ~2.000 contacten draait het om:**
- LaPosta moet dan naar Abonnement: **€465/jr** (tot 2.000) en **€520/jr** (tot 2.500), excl. btw.
- MailerLite Growing Business bij 2.500 ≈ **€248/jr**.

→ Boven de 2.000 contacten is **MailerLite goedkoper** — en het verschil loopt op naarmate de lijst groeit.

**De realistische conclusie:** zolang Crystal onder 2.000 contacten blijft is LaPosta gratis en kost MailerLite ~€100–250/jaar. Zodra het groepsprogramma en de Meta-advertenties de lijst boven 2.000 duwen, is MailerLite juist goedkoper. Het kostenverschil is in beide richtingen klein — een paar honderd euro per jaar — afgezet tegen het advertentiebudget dat eronder hangt. **Kosten zijn hier dus niet de doorslaggevende factor; het datamodel is dat wel.**

---

## 6. Vergelijking op jouw drie criteria

**Criterium 1 — Crystal moet het na een jaar zelf onderhouden.**
- *MailerLite* staat bekend als de makkelijkst te gebruiken e-mailtool (won daar in 2025 awards voor). Het tag/groep-model is intuïtief.
- *LaPosta* heeft een **Nederlandstalige interface en Nederlandse telefonische support** — voor een niet-technische ondernemer een echte troost als er na de samenwerking iets hapert.
- MailerLite-support is Engelstalig (24/7 op betaald plan, maar alleen 14 dagen op gratis).
- → **LaPosta wint op support-taal; MailerLite op gebruiksgemak van de tool zelf.** Dit is het sterkste punt vóór LaPosta.

**Criterium 2 — Crystal is tool-moe.**
- Een overstap is een eenmalige leerstap. Crystals huidige LaPosta-gebruik is licht (één lijst, één simpele welkomstmail, broadcast-nieuwsbrieven). De échte leercurve — funnel-automations en segmenten bouwen — ligt nog vóór haar, in welke tool dan ook. Ze ruilt dus geen ingesleten routine in; ze leert hoe dan ook haar eerste "funnel-tool".
- → **Licht nadeel voor overstappen, maar kleiner dan het lijkt.**

**Criterium 3 — Crystals omzet maximaliseren.**
- Betere segmentatie en automation → relevantere e-mails → meer boekingen en meer verkoop bij de groepsprogramma-lancering.
- MailerLite's model is hier objectief beter, en is precies wat dit gesprek nodig had (afspraak-tagging, cross-funnel segmenten). Plus ingebouwde landingspagina's, automations en verkoop van digitale producten/boekingen.
- Een groepsprogramma lanceren met Meta-advertenties leunt zwaar op segmentatie: wie kreeg welke funnel, wie boekte wel/niet, wie kocht. Precies waar LaPosta's lijst-model gaat knellen.
- → **Duidelijk voordeel MailerLite.**

---

## 7. Overstapkosten

Eerlijk beeld — het is meer dan een paar muisklikken, maar het is een overzichtelijke eenmalige klus, en hij is nú een stuk kleiner dan over een jaar.

| Onderdeel | Werk | Door wie |
|---|---|---|
| 441 contacten verhuizen | Export uit LaPosta → import in MailerLite als **bestaande, bevestigde contacten** (geen nieuwe opt-in nodig; AVG-technisch wijzigt alleen de verwerker, de toestemming blijft). Standaard CSV-klus. | Ivo |
| Welkomst-automation | "Bevestigings-E-mail" opnieuw opbouwen in MailerLite — een simpele flow, ~15 min. | Ivo |
| Nieuwsbrief-template/branding | Opnieuw inrichten — moest tóch gebeuren, dus geen extra werk. | Ivo (+ Crystal akkoord) |
| n8n e-book opt-in workflow | LaPosta-call vervangen door MailerLite-call. De MailerLite-MCP-koppeling staat hier al klaar. | Ivo |
| Domeinverificatie | SPF/DKIM/DMARC opnieuw instellen voor MailerLite. | Ivo |
| Verzendhistorie (89 campagnes) | **Migreert niet mee** — statistieken van oude nieuwsbrieven blijven in LaPosta. Verlies is beperkt. Het gratis LaPosta-account kun je desnoods slapend laten staan om het archief te bewaren; dat kost niets. | — |
| Crystal | Leert MailerLite in plaats van LaPosta. | Crystal (met Ivo erbij) |

**Inschatting: ongeveer een halve werkdag eenmalig werk**, grotendeels bij Ivo. Voor Crystal is het zichtbare deel "de nieuwe tool leren".

**Waarom nú:** Crystal heeft nu 441 contacten en een lichte setup. Na de funnels en de groepsprogramma-lancering heeft ze duizenden contacten en meerdere automations. Elke maand uitstel maakt de overstap groter. Dit is het goedkoopste moment dat je nog krijgt.

---

## 8. Advies

**Overstappen naar MailerLite.** Concreet plan:

1. **Nu:** MailerLite-account opzetten, de 441 contacten importeren, domein verifiëren, de welkomstmail + nieuwsbrief-branding opnieuw inrichten. Crystal zit met 441 contacten nog onder de gratis grens van 500 — de aanloop kost dus niets.
2. **Zodra de funnels lopen** en de lijst richting/over de 500 gaat (volgens jouw verwachting snel): upgraden naar **Growing Business**. Reken daar gewoon op — Growing Business is reclamevrij, heeft 24/7 support en kost ≈ €100–250/jaar in de groeifase. (MailerLite-gratis stopt na 14 dagen met echte support; voor de bouwfase is dat geen probleem omdat jij er dan bij bent, maar het is geen langetermijnplan.)

Waarom dit zwaarder weegt dan op LaPosta blijven:
- Het datamodel klopt met hoe multi-funnel marketing werkt — en met hoe jij gewend bent te werken.
- Criterium 3 (omzet) geeft de doorslag: in een partnership op commissiebasis bouw je een marketingmachine, geen administratie. De groepsprogramma-lancering leunt op segmentatie die LaPosta lastig maakt.
- De overstap is nú klein; over een jaar niet meer.
- Het kostenverschil is klein en valt boven 2.000 contacten juist in MailerLite's voordeel uit.

**Het eerlijke tegenargument (wanneer LaPosta wint):**
- **Puur op kosten in de fase 500–2.000 contacten** is LaPosta gratis en MailerLite ~€100–250/jaar. Als je het zekere voor het onzekere wilt nemen en niets wilt uitgeven zolang de funnels zich nog moeten bewijzen, is dat een geldig argument om (voorlopig) op LaPosta te blijven.
- **Nederlandstalige UI + Nederlandse telefonische helpdesk.** Voor de periode dat Crystal het zelf doet, is "ik kan iemand in het Nederlands bellen" echt iets waard. Dit is de enige zwaarwegende min van MailerLite.

**Opvang van die min:** lever Crystal een korte Nederlandstalige handleiding of een paar Loom-video's bij de overdracht; MailerLite heeft de meest toegankelijke interface van de markt en een uitgebreide kennisbank; en je bent er een jaar bij om de kennis in te slijpen.

> **AVG/privacy is geen onderscheid.** Beide slaan data in de EU op en zijn GDPR-conform (MailerLite: EU-datacenter, ISO 27001). LaPosta benadrukt het Nederlandse verhaal harder, maar inhoudelijk zijn beide in orde.

---

## 9. Zo zou het eruitzien in MailerLite

Concreet, zodat de keuze tastbaar wordt — en meteen antwoord op je vraag over een naming convention.

### Groepen (= tags) met categorie-prefix
Net als jouw oude `product-…`-aanpak: het eerste woord is de categorie.

| Prefix | Betekenis | Voorbeelden |
|---|---|---|
| `funnel-` | Via welke funnel binnengekomen | `funnel-ebook-taal-lichaam`, `funnel-video-klacht`, `funnel-gnm-begeleiding` |
| `afspraak-` | Afspraakstatus | `afspraak-adviesgesprek-geboekt`, `afspraak-adviesgesprek-gehad`, `afspraak-kennismaking-geboekt` |
| `klant-` | Klant-/aankoopstatus | `klant-adviesgesprek`, `klant-vervolgtraject`, `klant-groepsprogramma` |
| `bron-` | Acquisitiebron (optioneel) | `bron-google-ads`, `bron-meta-ads`, `bron-organisch` |

Regels: alles kleine letters, woorden met koppelteken, prefix met koppelteken eraan vast. De prefix maakt in de groepenlijst meteen duidelijk wat bij elkaar hoort.

### Velden (gegevenswaarden, geen lidmaatschap)
`voornaam`, `achternaam`, `adviesgesprek_datum` (datum van het geboekte gesprek), de utm-velden.

Vuistregel: **lidmaatschap/status → groep; een waarde → veld.** "Heeft adviesgesprek geboekt" = groep. "Wanneer is het gesprek" = veld.

### Segmenten (dynamische filters)
Het segment dat je eerder wilde, is dan triviaal:

> **"Adviesgesprek gehad, geen vervolgtraject"** = in groep `afspraak-adviesgesprek-gehad` **EN NIET** in groep `klant-vervolgtraject`.

Eén filter. Geen aparte lijst, geen duplicaten, geen synchronisatie.

### En de oorspronkelijke vraag — Cal.com-boeking taggen
Iemand boekt een adviesgesprek → MailerLite-automation of n8n zet de groep `afspraak-adviesgesprek-geboekt` op het bestaande contact en vult het veld `adviesgesprek_datum`. De 6-mail-sequence checkt die groep en slaat de boek-CTA-mails over. Dit is in MailerLite eenvoudiger te bouwen dan in LaPosta.

---

## 10. Bronnen & wat geverifieerd is

| Gegeven | Bron | Status |
|---|---|---|
| LaPosta gratis/abonnement, volledige tariefgroep-tabel | laposta.nl/tarieven + /tarieven/abonnement | ✅ Live opgehaald 19-05-2026 |
| LaPosta features (automations, velden, support) | laposta.nl/functies | ✅ Live opgehaald 19-05-2026 |
| MailerLite plannen + prijs bij 500 abonnees | mailerlite.com/pricing | ✅ Live opgehaald 19-05-2026 |
| MailerLite prijs bij 1.000 / 2.500 / 5.000 / 10.000 | emailtooltester.com (MailerLite-prijsoverzicht 2026) | ⚠️ Derde partij — komt exact overeen met de twee ankerpunten die ik wél direct van MailerLite kreeg (500 en 50.000), dus betrouwbaar |
| Verlaging gratis plan 1.000 → 500 (sep 2025) | webonderzoek mei 2026 | ✅ |
| Crystals huidige LaPosta-situatie (441 contacten, 89 campagnes, 1 automation) | Opgave Ivo, 19-05-2026 | ✅ |

**Niet 100% geverifieerd:** de euro-bedragen voor MailerLite zijn omgerekend uit USD (~€0,92/$). MailerLite kan ook in euro afrekenen met eigen euro-prijzen. Wil je daar exacte zekerheid over: stuur een screenshot van de MailerLite-prijspagina met de valuta op EUR en de slider op 1.000 / 2.500 — dan werk ik de bedragen bij. Voor de beslissing maakt het verschil van een paar euro niet uit.
