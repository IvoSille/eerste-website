# Nieuw Project Opzetten met Crystal Helder Branding

*Handleiding voor het opstarten van een nieuw Astro-project dat de Crystal Helder huisstijl 1-op-1 overneemt.*

---

## Overzicht

Deze handleiding beschrijft hoe je een nieuw Astro-project opzet (bijv. de hoofdwebsite) dat dezelfde visuele identiteit gebruikt als de bestaande landing page. Je kopieert het design-fundament (fonts, kleuren, spacing) en bouwt nieuwe pagina's met de Brand Style Guide als referentie.

### Wat je nodig hebt uit het landing page project

| Wat | Pad (in landing page repo) | Doel |
|-----|---------------------------|------|
| Brand Style Guide | `docs/Brand_Style_Guide_Crystal_v2_0.md` | Designbeslissingen, component-patronen, do's & don'ts |
| CSS fundament | `src/styles/global.css` | Kleuren, fonts, base-styling |
| Font-bestanden | `public/fonts/*.woff2` | Self-hosted Outfit + Lato |
| Astro config (referentie) | `astro.config.mjs` | Tailwind v4 + build-instellingen |
| Package versions (referentie) | `package.json` | Astro + Tailwind versies |

---

## Stap 1 — Nieuw Astro-project aanmaken

```bash
npm create astro@latest crystal-helder-website
cd crystal-helder-website
```

Kies bij de wizard:
- Template: **Empty** (we bouwen alles zelf op)
- TypeScript: **Strict** (aanbevolen)
- Install dependencies: **Yes**

Installeer Tailwind CSS v4:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

---

## Stap 2 — Astro configuratie

Pas `astro.config.mjs` aan. Dit moet overeenkomen met de landing page:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',  // CSS inline in HTML voor snelheid
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### Waarom deze instellingen?

| Instelling | Reden |
|-----------|-------|
| `trailingSlash: 'always'` | URLs eindigen op `/` — consistent met landing page en Netlify |
| `inlineStylesheets: 'always'` | Elimineert extra CSS-request, verbetert FCP |
| `tailwindcss()` vite plugin | Tailwind v4 integratie (geen `tailwind.config.js` nodig) |

---

## Stap 3 — Font-bestanden kopiëren

Kopieer de hele `public/fonts/` map vanuit de landing page:

```bash
# Vanuit de root van het NIEUWE project:
cp -r /pad/naar/landing-page/public/fonts/ public/fonts/
```

Je hebt dan deze bestanden:

```
public/fonts/
├── outfit-latin.woff2          # Headings (Outfit, weight 500-700, Latijns)
├── outfit-latin-ext.woff2      # Headings (Outfit, extended karakterset)
├── lato-400-latin.woff2        # Body tekst (Lato, regular 400)
└── lato-700-latin.woff2        # Body tekst (Lato, bold 700)
```

### Let op

- Deze bestanden zijn **self-hosted** — geen Google Fonts CDN. Dit is sneller en privacy-vriendelijker.
- De `unicode-range` in de `@font-face` declaraties (stap 4) zorgt dat de browser alleen het bestand downloadt dat nodig is voor de karakters op de pagina.
- Raak de bestandsnamen niet aan — ze worden exact zo gerefereerd in de CSS.

---

## Stap 4 — Global CSS kopiëren

Kopieer `src/styles/global.css` vanuit de landing page:

```bash
mkdir -p src/styles
cp /pad/naar/landing-page/src/styles/global.css src/styles/global.css
```

Dit bestand bevat drie cruciale onderdelen:

### A. @font-face declaraties

Koppelen de .woff2 bestanden aan fontnamen. Zonder dit werken de fonts niet.

```css
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 500 700;
  font-display: swap;
  src: url('/fonts/outfit-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, ...;
}
/* + nog 3 @font-face regels voor Outfit-ext, Lato-400, Lato-700 */
```

### B. Design tokens via @theme

Tailwind v4 gebruikt `@theme` in plaats van `tailwind.config.js`:

```css
@theme {
  --color-brand-base: #FAF7F5;
  --color-brand-primary-text: #2C2624;
  --color-brand-muted: #6B5F5C;
  --color-brand-accent: #C8664D;
  --color-brand-accent-hover: #A8533D;
  --color-brand-accent-light: #E8A090;
  --color-brand-secondary: #EADAD3;
  --color-brand-sage: #D3DEC6;

  --font-primary: "Outfit", sans-serif;
  --font-secondary: "Lato", sans-serif;
  --font-sans: "Lato", sans-serif;
  --font-heading: "Outfit", sans-serif;
}
```

Hierdoor kun je in Tailwind classes direct schrijven:
- `bg-[var(--color-brand-accent)]`
- `text-[var(--color-brand-muted)]`
- `font-heading` (verwijst naar Outfit)
- `font-sans` (verwijst naar Lato)

### C. Base-layer styling

Stelt de standaard achtergrondkleur, tekstkleur, heading-fonts en letter-spacing in. Plus de `prefers-reduced-motion` media query.

### Wat je NIET moet kopiëren

De global.css is puur design-fundament — er zit geen project-specifieke logica in. Je kunt het bestand 1-op-1 overnemen.

---

## Stap 5 — Base Layout aanmaken

Maak `src/layouts/Layout.astro` aan. Dit is het skelet waar alle pagina's in laden.

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Crystal Helder" } = Astro.props;
---

<!DOCTYPE html>
<html lang="nl">
  <head>
    <script is:inline>document.documentElement.classList.add("js");</script>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />

    <!-- SEO & Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url} />
    <link rel="canonical" href={Astro.url} />

    <!-- Preload critical fonts -->
    <link rel="preload" href="/fonts/outfit-latin.woff2"
          as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/lato-400-latin.woff2"
          as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/lato-700-latin.woff2"
          as="font" type="font/woff2" crossorigin />

    <title>{title}</title>
  </head>
  <body class="bg-[var(--color-brand-base)] text-[var(--color-brand-primary-text)] antialiased font-sans text-lg selection:bg-[var(--color-brand-accent)] selection:text-white">
    <slot />
  </body>
</html>
```

### Wat hier bewust NIET in zit

| Onderdeel | Reden |
|-----------|-------|
| Cal.com embed script | Alleen nodig als je Cal.com gebruikt. Voeg toe wanneer nodig. |
| Google Consent Mode | Project-specifiek. Configureer per site. |
| GTM / Stape snippet | Project-specifiek. Andere container ID's per site. |
| ConsentBanner component | Bouw een nieuwe of kopieer en pas aan. |

### Wat er WEL in moet

| Onderdeel | Waarom |
|-----------|--------|
| `global.css` import | Laadt fonts + design tokens |
| Font preloads (3 stuks) | Voorkomt FOUT (Flash of Unstyled Text). `crossorigin` is verplicht voor fonts. |
| `lang="nl"` | Nederlandse content |
| `document.documentElement.classList.add("js")` | Voor fade-in animaties (CSS kan checken of JS actief is) |
| Body classes | Standaard achtergrond, tekstkleur, font, selectiekleur |

---

## Stap 6 — CLAUDE.md configureren

Maak in de root van het nieuwe project een `CLAUDE.md` aan zodat Claude Code de branding automatisch respecteert:

```markdown
# Crystal Helder — Hoofdwebsite

## Branding
Volg strikt de Brand Style Guide: `docs/Brand_Style_Guide_Crystal_v2_0.md`
Dit project deelt de visuele identiteit met de landing page.

## Technische stack
- Astro 5 + Tailwind CSS v4
- Self-hosted fonts (Outfit + Lato)
- Tailwind v4 @theme tokens in `src/styles/global.css`
- Geen tailwind.config.js — alles via CSS @theme

## Conventies
- Nederlands als content-taal
- Trailing slashes op alle URLs
- Mobile-first responsive design
- Inline SVG voor iconen (geen icon libraries)
- Astro `<Picture>` component voor responsive afbeeldingen
```

Kopieer ook de Brand Style Guide naar het nieuwe project:

```bash
mkdir -p docs
cp /pad/naar/landing-page/docs/Brand_Style_Guide_Crystal_v2_0.md docs/
```

---

## Stap 7 — Verificatie

Start de dev server en controleer:

```bash
npm run dev
```

### Checklist

- [ ] **Fonts laden correct** — Outfit op headings, Lato op body tekst. Geen fallback-flash.
- [ ] **Kleuren kloppen** — Warme off-white achtergrond (#FAF7F5), donkerbruine tekst (#2C2624).
- [ ] **Tailwind tokens werken** — Test met `<div class="bg-[var(--color-brand-accent)] text-white p-8 rounded-3xl">Test</div>`
- [ ] **Geen console-errors** — Check browser devtools
- [ ] **Build werkt** — `npm run build` zonder fouten

---

## Stap 8 — Eerste componenten bouwen

Bouw de componenten die je nodig hebt met de Style Guide als referentie. Begin met:

1. **Nav.astro** — Navigatie (zie Style Guide §5.10 + §7.1 voor multi-page uitbreiding)
2. **Footer.astro** — Footer (zie Style Guide §7.2)
3. **Section.astro** — Herbruikbare sectie-wrapper (zie Style Guide §5.3)
4. **Button.astro** — CTA buttons met primary/secondary variant (zie Style Guide §5.1)
5. **Card.astro** — Content cards (zie Style Guide §5.2)

### Tip: kopieer geen componenten 1-op-1

De landing page componenten bevatten hardcoded content (teksten, afbeeldingen). Bouw nieuwe componenten die **props accepteren** en de stijlpatronen uit de Style Guide volgen. De Style Guide geeft je alle Tailwind classes die je nodig hebt.

---

## Projectstructuur (eindresultaat)

```
crystal-helder-website/
├── astro.config.mjs
├── package.json
├── CLAUDE.md                          ← Claude Code instructies
├── docs/
│   └── Brand_Style_Guide_Crystal_v2_0.md  ← Visuele referentie
├── public/
│   ├── favicon.svg
│   └── fonts/
│       ├── outfit-latin.woff2
│       ├── outfit-latin-ext.woff2
│       ├── lato-400-latin.woff2
│       └── lato-700-latin.woff2
└── src/
    ├── styles/
    │   └── global.css                 ← Tokens + fonts + base styles
    ├── layouts/
    │   └── Layout.astro               ← Base layout met font preloads
    ├── components/
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── Section.astro
    │   ├── Button.astro
    │   └── Card.astro
    └── pages/
        └── index.astro
```

---

## Samenvatting: wat je kopieert vs. wat je nieuw bouwt

| Kopieer 1-op-1 | Bouw nieuw (met Style Guide) |
|-----------------|-------------------------------|
| `public/fonts/` (4 woff2 bestanden) | Alle componenten (Nav, Footer, etc.) |
| `src/styles/global.css` | `src/layouts/Layout.astro` (schoon, zonder tracking) |
| `docs/Brand_Style_Guide_Crystal_v2_0.md` | Pagina-content en structuur |
| | `CLAUDE.md` (project-specifiek) |
| | Tracking setup (GTM, consent, etc.) |
| | `astro.config.mjs` (zelf aanmaken, zelfde instellingen) |

---

## Veelgemaakte fouten

| Fout | Gevolg | Oplossing |
|------|--------|-----------|
| Font preloads vergeten | Flash of Unstyled Text (FOUT) bij eerste bezoek | Voeg de 3 `<link rel="preload">` tags toe in Layout.astro |
| `crossorigin` weglaten bij font preload | Browser negeert de preload, laadt font opnieuw | Altijd `crossorigin` op font preloads (ook bij self-hosted) |
| Google Fonts CDN gebruiken i.p.v. self-hosted | Extra DNS lookup + render-blocking request | Gebruik de self-hosted .woff2 bestanden |
| Grijze Tailwind shadows gebruiken | Destoneert met het warme kleurenpalet | Gebruik altijd gekleurde shadows (zie Style Guide §2.5) |
| Hard zwart (#000) of spierwit (#FFF) als achtergrond | Te scherp, niet in lijn met de zachte branding | Gebruik `--color-brand-primary-text` en `--color-brand-base` |
| 90-graden hoeken op kaarten/buttons | Breekt de organische vormtaal | Minimum `rounded-2xl`, buttons altijd `rounded-full` |
| `tailwind.config.js` aanmaken | Niet nodig met Tailwind v4, kan conflicteren | Alles via `@theme` in global.css |
