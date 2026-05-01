<script setup>
  import JgIconsList from "@/components/JgIconsList.vue";
  import linkedin from "@/assets/icons/linkedin.webp";
  import mail from "@/assets/icons/mail.png";

  const contactLinks = [
    {
      name: "LinkedIn",
      img: linkedin,
      bg: "#f0f0f0",
      href: "https://www.linkedin.com/in/jguevaradev/",
    },
    {
      name: "GitHub",
      img: "https://github.githubassets.com/favicons/favicon.svg",
      bg: "#f0f0f0",
      href: "https://github.com/jguevara-dev",
    },
    { name: "Mail", img: mail, bg: "#f0f0f0", href: "mailto:david@jguevara.dev" },
  ];
</script>

<template>
  <div class="page">
    <p class="intro">
      Open to collaborations, research opportunities, and exciting robotics challenges.
    </p>
    <div class="links">
      <jg-icons-list :items="contactLinks" />
    </div>
  </div>
</template>

<style scoped>
  .page {
    max-width: var(--max-width);
    width: 90vw;
    margin: var(--space-xl) auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
  }

  .intro {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--color-text-muted);
    text-align: center;
    max-width: 500px;
    line-height: 1.6;
  }

  .links {
    display: flex;
    justify-content: center;
  }
</style>
