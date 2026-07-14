# Design: Sales page "Thuiskomen in je Vrouwenlijf"

**Datum:** 2026-07-14
**Status:** goedgekeurd, klaar voor implementatieplan

## Doel

Bouw de sales page voor het groepsprogramma "Thuiskomen in je Vrouwenlijf" op basis van de volledige, goedgekeurde copy in [`docs/salespagina-cohort1-crystal-v2.md`](../../salespagina-cohort1-crystal-v2.md). De copy specificeert 20 blokken 1-op-1; dit document beschrijft alleen de bouwbeslissingen die de copy zelf openlaat (architectuur, visuele vertaling, tracking, technische schakelaars).

De copy is leidend voor de tekst. Niet inkorten of herschrijven zonder overleg (staande projectafspraak).

## Scope

- Nieuwe sales page: `/thuiskomen-in-je-vrouwenlijf/`
- Nieuwe bedankt-pagina: `/thuiskomen-in-je-vrouwenlijf/bedankt/`
- Geen wijzigingen aan bestaande pagina's, GTM-config, of nieuwe Google Ads-conversieacties (buiten scope van deze bouw)
- Geen PlugAndPay/Stripe-redirect-koppeling naar de bedankt-pagina (actiepunt voor Crystal/Ivo, niet voor deze bouw)
- Geen `purchase`-eventtracking (vereist webhook, apart traject)

## Architectuur

Eén samenhangend paginabestand, naar het patroon van `src/pages/je-pijn-is-echt/index.astro` (meest recente long-form pagina), niet opgesplitst in losse componenten per blok zoals bij `adviesgesprek/`. Reden: dit is een lineair verhaal van blok 1 t/m 20 zonder herbruikbare secties elders — één bestand houdt de bouw 1-op-1 traceerbaar tegen de spec via bloknummer-comments.

**Bestanden:**
- `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro` — de sales page, 20 blokken als secties met `{/* BLOK N: ... */}`-comments
- `src/pages/thuiskomen-in-je-vrouwenlijf/bedankt.astro` — bedankt-pagina, opzet gelijk aan `germaanse-geneeskunde-adviesgesprek/bedankt.astro`
- `src/components/thuiskomen/StickyBar.astro` — nieuw, sticky CTA-balk (zie hieronder)

**Hergebruik:** `Button.astro`, `Card.astro`, `Footer.astro`, het `<details>/<summary>`-accordionpatroon uit `FAQ.astro` (inline overgenomen, niet als losse import, want de vragen zijn paginaspecifiek).

## Visuele vertaling per bloktype

- **Hero (1):** groot, `max-w-7xl`, foto van Crystal (`Portret Crystal 1.jpg`), bullets, primary CTA. Headline/subkop/CTA boven de vouw op mobiel — zelfde flex-col-reverse-patroon als `je-pijn-is-echt` hero.
- **Scènes (3, 4, 5, 8, 19):** smal (`max-w-3xl mx-auto`), veel witruimte, rustige `leading-relaxed` — bestaand patroon uit `je-pijn-is-echt`. Drop-cap (CSS `::first-letter`) alleen op blok 3 en 19 — de scènes die de lus openen/sluiten — niet op alle vijf scène-blokken, om het effect niet te verwateren.
- **Uitleg (6, 7, 10, 11, 12):** grids/cards volgens het `Card.astro`-patroon uit `WatJeKrijgt.astro`. Pull-quote in blok 7 groot uitgelicht als `blockquote`.
- **Waardetabel (blok 11):** responsive — kaartenrij op mobiel, tabel-achtige rijen op desktop (zelfde content, twee layouts; een kale `<table>` breekt op mobiel).
- **Zes extra's (blok 12):** grid van 6 cards, bezwaar-citaat cursief bovenaan elke kaart.
- **Filter (blok 13):** twee kolommen ("wel"/"niet"), geen nieuwe componenten nodig.
- **Bewijs (blok 14):** drie testimonial-quotes, zelfde stijl als bestaande testimonial-kaarten in `je-pijn-is-echt`.
- **Conversie (15, 16, 17, 18):** helder, actiegericht. Blok 17 als accordion (FAQ-patroon). Blok 15 met twee betaalknoppen.
- **Close (19):** handtekening "Crystal" in een nieuw self-hosted script-font (bv. Caveat), uitsluitend hier gebruikt — klein gescoped toevoeging, self-hosted conform brand guide (geen CDN).
- **P.S. (20):** compacte samenvatting, primary CTA.
- **Geen** stockfotografie, pop-ups, exit-intent of aftelklokken (expliciete eis uit de copy).

## Sticky CTA-balk

Nieuw component `StickyBar.astro`: verschijnt op desktop na het scrollen voorbij de hero (IntersectionObserver op de hero-sectie, zelfde mechaniek als bestaande `fade-in-section`-observer). Toont programmanaam + prijs (€997) + één primary CTA die naar blok 15 scrollt. Geen volledige ankernav met sectielinks — deze pagina heeft geen losse secties om naar te linken, alleen "naar de investering".

## Tracking

- `Layout` met `includeCal={false}` — geen Cal.com-booking op deze pagina.
- **Checkout-klik (blok 15):** bij klik op een betaalknop eerst een `dataLayer.push` met:
  ```js
  {
    event: "begin_checkout",
    cta_text: "...",
    payment_option: "single" | "installments",
    value: 997,
    currency: "EUR",
    eventCallback: () => { window.location.href = checkoutUrl; },
    eventTimeout: 2000,
  }
  ```
  Plus een `setTimeout`-fallback (2500ms) als GTM niet geladen is — conform `tracking-patterns.md`. Nodig omdat het een externe cross-origin redirect is; zonder deze guard kan het dataLayer-event de tag niet meer bereiken vóór de navigatie.
- Overige CTA's (scroll-naar-blok-15) volgen het bestaande `cta_click`-patroon uit `germaanse-geneeskunde-adviesgesprek/index.astro`.
- Scroll-depth tracking: zelfde patroon (25/50/75/90%) als op de adviesgesprek-pagina.
- **Bewust buiten scope:** een `purchase`-event vereist bevestigde betaling (webhook vanuit PlugAndPay/Stripe). Dat is een apart vervolgtraject, geen onderdeel van deze bouw.

## Checkout-links en wachtlijst-schakelaar

Bovenin `index.astro`, als expliciete `const`s zodat toekomstige aanpassingen zonder zoeken in de pagina kunnen:

```js
const CHECKOUT_URL_INEENS = "https://crystalhelder.plugandpay.com/checkout/thuiskomen-in-je-lijf"; // vervang zodra Stripe-ineens-link er is
const CHECKOUT_URL_TERMIJNEN = "https://buy.stripe.com/cNi14nfuagXHgS28K400000";
const inschrijvingOpen = true; // op false: CTA's schakelen naar wachtlijst
const WACHTLIJST_URL = "/wachtlijst/";
```

Wanneer `inschrijvingOpen = false`: alle CTA's die naar blok 15 scrollen linken in plaats daarvan naar `WACHTLIJST_URL`, en de CTA-tekst/urgentie-teksten in blok 16/20 wisselen naar een wachtlijst-variant (build-notitie in de copy zelf, blok 16). Geen CMS, geen query-param — een handmatige code-wijziging die Ivo maakt en pusht.

## Bedankt-pagina

`src/pages/thuiskomen-in-je-vrouwenlijf/bedankt.astro`, opzet gelijk aan `germaanse-geneeskunde-adviesgesprek/bedankt.astro`: warm bedankbericht passend bij de sales-tone, geen Cal.com. Nu al gebouwd en live, maar nog niet gekoppeld als redirect-doel vanuit PlugAndPay/Stripe — dat moet in de checkout-instellingen zelf gebeuren (actiepunt buiten deze bouw, net als de bestaande PlugAndPay 10-weken/oude-prijs-fix die de copy al noemt).

## Afbeeldingen

Bestaande assets hergebruikt, geen nieuwe aanlevering nodig:
- `Portret Crystal 1.jpg` — hero, blok 2 (authority-strip), blok 5 (verhaal)
- `foto_1.jpg` / `foto_2.jpg` / `foto_3.jpg` — waar een sfeerbeeld passend is (bv. blok 8, blok 10)

## Wat bewust buiten deze bouw valt

Rechtstreeks overgenomen uit de copy's eigen "Wat er nog moet gebeuren"-sectie — geen van deze blokkeert de bouw, maar moeten later worden verwerkt:

1. Inschrijfdeadline (blok 16, blok 20) — volgt in v3 van de copy
2. Testimonials (blok 14) vervangen/aanvullen zodra VOC uit challenge ronde 1 binnen is
3. Annelies Sinke toevoegen aan blok 10 zodra afgestemd met haarzelf
4. Datum/locatie/programma van de live dag concretiseren in blok 10
5. Nieuwe Stripe-ineens-link verwerken zodra beschikbaar (zie `CHECKOUT_URL_INEENS`)
6. `purchase`-tracking via webhook (apart traject)
