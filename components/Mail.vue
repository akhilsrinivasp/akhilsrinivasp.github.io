<template>
  <div class="contact-tile card" @click="openMail">
    <div class="mail-icon">
      <Icon class="mail-icon" name="grommet-icons:mail" />
    </div>
    <div class="mail-id">
      {{ mail }}
    </div>
  </div>
</template>
<script setup lang="ts">
    const { mail: mail } = defineProps({
        mail: String,
        }) as { mail: string };
        const openMail = () => {
            window.open(`mailto:${mail}`);
        }; 
</script>
<style>
.contact-tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 400px;
  padding: 6%;
  margin: 5% 0%;
  font-size: var(--text-sm);
  transition: all 0.2s;
}

.contact-tile:hover {
  width: 410px;
  font-size: var(--text-base);
  background-color: var(--color-surface-hover);
}

.contact-tile .mail-icon {
  width: 30px;
  height: 30px;
}

@media (min-width: 1024px) {
  .contact-tile {
    width: 600px;
    padding: 6% 10%;
    margin: 5% 0%;
    font-size: var(--text-lg);
  }

  .contact-tile:hover {
    width: 700px;
    font-size: var(--text-4xl);
  }
}
</style>
