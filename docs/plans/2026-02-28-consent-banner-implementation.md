# Consent Banner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a consent banner with Google Consent Mode v2 (Advanced) to the Crystal Helder landing page, optimized for maximum accept rate.

**Architecture:** A single Astro component (`ConsentBanner.astro`) rendered in `Layout.astro`. Consent defaults are set inline before GTM loads. The banner appears after 2s/first scroll, stores choice in localStorage with 6-month expiry, and updates consent signals via `gtag()`.

**Tech Stack:** Astro 5.17, Tailwind CSS 4.2, inline JavaScript (no dependencies)

**Design doc:** `docs/plans/2026-02-28-consent-banner-design.md`

---

### Task 1: Add consent mode defaults before GTM

**Files:**
- Modify: `src/layouts/Layout.astro:38-45`

**Step 1: Add consent defaults script before GTM snippet**

Insert this block directly before the GTM script (line 38). This MUST run before GTM loads — it sets all consent signals to `denied` by default (Advanced Consent Mode).

```html
<!-- Google Consent Mode v2 defaults (MUST load before GTM) -->
<script is:inline>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
</script>
```

Also add: if a consent choice exists in localStorage and is still valid (< 6 months), immediately update consent before GTM loads:

```html
<script is:inline>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
// Restore previous consent choice if still valid (6 months)
(function() {
  try {
    var stored = localStorage.getItem('cookie_consent');
    if (stored) {
      var data = JSON.parse(stored);
      var sixMonths = 180 * 24 * 60 * 60 * 1000;
      if (data.timestamp && (Date.now() - data.timestamp) < sixMonths) {
        if (data.choice === 'granted') {
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
        }
      } else {
        localStorage.removeItem('cookie_consent');
      }
    }
  } catch(e) {}
})();
</script>
```

The existing GTM script block (lines 39-45) stays exactly where it is, directly after this new block.

**Step 2: Verify build works**

Run: `npm run build`
Expected: Build succeeds, no errors.

**Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add consent mode v2 defaults before GTM"
```

---

### Task 2: Create ConsentBanner component

**Files:**
- Create: `src/components/ConsentBanner.astro`

**Step 1: Create the component**

The banner is a fixed bottom bar with the text "🍪 Cookies oké?", a "Ja" button (brand accent color, filled), a "Nee" button (outlined grey, same size), and a "Meer info" link. It is hidden by default and shown via JavaScript.

```astro
---
// No props needed — self-contained consent banner
---

<div
  id="consent-banner"
  class="fixed bottom-0 inset-x-0 z-50 translate-y-full transition-transform duration-500 ease-in-out"
  role="dialog"
  aria-label="Cookie consent"
>
  <div class="bg-white shadow-[0_-2px_16px_rgba(0,0,0,0.08)] px-4 py-3 sm:px-6 sm:py-4">
    <div class="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
      <p class="text-base text-[var(--color-brand-primary-text)] font-sans">
        🍪 Cookies oké?
      </p>
      <div class="flex items-center gap-3">
        <button
          id="consent-accept"
          class="px-5 py-2 rounded-full text-sm font-heading font-medium bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white transition-colors duration-200"
        >
          Ja
        </button>
        <button
          id="consent-reject"
          class="px-5 py-2 rounded-full text-sm font-heading font-medium border border-[var(--color-brand-muted)]/40 text-[var(--color-brand-muted)] hover:border-[var(--color-brand-muted)] hover:text-[var(--color-brand-primary-text)] transition-colors duration-200"
        >
          Nee
        </button>
        <a
          href="/algemene-voorwaarden/"
          class="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-primary-text)] underline underline-offset-2 transition-colors duration-200 whitespace-nowrap"
        >
          Meer info
        </a>
      </div>
    </div>
  </div>
</div>

<script is:inline>
(function() {
  // Don't show banner if consent already stored and valid
  try {
    var stored = localStorage.getItem('cookie_consent');
    if (stored) {
      var data = JSON.parse(stored);
      var sixMonths = 180 * 24 * 60 * 60 * 1000;
      if (data.timestamp && (Date.now() - data.timestamp) < sixMonths) {
        return; // Valid choice exists, don't show banner
      }
    }
  } catch(e) {}

  var banner = document.getElementById('consent-banner');
  if (!banner) return;

  // Show banner after 2 seconds OR first scroll, whichever comes first
  var shown = false;
  function showBanner() {
    if (shown) return;
    shown = true;
    banner.classList.remove('translate-y-full');
    banner.classList.add('translate-y-0');
    window.removeEventListener('scroll', onScroll);
  }

  var timer = setTimeout(showBanner, 2000);

  function onScroll() {
    clearTimeout(timer);
    showBanner();
  }
  window.addEventListener('scroll', onScroll, { once: true, passive: true });

  function hideBanner() {
    banner.classList.remove('translate-y-0');
    banner.classList.add('translate-y-full');
  }

  function storeChoice(choice) {
    try {
      localStorage.setItem('cookie_consent', JSON.stringify({
        choice: choice,
        timestamp: Date.now()
      }));
    } catch(e) {}
  }

  document.getElementById('consent-accept').addEventListener('click', function() {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
    storeChoice('granted');
    hideBanner();
  });

  document.getElementById('consent-reject').addEventListener('click', function() {
    storeChoice('denied');
    hideBanner();
  });
})();
</script>
```

Key design details:
- `translate-y-full` hides it below viewport, `translate-y-0` slides it in (smooth 500ms)
- "Ja" button uses `--color-brand-accent` (#C8664D) — same as site CTAs
- "Nee" button uses outlined style with `--color-brand-muted` border — visible, same size, not hidden
- Both buttons same padding, same border-radius, same font
- "Meer info" links to existing `/algemene-voorwaarden/` page
- `z-50` ensures it's above all other content
- `role="dialog"` and `aria-label` for accessibility

**Step 2: Verify component syntax**

Run: `npm run build`
Expected: Build succeeds (component created but not yet used).

**Step 3: Commit**

```bash
git add src/components/ConsentBanner.astro
git commit -m "feat: create ConsentBanner component"
```

---

### Task 3: Add ConsentBanner to Layout

**Files:**
- Modify: `src/layouts/Layout.astro:1-2` (import) and `Layout.astro:50` (render)

**Step 1: Import and render the component**

Add the import at the top of the frontmatter:
```astro
import ConsentBanner from '../components/ConsentBanner.astro';
```

Add the component just before `</body>`:
```astro
    <slot />
    <ConsentBanner />
  </body>
```

**Step 2: Run dev server and verify visually**

Run: `npm run dev`

Verify:
- Banner slides in from bottom after ~2 seconds
- "Ja" button is accent colored, "Nee" is outlined grey
- Both buttons are same size and clearly visible
- "Meer info" link is visible
- Clicking "Ja" hides banner, refreshing page does NOT show banner again
- Clicking "Nee" hides banner, refreshing page does NOT show banner again
- Clear localStorage → banner appears again

**Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add consent banner to site layout"
```

---

### Task 4: Verify with Playwright

**Files:**
- Use Playwright MCP browser (no test file needed)

**Step 1: Start dev server**

Run: `npm run dev` (background)

**Step 2: Visual check — desktop**

Open `http://localhost:4321/gnm-begeleiding/` in Playwright browser, wait 3 seconds, take screenshot. Verify:
- Banner visible at bottom of page
- Both buttons visible and correctly styled
- Text "🍪 Cookies oké?" visible
- Banner does not block page content

**Step 3: Visual check — mobile**

Resize to 375x812 (iPhone viewport), take screenshot. Verify:
- Banner adapts to mobile width
- Buttons still side by side and tappable
- Text not truncated

**Step 4: Functional check — accept flow**

1. Click "Ja"
2. Banner slides away
3. Run in console: `localStorage.getItem('cookie_consent')` — should contain `{"choice":"granted","timestamp":...}`
4. Run in console: `dataLayer` — look for consent update event with granted values

**Step 5: Functional check — reject flow**

1. Clear localStorage, reload page
2. Click "Nee"
3. Banner slides away
4. Console: `localStorage.getItem('cookie_consent')` — should contain `{"choice":"denied","timestamp":...}`
5. Reload — banner should NOT appear

**Step 6: GTM consent verification**

Open GTM Preview/Debug mode (`https://tagassistant.google.com/`) or check in browser console:
```javascript
// After page load, before consent:
dataLayer.filter(e => e[0] === 'consent')
// Should show: default with all denied, possibly update if stored choice exists
```

---

### Task 5: Final build and deploy

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds, no errors.

**Step 2: Commit all changes**

Ensure all files are committed:
```bash
git status
git add -A
git commit -m "feat: consent banner with Google Consent Mode v2 (Advanced)"
```

**Step 3: Push to deploy**

```bash
git push
```

Netlify auto-deploys. Verify on `https://go.crystalhelder.nl/gnm-begeleiding/` that the banner appears and functions correctly.
