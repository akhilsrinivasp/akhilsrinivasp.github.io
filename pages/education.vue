<template>
	<div class="education">
		<span class="spacer">

		</span>
		<div class="mobile-title">
			Education
		</div>
		<div class="scroll-reveal" v-for="edu in education">
			<EducationTile :education="edu" />
		</div>
		<span class="spacer-bottom">

		</span>
	</div>
</template>
<script setup lang="ts">
import educationData from "~/assets/data/education_details.json";
// courses is a an array of string
type education_details = {
	site: string;
	degree: string;
	college: string;
	year: string;
	grade: string;
	courses: string[];
}; 
const education: education_details[] = educationData;
</script>
<style scoped>
.education {
	display: flex;
	flex-direction: column;
	align-items: center;
	width:100%;
	background-image: url("~/assets/images/home-bg.png");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
}

@media (min-width: 1024px) {
	.spacer {
		margin-top: 8%;
	}

	.mobile-title {
		opacity: 0;
	}

	.spacer-bottom {
		margin-bottom: 8%;
	}
}

@media (max-width: 1024px) {
	.education {
		margin-top: 25%;
		margin-bottom: 10%;
	}

	.mobile-title {
		font-family: var(--font-body);
		font-weight: var(--weight-regular);
		font-size: var(--text-4xl);
		letter-spacing: 0.4rem;
		color: var(--color-text);
		margin: 2% 0 4%;
		padding: 0;
		/* text-shadow: var(--shadow-text); */
		text-decoration: none;
		transition: 0.2s;
	}

}</style>