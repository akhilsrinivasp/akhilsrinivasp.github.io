# akhilsrinivasp.github.io

Source for my portfolio at **https://akhilsrinivasp.github.io/**, built with Nuxt 3 and deployed to GitHub Pages.

My resume is in this repo: [Resume - Akhil Srinivas Parimala.pdf](./Resume%20-%20Akhil%20Srinivas%20Parimala.pdf).

## Updating content

All content lives in `assets/data/*.json` (education, internships, volunteering, projects, skills, about). Logos and photos live in `assets/images/`; in the JSON files, refer to an image by its file name (e.g. `"logo": "oracle_logo.png"`).

## Styling

Plain CSS, no framework. Colours, font sizes, weights, shadows and radii live as CSS variables in `assets/css/tokens.css`; components use `var(--…)` instead of hardcoded values. `assets/css/reset.css` is the base reset, and `assets/css/styles.css` holds global pieces such as the shared `.card` surface and the scroll/page-transition animations.

## Running locally

Needs Node 26 LTS (or 24.15+) and npm 11+; `.nvmrc` pins the version.

```bash
nvm use
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build in .output/public
```

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the static site and publishes it to GitHub Pages.

One-time setup: on GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
