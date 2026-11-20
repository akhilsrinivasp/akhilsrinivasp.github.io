<template>
    <div>
        <header>
            <nav ref="nav" class="nav">
                <!-- One stage lamp shared by all tabs: it glides to whichever tab is active. -->
                <span
                    ref="beam"
                    class="beam"
                    :class="{ on: lamp.on, ready }"
                    :style="{ '--beam-x': `${lamp.x}px`, '--beam-w': `${lamp.w}px` }"
                    aria-hidden="true"
                >
                    <span class="cone"></span>
                    <span class="motes"></span>
                    <span class="filament"></span>
                </span>
                <NuxtLink class="link" to="/education">Education</NuxtLink>
                <NuxtLink class="link" to="/experience">Experience</NuxtLink>
                <NuxtLink class="link" to="/skills">Skills</NuxtLink>
                <NuxtLink class="link" to="/projects">Projects</NuxtLink>
                <NuxtLink class="link" to="/about">About</NuxtLink>
                <NuxtLink class="link" to="/contact">Contact</NuxtLink>
            </nav>
        </header>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const nav = ref<HTMLElement | null>(null)
const beam = ref<HTMLElement | null>(null)
const lamp = reactive({ x: 0, w: 0, on: false })
const ready = ref(false)
const reducedMotion = usePreferredReducedMotion()

function place(link: HTMLElement | null | undefined) {
    if (!link) {
        lamp.on = false
        return
    }
    // offsetLeft ignores the links' entrance transform, so this is the settled position.
    lamp.x = link.offsetLeft
    lamp.w = link.offsetWidth
    lamp.on = true
}

const activeLink = () => nav.value?.querySelector<HTMLElement>('.router-link-exact-active')

// Tabs change size when they become active or are hovered (font-size transitions), which
// shifts their neighbours. Follow the active tab every frame for a moment after that.
let frame = 0
function follow(ms = 450) {
    cancelAnimationFrame(frame)
    const until = performance.now() + ms
    const tick = () => {
        place(activeLink())
        if (performance.now() < until) frame = requestAnimationFrame(tick)
    }
    tick()
}

// While it travels, the lamp leans the way it is moving and settles back upright.
function swing(distance: number) {
    if (!beam.value || Math.abs(distance) < 2 || reducedMotion.value === 'reduce') return
    const lean = Math.max(-18, Math.min(18, distance / 22))
    beam.value.animate(
        [
            { transform: 'skewX(0deg)' },
            { transform: `skewX(${-lean}deg)`, offset: 0.35 },
            { transform: 'skewX(0deg)' },
        ],
        { duration: 800, easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)' },
    )
}

// Move the lamp as soon as a tab is clicked, before the next page has loaded.
const stopBefore = router.beforeEach((to) => {
    const href = router.resolve(to).href
    const target = Array.from(nav.value?.querySelectorAll<HTMLElement>('.link') ?? [])
        .find((link) => link.getAttribute('href') === href)
    const from = lamp.x
    const wasOn = lamp.on
    place(target)
    if (wasOn && lamp.on) swing(lamp.x - from)
})
// ...then correct for the tabs resizing once the new one is marked active.
const stopAfter = router.afterEach(() => nextTick(() => follow()))

onMounted(() => {
    place(activeLink())
    document.fonts?.ready.then(() => follow(0))
    // Enable gliding only after the first placement, so the lamp doesn't fly in from the left.
    requestAnimationFrame(() => requestAnimationFrame(() => (ready.value = true)))
})

onBeforeUnmount(() => {
    stopBefore()
    stopAfter()
    cancelAnimationFrame(frame)
})

useEventListener(nav, 'mouseover', () => follow())
useEventListener(nav, 'mouseout', () => follow())
useEventListener('resize', () => follow(0))
</script>

<style scoped>
header {
    padding: 0;
    background-color: var(--color-bg);
    background-image: var(--gradient-nav);
    box-shadow: var(--shadow-bar);
}

.nav {
    position: relative;
    padding-block: 0.75rem;
    text-align: center;
    align-items: center;
    color: var(--color-text);
}

.nav > a:not(:last-of-type) {
    margin-inline-end: 3.5rem;
}

.link {
    position: relative;
    z-index: 1;
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: var(--color-text-soft);
    padding: 0;
    text-align: center;
    text-shadow: var(--shadow-text);
    text-decoration: none;
    transition: 0.2s;

    opacity: 0;
    animation: reveal 1s forwards;
    transform: translateX(100px);
}

.link:hover {
    font-size: var(--text-2xl);
    font-weight: var(--weight-medium);
}

.router-link-exact-active {
    color: var(--color-text);
    padding: 1.1%;
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    /* lit from below by the lamp */
    text-shadow: var(--shadow-text), 0 6px 18px rgb(255 255 255 / 0.35);
}

/* ---------- The lamp ---------- */
.beam {
    --spill: 1.25rem;
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: calc(var(--beam-x) - var(--spill));
    width: calc(var(--beam-w) + 2 * var(--spill));
    height: calc(100% + 2rem);
    pointer-events: none;
    transform-origin: 50% 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.beam.on {
    opacity: 1;
    animation: lamp-warm-up 1.2s 0.6s both;
}

.beam.ready {
    transition:
        left 0.6s cubic-bezier(0.65, 0, 0.35, 1),
        width 0.6s cubic-bezier(0.65, 0, 0.35, 1),
        opacity 0.5s ease;
}

/* volumetric cone: narrow at the filament, opening upwards, fading with height */
.cone,
.motes {
    position: absolute;
    inset: 0;
    clip-path: polygon(36% 100%, 64% 100%, 100% 0, 0 0);
}

.cone {
    background:
        radial-gradient(55% 60% at 50% 100%, rgb(255 255 255 / 0.55), transparent 75%),
        linear-gradient(to top,
            rgb(255 255 255 / 0.4),
            color-mix(in srgb, var(--color-accent) 22%, transparent) 50%,
            transparent 95%);
    filter: blur(2px);
    mix-blend-mode: screen;
    animation: lamp-breathe 5s ease-in-out infinite;
}

/* specks of dust drifting up through the light */
.motes {
    background-image:
        radial-gradient(1px 1px at 22% 30%, rgb(255 255 255 / 0.8), transparent),
        radial-gradient(1.5px 1.5px at 68% 62%, rgb(255 255 255 / 0.6), transparent),
        radial-gradient(1px 1px at 45% 85%, rgb(255 255 255 / 0.7), transparent),
        radial-gradient(1px 1px at 80% 18%, rgb(255 255 255 / 0.5), transparent),
        radial-gradient(1.5px 1.5px at 35% 55%, rgb(255 255 255 / 0.5), transparent);
    background-size: 100% 50%;
    mask-image: linear-gradient(to top, #000 30%, transparent);
    animation: lamp-dust 7s linear infinite;
    opacity: 0.7;
}

/* the bright source sitting on the bar's bottom edge */
.filament {
    position: absolute;
    bottom: 0;
    left: 30%;
    right: 30%;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(90deg, transparent, #fff 25%, #fff 75%, transparent);
    box-shadow:
        0 0 6px 1px rgb(255 255 255 / 0.8),
        0 0 18px 4px color-mix(in srgb, var(--color-accent) 45%, transparent);
}

@keyframes lamp-warm-up {
    0% { opacity: 0; }
    20% { opacity: 0.7; }
    28% { opacity: 0.2; }
    45% { opacity: 1; }
    52% { opacity: 0.6; }
    100% { opacity: 1; }
}

@keyframes lamp-breathe {
    50% { opacity: 0.75; }
}

@keyframes lamp-dust {
    to { background-position: 0 -100%; }
}

@media (prefers-reduced-motion: reduce) {
    .beam,
    .beam.ready {
        transition: none;
    }

    .beam.on,
    .cone,
    .motes {
        animation: none;
    }
}
</style>
