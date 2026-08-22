# Deterica — Landing Page

Marketing landing page for **DETERICA LLC** — a U.S. e-commerce company that sells on
Amazon and eBay and builds **Deterica**, an AI listing-intelligence platform.

## Stack

Static HTML/CSS/JS. No build step, no dependencies. Fonts load from Google Fonts.

- `index.html` — page markup
- `styles.css` — design system (ink + brass + paper palette; Fraunces / Inter / IBM Plex Mono)
- `script.js` — mobile nav, scroll reveals, waitlist form handler

## Run locally

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo (e.g. `deterica-website`) and push these files to `main`.
2. In **Settings → Pages**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. The site publishes at `https://<user>.github.io/<repo>/`.

For a custom domain (e.g. `deterica.com`), add a `CNAME` file containing the domain and
point your DNS at GitHub Pages.

## To finish before launch

- Wire the email form in `script.js` (`Deterica.submitWaitlist`) to a real endpoint
  (Formspree, a serverless function, or your CRM).
- Replace `hello@deterica.com` with the real contact address.
- Swap the company photo in `index.html` (`.company-media img`) for a branded image if desired.
