<script setup>
  import { onMounted, ref, watch } from "vue";
  import useGeneticLander from "@/algorithms/marsLander/useGeneticLander";
  import { SurfaceMap } from "@/algorithms/marsLander/useSurfaceMap";
  import { Position, randInt, toRadians } from "@/algorithms/marsLander/utils";
  import useSimulation, { SimulationStatus } from "@/algorithms/marsLander/useSimulation";

  const width = window.innerWidth * 0.7;
  const height = window.innerHeight * 0.7;

  const getRelativeX = (x) => (x * width) / 7000;
  const getRelativeY = (y) => height - ((y * height) / 3000);

  const sky = ref([]);

  const surface = new SurfaceMap();

  const {population, init, improve, setUp: setUpLander, initialLander, chromosomeComparator, resetConfig, configuration, state, currentGeneration, betterChromosome} = useGeneticLander(surface);

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

  const paintSky = (initialize = false) => {
    if (initialize) sky.value = [];
    getCtx().fillStyle = "#fff";
    for (let i = 0; i < 40; i++) {
      getCtx().beginPath();
      let pos;
      if (!initialize) {
        pos = sky.value[i];
      } else {
        pos = new Position(randInt(0, width), randInt(0, height));
        sky.value.push(pos);
      }
      getCtx().arc(pos.x, pos.y, 1, 0, 2 * Math.PI);
      getCtx().closePath();
      getCtx().fill();
    }
    getCtx().fillStyle = "#3498db";
    getCtx().beginPath();
    let earthPos;
    if (!initialize) {
      earthPos = sky.value[sky.value.length - 1];
    } else {
      earthPos = new Position(randInt(0, width), randInt(0, height / 3));
      sky.value.push(earthPos);
    }

    getCtx().arc(earthPos.x, earthPos.y, 2, 0, 2 * Math.PI);
    getCtx().closePath();
    getCtx().fill()
  }

  const paintMap = (initialize = false) => {
    if (initialize) initSurface();
    getCtx().fillStyle = "#d72c2c";
    getCtx().beginPath();
    getCtx().moveTo(getRelativeX(surface.points[0].x), getRelativeY(surface.points[0].y));

    for (let i = 1; i < surface.points.length; i++) {
      const point = surface.points[i];
      getCtx().lineTo(getRelativeX(point.x), getRelativeY(point.y));
    }

    getCtx().closePath();
    getCtx().fill();
  }

  const paintLander = () => {
    const origin = new Position(getRelativeX(state.value.x), getRelativeY(state.value.y));

    const bodyColor = "#5dade2";
    const flameColor1 = "#FFA500";
    const flameColor2 = "#FF4500";

    getCtx().rotate(-toRadians(state.value.angle));

    // Draw rocket body
    getCtx().fillStyle = bodyColor;
    getCtx().beginPath();
    getCtx().moveTo(origin.x + 5, origin.y);
    getCtx().lineTo(origin.x + 5, origin.y - 20);
    getCtx().lineTo(origin.x, origin.y - 30);
    getCtx().lineTo(origin.x - 5, origin.y - 20);
    getCtx().lineTo(origin.x - 5, origin.y);
    getCtx().closePath();
    getCtx().fill();

    // Draw rocket flames
    getCtx().fillStyle = flameColor1;
    getCtx().beginPath();
    getCtx().moveTo(origin.x - 3, origin.y);
    getCtx().lineTo(origin.x, origin.y + ((30 * state.value.power) / 4));
    getCtx().lineTo(origin.x + 3, origin.y);
    getCtx().closePath();
    getCtx().fill();

    getCtx().fillStyle = flameColor2;
    getCtx().beginPath();
    getCtx().moveTo(origin.x - 2, origin.y);
    getCtx().lineTo(origin.x, origin.y + ((10 * state.value.power) / 4));
    getCtx().lineTo(origin.x + 2, origin.y);
    getCtx().closePath();
    getCtx().fill();
  }

  const paintPopulation = (pop, {clear, color} = {clear: true, color: "#f4d03f"}) => {
    if (clear) setUp(false, false);
    getCtx().font = "30px Arial";
    getCtx().fillText(`Generation: ${currentGeneration.value}`, 10, 50);
    getCtx().fillText(`Better sequence:`, 10, 100);
    getCtx().fillText(`\t\tLength: ${betterChromosome.value.sequence.length}`, 10, 150);
    getCtx().fillText(`\t\tScore: ${betterChromosome.value.score}`, 10, 200);
    const {nextState, getPosition, reset, status} = useSimulation(initialLander, surface);
    getCtx().strokeStyle = color;
    for (let solution of pop) {
      getCtx().beginPath();
      getCtx().moveTo(getRelativeX(initialLander.value.x), getRelativeY(initialLander.value.y));
      for (let action of solution) {
        nextState(action);
        const pos = getPosition();
        getCtx().lineTo(getRelativeX(pos.x), getRelativeY(pos.y));
        if (SimulationStatus.isFinish(status.value)) break;
      }
      getCtx().closePath();
      getCtx().stroke();
      reset();
    }
    paintLander();
  }

  const setUp = (initialize = false, initLander = true) => {
    const gradient = getCtx().createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, "#ff8181")
    gradient.addColorStop(1, "#ed8aff")
    getCtx().fillStyle = gradient;
    getCtx().fillRect(0, 0, width, height);
    paintSky(initialize);
    paintMap(initialize);
    if (initLander) {
      setUpLander(2500, 2700, 0, 0, 0, 0, 550);
    }
  }

  onMounted(() => {
    setUp(true, true);
  });

  watch(population, (value) => {
    const sortedPopulation = [...value].sort(chromosomeComparator);
    paintPopulation(sortedPopulation.slice(10, sortedPopulation.length));
    paintPopulation(sortedPopulation.slice(0, 10), {clear: false, color: "#2ecc71"});
  });

  watch(state, () => {
    paintLander();
  }, {deep: true});
</script>

<template>
  <div class="container">
    <h2 class="center">This page is optimized for desktop</h2>
    <button @click="init">Create first population</button>
    <button v-if="population.length > 0" @click="improve">Find solution</button>
    <div>
      <div>Current population: {{configuration.population_size}}</div>
      <input type="range" min="10" max="100" v-model="configuration.population_size">
      <input type="number" min="10" max="100" v-model="configuration.population_size">
    </div>
    <div>
      <div>Current chromosome size: {{configuration.chromosome_size}}</div>
      <input type="range" min="0" max="200" v-model="configuration.chromosome_size">
      <input type="number" min="0" max="200" v-model="configuration.chromosome_size">
    </div>
    <div>
      <div>Current elitism size: {{configuration.elitism_size}}</div>
      <input type="range" min="0" :max="configuration.population_size" v-model="configuration.elitism_size">
      <input type="number" min="0" :max="configuration.population_size" v-model="configuration.elitism_size">
    </div>
    <div>
      <div>Current selection size: {{configuration.selection_size}}</div>
      <input type="range" min="4" :max="configuration.population_size" v-model="configuration.selection_size">
      <input type="number" min="4" :max="configuration.population_size" v-model="configuration.selection_size">
    </div>
    <div>
      <div>Strategy: {{configuration.strategy}}</div>
    </div>
    <button @click="resetConfig">Reset config</button>
    <div class="centered">
      <canvas ref="board" :width="width" :height="height" />
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

  .center {
      text-align: center;
  }

  p {
      margin: 10px auto;
  }

  a {
      text-decoration: none;
      color: #58d68d;
      font-weight: bold;
      transition: 300ms;
  }

</style>
