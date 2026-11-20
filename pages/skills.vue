<template>
	<div class="tile-page page-bg">
		<span class="page-spacer"></span>
		<div class="page-title">Skills</div>
		<div class="scroll-reveal" v-for="group in skills">
			<InfoTile :title="group.category" :tags="group.skills" />
		</div>
		<span class="page-spacer-bottom"></span>
	</div>
</template>
<script setup lang="ts">
import '~/assets/css/tile-page.css'
import skills from '~/assets/data/skills.json'
</script>
