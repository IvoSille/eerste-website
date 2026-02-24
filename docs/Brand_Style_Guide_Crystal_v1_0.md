# **Visual & UI Brand Style Guide**

*Dit document bevat de strikte visuele kaders en 'vibes' voor dit project. Gebruik dit als je absolute bron van waarheid voor designbeslissingen.*

## **1\. DESIGN PRINCIPLES & VIBE**

* **Visueel Archetype:** De Empatische Autoriteit. Een brug tussen biologische, medische logica en menselijke, vrouwelijke zachtheid.  
* **Sfeer / Vibe:** Veilig, geaard, professioneel, warm en nuchter. Absoluut NIET zweverig, mystiek of klinisch.  
* **Design Principes:**  
  1. **Extreme Ademruimte:** Gebruik royale whitespace. De doelgroep (vrouwen met chronische pijn en stress) heeft visuele rust nodig. Geen drukke achtergronden of overlappende chaos.  
  2. **Biologische Logica:** Het design moet betrouwbaarheid en autoriteit uitstralen (denk aan een premium, moderne kliniek, maar dan met een ziel).  
  3. **Fotografie Centraal:** Ruimte voor warme, professionele portretfotografie waarbij de kledingkleuren overvloeien in het webdesign.  
* **Vormtaal:** Organisch en zacht. Gebruik uitsluitend afgeronde hoeken ("ronde dingetjes"). Geen harde, zakelijke 90-graden hoeken in de UI-elementen.

## **2\. DESIGN TOKENS (TAILWIND / CSS FOCUS)**

**Belangrijke Restrictie:** Gebruik NOOIT blauw (te klinisch/ziekenhuis) en NOOIT hard rood. Vermijd zwaar/donkergroen.

### **2.1 Kleurenpalet (Warme, Aardse Tones)**

*Let bij het combineren van deze kleuren extreem goed op de WCAG-toegankelijkheidseisen. Zorg altijd voor een hoog contrast, vooral voor vermoeide ogen.*

* **Background Base (Achtergrond):** \#FAF7F5 (Een hele zachte, warme off-white/sand tint. Gebruik geen spierwit \#FFFFFF als hoofdachtergrond om oogvermoeidheid te voorkomen).  
* **Text Primary:** \#2C2624 (Diep, warm donkerbruin/antraciet. Gebruik geen hard zwart).  
* **Text Secondary/Muted:** \#7A6F6C (Zacht taupe/grijsbruin voor minder belangrijke tekst).  
* **Primary Accent (Buttons & CTA's):** \#C8664D (Terracotta/Koper \- De hoofdkleur voor actie en warmte). *Hover state:* \#A8533D.  
* **Secondary Accent (Subtiele highlights/vlakken):** \#EADAD3 (Licht terracotta/poederkleur voor zachte achtergrondvlakken).  
* **Semantic Accent (Ter vervanging van groen):** \#D3DEC6 (Een hele lichte, zachte saliegroen. Alleen voor subtiele accenten of vinkjes, brengt een vleugje natuur/biologie zonder zwaar te zijn).

### **2.2 Typografie (Google Fonts)**

*Zorg dat je deze fonts daadwerkelijk inlaadt via Google Fonts in de \<head\> van de Astro base-layout.*

* **Primary Font (Headings H1, H2, H3):** Outfit of DM Sans. (Schoon, rond, uiterst leesbaar en modern. Vriendelijk maar toch professioneel en niet te 'businessy'). Gebruik font-weight 500 of 600\.  
* **Secondary Font (Body):** Lato of Inter. (Helder, nuchter, strak). Gebruik font-weight 400\.  
* **Typografische Schaal:** Zorg voor een enorm duidelijk contrast. H1 mag groot en uitnodigend zijn, body-text moet groot genoeg zijn voor vermoeide ogen (minimaal 17px of 18px / text-lg).

## **3\. UI COMPONENTEN & STYLING**

* **Buttons (CTA's):** Volledig afgeronde hoeken (rounded-full of pill-shape). Geef ze een royale padding (px-8 py-4) en een zeer zachte, diffuse schaduw in een warme tint (geen harde grijze schaduwen).  
* **Cards, Containers & Afbeeldingen:** Zachte afronding (rounded-2xl of rounded-3xl). Gebruik geen harde borders (border-width: 0), maar definieer secties met lichte achtergrondkleuren (bijv. de poederkleur of saliegroen) of uiterst zachte box-shadows.  
* **Densiteit & Spacing:** Zeer luchtig. Gebruik minimaal py-24 of py-32 in Tailwind tussen grote secties om het gevoel van druk/stress weg te nemen.

## **4\. INTERACTIE & BEWEGING**

* **Transitiesnelheid:** Traag, kalm en vloeiend. Gebruik 300ms ease-in-out voor alle hover-effecten.  
* **Interacties:** Geen agressieve pop-ups, geen snelle schuifanimaties. Alleen subtiele 'fade-in' of een zachte lift (-translate-y-1) bij het hoveren over knoppen of kaarten. Het moet aanvoelen als ademhalen.