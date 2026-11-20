<!-- Volunteer Tile: mirrors InternTile so both experience sections look the same -->
<template>
    <div class="tile card">
        <div class="volunteer-tile" @mouseover="hover = true" @mouseleave="hover = false">
            <div class="company-logo-container">
                <a :href="volunteer.link" target="_blank" class="company-logo"
                    :style="volunteer.logoBg ? { backgroundColor: volunteer.logoBg } : undefined">
                    <img :src="useImage(volunteer.logo)" :alt="`${volunteer.organisation} logo`" />
                </a>
            </div>
            <div class="details-container">
                <div class="company company-org">
                    <a :href="volunteer.link" target="_blank"><h1 class="company-name">{{ volunteer.organisation }}</h1></a>
                </div>
                <div class="description" v-if="hover">
                    <p class="description-text">{{ volunteer.description }}</p>
                </div>
                <div class="position">
                    <h2 class="position-name">{{ volunteer.location }}</h2>
                </div>
                <div class="year">
                    <h3 class="year-name">{{ volunteer.period }}</h3>
                </div>
                <div class="role" v-for="role in volunteer.roles">
                    <h2 class="role-name">{{ role.role }} <span class="role-duration">| {{ role.duration }}</span></h2>
                    <p class="work-text" v-if="hover">{{ role.work }}</p>
                </div>
                <div class="work" v-if="hover" v-for="item in volunteer.highlights">
                    <p class="work-text">• {{ item }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { volunteer } = defineProps(["volunteer"]);
const hover = ref(false)
</script>
<style scoped>
.company-logo-container,
.company-logo {
    transition-duration: 0.5s;
}

.company-org {
    font-size: var(--text-4xl);
    line-height: var(--leading-normal);
}

.tile {
    width: 100%;
    margin: 2% 0 4%;
    transition: all 0.5s ease;
    animation: reveal 0.5ms forwards;
}

.tile:hover {
    background-color: var(--color-surface-inverse);
    color: var(--color-bg);
    transform: scale(1.05);
}

.volunteer-tile {
    display: flex;
    flex-direction: row;
    justify-content: center;
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

.company-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.details-container {
    padding: 40px;
    width: 500px;
}

.details-container > div {
    margin: 10px 0;
    animation: reveal 1s forwards;
    transform: translateY(-20px);
    opacity: 0;
}

.role-name {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    font-weight: var(--weight-semibold);
}

.role-duration {
    font-weight: var(--weight-regular);
    font-size: var(--text-base);
}

.work-text {
    line-height: 1.5;
    margin-top: 4px;
}

@keyframes reveal {
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}

@media (max-width: 640px) {
    .volunteer-tile {
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

    .details-container {
        padding: 20px;
        width: 100%;
    }
}
</style>
