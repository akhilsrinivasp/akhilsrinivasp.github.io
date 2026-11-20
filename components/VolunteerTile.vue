<!-- Volunteer Tile: mirrors InternTile so both experience sections look the same -->
<template>
    <div class="tile">
        <div class="volunteer-tile" @mouseover="hover = true" @mouseleave="hover = false">
            <div class="company-logo-container ease duration-500">
                <a :href="volunteer.link" target="_blank" class="company-logo ease duration-500"
                    :style="volunteer.logoBg ? { backgroundColor: volunteer.logoBg } : undefined">
                    <img :src="useImage(volunteer.logo)" :alt="`${volunteer.organisation} logo`" />
                </a>
            </div>
            <div class="details-container">
                <div class="company text-2xl">
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
                    <h2 class="role-name text-xl">{{ role.role }} <span class="role-duration">| {{ role.duration }}</span></h2>
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
.tile {
    background-color: #1a202c;
    border: 1px solid #1a202c;
    width: 100%;
    box-shadow: rgba(74, 74, 138, 0.25) 0px 50px 100px -20px, rgba(255, 255, 255, 0.3) 0px 30px 60px -30px, rgba(26, 98, 170, 0.35) 0px -2px 6px 0px inset;
    font-family: "Montserrat", sans-serif;
    border-radius: 25px;
    color: #fff;
    margin: 2% 0 4%;
    transition: all 0.5s ease;
    animation: reveal 0.5ms forwards;
}

.tile:hover {
    background-color: #fff;
    color: #1a202c;
    border: 1px solid #1a202c;
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
    background-color: #fff;
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
    font-weight: 600;
}

.role-duration {
    font-weight: 400;
    font-size: 1rem;
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
