/**
 * Funnel-dashboard data-endpoint (Crystal Helder e-bookfunnel).
 *
 * Serveert een PII-vrije, geaggregeerde JSON die de dashboardpagina rendert.
 * - Auth: vereist het juiste wachtwoord (env DASHBOARD_PASSWORD), via header
 *   `x-dashboard-key` of `?key=`. Geen wachtwoord ingesteld -> 503 (veilig dicht).
 * - Bron: haalt de echte data van de n8n-aggregator (env N8N_DASHBOARD_URL,
 *   optioneel met N8N_DASHBOARD_TOKEN als Bearer). Lukt dat niet, dan valt 'ie
 *   terug op de SAMPLE hieronder, zodat de pagina altijd rendert.
 *
 * JSON-CONTRACT dat n8n moet leveren (alle tellingen, geen e-mailadressen):
 * {
 *   generated_at: ISO-string,
 *   currency: "EUR",
 *   booking_value: 27,
 *   timeseries: [ { date:"YYYY-MM-DD", spend, impressions, clicks,
 *                   leads, downloads, bookings } ],   // dagrijen, ~90 dgn
 *   email:   [ { mail, sent, opens, clicks } ],        // per nurture-mail
 *   sources: [ { campaign, leads, bookings } ]         // attributie o.b.v. utm_campaign
 * }
 * Afgeleide KPI's (opt-in-ratio, kost/lead, kost/boeking, ROAS) berekent de
 * pagina zelf uit de timeseries voor het gekozen datumbereik.
 */

const SAMPLE = {
  generated_at: "2026-06-19T12:00:00Z",
  currency: "EUR",
  booking_value: 27,
  is_sample: true,
  timeseries: [
    { date: "2026-06-06", spend: 14.2, impressions: 612, clicks: 21, leads: 2, downloads: 2, bookings: 0 },
    { date: "2026-06-07", spend: 12.8, impressions: 540, clicks: 18, leads: 1, downloads: 1, bookings: 0 },
    { date: "2026-06-08", spend: 15.6, impressions: 690, clicks: 24, leads: 3, downloads: 2, bookings: 1 },
    { date: "2026-06-09", spend: 13.1, impressions: 575, clicks: 19, leads: 2, downloads: 2, bookings: 0 },
    { date: "2026-06-10", spend: 16.9, impressions: 720, clicks: 27, leads: 4, downloads: 3, bookings: 1 },
    { date: "2026-06-11", spend: 11.4, impressions: 498, clicks: 16, leads: 1, downloads: 1, bookings: 0 },
    { date: "2026-06-12", spend: 14.7, impressions: 633, clicks: 22, leads: 3, downloads: 2, bookings: 0 },
    { date: "2026-06-13", spend: 13.9, impressions: 601, clicks: 20, leads: 2, downloads: 2, bookings: 1 },
    { date: "2026-06-14", spend: 15.2, impressions: 668, clicks: 23, leads: 3, downloads: 3, bookings: 0 },
    { date: "2026-06-15", spend: 12.3, impressions: 521, clicks: 17, leads: 2, downloads: 1, bookings: 1 },
    { date: "2026-06-16", spend: 16.1, impressions: 705, clicks: 26, leads: 3, downloads: 3, bookings: 0 },
    { date: "2026-06-17", spend: 14.5, impressions: 622, clicks: 21, leads: 2, downloads: 2, bookings: 1 },
    { date: "2026-06-18", spend: 13.6, impressions: 588, clicks: 19, leads: 2, downloads: 1, bookings: 0 },
    { date: "2026-06-19", spend: 15.8, impressions: 681, clicks: 25, leads: 3, downloads: 2, bookings: 1 }
  ],
  email: [
    { mail: "Mail 1 — E-book", sent: 33, opens: 27, clicks: 24 },
    { mail: "Herinnering 1", sent: 9, opens: 5, clicks: 3 },
    { mail: "Herinnering 2", sent: 6, opens: 2, clicks: 1 },
    { mail: "Nurture 1", sent: 33, opens: 21, clicks: 9 },
    { mail: "Nurture 2 — adviesgesprek", sent: 33, opens: 18, clicks: 6 }
  ],
  sources: [
    { campaign: "GNM-Specifiek", leads: 30, bookings: 6 },
    { campaign: "GNM-Algemeen", leads: 5, bookings: 1 },
    { campaign: "direct/overig", leads: 0, bookings: 0 }
  ]
};

export default async (req) => {
  const url = new URL(req.url);
  const key =
    req.headers.get("x-dashboard-key") || url.searchParams.get("key") || "";
  const expected = process.env.DASHBOARD_PASSWORD;

  const json = (body, status) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        "content-type": "application/json",
        "cache-control": "private, no-store",
      },
    });

  if (!expected) {
    return json({ error: "not_configured" }, 503);
  }
  if (key !== expected) {
    return json({ error: "unauthorized" }, 401);
  }

  let data = SAMPLE;
  const src = process.env.N8N_DASHBOARD_URL;
  if (src) {
    try {
      const r = await fetch(src, {
        headers: process.env.N8N_DASHBOARD_TOKEN
          ? { authorization: `Bearer ${process.env.N8N_DASHBOARD_TOKEN}` }
          : {},
      });
      if (r.ok) {
        data = await r.json();
      }
    } catch (e) {
      // val terug op SAMPLE
    }
  }

  return json(data, 200);
};

export const config = { path: "/api/dashboard-data" };
