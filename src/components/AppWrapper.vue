<script setup>
  import JgButton from "@/components/JgButton.vue";
  import JgHeader from "@/components/JgHeader.vue";
  import { useRoute } from "vue-router";
  import { computed } from "vue";

  const route = useRoute();

  const show = computed(() => route.name ? !route.name.includes('preview') : false);
</script>

<template>
  <main>
    <div v-if="show">
      <jg-button to="/" v-if="$route.path !== '/'" class="game-btn">Game</jg-button>
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
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .game-btn {
    margin: 10px 15px;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
