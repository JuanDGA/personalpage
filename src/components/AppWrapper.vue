<script setup>
  import JgButton from "@/components/JgButton.vue";
  import JgHeader from "@/components/JgHeader.vue";
  import { useRoute } from "vue-router";
  import { computed } from "vue";

  const route = useRoute();

  const show = computed(() => (route.name ? !route.name.includes("preview") : false));
</script>

<template>
  <main>
    <div v-if="show">
      <jg-header />
    </div>
    <nav>
      <jg-button to="/education">Education</jg-button>
      <jg-button to="/projects">Projects</jg-button>
      <jg-button to="/skills">Skills</jg-button>
      <jg-button to="/contact">Contact</jg-button>
    </nav>
    <div>
      <slot />
    </div>
  </main>
</template>

<style scoped>
  nav {
    margin: var(--space-sm) 0;
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
  }
</style>
