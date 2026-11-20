<!-- Education Tile -->

<template lang="">
  <div class="tile">
    <div class="education-tile card">
      <a :href="education.site" target="_blank"
        ><h1 class="college">
          {{ education.college }}
        </h1></a
      >
      <a :href="education.site" target="_blank"
        ><h2 class="degree">
          {{ education.degree }}
        </h2></a
      >
      <h3 class="year">{{ education.year }}</h3>
      <h4 class="grade">{{ education.grade }}</h4>
      <h4 class="course-title">Courses (Major):</h4>
      <div class="course-box">
        <template v-for="(course, index) in education.courses">
          <span class="courses">{{ course }}</span>
          <span class="dot" v-if="index < education.courses.length - 1">
            •
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
const { education: education } = defineProps(["education"]);
</script>

<style scoped>
.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100%;
}

.education-tile {
  width: 100%;
}

/* Base heading sizes; the media queries below adjust them per breakpoint. */
:where(.education-tile) .college {
  font-size: var(--text-3xl);
  line-height: var(--leading-tight);
  font-weight: var(--weight-medium);
}

:where(.education-tile) .degree {
  font-size: var(--text-xl);
  line-height: var(--leading-normal);
  font-weight: var(--weight-semibold);
}

:where(.education-tile) :is(.year, .grade, .course-title) {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  font-weight: var(--weight-medium);
}

@media (min-width: 1024px) {
  .education-tile {
    width: 1000px;
    padding: 6%;
    margin: 2%;
  }

  .courses {
    font-size: var(--text-base);
    letter-spacing: 0.09rem;
  }

  .college {
    padding-bottom: 1.5%;
    transition: font-size 0.2s;
  }

  .degree {
    padding-bottom: 1%;
    transition: font-size 0.2s;
  }

  .year {
    padding-bottom: 1%;
  }

  .grade {
    padding-bottom: 1%;
  }

  .course-title {
    padding-bottom: 1%;
    font-size: larger;
  }
  
  .education-tile:hover {
    background-color: var(--color-surface-hover);
  }

  .college:hover {
    font-size: var(--text-4xl);
  }
  
  .degree:hover {
    font-size: var(--text-2xl);
  }
}

@media (max-width: 1024px) {
  .education-tile {
    width: min(400px, 90vw);
    padding: 7%;
    margin: 5%;
    text-align: center;
  }

  .courses {
    font-size: var(--text-xs);
    letter-spacing: 0.1rem;
    display: block;
    padding: 2%;
  }

  .college {
    padding-bottom: 5%;
    font-size: var(--text-2xl);
  }

  .degree {
    padding-bottom: 5%;
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
  }

  .year {
    padding-bottom: 4%;
  }

  .grade {
    padding-bottom: 4%;
    font-size: var(--text-xl);
  }

  .dot {
    display: none;
  }

  .course-title {
    padding-bottom: 1%;
    font-size: var(--text-xl);
  }
}
</style>
