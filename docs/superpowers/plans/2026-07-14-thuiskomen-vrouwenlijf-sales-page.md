# Sales page "Thuiskomen in je Vrouwenlijf" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the long-form sales page for the group program "Thuiskomen in je Vrouwenlijf" at `/thuiskomen-in-je-vrouwenlijf/`, plus its `/bedankt/` page, following the approved copy verbatim and the approved design spec.

**Architecture:** One Astro page file containing all 20 copy blocks as sections (matching the `je-pijn-is-echt` long-form pattern), reusing `Button.astro` / `Card.astro` / `Footer.astro`, plus one new small component (`StickyBar.astro`). No test framework exists in this repo (static Astro/Tailwind site) — "tests" here mean `npm run build` succeeding (catches Astro/TS syntax errors, broken imports, invalid JSX-like markup) and a visual check via a local dev server + Playwright screenshot for every task that changes rendered output.

**Tech Stack:** Astro 5, Tailwind 4 (via `@tailwindcss/vite`), vanilla JS `<script>` blocks (no framework runtime), GTM `dataLayer` for tracking.

## Global Constraints

- Copy is verbatim from `docs/salespagina-cohort1-crystal-v2.md` (blocks 1–20, lines 42–645). Do not shorten, reword, or paraphrase any client-approved sentence. Where a task says "insert verbatim," open that file at the cited line range and copy the Dutch text exactly, including punctuation and line breaks between paragraphs.
- Do not render the file's own build-notes, leeswijzer, or "Notitie voor de build" asides (e.g. lines 3–39, 382, 438–444, 510) as page content — those are instructions for the builder, not copy for visitors.
- Follow existing brand tokens only: colors via `var(--color-brand-*)` from `src/styles/global.css`, `font-heading` (Outfit) for headings, `font-sans`/`font-secondary` (Lato) for body text. No new colors.
- No stock photography, pop-ups, exit-intent, or countdown timers (explicit requirement from the copy's own build notes, line 664).
- Self-hosted fonts only, no external font CDN calls at runtime (existing project rule, confirmed in `docs/Brand_Style_Guide_Crystal_v2_0.md` line 75).
- `trailingSlash: 'always'` is configured project-wide (`astro.config.mjs`) — all internal links must end in `/`.
- Every `dataLayer.push` that precedes a cross-origin navigation must use the `eventCallback`/`eventTimeout` guard pattern, per the project's `tracking-patterns.md` memory: navigation only happens inside `eventCallback`, with a `setTimeout` fallback in case GTM never loads.

---

## Task 1: Self-hosted signature font (Caveat)

**Files:**
- Create: `public/fonts/caveat-signature.woff2`
- Modify: `src/styles/global.css` (add `@font-face` block + `--font-signature` theme token)

**Interfaces:**
- Produces: CSS custom property `--font-signature` (value `"Caveat", cursive`), usable as `font-family: var(--font-signature)` or Tailwind arbitrary value `font-[var(--font-signature)]`. Used later in Task 14 for the blok 19 signature.

- [ ] **Step 1: Download the subsetted Caveat woff2**

This project self-hosts every font (no Google Fonts CDN at runtime — see Global Constraints). The signature is used for exactly one static word ("Crystal"), so fetch a subsetted file containing only the glyphs needed, keeping the payload minimal (verified below to be ~4.4KB).

Run:
```bash
curl -sL -o public/fonts/caveat-signature.woff2 "https://fonts.gstatic.com/l/font?kit=WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SIe7Y1cv_njUxo8&skey=7833cd5b856b60c9&v=v23"
file public/fonts/caveat-signature.woff2
```
Expected output: `public/fonts/caveat-signature.woff2: Web Open Font Format (Version 2), TrueType, length 4400, version 1.0`

- [ ] **Step 2: Add the font-face and theme token**

Open `src/styles/global.css`. After the existing `Lato – Body` `@font-face` blocks (after the block ending around the `font-weight: 700;` Lato face) and before `@import "tailwindcss";`, insert:

```css
/* Caveat – Signature (blok 19 close, single word "Crystal" only) */
@font-face {
  font-family: 'Caveat';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/caveat-signature.woff2') format('woff2');
  unicode-range: U+43, U+61, U+6C, U+72-74, U+79;
}
```

Then inside the existing `@theme { ... }` block, add one line next to the other `--font-*` tokens:

```css
  --font-signature: "Caveat", cursive;
```

- [ ] **Step 3: Verify the build picks up the new file**

Run: `npm run build`
Expected: build completes with no errors (exit code 0). This only validates CSS/Astro syntax — the font isn't referenced by any markup yet, so there's nothing to visually check.

- [ ] **Step 4: Commit**

```bash
git add public/fonts/caveat-signature.woff2 src/styles/global.css
git commit -m "feat: self-host Caveat signature font for sales page close"
```

---

## Task 2: Page scaffold, consts, and Hero (blok 1)

**Files:**
- Create: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Produces: page-level consts `CHECKOUT_URL_INEENS`, `CHECKOUT_URL_TERMIJNEN`, `WACHTLIJST_URL`, `inschrijvingOpen`, `ctaHref`, `ctaLabel` — every later task's CTA links/buttons read `ctaHref`/`ctaLabel` instead of hardcoding `#investering`.
- Produces: section `id="hero"` (required by Task 15's `StickyBar` visibility observer, which watches `#hero` exactly like the existing `Nav.astro` pattern).

- [ ] **Step 1: Create the page frontmatter and Hero section**

Create `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`:

```astro
---
import Layout from "../../layouts/Layout.astro";
import Button from "../../components/Button.astro";
import Footer from "../../components/Footer.astro";
import StickyBar from "../../components/thuiskomen/StickyBar.astro";
import { Picture } from "astro:assets";
import portretCrystal from "../../assets/images/Portret Crystal 1.jpg";

// Checkout-links (blok 15). CHECKOUT_URL_INEENS is nog de PlugAndPay-link uit de copy;
// vervang door de Stripe-ineens-link zodra die er is — dit is de enige plek die dan moet wijzigen.
const CHECKOUT_URL_INEENS = "https://crystalhelder.plugandpay.com/checkout/thuiskomen-in-je-lijf";
const CHECKOUT_URL_TERMIJNEN = "https://buy.stripe.com/cNi14nfuagXHgS28K400000";

// Wachtlijst-schakelaar (blok 16 build-notitie). Op false: alle primary CTA's
// linken naar de wachtlijst in plaats van naar blok 15, en tonen wachtlijst-tekst.
const inschrijvingOpen = true;
const WACHTLIJST_URL = "/wachtlijst/";

const ctaHref = inschrijvingOpen ? "#investering" : WACHTLIJST_URL;
const ctaLabel = inschrijvingOpen ? "Ik wil erbij zijn" : "Zet mij op de wachtlijst";
---

<Layout
	title="Thuiskomen in je Vrouwenlijf — 12 weken begeleiding | Crystal Helder"
	description="In 12 weken begrijp je eindelijk wat geen enkele arts je kon vertellen: waarom je lichaam dit doet. Een begeleid programma voor vrouwen met onbegrepen bekken-, baarmoeder- of cyclusklachten."
	includeCal={false}
>
	{/* DECORATIVE BACKGROUND BLOBS */}
	<div
		class="hidden md:block fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none"
		aria-hidden="true"
	>
		<div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--color-brand-secondary)] rounded-full mix-blend-multiply filter blur-[120px] opacity-50"></div>
		<div class="absolute top-[35%] left-[-10%] w-[520px] h-[520px] bg-[var(--color-brand-accent-light)] rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
	</div>

	<StickyBar ctaHref={ctaHref} ctaLabel={ctaLabel} />

	{/* BLOK 1: HERO */}
	<section id="hero" class="relative pt-12 pb-8 md:pt-24 md:pb-16 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-3 md:gap-12 lg:gap-0">
		<div class="w-full lg:w-[55%] relative z-20 text-center lg:text-left mt-2 md:mt-8 lg:mt-0 xl:-mr-24 bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-5 md:p-6 lg:p-0 rounded-3xl lg:rounded-none">
			<div class="inline-block px-4 py-2 rounded-full bg-[var(--color-brand-secondary)]/60 backdrop-blur-md border border-[var(--color-brand-secondary)] mb-3 md:mb-6 text-xs md:text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-accent-hover)] shadow-sm">
				Voor vrouwen met onbegrepen bekken-, baarmoeder- of cyclusklachten
			</div>
			<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4rem] font-bold mb-4 md:mb-6 text-[var(--color-brand-primary-text)] leading-tight md:leading-[1.08] tracking-tight drop-shadow-sm">
				In 12 weken begrijp je eindelijk wat geen enkele arts je kon vertellen: waarom je lichaam dit doet.
			</h1>
			<p class="text-lg sm:text-xl md:text-2xl text-[var(--color-brand-muted)] mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
				Een begeleid programma van twaalf weken waarin je de taal van je klacht leert verstaan. In een kleine groep van acht vrouwen bij wie je niets hoeft uit te leggen.
			</p>
			<ul class="text-left max-w-xl mx-auto lg:mx-0 space-y-3 mb-8 md:mb-10">
				<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)]">
					<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-0.5">→</span>
					Je snapt eindelijk waaróm je lijf dit doet. In gewone taal, zonder dat je je intelligentie beledigd voelt.
				</li>
				<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)]">
					<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-0.5">→</span>
					Je klachten worden draagbaar, of ze verdwijnen.
				</li>
				<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)]">
					<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-0.5">→</span>
					Je lichaam verandert van iets dat je vreest in iets dat je omarmt.
				</li>
				<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)]">
					<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-0.5">→</span>
					Je doet het niet meer alleen. Acht vrouwen, en ik erbij.
				</li>
				<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)]">
					<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-0.5">→</span>
					En als het na veertien dagen toch niet klopt, krijg je je geld terug. Zonder gedoe.
				</li>
			</ul>
			<div class="flex justify-center lg:justify-start">
				<Button href={ctaHref} data-cta-location="hero" className="text-base md:text-lg px-8 py-4 md:px-10 md:py-5">
					{ctaLabel} →
				</Button>
			</div>
			<p class="text-xs text-[var(--color-brand-muted)] mt-3 max-w-md mx-auto lg:mx-0">
				8 plekken. Start maandag 21 september.
			</p>
		</div>
		<div class="w-full lg:w-[50%] relative z-10">
			<div class="relative w-full max-w-[220px] sm:max-w-xs md:max-w-md mx-auto aspect-[3/4] sm:aspect-square md:aspect-square lg:aspect-[4/5]">
				<div class="absolute inset-0 bg-gradient-to-tr from-[#E8D1C5] via-[#f0ddd4] to-[#fdfbf9] rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-3xl rounded-bl-3xl shadow-2xl shadow-[var(--color-brand-accent)]/25 transform rotate-[-2deg] transition-transform duration-700 hover:rotate-0"></div>
				<Picture
					src={portretCrystal}
					alt="Crystal Helder"
					widths={[320, 480, 640, 960]}
					sizes="(max-width: 640px) 220px, (max-width: 768px) 320px, (max-width: 1024px) 448px, 640px"
					class="absolute inset-0 w-full h-full object-cover rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-3xl rounded-bl-3xl shadow-[0_20px_50px_-15px_rgba(200,102,77,0.4)]"
					style="object-position: center 20%;"
					fetchpriority="high"
					loading="eager"
				/>
			</div>
		</div>
	</section>

	<Footer />
</Layout>
```

Note: `StickyBar.astro` is imported here but doesn't exist until Task 15. Comment out the `import StickyBar` line and the `<StickyBar ... />` usage for now (or leave them and accept a build failure) — **comment them out** so this task's build check passes independently:

```astro
// import StickyBar from "../../components/thuiskomen/StickyBar.astro";
```
```astro
{/* <StickyBar ctaHref={ctaHref} ctaLabel={ctaLabel} /> */}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Visual check**

Run: `npm run dev` (leave running), then use the Playwright MCP tools to navigate to `http://localhost:4321/thuiskomen-in-je-vrouwenlijf/` and take a screenshot at both a mobile viewport (390×844) and a desktop viewport (1440×900). Confirm: headline, 5 bullets, CTA button, and Crystal's photo all render, no layout overflow.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: scaffold sales page with hero (blok 1)"
```

---

## Task 3: Authority-strip (blok 2) + De Scène (blok 3)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro` (insert after the Hero `</section>`, before `<Footer />`)

**Interfaces:**
- Consumes: nothing new from earlier tasks besides page structure.
- Produces: drop-cap CSS class `.dropcap` (scoped `<style>` at the bottom of the page, added in this task, reused again in Task 14 for blok 19).

- [ ] **Step 1: Insert blok 2 (authority-strip)**

Copy is short — insert verbatim from `docs/salespagina-cohort1-crystal-v2.md` lines 68–76 (skip line 66 "Cijfers zijn bewust weggelaten..." — that's a build note, and skip line 76 "*Bron: ...*" is real footer copy, keep it):

```astro
	{/* BLOK 2: AUTHORITY-STRIP */}
	<section class="py-16 md:py-24 px-6 lg:px-8 fade-in-section">
		<div class="max-w-3xl mx-auto text-center">
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-4">
				Ik ben Crystal.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-4">
				Ik werk al meer dan tien jaar dagelijks met de Germaanse Geneeskunde en ik heb honderden conflictanalyses gedaan. Daarnaast breng ik twintig jaar ervaring mee in emotieregulatie, pedagogie en lichaamswerk.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-4">
				Dat is bewust die combinatie. Want een verklaring alleen brengt je nergens. Ik kan achterhalen wat er speelt, en ik kan je er ook doorheen begeleiden.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Ik ben niet de goeroe die zegt hoe het moet. Ik ben degene die naast je zit, luistert, en samen met jou uitzoekt wat je lichaam probeert te vertellen.
			</p>
			<p class="text-sm text-[var(--color-brand-muted)]/70 italic">
				Bron: deze cijfers staan letterlijk op Crystals eigen live pagina's. Geen schatting.
			</p>
		</div>
	</section>
```

- [ ] **Step 2: Insert blok 3 (De Scène) with drop-cap**

Insert verbatim from lines 84–104. Apply `.dropcap` to the first `<p>` only ("Het is 4:12 's nachts."):

```astro
	{/* BLOK 3: DE SCÈNE */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-white fade-in-section">
		<div class="max-w-2xl mx-auto">
			<p class="dropcap text-lg md:text-xl text-[var(--color-brand-primary-text)] leading-relaxed mb-6">
				Het is 4:12 's nachts.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Je weet het zo precies omdat je al drie keer op je telefoon hebt gekeken. De kruik in je rug is lauw geworden. Je ligt op je zij, knieën opgetrokken, en je durft je bijna niet te bewegen.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Niet omdat het nú zo erg is. Maar omdat je weet wat eraan komt.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				En dus lig je stil. Je spant je buik aan. Je ademt hoog en oppervlakkig, want diep ademhalen voelt riskant. Je hele lijf staat in de startblokken voor iets wat nog moet gebeuren.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Dat aanspannen. Dat wachten. Die stille onderhandeling met je eigen lichaam om alsjeblieft, alsjeblieft niet weer.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Daar bestaat een woord voor, en dat heeft nog nooit iemand tegen je gezegd.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Je vecht twee gevechten.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Het eerste is de pijn zelf. Die is echt, die is lichamelijk, en die verzin je niet.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Het tweede is alles wat je doet om de pijn voor te blijven. Het schrap zetten. De paniek als het opkomt. De woede. Het onderhandelen. De uitputting van altijd maar op je hoede zijn.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Je bent al jaren bezig met dat eerste gevecht. Er is nog nooit iemand geweest die je hielp met het tweede.
			</p>
			<p class="text-xl md:text-2xl font-semibold text-[var(--color-brand-primary-text)] leading-relaxed">
				En dat is precies waar dit begint.
			</p>
		</div>
	</section>
```

- [ ] **Step 3: Add the drop-cap style**

At the bottom of the file, if a `<style>` block doesn't exist yet, add one (after `</Layout>`):

```astro
<style>
	.dropcap::first-letter {
		font-family: var(--font-heading);
		font-size: 3.5rem;
		line-height: 0.85;
		font-weight: 700;
		float: left;
		padding-right: 0.5rem;
		padding-top: 0.25rem;
		color: var(--color-brand-accent);
	}
</style>
```

- [ ] **Step 4: Verify build and visual check**

Run: `npm run build` — expect no errors.
Then `npm run dev`, screenshot `/thuiskomen-in-je-vrouwenlijf/` at desktop width, scroll to blok 3, confirm the drop-cap renders on "Het" and no other paragraph has one.

- [ ] **Step 5: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add authority-strip and scene blocks (blok 2-3)"
```

---

## Task 4: Herkenning (blok 4) + Het verhaal van Crystal (blok 5)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Consumes: `.dropcap` class from Task 3.

- [ ] **Step 1: Insert blok 4 verbatim** (lines 112–122), same `max-w-2xl mx-auto` scene pattern as Task 3 Step 2, **no** drop-cap (design decision: drop-cap only on blok 3 and blok 19). Close with the two "ontschuldiging" paragraphs (lines 120–122) styled `font-semibold` like blok 3's closing line.

- [ ] **Step 2: Insert blok 5 verbatim** (lines 130–178), with drop-cap on the first paragraph ("Mijn broertje overleed toen hij vijf maanden oud was. Hij had een hartafwijking.") using the same `.dropcap` class. Render the two sub-headings ("Waarom ik dit doe" is implicit — the explicit sub-heading in the source is `### Waarom ik dit doe` at line 130 and `**Waarom ik dit met vrouwen doe, en met deze klachten**` at line 160) as:
  - `### Waarom ik dit doe` → `<h3 class="text-2xl md:text-3xl font-semibold mt-2 mb-6 text-center text-[var(--color-brand-primary-text)]">Waarom ik dit doe</h3>` placed above the first paragraph, inside the section but before the dropcap paragraph.
  - The bold sub-heading at line 160 → `<h3 class="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-center text-[var(--color-brand-primary-text)]">Waarom ik dit met vrouwen doe, en met deze klachten</h3>` inserted between the two halves of the block, matching where it sits in the source.

  Use the section wrapper:
  ```astro
	{/* BLOK 5: HET VERHAAL VAN CRYSTAL */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-white fade-in-section">
		<div class="max-w-2xl mx-auto">
			<!-- h3 "Waarom ik dit doe" + paragraphs lines 132-158, dropcap on first -->
			<!-- h3 "Waarom ik dit met vrouwen doe, en met deze klachten" + paragraphs lines 162-178 -->
		</div>
	</section>
  ```
  Every paragraph uses `class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6"` except the final two short paragraphs (lines 174–178, "Ik kan je klacht niet wegnemen...", "Wat ik wel kan...", "En dat is precies wat...") which use the `font-semibold text-[var(--color-brand-primary-text)]` treatment for the last line only (line 178), matching blok 3's closing-line pattern.

- [ ] **Step 3: Verify build and visual check**

Run: `npm run build` — expect no errors.
`npm run dev`, screenshot blok 4 and blok 5 at desktop width. Confirm both sub-headings render, drop-cap appears only on "Mijn" (first letter of blok 5), and paragraph order matches the source document.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add herkenning and Crystal's story blocks (blok 4-5)"
```

---

## Task 5: De gefaalde wegen (blok 6) + De openbaring (blok 7)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

- [ ] **Step 1: Insert blok 6 verbatim** (lines 186–202), same `max-w-2xl mx-auto` prose pattern, `bg-[var(--color-brand-base)]` background (alternate section background for visual rhythm, matching how `je-pijn-is-echt` alternates `bg-white`/base between sections).

- [ ] **Step 2: Insert blok 7 verbatim** (lines 210–238) with the pull-quote (line 226) rendered as a large `<blockquote>`:

```astro
	{/* BLOK 7: DE OPENBARING */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-white fade-in-section">
		<div class="max-w-2xl mx-auto">
			<!-- paragraphs lines 210-224, class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6" -->
			<blockquote class="text-2xl md:text-3xl font-semibold text-center text-[var(--color-brand-primary-text)] leading-snug my-12 py-8 border-y border-[var(--color-brand-secondary)]">
				Je lijf maakt geen fouten. Het maakt keuzes die jij nooit bewust hebt genomen.
			</blockquote>
			<!-- paragraphs lines 228-238 -->
		</div>
	</section>
```
The final two lines (234–238, "Dit maakt jou niet de oorzaak...") get the `font-semibold text-[var(--color-brand-primary-text)]` closing treatment.

- [ ] **Step 3: Verify build and visual check**

`npm run build` — expect no errors. `npm run dev`, screenshot blok 7, confirm the pull-quote stands out visually from body text.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add gefaalde wegen and openbaring blocks (blok 6-7)"
```

---

## Task 6: Wat wel en niet verandert (blok 8) + Mid-page CTA (blok 9)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Consumes: `ctaLabel`/`ctaHref` is NOT used here — blok 9 is a soft CTA that always scrolls to blok 10 (`#programma`), independent of `inschrijvingOpen` (see spec: blok 9 has no price/scarcity, just "show me the program").

- [ ] **Step 1: Insert blok 8 verbatim** (lines 246–264), `max-w-2xl mx-auto` prose pattern, `bg-[var(--color-brand-base)]`.

- [ ] **Step 2: Insert blok 9 (mid-page CTA)** (lines 272–274):

```astro
	{/* BLOK 9: MID-PAGE CTA */}
	<section class="py-12 md:py-16 px-6 lg:px-8 bg-white text-center fade-in-section">
		<p class="text-xl md:text-2xl font-medium text-[var(--color-brand-primary-text)] mb-6">
			Herken je dit, en wil je weten hoe ik hiermee werk?
		</p>
		<Button href="#programma" variant="secondary" className="text-base md:text-lg px-8 py-4">
			Laat me het programma zien
		</Button>
	</section>
```

- [ ] **Step 3: Verify build and visual check**

`npm run build` — expect no errors. Screenshot blok 8-9.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add transformation and mid-page CTA blocks (blok 8-9)"
```

---

## Task 7: Het programma (blok 10)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Produces: section `id="programma"` (target of blok 9's CTA from Task 6).

- [ ] **Step 1: Insert blok 10**

This is the formal reveal — use a card-grid treatment for the three pillars (matching `Card.astro` usage in `WatJeKrijgt.astro`), with the title lockup, "Waar ik mee werk" intro prose, three pillar cards, then the live-dag and energy paragraphs as prose below.

Insert verbatim text from lines 282–334. Structure:

```astro
	{/* BLOK 10: HET PROGRAMMA */}
	<section id="programma" class="py-20 md:py-32 px-6 lg:px-8 bg-white relative fade-in-section">
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12 md:mb-16">
				<h2 class="text-3xl md:text-5xl font-bold mb-3 tracking-tight">Thuiskomen in je Vrouwenlijf</h2>
				<p class="text-xl md:text-2xl text-[var(--color-brand-muted)] font-medium mb-4">In twaalf weken begrijpen waarom je lichaam dit doet.</p>
				<p class="text-base md:text-lg text-[var(--color-brand-muted)]">Twaalf weken, drie pijlers, acht vrouwen.</p>
			</div>

			<div class="max-w-2xl mx-auto mb-16">
				<h3 class="text-xl md:text-2xl font-semibold mb-4">Waar ik mee werk, en hoe het heet</h3>
				<!-- paragraphs lines 290-296, class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4" -->
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
				<Card bgVariant="base" className="border-t-2 border-t-[var(--color-brand-accent)]/30">
					<p class="text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-accent)] mb-3">Pijler 1</p>
					<h3 class="text-xl md:text-2xl font-semibold mb-4">Het lichaamsbegrip</h3>
					<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">Je leert de biologische logica onder jouw specifieke klacht. Twaalf video-modules die je kijkt wanneer het jou uitkomt, met een werkboek dat je stap voor stap naar je eigen verhaal brengt.</p>
					<p class="text-sm font-semibold text-[var(--color-brand-primary-text)] italic">Wat het je oplevert: het einde van de onzekerheid. Je snapt eindelijk waarom.</p>
				</Card>
				<Card bgVariant="base" className="border-t-2 border-t-[var(--color-brand-accent)]/30">
					<p class="text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-accent)] mb-3">Pijler 2</p>
					<h3 class="text-xl md:text-2xl font-semibold mb-4">De lichaamstaal</h3>
					<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">Dit is waar het kantelt. Begrijpen met je hoofd is één ding, maar het moet landen in je lijf, anders verandert er niets. Ik werk met voice dialogue, met opstellingen en met lichaamsgerichte oefeningen. Laagje voor laagje, in jouw tempo. Ik breek je niet open. Nee mag altijd, en "ik doe even niet mee" is een compleet antwoord.</p>
					<p class="text-sm font-semibold text-[var(--color-brand-primary-text)] italic">Wat het je oplevert: de brug van weten naar voelen.</p>
				</Card>
				<Card bgVariant="base" className="border-t-2 border-t-[var(--color-brand-accent)]/30">
					<p class="text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-accent)] mb-3">Pijler 3</p>
					<h3 class="text-xl md:text-2xl font-semibold mb-4">De bedding</h3>
					<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">Zes live sessies waarin we samen kijken naar wat er bij jou speelt, een besloten groep waar je terechtkunt als het schuurt, en een buddy die weet waar je aan werkt.</p>
					<p class="text-sm font-semibold text-[var(--color-brand-primary-text)] italic">Wat het je oplevert: je doet het niet alleen.</p>
				</Card>
			</div>

			<div class="max-w-2xl mx-auto mb-12">
				<h3 class="text-xl md:text-2xl font-semibold mb-4">En we komen een dag samen. Echt samen, in dezelfde ruimte.</h3>
				<!-- paragraphs lines 320-326 -->
			</div>

			<div class="max-w-2xl mx-auto">
				<h3 class="text-xl md:text-2xl font-semibold mb-4">En dan dit, want ik weet hoe moe je bent</h3>
				<!-- paragraphs lines 330-334 -->
			</div>
		</div>
	</section>
```

Fill in every `<!-- paragraphs ... -->` placeholder with real `<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">...</p>` tags, one per source paragraph, copied verbatim from the cited line range. The final line of the section (334, "Genezing begint niet met harder werken. Het begint met zakken.") gets `font-semibold text-[var(--color-brand-primary-text)]`.

- [ ] **Step 2: Verify build and visual check**

`npm run build` — expect no errors. Screenshot blok 10 at both viewports, confirm the three pillar cards sit in a row on desktop and stack on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add het programma block (blok 10)"
```

---

## Task 8: Wat je krijgt — waardetabel (blok 11)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

- [ ] **Step 1: Insert blok 11 as a single responsive table**

Use one real `<table>` (not duplicated markup for mobile/desktop) with a CSS media query that switches each row to a block-level card below `md`, using `data-label` attributes for the classic responsive-table technique. This keeps the four rows of content in one place (DRY) while still being readable on a narrow screen.

```astro
	{/* BLOK 11: WAT JE KRIJGT */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-[var(--color-brand-base)] fade-in-section">
		<div class="max-w-4xl mx-auto">
			<table class="value-table w-full border-separate border-spacing-y-3">
				<thead class="hidden md:table-header-group">
					<tr class="text-left text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-muted)]">
						<th class="pb-2 px-4">Wat je krijgt</th>
						<th class="pb-2 px-4">Wat het je oplevert</th>
						<th class="pb-2 px-4 text-right">Waarde</th>
					</tr>
				</thead>
				<tbody>
					<tr class="bg-white rounded-2xl shadow-sm">
						<td data-label="Wat je krijgt" class="p-4 md:p-5 font-semibold text-[var(--color-brand-primary-text)] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">Het lichaamsbegrip<br /><span class="font-normal text-sm text-[var(--color-brand-muted)]">12 video-modules, intake en werkboek</span></td>
						<td data-label="Wat het je oplevert" class="p-4 md:p-5 text-[var(--color-brand-muted)]">Je snapt eindelijk waarom je lijf dit doet</td>
						<td data-label="Waarde" class="p-4 md:p-5 md:text-right font-semibold rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">€ 997</td>
					</tr>
					<tr class="bg-white rounded-2xl shadow-sm">
						<td data-label="Wat je krijgt" class="p-4 md:p-5 font-semibold text-[var(--color-brand-primary-text)] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">De lichaamstaal<br /><span class="font-normal text-sm text-[var(--color-brand-muted)]">Voice dialogue, opstellingen, lichaamsgerichte oefeningen</span></td>
						<td data-label="Wat het je oplevert" class="p-4 md:p-5 text-[var(--color-brand-muted)]">Van weten naar voelen. Hier kantelt het</td>
						<td data-label="Waarde" class="p-4 md:p-5 md:text-right font-semibold rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">€ 2.497</td>
					</tr>
					<tr class="bg-white rounded-2xl shadow-sm">
						<td data-label="Wat je krijgt" class="p-4 md:p-5 font-semibold text-[var(--color-brand-primary-text)] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">De bedding<br /><span class="font-normal text-sm text-[var(--color-brand-muted)]">6 live sessies, besloten groep, buddy</span></td>
						<td data-label="Wat het je oplevert" class="p-4 md:p-5 text-[var(--color-brand-muted)]">Je doet het niet meer alleen</td>
						<td data-label="Waarde" class="p-4 md:p-5 md:text-right font-semibold rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">€ 1.497</td>
					</tr>
					<tr class="bg-white rounded-2xl shadow-sm">
						<td data-label="Wat je krijgt" class="p-4 md:p-5 font-semibold text-[var(--color-brand-primary-text)] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">De zes extra's<br /><span class="font-normal text-sm text-[var(--color-brand-muted)]">Zie hieronder</span></td>
						<td data-label="Wat het je oplevert" class="p-4 md:p-5 text-[var(--color-brand-muted)]">Voor elk "ja, maar" dat je nu voelt</td>
						<td data-label="Waarde" class="p-4 md:p-5 md:text-right font-semibold rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">€ 2.182</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="3" class="pt-6 px-4 text-center">
							<p class="text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-muted)] mb-1">Totale waarde</p>
							<p class="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary-text)]">€ 7.173</p>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</section>
```

- [ ] **Step 2: Add the responsive table CSS**

In the page's bottom `<style>` block (created in Task 3), add:

```css
	@media (max-width: 767px) {
		.value-table thead {
			display: none;
		}
		.value-table tr {
			display: block;
			margin-bottom: 0;
		}
		.value-table td {
			display: block;
			text-align: left !important;
		}
		.value-table td[data-label]::before {
			content: attr(data-label);
			display: block;
			font-size: 0.7rem;
			font-weight: 600;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			color: var(--color-brand-accent);
			margin-bottom: 0.25rem;
		}
	}
```

- [ ] **Step 3: Verify build and visual check**

`npm run build` — expect no errors. Screenshot blok 11 at mobile (390px) — confirm it reads as stacked labeled cards, not a squeezed table. Screenshot at desktop — confirm it reads as a clean 3-column table.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add responsive value-stack table (blok 11)"
```

---

## Task 9: De zes extra's (blok 12)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

- [ ] **Step 1: Insert blok 12 as a 6-card grid**

Insert verbatim text from lines 356–380 (skip the build-notitie at line 382 — that's a note for the builder, not page copy). Each card: objection quote (italic) at top, then title/price line, then resolution paragraph.

```astro
	{/* BLOK 12: DE ZES EXTRA'S */}
	<section class="py-20 md:py-32 px-6 lg:px-8 bg-white fade-in-section">
		<div class="max-w-6xl mx-auto">
			<p class="text-center text-xl md:text-2xl font-medium text-[var(--color-brand-primary-text)] max-w-2xl mx-auto mb-12 md:mb-16">
				Ik heb zes dingen voor je gemaakt. Elk daarvan lost iets op waar ik je nu al over hoor twijfelen.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				<Card bgVariant="base" className="p-6 md:p-8">
					<p class="text-sm text-[var(--color-brand-muted)] italic leading-relaxed mb-4">"Straks voel ik iets nieuws en ga ik om drie uur 's nachts googelen."</p>
					<h3 class="text-lg font-semibold mb-1">1. De symptoomdecoder <span class="font-normal text-[var(--color-brand-muted)]">· € 197</span></h3>
					<p class="text-base text-[var(--color-brand-muted)] leading-relaxed">Een kaart en een checklist waarmee je zelf kunt kijken wat je lijf zegt. Zodat je niet in de zoekmachine belandt, maar bij jezelf.</p>
				</Card>
				<Card bgVariant="base" className="p-6 md:p-8">
					<p class="text-sm text-[var(--color-brand-muted)] italic leading-relaxed mb-4">"Mijn partner snapt er niets van."</p>
					<h3 class="text-lg font-semibold mb-1">2. De relatiekit <span class="font-normal text-[var(--color-brand-muted)]">· € 497</span></h3>
					<p class="text-base text-[var(--color-brand-muted)] leading-relaxed">Een video die je hem kunt laten zien, zodat jij het niet nog een keer hoeft uit te leggen. Plus woorden voor de gesprekken waar je nu voor terugdeinst.</p>
				</Card>
				<Card bgVariant="base" className="p-6 md:p-8">
					<p class="text-sm text-[var(--color-brand-muted)] italic leading-relaxed mb-4">"En als het te veel wordt en ik zak door de bodem?"</p>
					<h3 class="text-lg font-semibold mb-1">3. Het veiligheidsnet <span class="font-normal text-[var(--color-brand-muted)]">· € 297</span></h3>
					<p class="text-base text-[var(--color-brand-muted)] leading-relaxed">Een protocol voor als het schuurt en een audio die je meteen kunt opzetten. Je valt niet, en je valt zeker niet alleen.</p>
				</Card>
				<Card bgVariant="base" className="p-6 md:p-8">
					<p class="text-sm text-[var(--color-brand-muted)] italic leading-relaxed mb-4">"Twee weken per maand herken ik mezelf niet."</p>
					<h3 class="text-lg font-semibold mb-1">4. Het cycluskompas <span class="font-normal text-[var(--color-brand-muted)]">· € 297</span></h3>
					<p class="text-base text-[var(--color-brand-muted)] leading-relaxed">Een kaart van je eigen cyclus en wat je in elke fase van jezelf mag verwachten. Je bent geen twee mensen. Je bent één vrouw met een lijf dat iets probeert te zeggen.</p>
				</Card>
				<Card bgVariant="base" className="p-6 md:p-8">
					<p class="text-sm text-[var(--color-brand-muted)] italic leading-relaxed mb-4">"En als het over twee jaar terugkomt?"</p>
					<h3 class="text-lg font-semibold mb-1">5. Je gereedschap, voor altijd <span class="font-normal text-[var(--color-brand-muted)]">· € 397</span></h3>
					<p class="text-base text-[var(--color-brand-muted)] leading-relaxed">Alles blijft van jou, en je houdt toegang tot de groep, ook als de twaalf weken voorbij zijn. Zodat je bij een terugval niet opnieuw begint, maar teruggrijpt.</p>
				</Card>
				<Card bgVariant="base" className="p-6 md:p-8">
					<p class="text-sm text-[var(--color-brand-muted)] italic leading-relaxed mb-4">"Ik wil niet twaalf weken wachten op iets merkbaars."</p>
					<h3 class="text-lg font-semibold mb-1">6. De eerste verschuiving <span class="font-normal text-[var(--color-brand-muted)]">· € 497</span></h3>
					<p class="text-base text-[var(--color-brand-muted)] leading-relaxed">Eén oefening die je meteen krijgt, en waarmee de meeste vrouwen binnen twee dagen iets voelen verschuiven. Niet je pijn weg, maar de greep eromheen losser.</p>
				</Card>
			</div>
		</div>
	</section>
```

- [ ] **Step 2: Verify build and visual check**

`npm run build` — expect no errors. Screenshot blok 12: 3 columns desktop, 1 column mobile, all 6 cards visible.

- [ ] **Step 3: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add zes extra's grid (blok 12)"
```

---

## Task 10: Voor wie / niet (blok 13) + Bewijs (blok 14)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

- [ ] **Step 1: Insert blok 13 as a two-column filter**

Insert verbatim from lines 390–408:

```astro
	{/* BLOK 13: VOOR WIE DIT IS, EN VOOR WIE NIET */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-[var(--color-brand-base)] fade-in-section">
		<div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
			<div>
				<h3 class="text-xl md:text-2xl font-semibold mb-6 text-[var(--color-brand-primary-text)]">Dit is voor jou als:</h3>
				<ul class="space-y-4">
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-sage)] font-bold shrink-0 mt-1">✓</span>
						Je jarenlang van het kastje naar de muur bent gestuurd en je het vertrouwen bent kwijtgeraakt, maar nog niet de hoop.
					</li>
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-sage)] font-bold shrink-0 mt-1">✓</span>
						Je nuchter bent, en niet van plan om iets te geloven alleen omdat iemand het zegt.
					</li>
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-sage)] font-bold shrink-0 mt-1">✓</span>
						Je bereid bent om te kijken naar wat er onder je klacht ligt, ook als dat ongemakkelijk wordt.
					</li>
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-sage)] font-bold shrink-0 mt-1">✓</span>
						Je klaar bent met alleen zijn hierin.
					</li>
				</ul>
			</div>
			<div>
				<h3 class="text-xl md:text-2xl font-semibold mb-6 text-[var(--color-brand-primary-text)]">Dit is niet voor jou als:</h3>
				<ul class="space-y-4">
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-1">✕</span>
						Je een oplossing zoekt waar je zelf niets voor hoeft te doen. Ik heb tools, geen toverstok.
					</li>
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-1">✕</span>
						Je wilt stoppen met je medische behandeling. Dat is niet wat ik doe en ik zal je daar nooit toe aanmoedigen.
					</li>
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-1">✕</span>
						Je wilt dat ik je vertel dat je pijn over twaalf weken weg is. Dat beloof ik je niet, en ik zou liegen als ik het wel deed.
					</li>
					<li class="flex items-start gap-3 text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
						<span class="text-[var(--color-brand-accent)] font-bold shrink-0 mt-1">✕</span>
						Je op dit moment in een crisis zit waarin je eerst andere hulp nodig hebt. Dan is dit niet het juiste moment, en dat is geen afwijzing. Stuur me gerust een bericht, dan denk ik met je mee.
					</li>
				</ul>
			</div>
		</div>
	</section>
```

- [ ] **Step 2: Insert blok 14 (bewijs)**

Insert verbatim from lines 416–436 only (the header prose + the three real testimonial quotes). Do **not** render the "Notitie voor de build" block (lines 438–444) — that's a note to the builder about the testimonial gap, not page copy. Reuse the featured-quote + grid-of-quotes visual pattern from `src/components/Testimonials.astro` (see that file for the exact quote-mark SVG and card styling), but with blok 14's own text:

```astro
	{/* BLOK 14: BEWIJS */}
	<section class="py-20 md:py-32 px-6 lg:px-8 bg-white fade-in-section">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-semibold mb-4 text-center tracking-tight">Dit programma is nieuw. Mijn werk niet.</h2>
			<p class="max-w-2xl mx-auto text-center text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">
				Ik kan je geen verhalen laten zien van vrouwen die dit programma hebben gedaan, want jij bent bij de eersten. Ik ga ze ook niet verzinnen, en ik ga geen sterren op deze pagina zetten die nergens op slaan.
			</p>
			<p class="max-w-2xl mx-auto text-center text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">
				Wat ik je wel kan zeggen: het werk zelf is niet nieuw. Dit doe ik al meer dan tien jaar, één op één.
			</p>
			<p class="max-w-2xl mx-auto text-center text-base md:text-lg font-medium text-[var(--color-brand-primary-text)] leading-relaxed mb-12 md:mb-16">
				Dit zeggen vrouwen die ik begeleidde.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
				<div class="bg-[var(--color-brand-base)] rounded-[2rem] p-8 shadow-sm">
					<svg class="h-8 w-8 text-[var(--color-brand-accent)]/30 mb-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
					<p class="text-base leading-relaxed mb-6 italic text-[var(--color-brand-primary-text)]">"Ik vond Crystal zeer scherp in verbanden leggen, heel helder in uitleg over wat ik te doen had en met welke thema's mijn klachten verbonden waren in mijn leven. Vooral werd me duidelijk hoe ik moest navigeren in wat er in mijn leven gebeurde. Ze is een heel fijn, open en compassievol mens."</p>
					<p class="font-bold text-sm text-[var(--color-brand-primary-text)]">Kinga Sidor</p>
				</div>
				<div class="bg-[var(--color-brand-base)] rounded-[2rem] p-8 shadow-sm">
					<svg class="h-8 w-8 text-[var(--color-brand-accent)]/30 mb-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
					<p class="text-base leading-relaxed mb-6 italic text-[var(--color-brand-primary-text)]">"Crystal is heerlijk nuchter maar enorm doortastend. Ze kan me op een bepaalde manier lezen waardoor ze heel snel concreet kan maken waar ik zelf de woorden nog niet voor kan vinden. Ik merk dat ik veel meer bij mezelf kan blijven, m'n grenzen aanvoel en mezelf een stuk beter begrijp."</p>
					<p class="font-bold text-sm text-[var(--color-brand-primary-text)]">Tessa van Beek</p>
				</div>
				<div class="bg-[var(--color-brand-base)] rounded-[2rem] p-8 shadow-sm">
					<svg class="h-8 w-8 text-[var(--color-brand-accent)]/30 mb-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
					<p class="text-base leading-relaxed mb-6 italic text-[var(--color-brand-primary-text)]">"We gingen terug in de tijd naar de oorsprong van bepaalde thema's, en wauw. Wat een geschenk en verademing om op deze manier meegenomen te worden. Heel straight en helder."</p>
					<p class="font-bold text-sm text-[var(--color-brand-primary-text)]">Marinka van Aken</p>
				</div>
			</div>

			<p class="max-w-2xl mx-auto text-center text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
				En verder doe ik wat ik kan doen: ik neem het risico van je over. Zie de garantie hieronder.
			</p>
		</div>
	</section>
```

- [ ] **Step 3: Verify build and visual check**

`npm run build` — expect no errors. Screenshot both blocks at mobile and desktop.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add voor-wie filter and bewijs blocks (blok 13-14)"
```

---

## Task 11: De investering (blok 15) — checkout buttons + begin_checkout tracking

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Consumes: `CHECKOUT_URL_INEENS`, `CHECKOUT_URL_TERMIJNEN` consts from Task 2.
- Produces: section `id="investering"` (target of every `ctaHref="#investering"` link from earlier tasks). Produces the `[data-checkout]` click-tracking pattern — this is the only place in the page where a `dataLayer.push` precedes a cross-origin redirect, so its guard logic lives entirely in this task's own `<script>`, not the shared page script (Task 16).

- [ ] **Step 1: Insert blok 15 markup**

Insert verbatim from lines 452–478 (skip the two build-notitie/italic-context lines 474 and the checkout-URL literal comment — render only the actual visitor-facing copy):

```astro
	{/* BLOK 15: DE INVESTERING */}
	<section id="investering" class="py-20 md:py-32 px-6 lg:px-8 bg-[var(--color-brand-base)] fade-in-section">
		<div class="max-w-2xl mx-auto text-center">
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">Even alles bij elkaar.</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Het lichaamsbegrip, de lichaamstaal, de bedding, en de zes extra's. Bij elkaar een waarde van <strong class="text-[var(--color-brand-primary-text)]">€ 7.173</strong>.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Als deze twaalf weken volgend jaar draaien, is de prijs <strong class="text-[var(--color-brand-primary-text)]">€ 1.497</strong>.
			</p>
			<p class="text-2xl md:text-3xl font-bold text-[var(--color-brand-primary-text)] mb-6">
				Voor deze eerste groep is het € 997.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-10">
				Niet omdat je minder krijgt. Je krijgt meer van mij dan iedere groep die na jou komt, want ik ben er met acht vrouwen dichterbij dan ik ooit nog zal zijn. Maar jij stapt in bij iets waar nog geen verhalen van anderen bij staan, en je zegt ja op mijn woord alleen. Dat is wat waard.
			</p>

			<div class="text-left bg-white rounded-3xl p-6 md:p-8 shadow-sm mb-10">
				<p class="font-semibold text-[var(--color-brand-primary-text)] mb-4">En dan dit, want ik ken deze gedachte.</p>
				<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">
					Er komt zo een moment waarop je denkt: dat is veel geld, en ik heb al zoveel uitgegeven aan dingen die niet hielpen.
				</p>
				<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">
					Dat klopt. En je mag boos zijn over elke euro daarvan.
				</p>
				<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">
					Maar reken ook eens de andere kant uit. Wat kost het je nu al? De pijnstillers, de supplementen, de behandelingen die je zelf betaalt omdat ze niet vergoed worden. De dagen die je niet werkt. De dingen die je afzegt. De jaren.
				</p>
				<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
					En vraag je dan af of het echt egoïstisch is om dit voor jezelf te doen. Want jij bent degene die alles draagt in je gezin, in je werk, voor iedereen om je heen. Je hebt jarenlang op je tenen gelopen. Dat je nu een keer iets voor jezelf regelt, is niet egoïstisch. Dat is het minst egoïstische dat er is.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-4">
				<a
					href={CHECKOUT_URL_INEENS}
					data-checkout
					data-payment-option="single"
					data-cta-text="Ik doe mee, €997 ineens"
					class="inline-flex justify-center items-center text-center font-heading font-medium rounded-full px-8 py-4 md:px-10 md:py-5 text-base md:text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white shadow-lg shadow-[var(--color-brand-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-brand-accent)]/30"
				>
					Ik doe mee, € 997 ineens
				</a>
				<a
					href={CHECKOUT_URL_TERMIJNEN}
					data-checkout
					data-payment-option="installments"
					data-cta-text="Ik doe mee, in 3 termijnen"
					class="inline-flex justify-center items-center text-center font-heading font-medium rounded-full px-8 py-4 md:px-10 md:py-5 text-base md:text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 bg-[var(--color-brand-secondary)] hover:bg-[#D5C2B9] text-[var(--color-brand-primary-text)] shadow-sm hover:shadow-md"
				>
					Ik doe mee, in 3 termijnen
				</a>
			</div>
			<p class="text-sm text-[var(--color-brand-muted)] italic">Je draagt het risico niet alleen. Lees hieronder waarom.</p>
		</div>
	</section>
```

Note: these two `<a>` tags are hand-written with the exact classes `Button.astro` would produce (rather than importing `Button`), because `Button.astro` doesn't currently support passing through `data-checkout`/`data-payment-option`/`data-cta-text` attributes reliably alongside its own prop spreading — writing them directly keeps the tracking wiring in Step 2 unambiguous. Verify this assumption in Step 2: if `Button.astro`'s `{...rest}` spread does pass arbitrary `data-*` attributes through to the rendered `<a>` (check `src/components/Button.astro`, it spreads `...rest` onto the element), you may use `<Button href={CHECKOUT_URL_INEENS} data-checkout data-payment-option="single" data-cta-text="...">` instead — either is acceptable as long as the final rendered HTML has `data-checkout`, `data-payment-option`, and `data-cta-text` on the anchor.

- [ ] **Step 2: Add the begin_checkout tracking script**

Directly after this section's closing `</section>`, add a page-level script (this one is specific to blok 15, separate from Task 16's generic scroll/cta_click script):

```astro
<script>
	document.addEventListener("DOMContentLoaded", () => {
		document.querySelectorAll("[data-checkout]").forEach((el) => {
			el.addEventListener("click", (e) => {
				e.preventDefault();
				const href = el.getAttribute("href");
				const paymentOption = el.getAttribute("data-payment-option");
				const ctaText = el.getAttribute("data-cta-text");

				let navigated = false;
				function navigate() {
					if (navigated) return;
					navigated = true;
					window.location.href = href;
				}

				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
					event: "begin_checkout",
					cta_text: ctaText,
					payment_option: paymentOption,
					value: 997,
					currency: "EUR",
					eventCallback: navigate,
					eventTimeout: 2000,
				});
				setTimeout(navigate, 2500);
			});
		});
	});
</script>
```

This follows the project's documented `tracking-patterns.md` rule: the `dataLayer.push` uses `eventCallback` to trigger navigation only after GTM tags fire, with a `setTimeout` fallback in case GTM never loads (e.g. consent denied, ad-blocker, or GTM still initializing).

- [ ] **Step 3: Verify build**

Run: `npm run build` — expect no errors.

- [ ] **Step 4: Manual click-tracking check**

Run `npm run dev`. Using the Playwright MCP tools, navigate to the page, open the browser console, and evaluate:
```js
window.dataLayer = window.dataLayer || [];
document.querySelector('[data-payment-option="single"]').click();
```
Then inspect `window.dataLayer` (via `browser_evaluate`) and confirm the last entry has `event: "begin_checkout"`, `payment_option: "single"`, `value: 997`. Note: actual navigation to the external checkout URL will fire after ~2s (via the `eventTimeout` fallback since there's no real GTM container reachable from localhost in this check) — that's expected, not a bug.

- [ ] **Step 5: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add investering block with begin_checkout tracking (blok 15)"
```

---

## Task 12: Waarom nu (blok 16) — including the wachtlijst-schakelaar

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Consumes: `inschrijvingOpen`, `ctaHref`, `ctaLabel` from Task 2.

- [ ] **Step 1: Insert blok 16 with the open/closed copy switch**

Insert verbatim from lines 486–508, but wrap the scarcity paragraphs in a conditional so that when `inschrijvingOpen` is `false`, the copy switches to a wachtlijst framing instead of claiming "8 plekken" that no longer exist (this is the exact risk called out in the copy's own build-notitie at line 510 — a full page still claiming open spots damages trust).

```astro
	{/* BLOK 16: WAAROM NU */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-white fade-in-section">
		<div class="max-w-2xl mx-auto">
			{inschrijvingOpen ? (
				<>
					<h3 class="text-2xl md:text-3xl font-semibold mb-6 text-[var(--color-brand-primary-text)]">Acht vrouwen. Meer niet.</h3>
					<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">En dat is geen trucje om je op te jagen.</p>
					<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">
						Ik doe dit met acht omdat ik in de live sessies elke vrouw wil zien. Niet als naam in een lijst, maar echt: wat er bij jou speelt, waar jij vastloopt, wat jij nodig hebt. Bij twintig vrouwen lukt dat niet, en dan word jij een van de twintig. Dat wil ik niet, en jij wilt het ook niet, want dat is precies wat je al jaren overkomt.
					</p>
					<h3 class="text-2xl md:text-3xl font-semibold mb-6 text-[var(--color-brand-primary-text)]">We beginnen op maandag 21 september.</h3>
					<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">
						Acht plekken, en als ze vol zijn, is het vol. Ik schuif niemand er nog even bij, want dan klopt de groep niet meer.
					</p>
					<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">Daarna is de volgende groep pas over een half jaar.</p>
				</>
			) : (
				<>
					<h3 class="text-2xl md:text-3xl font-semibold mb-6 text-[var(--color-brand-primary-text)]">Deze groep is vol.</h3>
					<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">
						Acht vrouwen, en die acht plekken zijn ingevuld. Zet je op de wachtlijst en je hoort als eerste wanneer de volgende groep van start gaat.
					</p>
				</>
			)}
			<p class="text-xl md:text-2xl font-semibold text-[var(--color-brand-primary-text)] mb-6">En dat is het eigenlijke punt.</p>
			<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">Niet de datum. De datum is maar een datum.</p>
			<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Het punt is wat er gebeurt als je dit nog een half jaar laat liggen. Dan is het maart. Dan heb je nog zes menstruaties gehad waarvan je er minstens drie hebt uitgezeten met een kruik. Dan heb je weer een handvol afspraken afgezegd. Dan lig je nog steeds om 4:12 's nachts wakker, aangespannen, wachtend.
			</p>
			<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-6">En dan is er niets veranderd, behalve dat er weer een half jaar van je leven voorbij is.</p>
			<p class="text-lg font-semibold text-[var(--color-brand-primary-text)] leading-relaxed mb-10">Dat is geen dreigement. Dat is gewoon wat er gebeurt als je niets doet, en dat weet je zelf ook.</p>
			<div class="text-center">
				<Button href={ctaHref} className="text-base md:text-lg px-8 py-4 md:px-10 md:py-5">
					{ctaLabel}
				</Button>
			</div>
		</div>
	</section>
```

- [ ] **Step 2: Verify build and visual check**

Run `npm run build` — expect no errors.

Then temporarily set `const inschrijvingOpen = false;` in Task 2's frontmatter, run `npm run build` again to confirm it still builds, and screenshot blok 16 to confirm the "Deze groep is vol" copy renders and the CTA reads "Zet mij op de wachtlijst" linking to `/wachtlijst/`. Then set `inschrijvingOpen` back to `true` before committing.

- [ ] **Step 3: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add waarom-nu block with wachtlijst-schakelaar (blok 16)"
```

---

## Task 13: De vragen die je nu hebt (blok 17)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Consumes: the `<details>/<summary>` accordion pattern from `src/components/FAQ.astro` (read that file for the exact chevron-rotation markup before writing this task).

- [ ] **Step 1: Insert blok 17 as an accordion**

Insert verbatim from lines 518–582, seven questions, using the exact `<details>` structure from `FAQ.astro` (rounded card, chevron SVG that rotates on `group-open`, `faq-content` wrapper):

```astro
	{/* BLOK 17: DE VRAGEN DIE JE NU HEBT */}
	<section id="vragen" class="py-20 md:py-32 px-6 lg:px-8 bg-[var(--color-brand-base)] fade-in-section">
		<div class="max-w-3xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-semibold mb-12 text-center tracking-tight">De vragen die je nu hebt</h2>
			<div class="space-y-4 md:space-y-6">
				<details class="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm open:ring-1 open:ring-[var(--color-brand-accent)]/30 transition-colors duration-300">
					<summary class="flex justify-between items-center font-semibold cursor-pointer list-none p-6 md:p-8 text-lg md:text-xl">
						<span class="pr-6">"Ik heb hier de energie niet voor."</span>
						<span class="transition-transform duration-500 ease-in-out group-open:rotate-180 shrink-0">
							<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
					</summary>
					<div class="faq-content text-[var(--color-brand-muted)] px-6 md:px-8 text-base md:text-lg leading-relaxed">
						<div class="pb-6 md:pb-8 space-y-4">
							<p>Ik weet het. En ik neem dat serieus, want dit is niet hetzelfde als geen zin hebben. Jij bent op. Jij verdeelt je energie al maanden alsof het rantsoen is.</p>
							<p>Daarom is dit programma zo gebouwd dat het geen energie kóst. De modules kijk je liggend. De oefeningen zijn bedoeld om je zenuwstelsel te laten zakken, niet om je op te jagen. En als je een week overslaat omdat je lijf niet meewerkt, dan blijft alles gewoon voor je klaarstaan.</p>
							<p>Alles blijft van jou. Je loopt niets mis, ook niet als je even niet kunt.</p>
						</div>
					</div>
				</details>

				<details class="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm open:ring-1 open:ring-[var(--color-brand-accent)]/30 transition-colors duration-300">
					<summary class="flex justify-between items-center font-semibold cursor-pointer list-none p-6 md:p-8 text-lg md:text-xl">
						<span class="pr-6">"Ik heb al zoveel geld uitgegeven aan dingen die niet werkten."</span>
						<span class="transition-transform duration-500 ease-in-out group-open:rotate-180 shrink-0">
							<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
					</summary>
					<div class="faq-content text-[var(--color-brand-muted)] px-6 md:px-8 text-base md:text-lg leading-relaxed">
						<div class="pb-6 md:pb-8 space-y-4">
							<p>Dat is waar, en dat is precies waarom je terecht voorzichtig bent. Je bent al vaker teleurgesteld, en je bent er ook armer van geworden.</p>
							<p>Ik ga je geen wonder beloven om dat gevoel weg te nemen. Wat ik je wel bied, is een andere plek om te kijken, en een garantie die het risico bij mij legt in plaats van bij jou. Je hebt veertien dagen om te ervaren of dit klopt.</p>
							<p>En als het geld echt het enige is wat je tegenhoudt: stuur me een bericht. Dan kijk ik met je mee of er voor jou toch een manier is.</p>
						</div>
					</div>
				</details>

				<details class="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm open:ring-1 open:ring-[var(--color-brand-accent)]/30 transition-colors duration-300">
					<summary class="flex justify-between items-center font-semibold cursor-pointer list-none p-6 md:p-8 text-lg md:text-xl">
						<span class="pr-6">"Wat als mijn partner het niet snapt?"</span>
						<span class="transition-transform duration-500 ease-in-out group-open:rotate-180 shrink-0">
							<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
					</summary>
					<div class="faq-content text-[var(--color-brand-muted)] px-6 md:px-8 text-base md:text-lg leading-relaxed">
						<div class="pb-6 md:pb-8 space-y-4">
							<p>Dat is zwaar, en het maakt het extra eenzaam. Je hebt niet alleen de klacht, je hebt ook nog de taak om hem uit te leggen aan iemand die het niet ziet.</p>
							<p>Daarom heb ik de relatiekit gemaakt. Er zit een video in die je hem kunt laten zien, zodat hij het van mij hoort en niet weer van jou. En er zitten woorden in voor de gesprekken waar je nu tegenop ziet.</p>
							<p>Ik beloof je niet dat hij verandert. Dat kan ik niet, en dat zou niet eerlijk zijn. Maar ik kan het je een stuk makkelijker maken.</p>
						</div>
					</div>
				</details>

				<details class="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm open:ring-1 open:ring-[var(--color-brand-accent)]/30 transition-colors duration-300">
					<summary class="flex justify-between items-center font-semibold cursor-pointer list-none p-6 md:p-8 text-lg md:text-xl">
						<span class="pr-6">"Is dit niet een beetje zweverig?"</span>
						<span class="transition-transform duration-500 ease-in-out group-open:rotate-180 shrink-0">
							<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
					</summary>
					<div class="faq-content text-[var(--color-brand-muted)] px-6 md:px-8 text-base md:text-lg leading-relaxed">
						<div class="pb-6 md:pb-8 space-y-4">
							<p>Terechte vraag, en ik ben blij dat je hem stelt. Je bent nuchter, je bent vaak hoogopgeleid, en je hebt geen zin om je intelligentie beledigd te zien. Ik ook niet.</p>
							<p>Wat ik doe is niet mystiek. Het is logica over hoe je lijf werkt, uitgelegd in gewone taal, en je hoeft er niets van te geloven. Je gaat het zelf herkennen, of niet. En als het bij jou niet blijkt te kloppen, dan hoor je dat van mij. Ik ga je niets aanpraten.</p>
							<p>Je hoeft nergens in te geloven. Je hoeft alleen te kijken.</p>
						</div>
					</div>
				</details>

				<details class="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm open:ring-1 open:ring-[var(--color-brand-accent)]/30 transition-colors duration-300">
					<summary class="flex justify-between items-center font-semibold cursor-pointer list-none p-6 md:p-8 text-lg md:text-xl">
						<span class="pr-6">"En als het bij mij niet werkt?"</span>
						<span class="transition-transform duration-500 ease-in-out group-open:rotate-180 shrink-0">
							<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
					</summary>
					<div class="faq-content text-[var(--color-brand-muted)] px-6 md:px-8 text-base md:text-lg leading-relaxed">
						<div class="pb-6 md:pb-8 space-y-4">
							<p>Ik snap dat je dat vraagt. En weet je wat er onder die vraag zit? Niet de twijfel of ik goed ben. De twijfel of jij het kunt.</p>
							<p>Dat is de gedachte die je al jaren met je meedraagt. Dat het aan jou ligt. Dat je niet genoeg je best doet, dat je te veel kapot bent, dat jij de uitzondering bent bij wie niets aanslaat.</p>
							<p class="font-semibold text-[var(--color-brand-primary-text)]">Je bent de uitzondering niet.</p>
							<p>Je krijgt hier een groep om je heen, een buddy die weet waar je aan werkt, en mij, twaalf weken lang. Je hoeft dit niet in je eentje te fiksen, en je hoeft het ook niet in één keer goed te doen.</p>
							<p>En als je aan het einde alles hebt gedaan en je begrijpt je klacht nog steeds niet, dan ga ik met je door tot je het wel snapt. Zonder dat het je iets extra's kost.</p>
						</div>
					</div>
				</details>

				<details class="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm open:ring-1 open:ring-[var(--color-brand-accent)]/30 transition-colors duration-300">
					<summary class="flex justify-between items-center font-semibold cursor-pointer list-none p-6 md:p-8 text-lg md:text-xl">
						<span class="pr-6">"Een hele dag ergens naartoe. Ik weet niet of ik dat aankan."</span>
						<span class="transition-transform duration-500 ease-in-out group-open:rotate-180 shrink-0">
							<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
					</summary>
					<div class="faq-content text-[var(--color-brand-muted)] px-6 md:px-8 text-base md:text-lg leading-relaxed">
						<div class="pb-6 md:pb-8 space-y-4">
							<p>Dit is de vraag die ik het serieust neem van allemaal, en ik ga hem niet wegwuiven.</p>
							<p>Ik weet dat reizen voor jou geen kleinigheid is. Dat een dag van huis betekent: hoe kom ik er, waar kan ik liggen, wat als het misgaat, en wat kost het me de dagen erna. Ik weet dat je al jaren je leven inricht rond precies deze rekensom.</p>
							<p>En toch vraag ik je om te komen. Omdat ik heb gezien wat er in die ene dag gebeurt, en omdat ik je dat niet wil onthouden.</p>
							<p>Dus dit is wat ik doe. Er is een plek om te liggen. Je mag zitten zoals je wilt, weglopen wanneer je wilt, later komen en eerder gaan. Je hoeft geen hele dag rechtop op een stoel te zitten, want dat vraag ik van niemand met een lijf zoals het jouwe.</p>
							<p>En als je nu leest en je denkt: dit gaat me echt niet lukken, stuur me dan een bericht voordat je je inschrijft. Dan kijk ik met je mee wat er wél kan. Ik wil liever met je meedenken dan dat je afhaakt zonder het gevraagd te hebben.</p>
						</div>
					</div>
				</details>

				<details class="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm open:ring-1 open:ring-[var(--color-brand-accent)]/30 transition-colors duration-300">
					<summary class="flex justify-between items-center font-semibold cursor-pointer list-none p-6 md:p-8 text-lg md:text-xl">
						<span class="pr-6">"Ik durf dit niet in een groep te bespreken."</span>
						<span class="transition-transform duration-500 ease-in-out group-open:rotate-180 shrink-0">
							<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
					</summary>
					<div class="faq-content text-[var(--color-brand-muted)] px-6 md:px-8 text-base md:text-lg leading-relaxed">
						<div class="pb-6 md:pb-8 space-y-4">
							<p>Natuurlijk niet. Je praat over je bekken, je blaas, je seksleven. Dat vertel je niet zomaar aan zeven vreemden, en iedereen die zegt dat dat wel meevalt, heeft het nooit hoeven doen.</p>
							<p>Dus: je hoeft niets te delen wat je niet wilt. Nooit. Je mag twaalf weken lang je camera aan hebben en niets zeggen, en dan nog krijg je het volle programma.</p>
							<p>Maar ik zeg er dit bij. Deze vrouwen kennen dit van binnenuit. En het moment waarop iemand iets zegt wat jij dacht dat alleen jij had, is voor de meeste vrouwen het moment waarop er iets breekt wat jaren op slot heeft gezeten.</p>
							<p>Je hoeft het niet te vertellen. Maar je hoeft het ook niet langer alleen te dragen.</p>
						</div>
					</div>
				</details>
			</div>
		</div>
	</section>
```

- [ ] **Step 2: Verify build and visual check**

`npm run build` — expect no errors. `npm run dev`, use Playwright to click a `<summary>` and confirm the chevron rotates and the answer expands (native `<details>` behaviour, no JS needed).

- [ ] **Step 3: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add vragen accordion block (blok 17)"
```

---

## Task 14: Garantie (blok 18) + Close (blok 19, met signatuur) + P.S. (blok 20)

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Consumes: `.dropcap` (Task 3), `--font-signature` (Task 1), `ctaHref`/`ctaLabel` (Task 2).

- [ ] **Step 1: Insert blok 18 verbatim** (lines 590–606), `max-w-2xl mx-auto` prose, `bg-white`. Bold the two sub-labels ("Doe veertien dagen mee." and "En dan de tweede.") as `<h3 class="text-xl md:text-2xl font-semibold mb-4">`.

- [ ] **Step 2: Insert blok 19 (close) with drop-cap and signature**

Insert verbatim from lines 614–626, drop-cap on "Het is 4:12 's nachts." (same `.dropcap` class as blok 3), then the signature:

```astro
	{/* BLOK 19: DE CLOSE */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-[var(--color-brand-base)] fade-in-section">
		<div class="max-w-2xl mx-auto">
			<p class="dropcap text-lg md:text-xl text-[var(--color-brand-primary-text)] leading-relaxed mb-6">Het is 4:12 's nachts.</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Je ligt op je zij, je knieën opgetrokken, je buik aangespannen, wachtend op iets wat misschien komt.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">Ik kan je niet beloven dat je dat moment nooit meer meemaakt.</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Maar ik kan je wel beloven dat je op een nacht wakker ligt en dat je merkt dat je niet meer aan het wachten bent. Dat het aanspannen er niet is. Dat je gewoon ligt, in een lijf waar je niet meer tegen vecht.
			</p>
			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed mb-6">
				Dat tweede gevecht, dat je al die jaren in je eentje hebt gevoerd zonder dat iemand het zag.
			</p>
			<p class="text-xl md:text-2xl font-semibold text-[var(--color-brand-primary-text)] leading-relaxed mb-10">Dat leg je hier neer.</p>

			<div class="text-center mb-10">
				<Button href={ctaHref} className="text-base md:text-lg px-8 py-4 md:px-10 md:py-5">
					{ctaLabel}
				</Button>
			</div>

			<p class="text-4xl text-center text-[var(--color-brand-accent)]" style="font-family: var(--font-signature);">Crystal</p>
		</div>
	</section>
```

- [ ] **Step 3: Insert blok 20 (P.S.)** (lines 637–643):

```astro
	{/* BLOK 20: P.S. */}
	<section class="py-16 md:py-24 px-6 lg:px-8 bg-white fade-in-section">
		<div class="max-w-2xl mx-auto">
			<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">
				<strong class="text-[var(--color-brand-primary-text)]">P.S.</strong> Twaalf weken, in een groep van acht vrouwen, waarin je leert waarom je lichaam doet wat het doet. Start maandag 21 september. Normaal € 1.497, voor deze eerste groep € 997.
			</p>
			<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-4">
				Doe veertien dagen mee, en als het niet is wat je zoekt, krijg je je geld terug. En als je aan het einde je klacht nog steeds niet begrijpt, ga ik met je door tot je het wel doet.
			</p>
			<p class="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-8">Acht plekken. Daarna is het een half jaar wachten.</p>
			<div class="text-center">
				<Button href={ctaHref} className="text-base md:text-lg px-8 py-4 md:px-10 md:py-5">
					{ctaLabel}
				</Button>
			</div>
		</div>
	</section>
```

- [ ] **Step 4: Verify build and visual check**

`npm run build` — expect no errors. Screenshot blok 18-20, confirm the "Crystal" signature renders in the Caveat script font (visually distinct cursive, not the Outfit/Lato system fonts).

- [ ] **Step 5: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add garantie, close, and P.S. blocks (blok 18-20)"
```

---

## Task 15: Sticky CTA bar component

**Files:**
- Create: `src/components/thuiskomen/StickyBar.astro`
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro` (uncomment the import and usage from Task 2)

**Interfaces:**
- Consumes: props `ctaHref: string`, `ctaLabel: string` from the page (Task 2's consts).
- Consumes: section `id="hero"` (Task 2) as the IntersectionObserver target.

- [ ] **Step 1: Create the component**

```astro
---
import Button from "../Button.astro";

interface Props {
	ctaHref: string;
	ctaLabel: string;
}

const { ctaHref, ctaLabel } = Astro.props;
---

<div
	id="sticky-bar"
	class="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between transition-all duration-300 translate-y-[-100%] opacity-0 bg-white/90 backdrop-blur-md shadow-sm px-8 lg:px-12 py-3"
>
	<div class="flex items-center gap-4">
		<span class="font-heading font-semibold text-base text-[var(--color-brand-primary-text)]">Thuiskomen in je Vrouwenlijf</span>
		<span class="text-sm text-[var(--color-brand-muted)]">€ 997 · start 21 september</span>
	</div>
	<Button href={ctaHref} className="text-sm px-6 py-2.5">
		{ctaLabel}
	</Button>
</div>

<script>
	function initStickyBar() {
		const bar = document.getElementById("sticky-bar");
		const hero = document.getElementById("hero");
		if (!bar || !hero) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					bar.classList.add("translate-y-[-100%]", "opacity-0");
					bar.classList.remove("translate-y-0", "opacity-100");
				} else {
					bar.classList.remove("translate-y-[-100%]", "opacity-0");
					bar.classList.add("translate-y-0", "opacity-100");
				}
			},
			{ threshold: 0, rootMargin: "-80px 0px 0px 0px" }
		);
		observer.observe(hero);
	}

	initStickyBar();
	document.addEventListener("astro:page-load", initStickyBar);
</script>
```

This mirrors `src/components/Nav.astro`'s exact show/hide mechanic (same `IntersectionObserver` options, same class-toggle approach) but strips out the hamburger/mobile-menu logic, since this bar is desktop-only (`hidden md:flex`) per the design spec.

- [ ] **Step 2: Uncomment the wiring in the page**

In `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`, restore the two lines commented out in Task 2:

```astro
import StickyBar from "../../components/thuiskomen/StickyBar.astro";
```
```astro
<StickyBar ctaHref={ctaHref} ctaLabel={ctaLabel} />
```

- [ ] **Step 3: Verify build and visual check**

`npm run build` — expect no errors. `npm run dev`, open at desktop width (1440×900), confirm the sticky bar is hidden while the hero is in view, then scroll down and confirm it slides in from the top and stays fixed. Confirm it stays `hidden` at mobile width (390px) throughout.

- [ ] **Step 4: Commit**

```bash
git add src/components/thuiskomen/StickyBar.astro src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add sticky CTA bar, wire into sales page"
```

---

## Task 16: Page-level scroll animation, scroll-depth, and generic CTA click tracking

**Files:**
- Modify: `src/pages/thuiskomen-in-je-vrouwenlijf/index.astro`

**Interfaces:**
- Consumes: the `fade-in-section` class already applied to every section in Tasks 3–14.

- [ ] **Step 1: Add the fade-in-section global style**

At the top of the file's bottom `<style>` block area, add a **second**, `is:global` style block (fade-in must be global since it targets elements without a `data-astro-cid` scope match otherwise — this is copied verbatim from `germaanse-geneeskunde-adviesgesprek/index.astro`):

```astro
<style is:global>
	:global(html.js) .fade-in-section {
		opacity: 0;
		transform: translateY(20px);
		visibility: hidden;
		transition: opacity 600ms ease-out, transform 600ms ease-out;
		will-change: opacity, visibility, transform;
	}
	:global(html.js) .fade-in-section.is-visible {
		opacity: 1;
		transform: none;
		visibility: visible;
	}
</style>
```

- [ ] **Step 2: Add the three page-level scripts**

At the bottom of the file, after the closing `</Layout>` tag and after the existing `<style>` blocks, add (copied and adapted from `src/pages/germaanse-geneeskunde-adviesgesprek/index.astro` lines 77–169):

```astro
<script>
	// DataLayer: CTA click tracking (scroll-to-section CTA's, not the checkout buttons — those are tracked in blok 15's own script)
	document.addEventListener("DOMContentLoaded", () => {
		document.addEventListener("click", (e) => {
			const el = (e.target as HTMLElement).closest('a[href^="#"]');
			if (!el) return;

			const href = el.getAttribute("href");
			const text = el.textContent?.trim();
			const section = el.closest("section");
			const location = section?.id || "unknown";

			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: "cta_click",
				cta_text: text,
				cta_destination: href?.replace("#", ""),
				cta_location: location,
			});
		});
	});

	// DataLayer: Scroll depth tracking
	document.addEventListener("DOMContentLoaded", () => {
		const thresholds = [25, 50, 75, 90];
		const fired = new Set();

		const checkScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			if (docHeight <= 0) return;
			const scrollPercent = Math.round((scrollTop / docHeight) * 100);

			thresholds.forEach((threshold) => {
				if (scrollPercent >= threshold && !fired.has(threshold)) {
					fired.add(threshold);
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
						event: "scroll_depth",
						scroll_percentage: threshold,
					});
				}
			});
		};

		let ticking = false;
		window.addEventListener(
			"scroll",
			() => {
				if (!ticking) {
					window.requestAnimationFrame(() => {
						checkScroll();
						ticking = false;
					});
					ticking = true;
				}
			},
			{ passive: true }
		);
	});
</script>

<script>
	// Scroll-triggered fade-in for every .fade-in-section
	document.addEventListener("DOMContentLoaded", () => {
		const animateOnScroll = function () {
			const observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add("is-visible");
							observer.unobserve(entry.target);
						}
					});
				},
				{ root: null, rootMargin: "0px", threshold: 0.15 }
			);

			const elements = document.querySelectorAll(".fade-in-section");
			elements.forEach((el) => observer.observe(el));
		};

		animateOnScroll();
		document.addEventListener("astro:page-load", animateOnScroll);
	});
</script>
```

- [ ] **Step 3: Verify build and visual check**

`npm run build` — expect no errors. `npm run dev`, scroll the full page, confirm each section fades in as it enters the viewport (no section is invisible-forever or already-visible-on-load). Open the browser console, scroll to the bottom, and evaluate `window.dataLayer` via Playwright's `browser_evaluate` — confirm `scroll_depth` events for 25/50/75/90 all appear.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/index.astro
git commit -m "feat: add scroll-depth, cta_click, and fade-in tracking scripts"
```

---

## Task 17: Bedankt-pagina

**Files:**
- Create: `src/pages/thuiskomen-in-je-vrouwenlijf/bedankt.astro`

**Interfaces:**
- None consumed from other tasks (fully standalone page). Not yet linked from anywhere — PlugAndPay/Stripe redirect configuration is out of scope (see design spec).

- [ ] **Step 1: Create the bedankt page**

Reuses the same visual language as `germaanse-geneeskunde-adviesgesprek/bedankt.astro` (checkmark circle, badge, photo+quote card) but with the lighter `fade-in-section`/IntersectionObserver animation already used throughout the sales page (Task 16), instead of that page's bespoke GSAP timeline — simpler, and consistent with the rest of this new page rather than introducing a second animation system for a page that isn't linked yet.

```astro
---
import Layout from "../../layouts/Layout.astro";
import Button from "../../components/Button.astro";
import { Picture } from "astro:assets";
import portretCrystal from "../../assets/images/Portret Crystal 1.jpg";
---

<Layout
	title="Welkom bij Thuiskomen in je Vrouwenlijf — Crystal Helder"
	description="Je inschrijving is ontvangen. Hier lees je wat er nu gebeurt."
	includeCal={false}
	robots="noindex"
>
	<div class="hidden md:block fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none" aria-hidden="true">
		<div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--color-brand-secondary)] rounded-full mix-blend-multiply filter blur-[120px] opacity-50"></div>
		<div class="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-[var(--color-brand-sage)] rounded-full mix-blend-multiply filter blur-[120px] opacity-30"></div>
	</div>

	<div class="min-h-screen flex items-center justify-center px-6 py-20 md:py-24">
		<div class="max-w-2xl mx-auto text-center fade-in-section">
			<div class="w-20 h-20 rounded-full bg-[var(--color-brand-sage)] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[var(--color-brand-sage)]/30">
				<svg class="w-10 h-10 text-[var(--color-brand-primary-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
				</svg>
			</div>

			<div class="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white mb-6 text-xs font-semibold tracking-widest uppercase text-[var(--color-brand-accent)] shadow-sm">
				Welkom bij de groep
			</div>

			<h1 class="text-3xl md:text-5xl font-bold mb-6 text-[var(--color-brand-primary-text)] leading-tight">
				Welkom bij <span class="text-[var(--color-brand-accent)]">Thuiskomen in je Vrouwenlijf</span>.
			</h1>

			<p class="text-lg md:text-xl text-[var(--color-brand-muted)] mb-12 leading-relaxed max-w-xl mx-auto">
				Je inschrijving is ontvangen. Je krijgt binnen enkele minuten een bevestiging per e-mail, met de eerste stappen richting 21 september.
			</p>

			<div class="bg-white/80 backdrop-blur-md border border-white rounded-3xl p-6 md:p-10 shadow-xl shadow-[var(--color-brand-muted)]/5 mb-8 text-left flex flex-col md:flex-row items-center gap-6 md:gap-8">
				<div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 border-4 border-[var(--color-brand-secondary)] shadow-lg">
					<Picture src={portretCrystal} alt="Crystal Helder" widths={[128, 256]} sizes="128px" class="w-full h-full object-cover" style="object-position: center 20%;" />
				</div>
				<div>
					<p class="text-lg md:text-xl font-medium text-[var(--color-brand-primary-text)] leading-relaxed italic">
						"Ik ben blij dat je erbij bent. Over twaalf weken snap je waarom je lichaam doet wat het doet — dat beloof ik je."
					</p>
					<p class="mt-3 text-sm font-semibold text-[var(--color-brand-muted)]">— Crystal</p>
				</div>
			</div>

			<div class="bg-white/80 backdrop-blur-md border border-white rounded-3xl p-6 md:p-8 shadow-xl shadow-[var(--color-brand-muted)]/5 mb-12 text-left">
				<h2 class="text-xl md:text-2xl font-bold mb-3 text-[var(--color-brand-primary-text)]">Wat er nu gebeurt</h2>
				<p class="text-base md:text-lg text-[var(--color-brand-muted)] leading-relaxed">
					Je ontvangt per e-mail toegang tot de eerste module, samen met alle praktische informatie voor de start op maandag 21 september. Heb je in de tussentijd een vraag? Stuur gerust een bericht, ik denk met je mee.
				</p>
			</div>

			<Button href="/thuiskomen-in-je-vrouwenlijf/" className="text-base md:text-lg px-8 py-4">
				Terug naar de pagina
			</Button>
		</div>
	</div>
</Layout>

<style is:global>
	:global(html.js) .fade-in-section {
		opacity: 0;
		transform: translateY(20px);
		visibility: hidden;
		transition: opacity 600ms ease-out, transform 600ms ease-out;
		will-change: opacity, visibility, transform;
	}
	:global(html.js) .fade-in-section.is-visible {
		opacity: 1;
		transform: none;
		visibility: visible;
	}
</style>

<script>
	document.addEventListener("DOMContentLoaded", () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);
		document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
	});
</script>
```

- [ ] **Step 2: Exclude from sitemap**

Open `astro.config.mjs`. The `sitemap` integration's `filter` already excludes any page whose path includes `/bedankt/` (see the existing filter: `!page.includes('/bedankt/')`), so `/thuiskomen-in-je-vrouwenlijf/bedankt/` is automatically excluded — no change needed. Confirm this by reading `astro.config.mjs` and checking the filter includes that pattern.

- [ ] **Step 3: Verify build and visual check**

`npm run build` — expect no errors. `npm run dev`, navigate to `http://localhost:4321/thuiskomen-in-je-vrouwenlijf/bedankt/`, screenshot at mobile and desktop, confirm the checkmark, photo, and both info cards render.

- [ ] **Step 4: Commit**

```bash
git add src/pages/thuiskomen-in-je-vrouwenlijf/bedankt.astro
git commit -m "feat: add bedankt page for sales page"
```

---

## Final full-page verification (after Task 17)

- [ ] Run `npm run build` one more time from a clean state to confirm the entire page (all 20 blocks + sticky bar + bedankt page) builds without errors.
- [ ] Run `npm run dev`, use Playwright to walk the entire page top to bottom at both mobile (390×844) and desktop (1440×900) viewports, screenshotting each block, checking for: layout overflow, missing images, broken drop-caps, unstyled text, or JS console errors (`browser_console_messages`).
- [ ] Confirm every internal `href` ends in `/` (per `trailingSlash: 'always'`) except the two external checkout links and in-page `#anchor` links.
- [ ] Confirm `inschrijvingOpen` is set back to `true` in the final committed version (it must have been temporarily flipped during Task 12's verification).
