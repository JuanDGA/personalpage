<script setup>
  import profile from "@/assets/profile.webp";
  import JgAutoWriter from "@/components/JgAutoWriter.vue";
</script>

<template>
  <div class="container">
    <img class="profile" :src="profile" alt="Profile image of Juan David Guevara Arevalo" />
    <h1 class="name">Juan David Guevara Arevalo</h1>
    <jg-auto-writer :texts="texts" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        texts: [
          "Computer Vision Engineer.",
          "Robotics & Embedded Systems.",
          "Genetic Algorithms Enthusiast.",
        ],
      };
    },
  };
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .profile {
    border-radius: var(--radius-full);
    max-width: 90vw;
    width: 220px;
    margin: var(--space-lg) 0 var(--space-md);
    border: 3px solid var(--color-accent-dark);
    box-shadow: 0 0 20px var(--color-accent-glow);
  }

  .name {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    background: linear-gradient(135deg, #58d68d, #3fb984, #2ecc71);
    font-size: 2rem;
    margin-bottom: var(--space-sm);
  }
</style>