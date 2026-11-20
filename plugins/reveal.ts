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
            el.classList.add('reveal-now')
            // Once the entrance has played, keep only the scroll-away recede. Removing the
            // entrance means hovering (which pauses animations) has nothing to replay, and we
            // never hand back to the scroll-driven entrance, which would snap a half-visible
            // tile back to half-revealed.
            const settle = (e: AnimationEvent) => {
                if (e.target !== el || e.animationName !== 'scroll-reveal') return
                el.classList.replace('reveal-now', 'revealed')
                el.removeEventListener('animationend', settle)
            }
            el.addEventListener('animationend', settle)
        },
    })

    if (import.meta.client) {
        nuxtApp.hook('app:mounted', () => document.documentElement.classList.remove('reveal-pending'))
    }
})
