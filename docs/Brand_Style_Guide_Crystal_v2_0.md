# **Visual & UI Brand Style Guide — v2.0**

*Dit document bevat de strikte visuele kaders en 'vibes' voor alle Crystal Helder projecten. Gebruik dit als je absolute bron van waarheid voor designbeslissingen.*

*Versie 2.0 — uitgebreid met exacte design tokens, typografische schaal, responsive patronen en component library, geëxtraheerd uit de productie-landingpage (maart 2026).*

---

## **1. DESIGN PRINCIPLES & VIBE**

* **Visueel Archetype:** De Empatische Autoriteit. Een brug tussen biologische, medische logica en menselijke, vrouwelijke zachtheid.
* **Sfeer / Vibe:** Veilig, geaard, professioneel, warm en nuchter. Absoluut NIET zweverig, mystiek of klinisch.
* **Design Principes:**
  1. **Extreme Ademruimte:** Gebruik royale whitespace. De doelgroep (vrouwen met chronische pijn en stress) heeft visuele rust nodig. Geen drukke achtergronden of overlappende chaos.
  2. **Biologische Logica:** Het design moet betrouwbaarheid en autoriteit uitstralen (denk aan een premium, moderne kliniek, maar dan met een ziel).
  3. **Fotografie Centraal:** Ruimte voor warme, professionele portretfotografie waarbij de kledingkleuren overvloeien in het webdesign.
* **Vormtaal:** Organisch en zacht. Gebruik uitsluitend afgeronde hoeken ("ronde dingetjes"). Geen harde, zakelijke 90-graden hoeken in de UI-elementen.

---

## **2. DESIGN TOKENS**

### **2.1 Kleurenpalet**

**Belangrijke Restrictie:** Gebruik NOOIT blauw (te klinisch/ziekenhuis) en NOOIT hard rood. Vermijd zwaar/donkergroen en hard zwart (#000).

*Let bij het combineren van deze kleuren extreem goed op de WCAG-toegankelijkheidseisen. Zorg altijd voor een hoog contrast, vooral voor vermoeide ogen.*

#### Kernkleuren (CSS Custom Properties)

| Token | Hex | Beschrijving |
|-------|-----|-------------|
| `--color-brand-base` | `#FAF7F5` | Zachte warme off-white. Hoofdachtergrond. Gebruik geen spierwit #FFFFFF. |
| `--color-brand-primary-text` | `#2C2624` | Diep warm donkerbruin. Hoofdtekstkleur. Gebruik geen hard zwart. |
| `--color-brand-muted` | `#6B5F5C` | Zacht taupe/grijsbruin. Secundaire tekst, labels, meta-info. |
| `--color-brand-accent` | `#C8664D` | Terracotta/koper. Hoofdkleur voor actie, warmte, CTA's. |
| `--color-brand-accent-hover` | `#A8533D` | Donkerder terracotta. Hover-state van accent. |
| `--color-brand-accent-light` | `#E8A090` | Licht terracotta. Subtiele accenten, glow-effecten. |
| `--color-brand-secondary` | `#EADAD3` | Licht poederkleur/taupe. Zachte achtergrondvlakken, badges. |
| `--color-brand-sage` | `#D3DEC6` | Zachte saliegroen. Speciale accenten, vinkjes, natuur/biologie. |

#### Aanvullende kleuren (direct gebruik)

| Hex | Beschrijving | Gebruik |
|-----|-------------|---------|
| `#3A302D` | Donker bruin | Donkere sectie-achtergrond (gradient endpoint) |
| `#E8D1C5` | Licht tan | Hero afbeelding gradient |
| `#f0ddd4` | Medium tan | Hero afbeelding gradient |
| `#fdfbf9` | Bijna-wit | Hero afbeelding gradient |
| `#f4ebe6` | Licht beige | Contact sectie gradient |
| `#D5C2B9` | Warm grijs | Tekst op donkere achtergrond |

#### Kleur-opaciteiten (veelgebruikt)

Gebruik Tailwind's `/opacity` notatie voor subtiele variaties:

```
var(--color-brand-secondary)/60  → Badges, labels
var(--color-brand-accent)/25     → Shadows op buttons
var(--color-brand-accent)/30     → Ring/border accenten (open FAQ)
var(--color-brand-accent)/15     → Subtiele card shadows
var(--color-brand-sage)/30       → Achtergrond-tint
var(--color-brand-muted)/5       → Heel subtiele shadows
```

### **2.2 Typografie**

#### Font Families

| Token | Waarde | Gebruik |
|-------|--------|--------|
| `--font-heading` | `"Outfit", sans-serif` | Headings (H1, H2, H3), buttons, logo |
| `--font-sans` / `--font-secondary` | `"Lato", sans-serif` | Body tekst, paragrafen, labels |

**Fonts laden als self-hosted WOFF2** met `font-display: swap` en `<link rel="preload">`. Geen Google Fonts CDN.

#### Font Weights

| Weight | Tailwind | Outfit (heading) | Lato (body) |
|--------|----------|-------------------|-------------|
| 400 | `font-normal` | — | ✓ Regular body |
| 500 | `font-medium` | ✓ Buttons, nav | — |
| 600 | `font-semibold` | ✓ H2, H3, badges | — |
| 700 | `font-bold` | ✓ H1, card-titels | ✓ Emphasis |

### **2.3 Spacing Schaal**

Gebruik Tailwind's standaard spacing. Onderstaande waarden zijn de vaste patronen:

#### Sectie-spacing (verticaal)

| Context | Mobiel | Tablet (md) | Desktop (lg) |
|---------|--------|-------------|--------------|
| Standaard sectie | `py-24` (96px) | `py-32` (128px) | `py-32` |
| Hero | `pt-12 pb-8` | `pt-24 pb-16` | — |
| Compacte sectie | `py-20` (80px) | `py-24` (96px) | `py-32` |

#### Horizontale padding (container)

Consistent over alle secties:
```
px-6 lg:px-8  →  24px mobiel, 32px desktop
```

#### Component-padding

| Context | Mobiel | Desktop |
|---------|--------|---------|
| Cards | `p-8` (32px) | `p-12` (48px) |
| FAQ items | `p-6` (24px) | `p-8` (32px) |
| Buttons | `px-8 py-4` | `px-10 py-5` |

### **2.4 Border Radius**

| Element | Waarde | Pixels |
|---------|--------|--------|
| Buttons | `rounded-full` | 9999px (pill) |
| Cards | `rounded-3xl` of `rounded-[2rem]`/`rounded-[3rem]` | 24px–48px |
| FAQ items | `rounded-2xl md:rounded-3xl` | 16px–24px |
| Afbeeldingen | `rounded-3xl` | 24px |
| Hero afbeelding | Asymmetrisch: `rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-3xl rounded-bl-3xl` | 96px diagonaal, 24px contra |
| Badges | `rounded-full` | 9999px (cirkel) |

**Regel:** Nooit 90-graden hoeken. Minimum is `rounded-2xl` (16px).

### **2.5 Shadows**

Gebruik warme, gekleurde shadows — nooit standaard grijze Tailwind shadows:

| Context | Klasse |
|---------|--------|
| Buttons (rust) | `shadow-lg shadow-[var(--color-brand-accent)]/25` |
| Buttons hover | `shadow-xl shadow-[var(--color-brand-accent)]/30` |
| Cards (subtiel) | `shadow-sm shadow-[var(--color-brand-muted)]/5` |
| Cards hover | `shadow-xl shadow-[var(--color-brand-secondary)]/50` |
| Hero afbeelding | `shadow-[0_20px_50px_-15px_rgba(200,102,77,0.4)]` |
| Decoratieve badge | `shadow-xl` |

### **2.6 Z-Index**

Minimale stacking — houd het simpel:

| Waarde | Gebruik |
|--------|--------|
| `z-10` | Embed containers, decoratieve elementen |
| `z-20` | Hero tekst boven achtergrond-elementen |

---

## **3. TYPOGRAFISCHE SCHAAL**

### **3.1 H1 (Hero — eenmalig per pagina)**

| Breakpoint | Size | Tailwind |
|-----------|------|----------|
| Mobiel | 36px | `text-4xl` |
| sm (640px) | 48px | `sm:text-5xl` |
| md (768px) | 60px | `md:text-6xl` |
| lg (1024px) | 80px | `lg:text-[5rem]` |
| xl (1280px) | 88px | `xl:text-[5.5rem]` |

**Eigenschappen:** `font-bold leading-none md:leading-[1.05] tracking-tight`

### **3.2 H2 (Sectie-titels)**

| Breakpoint | Size | Tailwind |
|-----------|------|----------|
| Mobiel | 30px | `text-3xl` |
| sm (640px) | 36px | `sm:text-4xl` |
| md (768px) | 48px | `md:text-5xl` |

**Eigenschappen:** `font-semibold leading-tight tracking-tight`

### **3.3 H3 (Subtitels, card-titels)**

| Breakpoint | Size | Tailwind |
|-----------|------|----------|
| Mobiel | 24px | `text-2xl` |
| md (768px) | 30px | `md:text-3xl` |

**Eigenschappen:** `font-semibold leading-tight`

### **3.4 Body tekst**

| Context | Size | Tailwind | Extra |
|---------|------|----------|-------|
| Standaard body | 18px | `text-lg` | `leading-relaxed` |
| Hero paragraaf | 18→24px | `text-lg sm:text-xl md:text-2xl` | `leading-relaxed` |
| Grotere paragraaf | 18→20px | `text-lg md:text-xl` | `leading-relaxed` |
| Op donkere achtergrond | 18px | `text-lg` | `font-light text-[#D5C2B9]` |

### **3.5 Kleine tekst & labels**

| Context | Size | Tailwind | Extra |
|---------|------|----------|-------|
| Sectie-badge/label | 12→14px | `text-xs md:text-sm` | `font-semibold tracking-widest uppercase` |
| Footer | 12→14px | `text-xs md:text-sm` | `text-[var(--color-brand-muted)]` |
| Nav desktop | 14px | `text-sm` | `font-medium` |
| Nav mobiel | 18px | `text-lg` | `font-medium` |

### **3.6 Letter-spacing**

| Element | Waarde | Tailwind |
|---------|--------|----------|
| H1 | -0.025em | `tracking-tight` |
| H2 | -0.01em | `tracking-tight` |
| Labels/badges | 0.1em | `tracking-widest` |
| Body | normaal | (default) |

---

## **4. RESPONSIVE DESIGN**

### **4.1 Breakpoints**

Standaard Tailwind, mobile-first:

| Prefix | Min-width | Gebruik |
|--------|-----------|--------|
| *(geen)* | 0px | Mobiel-standaard |
| `sm:` | 640px | Kleine tablets, landscape telefoons |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Grote desktop (alleen H1 schaling) |

**`2xl:` wordt niet gebruikt.**

### **4.2 Layout Containers**

| Max-width | Pixels | Gebruik |
|-----------|--------|--------|
| `max-w-7xl` | 1280px | Hoofd-secties (Hero, About, Methodology) |
| `max-w-4xl` | 896px | Intro-tekst, FAQ, Contact |
| `max-w-3xl` | 768px | Quote-boxen, smalle content |
| `max-w-2xl` | 672px | Subtitels, beperkte tekstblokken |

Altijd gecentreerd met `mx-auto`.

### **4.3 Grid Patronen**

| Patroon | Mobiel | Desktop | Gebruik |
|---------|--------|---------|--------|
| Twee kolommen | `grid-cols-1` | `md:grid-cols-2` of `lg:grid-cols-2` | Methodology, About |
| Flex omdraaien | `flex-col` | `lg:flex-row` | Hero, Philosophy |
| Kolom-volgorde | Standaard | `lg:order-1` / `lg:order-2` | About (tekst/beeld wisselen) |

**Gap schaling:** `gap-8` → `gap-12 lg:gap-20`

### **4.4 Afbeelding Responsive Patronen**

Gebruik Astro's `<Picture>` component met:
- `widths={[320, 480, 640, 960]}` — responsive srcset
- `sizes="(max-width: 640px) 220px, ..."` — viewport-specifiek
- `object-cover` met `object-position: center 20%` — gezicht altijd zichtbaar
- Hero: `fetchpriority="high" loading="eager"`
- Overige: default lazy loading

#### Aspect Ratios per breakpoint

| Context | Mobiel | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero | `aspect-[3/4]` | `aspect-square` | `aspect-[4/5]` |
| Philosophy | `aspect-[16/9]` | `aspect-[3/2]` | — |
| Portrait (cirkel) | `aspect-square` | — | — |

### **4.5 Accessibility**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## **5. UI COMPONENTEN**

### **5.1 Buttons**

#### Primary Button (CTA)
```
bg-[var(--color-brand-accent)] text-white font-heading font-medium
px-8 py-4 md:px-10 md:py-5 rounded-full
shadow-lg shadow-[var(--color-brand-accent)]/25
hover:bg-[var(--color-brand-accent-hover)] hover:shadow-xl hover:-translate-y-1
transition-all duration-300 ease-in-out
```

#### Secondary Button
```
bg-transparent border-2 border-[var(--color-brand-muted)]/25
font-heading font-medium px-8 py-4 md:px-10 md:py-5 rounded-full
hover:bg-[var(--color-brand-secondary)] hover:border-[var(--color-brand-secondary)]
transition-all duration-300 ease-in-out
```

#### Responsive button layout
```
flex flex-col sm:flex-row gap-4
w-full sm:w-auto  (stack op mobiel, inline op tablet+)
```

### **5.2 Cards**

#### Basis-structuur
```
rounded-[2rem] md:rounded-[3rem] p-8 md:p-12
transition-all duration-500 ease-in-out
```

#### Varianten

| Variant | Achtergrond | Extra |
|---------|-------------|-------|
| White | `bg-white` | `shadow-2xl shadow-[var(--color-brand-accent)]/15` |
| Base | `bg-[var(--color-brand-base)]` | `border border-[#7A6F6C]/15` |
| Base + hover | idem | `hover:-translate-y-2 hover:shadow-xl` + `border-t-2 border-t-[var(--color-brand-accent)]/20` |
| Glass | `from-white/90 to-white/70 backdrop-blur-xl` | `border border-white` |

### **5.3 Secties**

#### Standaard sectie-structuur
```html
<section class="py-24 md:py-32 px-6 lg:px-8 bg-[achtergrond]">
  <div class="max-w-7xl mx-auto">
    <!-- content -->
  </div>
</section>
```

#### Achtergrond-varianten

| Type | Klassen |
|------|---------|
| Licht (standaard) | `bg-[var(--color-brand-base)]` of `bg-white` |
| Secundair | `bg-[var(--color-brand-secondary)]` |
| Donker | `bg-gradient-to-br from-[var(--color-brand-primary-text)] to-[#3A302D] text-white` |
| Contact gradient | `bg-gradient-to-b from-[var(--color-brand-base)] via-[#f4ebe6] to-[var(--color-brand-secondary)]` |

#### Decoratief element op donkere secties
```
absolute top-0 right-0 w-[400px] xl:w-[600px] h-[400px] xl:h-[600px]
bg-[var(--color-brand-accent)] rounded-full mix-blend-screen
filter blur-[150px] opacity-20 pointer-events-none
```

### **5.4 Badges & Labels**

#### Sectie-label (boven heading)
```
inline-block px-4 py-2 rounded-full
bg-[var(--color-brand-secondary)]/60 backdrop-blur-md
border border-[var(--color-brand-secondary)]
text-xs md:text-sm font-semibold tracking-widest uppercase
text-[var(--color-brand-accent)] shadow-sm
```

#### Decoratieve ronde badge (bijv. "12-16 weken")
```
absolute -top-6 -right-2 md:-right-6 w-20 h-20 md:w-24 md:h-24
bg-[var(--color-brand-sage)] rounded-full
flex items-center justify-center text-center
transform rotate-12 shadow-xl z-10
font-bold text-sm md:text-base leading-tight
```

### **5.5 FAQ / Accordion**

#### Gesloten state
```
bg-[var(--color-brand-base)] rounded-2xl md:rounded-3xl
shadow-sm shadow-[var(--color-brand-muted)]/5
```

#### Open state
```
open:bg-white open:ring-1 open:ring-[var(--color-brand-accent)]/30
transition-colors duration-300
```

#### Animatie
```css
.faq-content {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 400ms ease-out, opacity 400ms ease-out;
}
details[open] .faq-content {
  grid-template-rows: 1fr;
  opacity: 1;
}
```

#### Chevron rotatie
```
transition-transform duration-500 ease-in-out
group-open:rotate-180
```

### **5.6 Afbeelding-behandeling**

#### Hero afbeelding
- Asymmetrische border-radius: `rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-3xl rounded-bl-3xl`
- Warme shadow: `shadow-[0_20px_50px_-15px_rgba(200,102,77,0.4)]`
- Lichte rotatie: `rotate-[-2deg] hover:rotate-0 transition-transform duration-700`
- Object fit: `object-cover` met `object-position: center 20%`

#### Circulair portret
- Formaat: `w-48 h-48 rounded-full`
- Border: `border-4 border-[var(--color-brand-accent)]/80`
- Object fit: `object-cover` met `object-position: center 22%`

#### Afbeelding met hover-effect
- Formaat: `max-w-sm aspect-[4/3] rounded-3xl overflow-hidden`
- Shadow: `shadow-2xl`
- Hover: `group-hover:scale-105 transition-transform duration-700`

### **5.7 Dividers & Separators**

#### Gradient lijn
```
h-px bg-gradient-to-r from-transparent via-[var(--color-brand-accent)]/30 to-transparent
```

#### Left border accent (quotes)
```
border-l-[5px] border-[var(--color-brand-accent)] pl-6
```

#### Subtiele card-border (top-accent)
```
border-t-2 border-t-[var(--color-brand-accent)]/20
```

#### Visuele scheiding via ruimte
Secties scheiden zich primair via achtergrondkleur-wisselingen en verticale padding (`py-24 md:py-32`), niet via harde lijnen.

### **5.8 Iconen**

Inline SVG met Heroicons-stijl (24x24 viewBox, stroke-based):

| Icoon | Formaat | Kleur | Gebruik |
|-------|---------|-------|--------|
| Chevron (FAQ) | 24×24 | `currentColor` | Accordion toggle |
| Checkmark | `h-2.5 w-2.5 md:h-3 md:w-3` | `var(--color-brand-accent)` | Lijsten, features |
| Quote | Groot (decoratief) | `var(--color-brand-accent)/30` | Testimonials |
| Hamburger | 3 lijnen, `w-8 h-8` | `var(--color-brand-primary-text)` | Mobiel menu |

**Regel:** Geen icon-library of font-icons. Altijd inline SVG voor performance en flexibiliteit.

### **5.9 Testimonial / Social Proof**

#### Avatar (zonder foto)
```
w-20 h-20 rounded-full flex items-center justify-center
bg-[afwisselend: sage, secondary, accent]
font-bold text-sm text-[var(--color-brand-primary-text)]
```
Toon initialen (bijv. "JV", "BK") in cirkel. Wissel achtergrondkleur af voor visuele variatie.

### **5.10 Navigatie**

#### Desktop nav
- Logo: `font-heading font-semibold text-lg`
- Links: `text-sm font-medium text-[var(--color-brand-muted)]`
- Achtergrond: Transparant → `bg-white/90 backdrop-blur-md` bij scroll

#### Mobiel nav
- Hamburger menu met slide-out panel
- Links: `text-lg font-medium text-[var(--color-brand-primary-text)]`
- CTA button in mobiel menu

---

## **6. INTERACTIE & BEWEGING**

* **Transitiesnelheid:** Standaard `300ms ease-in-out` voor hover-effecten. Langzamer (500–700ms) voor grotere transformaties (schaal, rotatie).
* **Interacties:** Geen agressieve pop-ups, geen snelle schuifanimaties. Alleen subtiele effecten:
  - Buttons: `-translate-y-1` lift bij hover
  - Cards: `-translate-y-2` lift bij hover
  - Afbeeldingen: `scale-105` bij hover (700ms)
  - FAQ: CSS Grid height-tween (400ms)
* **Fade-in secties:** Secties verschijnen met een zachte fade-in bij scrollen (JavaScript IntersectionObserver).
* **Reduced motion:** Alle animaties uitgeschakeld via `prefers-reduced-motion: reduce`.

| Duur | Tailwind | Gebruik |
|------|----------|--------|
| 300ms | `duration-300` | Hover-kleuren, buttons, badges |
| 400ms | `duration-400` | FAQ open/close |
| 500ms | `duration-500` | Card hover-lift, chevron rotatie |
| 700ms | `duration-700` | Afbeelding scale, rotatie-reset |

---

## **7. PATRONEN VOOR NIEUWE PAGINA'S**

Deze patronen zijn nog niet geïmplementeerd maar volgen logisch uit het bestaande design systeem. Gebruik ze als richtlijn voor nieuwe pagina's (bijv. hoofdwebsite rebuild).

### **7.1 Navigatie (multi-page)**

Breid de bestaande nav uit met:
- Meerdere pagina-links (dezelfde stijl als huidige nav)
- Active state: `text-[var(--color-brand-accent)]` of `border-b-2 border-[var(--color-brand-accent)]`
- Dropdown (indien nodig): `rounded-2xl bg-white shadow-xl p-4` met zachte animatie

### **7.2 Footer (multi-page)**

- Achtergrond: `bg-[var(--color-brand-primary-text)]` of donkere gradient
- Tekst: `text-[#D5C2B9]` voor body, `text-white` voor headings
- Links: `hover:text-[var(--color-brand-accent)]`
- Kolom-layout: `grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8`
- Logo bovenaan, social links onderaan
- Scheiding via gradient lijn

### **7.3 Formulieren**

- Input fields: `rounded-xl border border-[var(--color-brand-secondary)] px-4 py-3 bg-white`
- Focus state: `ring-2 ring-[var(--color-brand-accent)] outline-none`
- Labels: `text-sm font-semibold text-[var(--color-brand-primary-text)] mb-2`
- Validatie-fout: `text-[var(--color-brand-accent)] text-sm` (terracotta, niet rood)
- Submit button: Primary Button stijl

### **7.4 Blog / Content pagina's**

- Content container: `max-w-3xl mx-auto px-6 lg:px-8`
- Prose styling: `text-lg leading-relaxed text-[var(--color-brand-primary-text)]`
- Headings in content: Zelfde schaal als sectie-headings, maar kleiner (`text-2xl md:text-3xl` voor H2)
- Blockquotes: Left border accent patroon (`border-l-[5px] border-accent pl-6`)
- Afbeeldingen in content: `rounded-3xl shadow-lg` met optionele caption

### **7.5 Diensten-overzicht**

- Card-grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Per dienst: Card variant "Base + hover" met accent top-border
- Icoon/illustratie bovenaan elke card
- Prijs/CTA onderaan met Primary Button

---

## **8. DO'S & DON'TS SAMENVATTING**

### DO's ✓
- Warme, aardse kleuren (terracotta, taupe, crème, saliegroen)
- Royale whitespace en ademruimte
- Afgeronde hoeken overal (minimum `rounded-2xl`)
- Warme, gekleurde shadows (nooit standaard grijs)
- Self-hosted fonts met preload
- Mobile-first responsive design
- `prefers-reduced-motion` respecteren
- Inline SVG iconen

### DON'TS ✗
- Blauw (klinisch/ziekenhuis)
- Hard rood (agressief)
- Hard zwart #000 (te scherp)
- Spierwit #FFFFFF als hoofdachtergrond
- 90-graden hoeken op UI-elementen
- Grijze box-shadows
- Icon fonts of sprite sheets
- Agressieve pop-ups of snelle animaties
- Google Fonts CDN (altijd self-hosted)
- `2xl:` breakpoint (niet nodig)
