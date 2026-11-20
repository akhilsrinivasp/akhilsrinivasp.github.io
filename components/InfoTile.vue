<!-- Generic tile in the same style as EducationTile, used by Projects, Skills and About -->
<template>
  <div class="info-wrap">
    <div class="info-tile card">
      <component :is="link ? 'a' : 'div'" :href="link || undefined" target="_blank" class="title-link">
        <h1 class="info-title">
          {{ title }}
          <Icon v-if="link" name="uil:github" class="title-icon" />
        </h1>
      </component>
      <h3 v-if="subtitle" class="info-subtitle">{{ subtitle }}</h3>
      <div v-if="tags && tags.length" class="tag-box">
        <template v-for="(tag, index) in tags">
          <span class="tag">{{ tag }}</span>
          <span class="dot" v-if="index < tags.length - 1"> • </span>
        </template>
      </div>
      <ul v-if="points && points.length" class="points">
        <li v-for="point in points">{{ point }}</li>
      </ul>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  link?: string
  tags?: string[]
  points?: string[]
}>()
</script>
<style scoped>
.info-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-tile {
  width: 100%;
  transition: background-color 0.2s;
}

.info-title {
  font-size: var(--text-9xl);
  line-height: var(--leading-tight);
  font-weight: var(--weight-medium);
}

.title-icon {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-left: 8px;
}

.info-subtitle {
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  font-weight: var(--weight-medium);
  padding-bottom: 1%;
}

.tag-box {
  padding-bottom: 2%;
}

.points {
  list-style: none;
  padding: 0;
  margin: 0;
}

.points li {
  line-height: 1.6;
  padding: 0.4% 0;
}

.points li::before {
  content: "• ";
}

@media (min-width: 1024px) {
  .info-tile {
    width: 1000px;
    padding: 6%;
    margin: 2%;
  }

  .info-title {
    padding-bottom: 1.5%;
    transition: font-size 0.2s;
  }

  .info-tile:hover {
    background-color: var(--color-surface-hover);
  }

  .title-link:hover .info-title {
    font-size: var(--text-11xl);
  }

  .tag {
    font-size: var(--text-base);
    letter-spacing: 0.09rem;
  }
}

@media (max-width: 1024px) {
  .info-tile {
    width: 400px;
    max-width: 90vw;
    padding: 7%;
    margin: 5%;
    text-align: center;
  }

  .info-title {
    padding-bottom: 5%;
    font-size: var(--text-5xl);
  }

  .info-subtitle {
    padding-bottom: 4%;
  }

  .tag {
    font-size: var(--text-xs);
    letter-spacing: 0.1rem;
    display: block;
    padding: 2%;
  }

  .dot {
    display: none;
  }

  .points li {
    padding: 2% 0;
  }
}
</style>
