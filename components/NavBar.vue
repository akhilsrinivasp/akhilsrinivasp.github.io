<template>
    <div>
        <header>
            <nav class="nav"> 
                    <NuxtLink class = 'link' to="/education">Education</NuxtLink>
                    <NuxtLink class = 'link' to="/experience">Experience</NuxtLink>
                    <NuxtLink class = 'link' to="/skills">Skills</NuxtLink>
                    <NuxtLink class = 'link' to="/projects">Projects</NuxtLink>
                    <NuxtLink class = 'link' to="/about">About</NuxtLink>
                    <NuxtLink class = 'link' to="/contact">Contact</NuxtLink>                
            </nav>
        </header>
    </div>
</template>
<style scoped>
header {
    padding: 0;
    background-color: var(--color-bg);
    background-image: var(--gradient-nav);
    box-shadow: var(--shadow-bar);
}
.nav {
    padding-block: 0.75rem;
    text-align: center;
    align-items: center;
    color: var(--color-text);
}
.nav > :not(:last-child) {
    margin-inline-end: 3.5rem;
}
.link {
    font-family: var(--font-body);
    font-size: var(--text-4xl);
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

@keyframes reveal {
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.link:hover {
    font-size: var(--text-8xl);
    font-weight: var(--weight-medium);
}
.router-link-exact-active {
    color: var(--color-text-soft);
    background-image: url("~/assets/images/link-active.png");
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 100px;
    background-position-x: 50%;
    padding: 1.1%;
    font-size: var(--text-5xl);
    font-weight: var(--weight-bold);
}
</style>