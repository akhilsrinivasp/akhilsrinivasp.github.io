<template>
    <!-- https://imgbox.com/ -->
    <div>
        <div class="internship">
            <h1 class="text-3xl intern-heading">EXPERIENCE</h1>
            <h1 class="text-5xl intern-heading">INTERN</h1>
            <div v-for="intern in interns" class="intern-tile">
                <InternTile :intern="intern" class="items-center" />
            </div>
            <h1 class="text-5xl intern-heading volunteer-heading">VOLUNTEER</h1>
            <div v-for="org in volunteering" class="intern-tile">
                <VolunteerTile :volunteer="org" class="items-center" />
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
<style>
    .internship {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 9%;
    }

    .intern-heading {
        font-family: "Montserrat", sans-serif;
        font-weight: 400;
        letter-spacing: 10px;
        color: #fff;
        margin: 0 0;
        margin-bottom: 0.7%;
    }

    .volunteer-heading {
        margin-top: 4%;
    }

    @media (max-width: 1024px) {
        
    }
    @media (min-width: 1024px) {
        .intern-tile{
            width: 900px;
        }
    }
</style>