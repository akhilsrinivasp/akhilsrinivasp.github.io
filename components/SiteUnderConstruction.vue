<template>
    <div>
        <div class="container-fluid" align="center">
            <h1 class="heading">Site Under Construction 🚧</h1>
            <p class="para">Check back soon!</p>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .container-fluid {
        background-color: aqua;
        text-align: center;
        border-radius: 72% 28% 70% 30% / 30% 55% 45% 70% ;
    }
    @media (min-width: 1024px) {
        .container-fluid {
            max-width: 750px;
            padding: 7% 7%;
            margin: 13%;
        }
        .heading {
        font-size: var(--text-4xl);
        font-weight: var(--weight-bold);
        margin-bottom: 2%;
        font-family: var(--font-body);
        font-weight: var(--weight-medium);
    }
    .para {
        font-size: var(--text-xl);
        font-weight: var(--weight-medium);
        font-family: var(--font-body);
    }
    }
    @media (max-width: 1024px) {
        .container-fluid {
            padding: 15%;
            max-width: 350px;
            margin-top: 25%;
        }  
        .heading {
        font-size: var(--text-2xl);
        font-weight: var(--weight-bold);
        margin-bottom: 2%;
        font-family: var(--font-body);
        font-weight: 450;
    }
    .para {
        font-size: var(--text-base);
        font-weight: var(--weight-regular);
        font-family: var(--font-body);
    }
    }
</style>