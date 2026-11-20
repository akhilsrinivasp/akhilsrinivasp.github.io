// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },

  // The site is a static export for GitHub Pages; there are no server routes.
  ssr: true,

  app: {
    head: {
      title: 'Akhil Srinivas Parimala',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '#f4f5f7' },
        { property: 'og:title', content: 'Akhil Srinivas Parimala' },
        { property: 'og:site_name', content: 'Akhil Srinivas Parimala' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (process.env.NUXT_APP_BASE_URL || '/') + 'favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Marck+Script&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' },
      ],
      script: [
        {
          // Theme before first paint: the visitor's saved choice, else light.
          innerHTML:
            "(function(){var t='light';try{t=localStorage.getItem('theme')==='dark'?'dark':'light'}catch(e){}document.documentElement.dataset.theme=t})()",
          tagPosition: 'head',
        },
        {
          // Hide tiles until plugins/reveal.ts has picked which to animate; never longer than 2.5s.
          innerHTML:
            "document.documentElement.classList.add('reveal-pending');setTimeout(function(){document.documentElement.classList.remove('reveal-pending')},2500)",
          tagPosition: 'head',
        },
      ],
    },
  },

  // Native View Transitions API: route changes cross-fade and shared elements morph.
  experimental: {
    viewTransition: true,
  },

  modules: ['@nuxt/icon', '@vueuse/nuxt'],

  icon: {
    // Inline SVGs (like the old nuxt-icon) so the `color` attribute keeps working,
    // and bundle the used icons so the static site never calls the Iconify API.
    mode: 'svg',
    serverBundle: 'local',
    clientBundle: { scan: true },
  },

  // tokens → reset → global styles; components consume the tokens via var(--…)
  css: ['~/assets/css/tokens.css', '~/assets/css/reset.css', '~/assets/css/styles.css'],
})
