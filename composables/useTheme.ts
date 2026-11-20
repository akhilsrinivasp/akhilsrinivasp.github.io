// Light/dark theme. The current theme lives on <html data-theme>, set before first paint by
// the script in nuxt.config.ts (saved choice, else light). This composable
// reads it after mount, switches it, and remembers an explicit choice.
export type Theme = 'light' | 'dark'

export const THEME_KEY = 'theme'

export function useTheme() {
    const theme = useState<Theme>('theme', () => 'light')
    const mounted = useMounted()

    onMounted(() => {
        theme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    })

    function apply(next: Theme) {
        document.documentElement.dataset.theme = next
        theme.value = next
        const bg = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg)
    }

    // The new theme grows out of the button in a circle (View Transitions API).
    function toggle(event?: Event) {
        const next: Theme = theme.value === 'light' ? 'dark' : 'light'
        try {
            localStorage.setItem(THEME_KEY, next)
        } catch {
            /* private mode: the choice just won't be remembered */
        }

        const root = document.documentElement
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!document.startViewTransition || reduce) {
            apply(next)
            return
        }

        const target = event?.currentTarget as Element | undefined
        const box = target?.getBoundingClientRect()
        const x = box ? box.left + box.width / 2 : window.innerWidth / 2
        const y = box ? box.top + box.height / 2 : 0
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
        root.style.setProperty('--vt-x', `${x}px`)
        root.style.setProperty('--vt-y', `${y}px`)
        root.style.setProperty('--vt-r', `${radius}px`)

        root.classList.add('theme-switching')
        const transition = document.startViewTransition(() => apply(next))
        transition.finished.finally(() => root.classList.remove('theme-switching'))
    }

    return { theme, mounted, toggle }
}
