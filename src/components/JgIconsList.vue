<script setup>
  import JgLink from "@/components/JgLink.vue";

  defineProps({
    items: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <div class="icons">
    <div v-for="(item, i) in items" class="logo" :key="i">
      <jg-link class="icon-container" :class="{ link: item.href }" :href="item.href">
        <img :src="item.img" :alt="item.name + ' logo'" class="icon" />
        <span :style="{ background: item.bg }">{{ item.name }}</span>
        <div class="skill-level">{{ item.level }}</div>
      </jg-link>
    </div>
  </div>
</template>

<style scoped>
  .icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-sm);
  }

  .logo {
    background: var(--color-bg-surface);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    margin: var(--space-xs);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-border);
    transition: all var(--transition-default);
  }

  .logo:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
    border-color: var(--color-border-hover);
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon-container span {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    font-weight: bold;
    font-size: 1.3rem;
  }

  .skill-level {
    font-family: var(--font-mono);
    font-style: italic;
    color: var(--color-text-dim);
    font-size: 0.75rem;
  }

  .icon {
    margin: var(--space-xs);
    transition: transform var(--transition-default);
    height: 64px;
    object-fit: contain;
  }

  .icon:hover {
    transform: scale(1.08);
  }

  .link {
    cursor: pointer;
    text-decoration: none;
  }
</style>