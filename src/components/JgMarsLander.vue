<script setup>
  import { onMounted, onBeforeUnmount, ref, watch } from "vue";
  import useGeneticLander from "@/algorithms/marsLander/useGeneticLander";
  import { SurfaceMap } from "@/algorithms/marsLander/useSurfaceMap";
  import { Position, randInt, toRadians } from "@/algorithms/marsLander/utils";
  import useSimulation, { SimulationStatus } from "@/algorithms/marsLander/useSimulation";
  import JgButton from "@/components/JgButton.vue";

  const width = window.innerWidth * 0.7;
  const height = window.innerHeight * 0.7;

  const getRelativeX = (x) => (x * width) / 7000;
  const getRelativeY = (y) => height - (y * height) / 3000;

  const sky = ref([]);

  const surface = new SurfaceMap();

  const {
    populationScores,
    init,
    improve,
    setUp: setUpLander,
    initialLander,
    chromosomeScoreComparator,
    resetConfig,
    configuration,
    state,
    currentGeneration,
  } = useGeneticLander(surface);

  const board = ref();
  const run = ref(false);
  const betterChromosome = ref(Infinity);

  const getCtx = () => {
    return board.value.getContext("2d");
  };

  const create = () => {
    const start = Date.now();
    init();
    console.log(Date.now() - start);
  };

  const train = async () => {
    while (betterChromosome.value >= 10000 && run.value) {
      if (!run.value) break;
      await improve();
    }
  };

  const initSurface = () => {
    surface.reset();
    surface.addSurfacePoint(new Position(0, 0));
    surface.addSurfacePoint(new Position(0, 1800));
    surface.addSurfacePoint(new Position(300, 1200));
    surface.addSurfacePoint(new Position(1000, 1550));
    surface.addSurfacePoint(new Position(2000, 1200));
    surface.addSurfacePoint(new Position(2500, 1650));
    surface.addSurfacePoint(new Position(3700, 220));
    surface.addSurfacePoint(new Position(4700, 220));
    surface.addSurfacePoint(new Position(4750, 1000));
    surface.addSurfacePoint(new Position(4700, 1650));
    surface.addSurfacePoint(new Position(4000, 1700));
    surface.addSurfacePoint(new Position(3700, 1600));
    surface.addSurfacePoint(new Position(3750, 1900));
    surface.addSurfacePoint(new Position(4000, 2100));
    surface.addSurfacePoint(new Position(4900, 2050));
    surface.addSurfacePoint(new Position(5100, 1000));
    surface.addSurfacePoint(new Position(5500, 500));
    surface.addSurfacePoint(new Position(6200, 800));
    surface.addSurfacePoint(new Position(6999, 600));
    surface.addSurfacePoint(new Position(6999, 0));
  };

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
    getCtx().fill();
  };

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
  };

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
    getCtx().lineTo(origin.x, origin.y + (30 * state.value.power) / 4);
    getCtx().lineTo(origin.x + 3, origin.y);
    getCtx().closePath();
    getCtx().fill();

    getCtx().fillStyle = flameColor2;
    getCtx().beginPath();
    getCtx().moveTo(origin.x - 2, origin.y);
    getCtx().lineTo(origin.x, origin.y + (10 * state.value.power) / 4);
    getCtx().lineTo(origin.x + 2, origin.y);
    getCtx().closePath();
    getCtx().fill();
  };

  const paintPopulation = (pop, { clear, color } = { clear: true, color: "#f4d03f" }) => {
    if (clear) setUp(false, false);
    const { nextState, getPosition, reset, status } = useSimulation(initialLander, surface);

    getCtx().strokeStyle = color;
    for (let solutionWithScore of pop) {
      const solution = solutionWithScore.chromosome;
      if (solutionWithScore.score < betterChromosome.value)
        betterChromosome.value = solutionWithScore.score;

      getCtx().beginPath();
      getCtx().moveTo(getRelativeX(initialLander.value.x), getRelativeY(initialLander.value.y));
      for (let action of solution) {
        nextState(action);
        const pos = getPosition();
        getCtx().lineTo(getRelativeX(pos.x), getRelativeY(pos.y));
        if (SimulationStatus.isFinish(status.value)) break;
      }
      getCtx().stroke();
      getCtx().closePath();
      reset();
    }
    paintLander();

    getCtx().font = "30px Arial";
    getCtx().fillText(`Generation: ${currentGeneration.value}`, 10, 50);
    getCtx().fillText(`Better sequence:`, 10, 100);
    getCtx().fillText(`\t\tScore: ${betterChromosome.value}`, 10, 150);
  };

  const setUp = (initialize = false, initLander = true) => {
    const gradient = getCtx().createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, "#ff8181");
    gradient.addColorStop(1, "#ed8aff");
    getCtx().fillStyle = gradient;
    getCtx().fillRect(0, 0, width, height);
    paintSky(initialize);
    paintMap(initialize);
    if (initLander) {
      setUpLander(6500, 2000, 0, 0, 0, 0, 1200);
    }
  };

  onMounted(() => {
    setUp(true, true);
  });

  onBeforeUnmount(() => {
    run.value = false;
  });

  watch(populationScores, (value) => {
    const sortedPopulation = value.sort(chromosomeScoreComparator);
    paintPopulation(sortedPopulation.slice(10, sortedPopulation.length));
    paintPopulation(sortedPopulation.slice(0, 10), { clear: false, color: "#2ecc71" });
  });

  watch(
    state,
    () => {
      paintLander();
    },
    { deep: true },
  );

  watch(run, (value) => {
    if (!value) return;
    train();
  });
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Mars Lander</h1>
      <p class="subtitle">Genetic Algorithm Simulation</p>
    </header>

    <div class="controls">
      <div class="actions">
        <jg-button @click="create">Create first population</jg-button>
        <jg-button v-if="populationScores.length > 0" @click="run = !run">
          {{ run ? "Pause" : "Find solution" }}
        </jg-button>
        <jg-button @click="resetConfig">Reset config</jg-button>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="stat__label">Generation</span>
          <span class="stat__value">{{ currentGeneration }}</span>
        </div>
        <div class="stat">
          <span class="stat__label">Best Score</span>
          <span class="stat__value">{{
            betterChromosome === Infinity ? "-" : betterChromosome
          }}</span>
        </div>
        <div class="stat">
          <span class="stat__label">Population</span>
          <span class="stat__value">{{ configuration.population_size }}</span>
        </div>
      </div>

      <div class="sliders">
        <div class="slider-group">
          <label>Population size</label>
          <div class="slider-row">
            <input type="range" min="10" max="100" v-model="configuration.population_size" />
            <input type="number" min="10" max="100" v-model="configuration.population_size" />
          </div>
        </div>
        <div class="slider-group">
          <label>Chromosome size</label>
          <div class="slider-row">
            <input type="range" min="0" max="200" v-model="configuration.chromosome_size" />
            <input type="number" min="0" max="200" v-model="configuration.chromosome_size" />
          </div>
        </div>
        <div class="slider-group">
          <label>Elitism size</label>
          <div class="slider-row">
            <input
              type="range"
              min="0"
              :max="configuration.population_size"
              v-model="configuration.elitism_size"
            />
            <input
              type="number"
              min="0"
              :max="configuration.population_size"
              v-model="configuration.elitism_size"
            />
          </div>
        </div>
        <div class="slider-group">
          <label>Selection size</label>
          <div class="slider-row">
            <input
              type="range"
              min="4"
              :max="configuration.population_size"
              v-model="configuration.selection_size"
            />
            <input
              type="number"
              min="4"
              :max="configuration.population_size"
              v-model="configuration.selection_size"
            />
          </div>
        </div>
        <div class="strategy">
          <span class="strategy__label">Strategy</span>
          <span class="strategy__value">{{ configuration.strategy }}</span>
        </div>
      </div>
    </div>

    <div class="canvas-wrapper">
      <canvas ref="board" :width="width" :height="height" />
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 90vw;
    width: 850px;
    margin: var(--space-lg) auto;
  }

  .header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }

  .title {
    font-family: var(--font-mono);
    font-size: 1.8rem;
    color: var(--color-accent);
    margin-bottom: var(--space-xs);
  }

  .subtitle {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--color-text-dim);
  }

  .controls {
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    margin-bottom: var(--space-lg);
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
    flex-wrap: wrap;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  .stat {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    text-align: center;
  }

  .stat__label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-xs);
  }

  .stat__value {
    display: block;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    color: var(--color-accent);
    font-weight: 700;
  }

  .sliders {
    display: grid;
    gap: var(--space-md);
  }

  .slider-group label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin-bottom: var(--space-xs);
  }

  .slider-row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .slider-row input[type="range"] {
    flex: 1;
    accent-color: var(--color-accent);
    background: var(--color-bg);
    border-radius: var(--radius-full);
  }

  .slider-row input[type="number"] {
    width: 70px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-family: var(--font-mono);
    padding: var(--space-xs) var(--space-sm);
    text-align: center;
  }

  .strategy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
  }

  .strategy__label {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  .strategy__value {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--color-accent);
    font-weight: 500;
  }

  .canvas-wrapper {
    display: flex;
    justify-content: center;
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    overflow: auto;
  }

  canvas {
    border-radius: var(--radius-sm);
    max-width: 100%;
  }

  @media (max-width: 600px) {
    .stats {
      grid-template-columns: 1fr;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;
    }

    .slider-row {
      flex-direction: column;
      align-items: stretch;
    }

    .slider-row input[type="number"] {
      width: 100%;
    }
  }
</style>
