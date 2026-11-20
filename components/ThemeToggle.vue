<!-- Switches between light and dark. Shows the theme you'd switch to. -->
<template>
    <button class="theme-toggle" type="button" :aria-label="label" :title="label" @click="toggle">
        <span class="icons" :class="{ 'is-light': isLight }" aria-hidden="true">
            <Icon name="uil:sun" class="icon sun" />
            <Icon name="uil:moon" class="icon moon" />
        </span>
        <span v-if="withText" class="text">{{ isLight ? 'Dark mode' : 'Light mode' }}</span>
    </button>
</template>

<script setup lang="ts">
defineProps<{ withText?: boolean }>()
const { theme, mounted, toggle } = useTheme()
// Before mount the server can't know the theme, so render as light (the default) and correct after.
const isLight = computed(() => !mounted.value || theme.value === 'light')
const label = computed(() => (isLight.value ? 'Switch to dark mode' : 'Switch to light mode'))
</script>

<style scoped>
.theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem;
    border-radius: 999px;
    color: inherit;
    font-family: var(--font-body);
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.theme-toggle:hover {
    background-color: color-mix(in srgb, currentColor 12%, transparent);
}

.theme-toggle:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

/* sun and moon stacked; the one not in use turns away and fades */
.icons {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 28px;
}

.icon {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease;
}

.moon {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
}

.is-light .sun {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
}

.is-light .moon {
    opacity: 1;
    transform: none;
}

.text {
    font-size: var(--text-lg);
}

@media (prefers-reduced-motion: reduce) {
    .icon {
        transition: opacity 0.2s ease;
    }
}
</style>
