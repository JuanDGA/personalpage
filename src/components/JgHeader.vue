<script setup>
  import profile from "@/assets/profile.webp";
  import JgAutoWriter from "@/components/JgAutoWriter.vue";
</script>

<template>
  <div class="container">
    <img class="profile" :src="profile" alt="Profile image of Juan David Guevara Arevalo" />
    <h1 class="name">Juan David Guevara Arevalo</h1>
    <jg-auto-writer text="Computer and Systems Engineer." />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .profile {
    border-radius: 100%;
    max-width: 90vw;
    width: 250px;
    margin: 20px;
  }

  .name {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    background: linear-gradient(90deg, #58d68d, #3fb984);
  }
</style>
