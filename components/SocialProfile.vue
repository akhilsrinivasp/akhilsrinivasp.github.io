<template>
    <div>
        <nav class="navbar" :class="{ 'navbar-blue': scrolled }">
            <div class="socials">
                <a href="https://www.linkedin.com/in/akhilsrinivasp/" target="_blank">
                    <Icon name="uil:linkedin" class="icon-class" />
                </a>
                <a href="https://www.github.com/akhilsrinivasp/" target="_blank">
                    <Icon name="uil:github" class="icon-class" />
                </a>
            </div>
            <NuxtLink class='home-link' to="/">Akhil</NuxtLink>
            <div class="socials">
                <a href="https://www.instagram.com/akhilsrinivasp/" target="_blank">
                    <Icon name="uil:instagram" class="icon-class" />
                </a>
                <a href="https://twitter.com/akhilsrinivasp" target="_blank">
                    <Icon name="uil:twitter" class="icon-class" />
                </a>
            </div>
            <ThemeToggle class="theme-toggle-desktop" />
        </nav>

    </div>
</template>
<script setup lang="ts">
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 35)
</script>
<style scoped>
.navbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text);
    padding: 0 28% 0;
    top: 0;
    width: 100%;
    transition: background-color 0.2s ease-in-out;
}

.navbar-blue {
    background-color: var(--color-bg);
}

.socials {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 175px;
    transform: translate(0, 0);

    opacity: 0;
    animation: reveal 1s forwards;
    transform: translateY(50px);
    animation-delay: 1s;
}


.home-link {
    font-family: var(--font-script);
    font-size: var(--text-5xl);
    color: var(--color-accent);
    padding: 0 2%;
    padding-top: 0%;
    text-align: center;
    text-shadow: var(--shadow-text);
    text-decoration: none;
    transition: 0.2s;
}

.home-link:hover {
    font-size: var(--text-6xl);
}

.router-link-exact-active {
    font-size: var(--text-7xl);
}

.theme-toggle-desktop {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    translate: 0 -50%;
    opacity: 0;
    animation: reveal 1s 1s forwards;
}

.icon-class {
    width: 45px;
    height: 45px;
    margin: 0;
    padding: 0;
    transition: 0.2s;
}

.icon-class:hover {
    width: 60px;
    height: 60px;
}</style>