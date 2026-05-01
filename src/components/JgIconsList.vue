<script setup>
  import JgLink from "@/components/JgLink.vue";

  defineProps({
    items: {
      type: Array,
      required: true,
    },
  });

  const getDots = (level) => {
    const map = {
      Novice: 1,
      Intermediate: 2,
      Advanced: 3,
      Expert: 4,
      "Primary language": 4,
    };
    return map[level] || 0;
  };
</script>

<template>
  <div class="icons">
    <div v-for="(item, i) in items" class="logo" :key="i">
      <jg-link class="icon-container" :class="{ link: item.href }" :href="item.href">
        <img :src="item.img" :alt="item.name + ' logo'" class="icon" />
        <span :style="{ background: item.bg }">{{ item.name }}</span>
        <div v-if="item.level" class="proficiency">
          <div
            v-for="dot in 4"
            :key="dot"
            class="proficiency__dot"
            :class="{ 'proficiency__dot--filled': dot <= getDots(item.level) }"
          />
        </div>
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

  .proficiency {
    display: flex;
    gap: 3px;
    margin-top: var(--space-xs);
  }

  .proficiency__dot {
    width: 6px;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--color-border);
    transition: background var(--transition-fast);
  }

  .proficiency__dot--filled {
    background: var(--color-accent);
  }
</style>
