// v-reveal: tiles that are already on screen when a page opens play the scroll-reveal
// entrance on a timer; everything below the fold keeps the scroll-driven version.
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('reveal', {
        getSSRProps: () => ({}),
        mounted(el: HTMLElement) {
            const { top } = el.getBoundingClientRect()
            if (top >= window.innerHeight * 0.95) return
            const delay = (Math.max(0, top) / window.innerHeight) * 0.45
            el.style.setProperty('--reveal-delay', `${delay.toFixed(2)}s`)
            // Stays timer-driven from here on: handing back to the scroll timeline would snap a
            // half-visible tile back to half-revealed. Its scroll-away recede still applies.
            el.classList.add('reveal-now')
        },
    })

    if (import.meta.client) {
        nuxtApp.hook('app:mounted', () => document.documentElement.classList.remove('reveal-pending'))
    }
})
