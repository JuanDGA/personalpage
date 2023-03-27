<script setup>
  import JgIconsList from "@/components/JgIconsList.vue";
  import linkedin from "@/assets/icons/linkedin.webp";
  import mail from "@/assets/icons/mail.png";

  const contactLinks = [
    {name: "Linked in", img: linkedin, bg: "#f0f0f0", href: "https://www.linkedin.com/in/jguevaradev/"},
    {name: "Mail", img: mail, bg: "#f0f0f0", href: "mailto:contact@jguevara.dev"},
  ]
</script>

<template>
  <div class="container">
    <div class="row">
      <jg-icons-list :items="contactLinks"/>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 750px;
    max-width: 90vw;
    margin: 30px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>