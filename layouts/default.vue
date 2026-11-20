<template>
    <div>
        <!-- Soft teal spotlight that follows the cursor (desktop pointers only). -->
        <div v-if="showSpotlight" class="mouse-light" :style="spotlightStyle" aria-hidden="true"></div>
        <header class="">
            <MobileNavbar class="mobile" v-if="isMobile" />
            <SocialProfile class="desktop" v-else />
        </header>
        <div>
            <slot class="slot" />
        </div>
        <footer>
            <NavBar class="desktop" v-if="!isMobile" />
        </footer>
    </div>
</template>

<script setup lang="ts">
// Reactive media queries replace the old manual resize listeners.
// Only switch after mount: the prerendered HTML has the desktop header, and swapping
// it during hydration would leave the mobile bar with the desktop element's classes.
const mounted = useMounted()
const narrow = useMediaQuery('(max-width: 899px)')
const isMobile = computed(() => mounted.value && narrow.value)
const finePointer = useMediaQuery('(pointer: fine)')
const reducedMotion = usePreferredReducedMotion()

const { x, y, sourceType } = useMouse({ type: 'client' })
const showSpotlight = computed(() => finePointer.value && reducedMotion.value !== 'reduce' && sourceType.value === 'mouse')
const spotlightStyle = computed(() => ({ '--mx': `${x.value}px`, '--my': `${y.value}px` }))
</script>

<style scoped>
header {
    margin-top: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
}
footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-top: 5%;
}

.mouse-light {
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    background: radial-gradient(600px circle at var(--mx) var(--my), color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 45%);
}

@media (max-width: 1024px) {
    .desktop {
        opacity: 0;
    }
}
</style>
