<template>
    <!-- https://imgbox.com/ -->
    <div class="page-bg">
        <div class="internship">
            <h1 class="intern-heading heading-eyebrow">EXPERIENCE</h1>
            <h1 class="intern-heading heading-section">INTERN</h1>
            <div v-for="intern in interns" class="exp-item scroll-reveal">
                <InternTile :intern="intern" />
            </div>
            <h1 class="intern-heading heading-section volunteer-heading">VOLUNTEER</h1>
            <div v-for="org in volunteering" class="exp-item scroll-reveal">
                <VolunteerTile :volunteer="org" />
            </div>
        </div>
        <br><br>
    </div>
</template>
<script setup lang="ts">
    import internData from '~/assets/data/internships.json'
    import volunteerData from '~/assets/data/volunteering.json'
    type intern_details = {
        company: string,
        logo: string,
        description: string,
        position: string,
        period: string,
        location: string,
        work: string[]
    }
    const interns: intern_details[] = internData
    const volunteering = volunteerData
</script>
<style scoped>
    .internship {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 9%;
    }

    .intern-heading {
        font-family: var(--font-body);
        font-weight: var(--weight-regular);
        letter-spacing: 10px;
        color: var(--color-text);
        margin: 0 0;
        margin-bottom: 0.7%;
    }

    .heading-eyebrow {
        font-size: var(--text-2xl);
        line-height: var(--leading-snug);
    }

    .heading-section {
        font-size: var(--text-5xl);
        line-height: var(--leading-none);
    }

    .volunteer-heading {
        margin-top: 4%;
    }

    .exp-item {
        width: min(900px, 100% - 2rem);
    }

    @media (max-width: 640px) {
        .internship {
            margin-top: 6rem;
        }

        .intern-heading {
            letter-spacing: 0.4rem;
        }
    }
</style>