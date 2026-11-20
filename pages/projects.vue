<template>
	<div class="tile-page">
		<span class="page-spacer"></span>
		<div class="page-title">Projects</div>
		<div class="scroll-reveal" v-for="project in projects">
			<InfoTile :title="project.name" :subtitle="project.period" :link="project.link" :tags="project.tech" :points="project.work" />
		</div>
		<span class="page-spacer-bottom"></span>
	</div>
</template>
<script setup lang="ts">
import '~/assets/css/tile-page.css'
import projects from '~/assets/data/projects.json'
</script>
