<template>
  <div class="container">
    <div class="description">
      I am a very enthusiastic person who likes to explore ideas, which is why I have developed and
      participated in various projects. Here you can find the list:
    </div>
    <div class="projects-lst">
      <ol>
        <li>
          QuycaFa Newpaper:
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
  </div>
</template>

<style scoped>
  .container {
    max-width: 90vw;
    margin: 20px auto;
    font-size: 1.3em;
  }

  .container .description {
    text-align: center;
  }

  .container .projects-lst {
    margin-top: 30px;
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
    background-image: linear-gradient(90deg, #8ad5e8, #16bbe5, #0077c9);
    background-clip: text;
    color: transparent;
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
