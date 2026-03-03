# Shoe Investments — Website

Een zelfbeheerde statische website. Geen server, geen kosten, geen externe partij nodig.

---

## Hoe werkt het?

De website bestaat uit gewone HTML-bestanden. Je kunt ze openen in elke tekstverwerker (Notepad, TextEdit, VS Code, etc.) en direct aanpassen.

### Pagina's

| Bestand | Pagina |
|---|---|
| `index.html` | Homepagina |
| `over-ons.html` | Over Ons |
| `team.html` | Team |
| `portfolio.html` | Portfolio |
| `fondsen.html` | Fondsen |
| `esg.html` | ESG |
| `stage.html` | Stage |
| `actueel.html` | Actueel / Nieuws |
| `contact.html` | Contact |
| `css/style.css` | Alle opmaak (kleuren, lettertypen, layout) |
| `js/main.js` | Navigatie, taalkeuze (NL/EN), mobiel menu |
| `js/portfolio-filter.js` | Filter tabs op de portfoliopagina |

---

## Hoe pas ik tekst aan?

1. Open het juiste `.html` bestand in een teksteditor
2. Zoek de tekst die je wilt aanpassen (gebruik Ctrl+F / Cmd+F)
3. Elke tekst heeft twee versies: **NL** en **EN**:
   ```html
   <p data-nl="Nederlandse tekst" data-en="English text">Nederlandse tekst</p>
   ```
4. Pas beide versies aan
5. Sla het bestand op
6. Ververs de pagina in je browser

### Nieuws toevoegen (actueel.html)

Kopieer een bestaand nieuwskaartje en plak het erin:

```html
<div class="news-card">
  <div class="news-source">NAAM VAN MEDIUM</div>
  <h3 data-nl="Titel in het Nederlands" data-en="Title in English">Titel in het Nederlands</h3>
  <p data-nl="Korte beschrijving NL" data-en="Short description EN">Korte beschrijving NL</p>
  <div style="margin-top:12px;font-size:0.75rem;color:var(--grey-text);">Portfoliobedrijf</div>
</div>
```

### Teamlid toevoegen (team.html)

Kopieer een bestaand `team-card` blok en pas naam, functie en bio aan.

### Portfolio bedrijf toevoegen (portfolio.html)

Kopieer een bestaand `portfolio-card` blok:

```html
<div class="portfolio-card" data-type="current">
  <div class="portfolio-company">BEDRIJFSNAAM</div>
  <div class="portfolio-meta" data-nl="Founder: Naam" data-en="Founder: Name">Founder: Naam</div>
  <div class="portfolio-meta" data-nl="Partner sinds 20XX" data-en="Partner since 20XX">Partner sinds 20XX</div>
  <span class="portfolio-badge badge-current" data-nl="Huidig" data-en="Current">Huidig</span>
</div>
```

Gebruik `data-type="exit"` en `badge-exit` voor afgeronde investeringen.

---

## Lokaal testen

Aanbevolen preview-methode:

```bash
cd /Users/cecedeboon/Documents/Projects/shoe-investments-website
python3 -m http.server 4321
```

Open daarna `http://localhost:4321` in Google Chrome:

```bash
open -a "Google Chrome" http://localhost:4321
```

Dit benadert het gedrag van de live website beter dan `file://`.

Fallback: je kunt nog steeds op `index.html` dubbelklikken om de site direct in je browser te openen. Alle links werken lokaal zonder server.

---

## Online zetten (gratis hosting)

### Optie 1: GitHub Pages (aanbevolen)

Gebruik voor deze repository:

1. Repo: `cecedeboon-png/shoe-investments-website`
2. GitHub Pages bron: `main` branch, root (`/`)
3. Het bestand `.nojekyll` staat al in de repo om statische hosting veilig te laten werken
4. Verwachte URL: `https://cecedeboon-png.github.io/shoe-investments-website/`
5. Elke push naar `main` publiceert automatisch een nieuwe versie
6. Deel simpelweg de GitHub Pages URL met teammates voor review in Chrome

### Optie 2: Netlify

1. Maak een gratis account op [netlify.com](https://netlify.com)
2. Sleep de volledige `website/` map naar het Netlify dashboard
3. Je website is direct live
4. Koppel je eigen domein in de instellingen

### Eigen domeinnaam koppelen

Bij je domeinnaamregistrar (bijv. TransIP, Strato) stel je in:
- `A record` → naar het IP-adres van GitHub Pages / Netlify
- Of `CNAME record` → naar het subdomein dat GitHub / Netlify je geeft

Handleidingen staan op de websites van GitHub Pages en Netlify.

---

## Contactformulier

Het contactformulier opent het e-mailprogramma van de bezoeker (`mailto:`). Dit werkt zonder server.

**Wil je een echte server-side formulier?** Gebruik [Formspree](https://formspree.io) (gratis):
1. Maak een account en formulier aan
2. Vervang in `contact.html` de `action="mailto:..."` door `action="https://formspree.io/f/JOUW_ID" method="POST"`
3. Verwijder `enctype="text/plain"`

---

## Kleuren aanpassen

In `css/style.css` bovenaan staan de kleuren als CSS-variabelen:

```css
:root {
  --navy: #0A2342;        /* Donkerblauw (nav, footer, headers) */
  --blue: #1C5FA8;        /* Accent blauw (links, badges, accenten) */
  --grey-bg: #F7F8FA;     /* Lichtgrijze achtergrond secties */
  --grey-border: #e2e6ea; /* Randen van kaartjes */
}
```

Pas de hexadecimale kleurcodes aan naar wens.

---

## Vragen?

Neem contact op met degene die de website heeft opgezet.
