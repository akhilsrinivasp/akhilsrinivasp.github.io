<template>
    <div class="landing-page grid-container">
        <div class="image-container">
            <img class="profile-pic" src="~/assets/images/Akhil.png" alt="profile">
        </div>
        <div class="text-container">
            <h1 class="roles" :aria-label="`I am ${messages.join(', ')}`">
                <span class="default-text" aria-hidden="true">{{ prefixText }}</span>
                <span class="typed-text" aria-hidden="true">{{ typedText }}</span>
                <span class="cursor" aria-hidden="true">|</span>
            </h1>
            <div class="description">
                Welcome to the digital realm where creativity thrives,
                A symphony of ideas, where imagination takes its dives.
            </div>
            <div class="description">
                Step into my virtual abode, a kaleidoscope of passion and dreams,
                Where pixels dance and words weave, unveiling endless streams.
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
const messages = [
    "a Student!",
    "a Software Engineer!",
    "a Full Stack Developer!",
    "a Cloud Enthusiast!",
    "working with Vue.",
    "working with Nuxt.",
    "working with Flask.",
    "working with MERN Stack.",
    "working with AWS!",
]
const { prefixText, typedText } = useTypewriter("I am ", messages)
</script>
  
<style scoped>
.landing-page {
    background-color: var(--color-bg);
    height: 100vh;
    justify-content: center;
    align-items: center;
    padding: 15%;
    background-image: url("~/assets/images/home-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.profile-pic {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    object-fit: cover;
    border: 5px solid white;
    box-shadow: var(--shadow-glow);
    transition: 0.2s;
    opacity: 0;
    animation: reveal 1s forwards;
    transform: translateX(-100px);
}

.text-container > :not(:last-child) {
    margin-bottom: 1rem;
}

.cursor {
    display: inline-block;
    color: var(--color-text);
    margin-left: 2px;
    animation: blinkCursor 1s steps(1) infinite;
}

@keyframes blinkCursor {
    50% {
        opacity: 0;
    }
}

.image-container {
    padding: 1.25rem;
}

.text-container {
    display: flex;
    flex-direction: column;
    opacity: 0;
    animation: reveal 1s forwards;
    transform: translateX(-100px);
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-delay: 0.3s;
}

.description {
    font-family: var(--font-body);
    opacity: 0;
    color: var(--color-text);
    animation: reveal 1s forwards;
    opacity: 0;
    transform: translateX(-100px);
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-delay: 0.3s;
}


@media (min-width: 1024px) {
    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        column-gap: 50px;
    }

    .landing-page {
        background-color: var(--color-bg);
        height: 100vh;
        justify-content: center;
        align-items: center;
        padding: 15%;
        background-image: url("~/assets/images/home-bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
    }

    .profile-pic {
        width: 250px;
    }

    .profile-pic:hover {
        border-radius: 80% 20% 70% 30% / 26% 71% 29% 74%;
        width: 300px;
        box-shadow: var(--shadow-glow-strong);
    }

    .roles {
        max-width: 600px;
        padding: 0 20px;
    }

    .default-text {
        color: var(--color-text);
        font-size: var(--text-2xl);
        /* text-align: center; */
    }

    .typed-text {
        color: var(--color-text);
        font-size: var(--text-4xl);
        /* text-align: center; */
    }

    .cursor {
        font-size: var(--text-4xl);
    }

    .description {
        font-size: var(--text-md);
        font-weight: var(--weight-medium);
        padding: 0 0 0 20px;
        text-align: justify;
    }
}

@media (max-width: 1024px) {

    .landing-page {
        background-color: var(--color-bg);
        height: 100vh;
        padding: 10%;
        background-image: url("~/assets/images/home-bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
    }

    .profile-pic {
        width: 250px;
    }

    .image-container {
        margin-top: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile-pic:hover {
        border-radius: 80% 20% 70% 30% / 26% 71% 29% 74%;
        width: 300px;
        box-shadow: var(--shadow-glow-strong);
    }

    .text-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .roles {
        max-width: 600px;
        padding: 0 20px;
        height: 90px;
        text-align: center;
    }

    .default-text {
        color: var(--color-text);
        font-size: var(--text-xl);
        /* text-align: center; */
    }

    .typed-text {
        color: var(--color-text);
        font-size: var(--text-2xl);
        /* text-align: center; */
    }

    .cursor {
        font-size: var(--text-2xl);
    }

    .description {
        font-size: var(--text-md);
        font-weight: var(--weight-medium);
        text-align: justify;
    }

}
</style>