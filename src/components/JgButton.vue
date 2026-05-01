<script setup>
  defineProps({
    to: {
      type: String,
      default: "none",
    },
  });
</script>

<template>
  <router-link v-if="to !== 'none'" :to="to" custom v-slot="{ isActive, navigate }">
    <button
      class="link"
      :class="{ 'link--active': isActive }"
      @click="navigate"
    >
      <slot />
    </button>
  </router-link>
  <button v-else class="link"><slot /></button>
</template>

<style scoped>
  .link {
    border: none;
    border-bottom: 3px solid var(--color-accent);
    border-radius: var(--radius-sm);
    background-color: transparent;
    color: var(--color-text);
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    padding: var(--space-xs) var(--space-sm);
    min-width: 120px;
    transition: all var(--transition-default);
  }

  .link:hover {
    background-color: var(--color-accent-glow);
    border-bottom-color: var(--color-accent);
    transform: translateY(-1px);
  }

  .link:active {
    transform: translateY(0);
  }

  .link--active {
    color: var(--color-accent);
    border-bottom-width: 4px;
  }
</style>