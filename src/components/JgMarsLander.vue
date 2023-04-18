<script setup>
  import { onMounted, ref, watch } from "vue";
  import useGeneticLander from "@/algorithms/marsLander/useGeneticLander";

  const {population, status, init} = useGeneticLander();

  const board = ref();

  const getCtx = () => {
    return board.value.getContext("2d");
  }

  const setUp = () => {
    const context = getCtx();
    context.fillStyle = "#000";
    context.fillRect(0, 0, 700, 300)
  }

  onMounted(() => {
    setUp();
  });

  watch(population, (value) => console.log(value.length), {deep: true});
</script>

<template>
  <div class="container">
    <h2>Mars Lander:</h2>
    <p class="codingame">
      Mars lander is a challenge for the
      <a href="https://www.codingame.com/training/expert/mars-lander-episode-3" target="_blank">Codingame</a>
      platform, my original solution was written in Kotlin, however the version that you can see here is the adapted version to javascript.
    </p>
    <h4>{{status}}</h4>
    <button @click="init">Initialize</button>
    <div class="centered">
      <canvas ref="board" width="700" height="300" />
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 90vw;
    width: 750px;
    margin: 20px auto;
    font-size: 1.3em;
  }

  .centered {
      display: flex;
      justify-content: center;
  }

  p {
      margin: 10px auto;
  }

  .codingame a {
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
      background: linear-gradient(90deg, #F2BB13, #F7B003);
  }

  a {
      text-decoration: none;
      color: #58d68d;
      font-weight: bold;
      transition: 300ms;
  }

</style>
