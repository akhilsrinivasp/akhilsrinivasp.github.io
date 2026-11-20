<template>
	<div class="tile-page">
		<span class="page-spacer"></span>
		<div class="page-title">About Me</div>
		<div class="scroll-reveal">
			<InfoTile :title="about.name" :subtitle="about.location">
				<p v-for="para in about.bio" class="bio">{{ para }}</p>
			</InfoTile>
		</div>
		<div class="scroll-reveal">
			<InfoTile title="Certifications">
				<div v-for="cert in about.certifications" class="cert">
					<h3 class="cert-title">{{ cert.title }}</h3>
					<p class="cert-meta">{{ cert.issuer }} | {{ cert.date }}</p>
				</div>
			</InfoTile>
		</div>
		<div class="scroll-reveal">
			<InfoTile title="Languages I Speak" :tags="about.languages" />
		</div>
		<span class="page-spacer-bottom"></span>
	</div>
</template>
<script setup lang="ts">
import '~/assets/css/tile-page.css'
import about from '~/assets/data/about.json'
</script>
<style scoped>
.bio {
	line-height: 1.7;
	padding-top: 2%;
}

.cert {
	padding: 1.5% 0;
}

.cert-title {
	font-size: var(--text-lg);
	line-height: var(--leading-relaxed);
	font-weight: var(--weight-medium);
}

.cert-meta {
	color: var(--color-text-muted);
}

@media (max-width: 1024px) {
	.bio,
	.cert {
		padding: 3% 0;
	}
}
</style>
