<template>
  <div class="container">
    <div>
      I am a very enthusiastic person who likes to explore ideas, which is why I have developed and
      participated in various projects. Here you can find the list:
    </div>
    <div class="projects-lst">
      <ol>
        <li>
          QuycaFa Newspaper:
          <a target="_blank" href="https://periodicoquycafa.netlify.app/">QuycaFa</a> (Developed
          during school)
        </li>
        <li>
          Geoenvironmental profile:
          <a target="_blank" href="https://geodatos.jguevara.dev/">Geodatos Facatativá</a>
          (Developed during school)
        </li>
        <li>
          Ecommunity: <a target="_blank" href="https://ecommunity.jguevara.dev/">Ecommunity</a> (WEB
          3 Project)
        </li>
        <li class="neo">
          Scheduler:
          <a target="_blank" href="https://scheduler.neoventix.com/">NeoScheduler</a> (Continuous
          development)
        </li>
        <li class="neo">
          Neoventix: <a target="_blank" href="https://neoventix.com/">Neoventix</a> (Under
          development)
        </li>
      </ol>
    </div>
    <div class="neo">
      In addition, I'm currently working on
      <a target="_blank" href="https://neoventix.com/">Neoventix.</a>
      Which is an AI project aimed at improving the usability and the functionalities of the tools
      that I'm developing, such as
      <a target="_blank" href="https://scheduler.neoventix.com/">NeoScheduler,</a> a product of
      <a target="_blank" href="https://neoventix.com/">Neoventix.</a>
    </div>
  </div>
  <div>
    <h1 class="center">Preview projects</h1>
  </div>
  <div>
    <jg-mars-lander />
  </div>
</template>

<style scoped>
  .center {
    text-align: center;
  }

  .container {
    max-width: 90vw;
    width: 750px;
    margin: 20px auto;
    font-size: 1.3em;
  }

  .container .projects-lst {
    margin: 30px 0;
    display: flex;
    justify-content: center;
  }

  li::marker {
    color: #58d68d;
    font-weight: bold;
  }

  li {
    width: 100%;
  }

  .neo a {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    background: linear-gradient(90deg, #8ad5e8, #16bbe5, #0077c9);
  }

  a {
    text-decoration: none;
    color: #58d68d;
    font-weight: bold;
    transition: 300ms;
  }

  a:hover {
    font-size: 1.1em;
  }
</style>
<script setup>
  import JgMarsLander from "@/components/JgMarsLander.vue";
</script>
