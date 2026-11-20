<template lang="">
    <div class="contact-page page-bg">
        <h1 class="hide">Contact Me</h1>
        <div v-for="email in emails" v-reveal class="scroll-reveal">
            <Mail class="mail" :mail="email" />
        </div>
    </div>
</template>
<script>
const emails = [
    "akhilsrinivasp@gmail.com",
    "akhilsrinivas.p2020@vitstudent.ac.in",
    "21f1001203@ds.study.iitm.ac.in"
]
export default {
    data() {
        return {
            emails
        }
    }
}
</script>
<style scoped>
.contact-page {
    margin: 0%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
}

.hide {
    font-size: var(--text-5xl);
    margin: 0 0 25px 0;
}

@media (min-width: 1024px) {
    .hide {
        display: none;
    }
}

</style>