<template>
    <div :id="intern.id" class="tile card">
        <div class="intern-tile" @mouseover="hover=true" @mouseleave="hover=false">
            <div class="company-logo-container">
                <div class="company-logo">
                    <img :src="useImage(intern.logo)" :alt="`${intern.company} logo`" /> 
                </div>
            </div>
            <div class="intern-details-container">
                <div class="company company-org">
                    <h1 class="company-name">{{ intern.company }}</h1>
                </div>
                <div class="description" v-if="hover">
                    <p class="description-text">{{ intern.description }}</p>
                </div>
                <div class="company company-role">
                    <h1 class="company-name">{{ intern.position }}</h1>
                </div>
                <div class="position">
                    <h2 class="position-name">{{ intern.location }}</h2>
                </div>
                <div class="year">
                    <h3 class="year-name">{{ intern.period }}</h3>
                </div>
                <div class="work" v-if="hover" v-for="work in intern.work">
                    <p class="work-text">• {{ work }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const { intern: intern } = defineProps(["intern"]);
const hover= ref(false)
type intern_details = {
        company: string,
        logo: string,
        description: string,
        position: string,
        period: string,
        location: string,
        work: string[]
    }

</script>
<style scoped>
.company-logo-container,
.company-logo {
    transition-duration: 0.5s;
}

.company-org {
    font-size: var(--text-xl);
    line-height: var(--leading-normal);
}

.company-role {
    font-size: var(--text-2xl);
    line-height: var(--leading-snug);
}

.tile {
    width: 100%;
    margin: 2% 0 4%;
    /* add transition in such a way that if the element expands, it does it smoothly */
    transition: all 0.5s ease;
}
.tile:hover {
    background-color: var(--color-surface-inverse);
    color: var(--color-bg);
}
.intern-tile {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* align-items: center; */
    padding: 40px 20px;
}
.company-logo {
    width: 200px;
    height: 200px;
    border-radius: 25%;
    padding: 25px;
    margin-top: 28px;
    background-color: var(--color-surface-inverse);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: reveal 1s forwards;
    transform: translateY(-20px);
    opacity: 0;
}
.intern-details-container { 
    padding: 40px;
    flex: 1;
    max-width: 500px;
}

.intern-details-container > div {
    margin: 10px 0;
    animation: reveal 1s forwards;
    transform: translateY(-20px);
    opacity: 0;
}


.work-name {
    font-weight: var(--weight-regular);
    margin: 0;
    padding: 0;
    text-align: left;
    line-height: 1.5;
    animation: reveal 1s forwards;
    transform: translateY(-20px);
    opacity: 0;
}

.company-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

@media (max-width: 640px) {
    .intern-tile {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px 10px;
    }

    .company-logo {
        width: 150px;
        height: 150px;
        margin-top: 0;
    }

    .intern-details-container {
        padding: 20px;
        max-width: none;
        width: 100%;
    }
}
</style>