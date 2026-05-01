<script setup>
  import python from "@/assets/icons/python.png";
  import yolo from "@/assets/icons/yolo.svg";
  import pytorch from "@/assets/icons/pytorch.svg";
  import kaggle from "@/assets/icons/kaggle.svg";
  import ros from "@/assets/icons/ros.svg";
  import rust from "@/assets/icons/rust.svg";
  import cplusplus from "@/assets/icons/cplusplus.svg";
  import english from "@/assets/icons/english.png";
  import spanish from "@/assets/icons/spanish.png";
  import german from "@/assets/icons/german.png";
  import teamwork from "@/assets/icons/teamwork.png";
  import creativity from "@/assets/icons/creativity.png";
  import leadership from "@/assets/icons/leadership.png";
  import JgIconsList from "@/components/JgIconsList.vue";

  const coreExpertise = [
    "Computer Vision",
    "Robotics",
    "Embedded Systems",
    "Genetic Algorithms",
    "Software Architecture",
  ];

  const programmingLanguages = [
    {
      name: "Rust",
      img: rust,
      level: "Advanced",
      bg: "#DEA584",
    },
    { name: "C++", img: cplusplus, level: "Advanced", bg: "#00599C" },
    {
      name: "Python",
      img: python,
      level: "Advanced",
      bg: "linear-gradient(90deg, #63C8CD, #EF9F35)",
    },
  ];

  const frameworks = [
    {
      name: "YOLO",
      img: yolo,
      level: "Advanced",
      bg: "linear-gradient(90deg, #00FFFF, #00BFFF)",
    },
    {
      name: "PyTorch",
      img: pytorch,
      level: "Advanced",
      bg: "#EE4C2C",
    },
    {
      name: "Kaggle",
      img: kaggle,
      level: "Intermediate",
      bg: "linear-gradient(90deg, #20BEFF, #0077B5)",
    },
    {
      name: "ROS",
      img: ros,
      level: "Advanced",
      bg: "linear-gradient(90deg, #22314E, #E34F26)",
    },
  ];

  const humanLanguages = [
    { name: "English", img: english, bg: "linear-gradient(90deg, #C9082A, #F2F2F2)" },
    { name: "German", img: german, bg: "linear-gradient(90deg, #DD0000, #FFCE00)" },
    { name: "Spanish", img: spanish, bg: "linear-gradient(90deg, #FFCE00, #599ED3, #C9082A)" },
  ];

  const softSkills = [
    {
      name: "Teamwork",
      img: teamwork,
      bg: "linear-gradient(90deg, #FFCD38, #49C3E0, #3AC7B4, #DA5B65)",
    },
    { name: "Creativity", img: creativity, bg: "linear-gradient(90deg, #3498db, #2ecc71)" },
    { name: "Leadership", img: leadership, bg: "linear-gradient(90deg, #599ED3, #FFD33B)" },
  ];
</script>

<template>
  <div class="page">
    <section class="card">
      <h2 class="card__title">Core Expertise</h2>
      <div class="card__body">
        <div class="tags">
          <span v-for="skill in coreExpertise" :key="skill" class="tag">{{ skill }}</span>
        </div>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Programming Languages</h2>
      <div class="card__body">
        <jg-icons-list :items="programmingLanguages" />
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Frameworks & Tools</h2>
      <div class="card__body">
        <jg-icons-list :items="frameworks" />
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Languages</h2>
      <div class="card__body">
        <jg-icons-list :items="humanLanguages" />
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Soft Skills</h2>
      <div class="card__body">
        <jg-icons-list :items="softSkills" />
      </div>
    </section>

    <footer class="site-footer">
      <span class="footer-note"
        >Not a frontend engineer by trade - this site was hand-built and polished with a little AI
        help.</span
      >
    </footer>
  </div>
</template>

<style scoped>
  .page {
    max-width: var(--max-width);
    width: 90vw;
    margin: var(--space-lg) auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .card {
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    transition: border-color var(--transition-default);
  }

  .card:hover {
    border-color: var(--color-border-hover);
  }

  .card__title {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--color-border);
  }

  .card__body {
    display: flex;
    justify-content: center;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-sm);
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    padding: var(--space-xs) var(--space-md);
    transition: all var(--transition-default);
  }

  .tag:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: var(--color-accent-glow);
  }

  .site-footer {
    text-align: center;
    padding: var(--space-lg) 0;
    border-top: 1px solid var(--color-border);
  }

  .footer-note {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-text-dim);
    letter-spacing: 0.02em;
  }
</style>
