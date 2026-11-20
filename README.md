# akhilsrinivasp.github.io

Source for my portfolio at **https://akhilsrinivasp.github.io/**, built with Nuxt 3 and deployed to GitHub Pages.

My resume is in this repo: [Resume - Akhil Srinivas Parimala.pdf](./Resume%20-%20Akhil%20Srinivas%20Parimala.pdf).

## Updating content

All content lives in `assets/data/*.json` (education, internships, volunteering, projects, skills, about). Logos and photos live in `assets/images/`; in the JSON files, refer to an image by its file name (e.g. `"logo": "oracle_logo.png"`).

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build in .output/public
```

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the static site and publishes it to GitHub Pages.

One-time setup: on GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
