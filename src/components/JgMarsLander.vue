<script setup>
  import { onMounted, ref, watch } from "vue";
  import useGeneticLander from "@/algorithms/marsLander/useGeneticLander";
  import { SurfaceMap } from "@/algorithms/marsLander/useSurfaceMap";
  import { Position } from "@/algorithms/marsLander/utils";
  import useSimulation, { SimulationStatus } from "@/algorithms/marsLander/useSimulation";

  const surface = new SurfaceMap();

  const {population, status, init, improve, setUp: setUpLander, initialLander, chromosomeComparator, configuration} = useGeneticLander(surface);

  const board = ref();

  const getCtx = () => {
    return board.value.getContext("2d");
  }

  const initSurface = () => {
    surface.reset();
    surface.addSurfacePoint(new Position(0, 0));
    surface.addSurfacePoint(new Position(0, 100));
    surface.addSurfacePoint(new Position(1000, 1500));
    surface.addSurfacePoint(new Position(3000, 1000));
    surface.addSurfacePoint(new Position(4000, 150));
    surface.addSurfacePoint(new Position(5500, 150));
    surface.addSurfacePoint(new Position(6999, 800));
    surface.addSurfacePoint(new Position(6999, 0));
  }

  const paintMap = (initialize = false) => {
    if (initialize) initSurface();
    getCtx().fillStyle = "#d72c2c";
    getCtx().beginPath();
    getCtx().moveTo(surface.points[0].x, 300 - surface.points[0].y);

    for (let i = 1; i < surface.points.length; i++) {
      const point = surface.points[i];
      getCtx().lineTo(point.x / 10, 300 - point.y / 10);
    }

    getCtx().closePath();
    getCtx().fill();
  }

  const paintPopulation = (pop, {clear, color} = {clear: true, color: "#f4d03f"}) => {
    if (clear) setUp(false, false);
    const {nextState, getPosition, reset, status} = useSimulation(initialLander, surface);
    getCtx().strokeStyle = color;
    for (let solution of pop) {
      getCtx().beginPath();
      getCtx().moveTo(initialLander.value.x / 10, 300 - (initialLander.value.y / 10));
      for (let action of solution) {
        nextState(action);
        const pos = getPosition();
        getCtx().lineTo(pos.x / 10, 300 - (pos.y / 10));
        if (SimulationStatus.isFinish(status.value)) break;
      }
      getCtx().closePath();
      getCtx().stroke();
      reset();
    }
  }

  const setUp = (initialize = false, initLander = true) => {
    const gradient = getCtx().createLinearGradient(0, 300, 0, 0);
    gradient.addColorStop(0, "#ff8181")
    gradient.addColorStop(1, "#ed8aff")
    getCtx().fillStyle = gradient;
    getCtx().fillRect(0, 0, 700, 300);
    paintMap(initialize);
    if (initLander) setUpLander(2500, 2700, 0, 0, 0, 0, 550);
  }

  onMounted(() => {
    setUp(true, true);
  });

  watch(population, (value) => {
    const sortedPopulation = [...value].sort(chromosomeComparator);
    paintPopulation(sortedPopulation.slice(10, sortedPopulation.length));
    paintPopulation(sortedPopulation.slice(0, 10), {clear: false, color: "#2ecc71"});
  }, {deep: true});
</script>

<template>
  <div class="container">
    <h2>Mars Lander:</h2>
    <p class="codingame">
      I recently took on the Mars Lander challenge on the <a href="https://www.codingame.com/training/expert/mars-lander-episode-3" target="_blank">Codingame</a> platform. I originally wrote my solution in Kotlin, but I've also adapted it to JavaScript. Check it out!
    </p>
    <h4>{{status}}</h4>
    <button @click="init">Create first population</button>
    <button v-if="population.length > 0" @click="improve">Find solution</button>
    <input type="range" min="10" max="100" v-model="configuration.population_size">
    <span>Current population: {{configuration.population_size}}</span>
    <input type="range" min="0" max="200" v-model="configuration.chromosome_size">
    <span>Current chromosome size: {{configuration.chromosome_size}}</span>
    <input type="range" min="0" :max="configuration.population_size" v-model="configuration.elitism_size">
    <span>Current elitism size: {{configuration.elitism_size}}</span>
    <input type="range" min="4" :max="configuration.population_size" v-model="configuration.selection_size">
    <span>Current selection size: {{configuration.elitism_size}}</span>
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
