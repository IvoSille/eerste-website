# Consent Banner Design — Crystal Helder

**Datum:** 2026-02-28
**Scope:** Google Ads Consent Mode v2 compliance
**Doel:** Maximale accept rate binnen wettelijke grenzen

## Context

Google handhaaft sinds juli 2025 actief: accounts zonder Consent Mode v2 verliezen remarketing, conversie-tracking en personalisatie voor EEA-verkeer. De Nederlandse AP scant automatisch 10.000 websites en deelt boetes uit. Beide vereisen een consent banner vóór het starten van Google Ads.

Verwacht traffic: ~150 bezoekers/maand. Bij dit volume telt elke bezoeker — Advanced Consent Mode (niet Basic) is cruciaal zodat Google ook bij "weigeren" conversies kan modelleren (~70% recovery).

## Design beslissingen

### Onderbouwing uit onderzoek

| Factor | Keuze | Bron |
|--------|-------|------|
| Bottom bar vs popup | Bottom bar (76% vs 71% accept) | Morningbound 2023 |
| Highlighted Accept-knop | Ja, merkkleur vs grijs | Laine 2021, Bauer 2021 |
| Binair vs granulair | Binair "Ja/Nee" (granulair = -8-20%) | Nouwens et al. |
| Bannertekst | Minimaal (tekst heeft geen significant effect) | Laine 2021 |
| Timing | Vertraagd ~2s (niet direct = +23%) | Nouwens et al. |
| Consent mode type | Advanced (cookieless pings bij denied) | Fresh Egg klantdata |

### Visueel ontwerp

- **Positie:** Bottom bar, full-width, niet-blokkend, subtiele schaduw naar boven
- **Tekst:** `🍪 Cookies oké?`
- **Knoppen:**
  - "Ja" — filled button in Crystal Helder merkkleur (teal/groen)
  - "Nee" — outlined/ghost button in neutraal grijs, zelfde grootte en lettergrootte
  - "Meer info" — tekst-link naar cookie/privacy-uitleg
- **Timing:** Verschijnt na ~2 seconden of bij eerste scroll (wat eerder komt)

### Mobile

- Knoppen naast elkaar ("Ja"/"Nee" zijn kort genoeg)
- Full-width bar met voldoende padding voor touch targets

### Technische architectuur

```
Pageload
  ↓
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
})
  ↓
GTM laadt (Advanced Mode — tags vuren met cookieless pings)
  ↓
Check localStorage voor bestaande keuze
  ├─ keuze gevonden → consent update, geen banner
  └─ geen keuze → banner tonen na 2s / eerste scroll
      ↓
    [Ja] → gtag('consent', 'update', { alles: 'granted' })
           localStorage.setItem('cookie_consent', 'granted')
           Banner verwijderen
    [Nee] → localStorage.setItem('cookie_consent', 'denied')
            Banner verwijderen (consent blijft denied)
```

- Consent keuze geldig voor 6 maanden (timestamp opslaan, daarna opnieuw vragen)
- Geen externe CMP dependency
- Geen TCF/IAB integratie (niet nodig voor alleen Google compliance)

## Wat we NIET doen (dark patterns)

- Weigeren niet verstoppen achter extra klikken
- Geen pre-aangevinkte checkboxes
- Geen emotionele druk
- Geen cookie wall
- Geen visuele trucs die "Nee" onzichtbaar maken

## Scope exclusions

- Geen granulaire cookie-categorie keuzes
- Geen externe CMP
- Geen TCF/IAB framework
- Geen consent logging naar server (localStorage only)
