// Gedeelde feiten voor de twee sales pages van "Thuiskomen in je Vrouwenlijf":
// de lange pagina (/thuiskomen-in-je-vrouwenlijf/) en de korte pagina (/thuiskomen/).
// Eén plek, zodat de twee pagina's nooit uit de pas lopen.

// Inschrijving sluit maandag 5 oktober 2026 om 23:59 (Amsterdam). Vanaf dit moment
// schakelen beide pagina's om naar de wachtlijst (zie SignupSwitch.astro).
export const THUISKOMEN_CLOSE_AT_ISO = "2026-10-06T00:00:00+02:00";

// Plug&Pay-checkout (shop 26520, checkout 273649). Eén betaalpagina met beide opties
// (€997 ineens / 3 × €365); de koper kiest daar. De aankoop wordt server-side gemeten:
// Plug&Pay-webhook "Bestelling betaald" → n8n (EKBaaZoQ32pJeqaf) → GA4 Measurement Protocol.
export const CHECKOUT_URL = "https://shop.crystalhelder.nl/checkout/thuiskomen-in-je-vrouwenlijf";

export const WACHTLIJST_URL = "/wachtlijst/";
