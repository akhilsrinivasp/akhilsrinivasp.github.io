# akhilsrinivasp

My personal portfolio, built with Nuxt 3 and hosted on GitHub Pages.

## Updating content

All content lives in `assets/data/*.json` (education, internships, volunteering, projects, skills, about). Logos and photos live in `assets/images/`; in the JSON files, refer to an image by its file name (e.g. `"logo": "oracle_logo.png"`).

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build in .output/public
```

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the static site and publishes it to GitHub Pages at https://akhilsrinivasp.github.io/akhilsrinivasp/.

One-time setup: on GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
