<template>
    <div>
        <div class="navbar" :class="{ 'navbar-blue': scrolled }">
            <Icon class="toggle" name="grommet-icons:braille" @click="toggleDropdown" />
            <NuxtLink class='home-link' to="/">Akhil</NuxtLink>
        </div>
        <div ref="dropDown" id="dropdown" :style="{ display: dropdownVisible ? 'block' : 'none' }">
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
const toggleDropdown = () => { dropdownVisible.value = !dropdownVisible.value }
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 40)
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

.socials {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 77%;
    transform: translate(15%, 90%);
}
</style>