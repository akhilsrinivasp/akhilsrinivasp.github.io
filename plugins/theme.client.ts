// Follow the system light/dark setting live, until the visitor picks a theme themselves.
import { THEME_KEY } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)')
    query.addEventListener('change', (event) => {
        let saved: string | null = null
        try {
            saved = localStorage.getItem(THEME_KEY)
        } catch {
            /* storage blocked: keep following the system */
        }
        if (saved) return
        const next = event.matches ? 'light' : 'dark'
        document.documentElement.dataset.theme = next
        useState('theme').value = next
    })
})
