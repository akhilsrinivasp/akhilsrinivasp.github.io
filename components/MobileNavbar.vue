<template>
    <div>
        <div class="navbar" :class="{ 'navbar-blue': scrolled }">
            <Icon class="toggle" name="grommet-icons:braille" @click="toggleDropdown" />
            <NuxtLink class='home-link' to="/">Akhil</NuxtLink>
        </div>
        <!-- At the end of a page, keep scrolling to open the menu without reaching for the top. -->
        <div class="pull-hint" :class="{ show: hintVisible }" :style="{ '--pull': progress }" aria-hidden="true">
            <Icon name="simple-line-icons:arrow-up" class="pull-icon" />
            <span>Keep scrolling for menu</span>
        </div>
        <div ref="dropDown" id="dropdown" :class="{ 'from-bottom': fromBottom }"
            :style="{ display: dropdownVisible ? 'block' : 'none' }">
            <Icon class="toggle" name="simple-line-icons:arrow-up" @click="toggleDropdown" />
            <br>
            <NuxtLink class='link' @click="toggleDropdown" to="/">Home</NuxtLink> <br>
            <NuxtLink class='link' @click="toggleDropdown" to="/education">Education</NuxtLink> <br>
            <NuxtLink class='link' @click="toggleDropdown" to="/experience">Experience</NuxtLink> <br>
            <NuxtLink class='link' @click="toggleDropdown" to="/skills">Skills</NuxtLink> <br>
            <NuxtLink class='link' @click="toggleDropdown" to="/projects">Projects</NuxtLink> <br>
            <NuxtLink class='link' @click="toggleDropdown" to="/about">About Me</NuxtLink> <br>
            <NuxtLink class='link' @click="toggleDropdown" to="/contact">Contact</NuxtLink> <br>

            <div class="socials" align="center">
                <a href="https://www.linkedin.com/in/akhilsrinivasp/" target="_blank">
                    <Icon name="uil:linkedin" class="icon-class" />
                </a>
                <a href="https://www.github.com/akhilsrinivasp/" target="_blank">
                    <Icon name="uil:github" class="icon-class" />
                </a>
                <a href="https://www.instagram.com/akhilsrinivasp/" target="_blank">
                    <Icon name="uil:instagram" class="icon-class" />
                </a>
                <a href="https://twitter.com/akhilsrinivasp" target="_blank">
                    <Icon name="uil:twitter" class="icon-class" />
                </a>
            </div>
            <br>
            <Icon class="toggle" name="grommet-icons:close" @click="toggleDropdown" />
        </div>
    </div>
</template>
<script setup lang="ts">
const dropdownVisible = ref(false)
const fromBottom = ref(false)
const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value
    if (!dropdownVisible.value) fromBottom.value = false
}
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 40)

// ---------- Pull past the end of the page to open the menu ----------
const PULL_DISTANCE = 110 // px of extra scrolling needed
const pull = ref(0)
const progress = computed(() => Math.min(1, pull.value / PULL_DISTANCE))
const atEnd = ref(false)
let endSince = 0

const isAtBottom = () =>
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2

function updateEnd() {
    const now = isAtBottom()
    if (now && !atEnd.value) endSince = performance.now()
    if (!now) pull.value = 0
    atEnd.value = now
}

function openFromBottom() {
    pull.value = 0
    fromBottom.value = true
    dropdownVisible.value = true
}

function addPull(px: number) {
    pull.value = Math.max(0, pull.value + px)
    if (pull.value >= PULL_DISTANCE) openFromBottom()
}

// Show the hint once the reader has scrolled to the end (not on pages that fit the screen),
// or while they are pulling.
const hintVisible = computed(() => !dropdownVisible.value && (pull.value > 0 || (atEnd.value && y.value > 40)))

watch(y, updateEnd)
const route = useRoute()
watch(() => route.path, () => setTimeout(updateEnd, 400))
onMounted(updateEnd)

// Touch: the gesture has to start at the bottom, so the momentum of reaching the end doesn't count.
let touchY: number | null = null
let touchPulled = 0
useEventListener('touchstart', (e: TouchEvent) => {
    touchY = !dropdownVisible.value && isAtBottom() ? e.touches[0].clientY : null
    touchPulled = 0
}, { passive: true })
useEventListener('touchmove', (e: TouchEvent) => {
    if (touchY === null) return
    const travelled = Math.max(0, touchY - e.touches[0].clientY)
    addPull(travelled - touchPulled)
    touchPulled = travelled
}, { passive: true })
useEventListener('touchend', () => {
    touchY = null
    if (!dropdownVisible.value) pull.value = 0
}, { passive: true })

// Wheel/trackpad: ignore the first moment at the bottom (scroll momentum), and let the
// pull fade if the reader stops.
let wheelDecay: ReturnType<typeof setTimeout> | undefined
useEventListener('wheel', (e: WheelEvent) => {
    if (dropdownVisible.value || e.deltaY <= 0 || !isAtBottom()) {
        if (e.deltaY < 0) pull.value = 0
        return
    }
    if (performance.now() - endSince < 400) return
    addPull(e.deltaY * 0.5)
    clearTimeout(wheelDecay)
    wheelDecay = setTimeout(() => (pull.value = 0), 500)
}, { passive: true })
</script>
<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text);
    transition: background-color 0.2s ease-in-out;

    opacity: 0;
    animation: reveal 1s forwards;
    transform: translateX(100px);
}

.navbar-blue {
    background-color: var(--color-bg);
}

.toggle {
    cursor: pointer;
    width: 9%;
    height: 9%;
    margin: 2.5% 5%;
}

/* add transition to entry of dropdown */

#dropdown {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1000px;
    background-color: var(--color-surface-inverse);
    z-index: 10;

    text-align: center;
    font-family: var(--font-body);
    font-size: var(--text-2xl);
    color: var(--color-text-inverse);
    padding-top: 5%;
    padding-bottom: 5%;
    transition: 0.2s ease-in-out;

    opacity: 0;
    animation: reveal 0.5s forwards;
    transform: translateY(-100px);
}

#dropdown.from-bottom {
    transform: translateY(100px);
}

.pull-hint {
    position: fixed;
    left: 50%;
    bottom: calc(1rem + env(safe-area-inset-bottom));
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    overflow: hidden;
    border-radius: 999px;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    letter-spacing: 0.05rem;
    white-space: nowrap;
    color: var(--color-text);
    background: color-mix(in srgb, var(--color-bg) 80%, transparent);
    box-shadow: var(--shadow-glow);
    backdrop-filter: blur(8px);
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, 1.5rem);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.pull-hint.show {
    opacity: 1;
    transform: translate(-50%, calc(var(--pull) * -0.75rem));
}

/* fills from left to right as the reader keeps pulling */
.pull-hint::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: color-mix(in srgb, var(--color-accent) 35%, transparent);
    transform-origin: left;
    transform: scaleX(var(--pull));
}

.pull-icon {
    width: 14px;
    height: 14px;
    transform: translateY(calc(var(--pull) * -3px));
}

.home-link {
    font-family: var(--font-script);
    font-size: var(--text-5xl);
    color: var(--color-accent);
    margin: 2.5% 6% 0;
    text-align: center;
    text-shadow: var(--shadow-text);
    text-decoration: none;
    transition: 0.2s;
}

@media (prefers-reduced-motion: reduce) {
    .pull-hint {
        transition: opacity 0.3s ease;
    }
}

.socials {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 77%;
    transform: translate(15%, 90%);
}
</style>