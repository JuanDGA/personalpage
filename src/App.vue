<script setup>
  import profile from "@/assets/profile.jpg";
  import JgButton from "@/components/JgButton.vue";
  import JgAutoWriter from "@/components/JgAutoWriter.vue";
</script>

<template>
  <main>
    <jg-button to="/" v-if="$route.path !== '/'">Game</jg-button>
    <div class="first-look">
      <img class="profile" :src="profile" alt="Profile image of Juan David Guevara Arevalo" />
      <h1 class="name">Juan David Guevara Arevalo</h1>
      <JgAutoWriter text="Computer and Systems Engineer." />
    </div>
    <nav>
      <jg-button to="/education">Education</jg-button>
      <jg-button to="/projects">Projects</jg-button>
      <jg-button to="/skills">Skills</jg-button>
      <jg-button to="/contact">Contact</jg-button>
    </nav>
    <div>
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
  .first-look {
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

  nav {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .name {
    color: #58d68d;
  }
</style>
