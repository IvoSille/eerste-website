# Migratieplan: LaPosta → MailerLite

*Opgesteld 20 mei 2026. Crystal heeft 20-05-2026 akkoord gegeven op de overstap. Achtergrond: `Toolvergelijking-LaPosta-vs-MailerLite.md`.*

---

## Uitgangspunten

- **Account-eigenaar = Crystal.** E-mail/login op haar naam; billing bij haar. Voor de overdracht over een jaar essentieel.
- **Startplan: Free.** Crystal zit met 441 contacten onder de gratis grens (500). Upgrade naar Growing Business zodra de lijst over 500 gaat — of eerder als we het seat-probleem willen oplossen (zie beslismoment).
- **Doel: clean cutover binnen ~1 werkweek**, parallel werk waar mogelijk.

## Rolverdeling in één oogopslag

| Wat | Wie |
|---|---|
| Account aanmaken + e-mailadres verifiëren | **Crystal** |
| DNS, import, automations, n8n-koppeling, technische opzet | **Ivo** |
| Nieuwsbrief-look akkoord, "from address" kiezen | **Crystal** (Ivo levert voorstel) |

---

## Stappen in volgorde

### 1. Crystal: account aanmaken — **GATING ITEM**
- Crystal maakt account aan op [mailerlite.com](https://www.mailerlite.com) met **haar eigen zakelijke e-mailadres** (zelfde adres dat als afzender gaat dienen, bv. `info@crystalhelder.nl` of vergelijkbaar).
- E-mailadres bevestigen.
- Crystal stuurt Ivo bevestiging zodra dit klaar is. (Ivo werkt in eerste fase via Crystals login, zie beslismoment hieronder.)

**Klaar wanneer:** Crystal kan inloggen en heeft haar mailadres geverifieerd.

### 2. Ivo: domein-verificatie (SPF/DKIM/DMARC) voor crystalhelder.nl
- MailerLite's DNS-records toevoegen aan crystalhelder.nl.
- Let op: bestaande SPF-record uitbreiden, niet vervangen (één `v=spf1`-record per domein).
- DMARC-record controleren of alignment haalbaar is.
- Test-mail verzenden tot deliverability-check groen is.

**Klaar wanneer:** test-mail komt aan, MailerLite-domain status = verified.

### 3. Ivo: structureren — custom fields en groepen volgens naming convention
Aanmaken (via MailerLite-MCP, repeatable):

**Custom fields**
`voornaam`, `achternaam`, `download_token`, `adviesgesprek_datum`, `utm_source`, `utm_medium`, `utm_campaign`.

**Groepen — startset**
- `funnel-nieuwsbrief` — algemene nieuwsbrief-inschrijvers
- `funnel-ebook-taal-lichaam` — e-book aanvragers
- `bron-laposta-bestaand` — historische import (zie stap 4)
- Reservering voor: `funnel-video-klacht`, `funnel-gnm-begeleiding`, `afspraak-adviesgesprek-geboekt`, `klant-adviesgesprek`, `klant-vervolgtraject`, `klant-groepsprogramma`. Pas aanmaken zodra ze relevant worden.

**Klaar wanneer:** alle fields + startgroepen staan in MailerLite.

### 4. Ivo: 441 contacten migreren
- Export uit LaPosta: CSV met e-mail + voornaam + achternaam + opt-in datum.
- Import in MailerLite met optie **"reeds opted-in" / "already confirmed"** (geen nieuwe double opt-in). AVG-toestemming blijft staan; alleen de verwerker wijzigt.
- Toewijzen aan groep `funnel-nieuwsbrief` + `bron-laposta-bestaand`.
- MailerLite dedupliceert automatisch op e-mailadres.

**Klaar wanneer:** alle (~441) actieve contacten zichtbaar in MailerLite, gegroepeerd.

### 5. Ivo: welkomstmail "Bevestigings-E-mail" overbouwen
- Tekst kopiëren uit de LaPosta-automation.
- Nieuwe MailerLite-automation: trigger = "subscriber joins group `funnel-nieuwsbrief`", action = send welcome mail.
- Test met een eigen e-mailadres.

**Klaar wanneer:** testaanmelding levert direct de welkomstmail af.

### 6. Crystal + Ivo: nieuwsbrief-template & branding
- Ivo bouwt voorstel-template op basis van `docs/Brand_Style_Guide_Crystal_v2_0.md` + huidige LaPosta-look.
- Crystal levert akkoord of bijsturing.
- Template opslaan als standaard-sjabloon.

**Klaar wanneer:** Crystal accepteert de template.

### 7. Ivo: n8n e-book opt-in workflow ompunten
- Workflow `TVW1zAHZz3I91eax` ("Crystal Helder — E-book opt-in"): LaPosta HTTP-node vervangen door MailerLite (`add_subscriber` + `assign_subscriber_to_group` op `funnel-ebook-taal-lichaam`). Velden invullen: `voornaam`, `download_token`, utm's.
- Google Sheets + Slack-stappen behouden zoals ze zijn.
- End-to-end test: formulier op `/de-taal-van-je-lichaam/` invullen → check MailerLite + Sheet + Slack.

**Klaar wanneer:** test-aanmelding loopt foutloos door tot MailerLite-contact + Sheet-rij.

### 8. Cutover
- Niets op de website hoeft te veranderen — het formulier op `/de-taal-van-je-lichaam/` schiet al naar n8n, en n8n wijst nu naar MailerLite.
- LaPosta account: in gratis modus aanhouden voor het archief (89 campagnes), géén verzendingen meer.
- Eerste echte MailerLite-mailing: aanrader om kleinschalig te beginnen (test naar 5–10 mensen voor de hele lijst) i.v.m. opbouw van afzenderreputatie op de nieuwe DKIM.

**Klaar wanneer:** eerste nieuwsbrief uit MailerLite naar de hele lijst is verstuurd zonder problemen.

### 9. Afronding
- LaPosta API-keys uit n8n verwijderen (na succesvolle cutover).
- Korte Nederlandstalige handleiding voor Crystal: "zo maak je een nieuwsbrief", "zo bekijk je statistieken", "zo voeg je iemand toe". Half A4 of een Loom-video van ~5 min.
- Take-down LaPosta in een later kwartaal als het archief niet meer nodig is.

---

## Beslismoment voor Crystal

**Wel of niet direct upgraden naar Growing Business (~€99/jr)?**
- *Voor:* drie user-seats (Ivo werkt dan op eigen account, niet op Crystals login), geen MailerLite-logo, 24/7 e-mailsupport.
- *Tegen:* €99/jr eerder uitgeven dan strikt nodig (gratis tot 500 contacten zou ook kunnen).
- *Mijn advies:* upgraden direct na stap 1. Voor €99/jr verdwijnt het seat-gedoe en het MailerLite-logo. Crystal hoeft ook niet haar wachtwoord met me te delen tijdens de bouwfase.

## Open items voor Crystal

- Welk e-mailadres wordt de **afzender** (`from address`)? Ideaal: hetzelfde adres als haar account-login op `@crystalhelder.nl`.
- Branding nieuwsbrief: ben jij oké met een voorstel van mij op basis van de bestaande style guide, of wil je eerst zelf input geven?
- Vanaf welke datum/week wil je dat de eerste echte MailerLite-mailing live gaat?

---

## Risico's en hoe op te vangen

| Risico | Opvang |
|---|---|
| Deliverability dipt na overstap (nieuwe DKIM) | Eerst kleinschalig testen (5–10 ontvangers) voordat de hele lijst krijgt. MailerLite levert sowieso via warm shared pools. |
| SPF-conflict met andere diensten (Google Workspace) | MailerLite-include toevoegen aan bestaand SPF-record, niet vervangen. |
| Klein aantal contacten gaat verloren bij import (typo's, oude bounces) | LaPosta-export filteren op "actief" (413 actieve van 441 totaal). De inactieven niet meeschuiven. |
| Crystal heeft tussentijds tool-vragen | Korte Loom-video's bij elke milestone, en Ivo is bereikbaar tijdens de bouwperiode. |

---

## Voortgang

Zie de takenlijst in de huidige sessie of het projectgeheugen. Stap 1 (Crystal) is gating — alle technische stappen wachten erop.
