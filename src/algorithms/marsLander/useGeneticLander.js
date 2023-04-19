import { ref, watch } from "vue";
import useSimulation, { SimulationResult, SimulationStatus } from "@/algorithms/marsLander/useSimulation";
import { Gene, hypot, Position, pow, randInt, sleep, toDegrees } from "@/algorithms/marsLander/utils";
import useLander from "@/algorithms/marsLander/useLander";

const useGeneticLander = (surfaceMap) => {
  const configuration = ref({
    population_size: 40,
    chromosome_size: 90,
    selection_size: 20,
    elitism_size: 4,
    strategy: "MATE",
    mutation_probability: 0.1,
  });

  const status = ref("")

  const population = ref([]);

  const {state: initialLander, setUp} = useLander();
  const {state, reset} = useSimulation(initialLander, surfaceMap);

  const currentStatus = ref(SimulationStatus.FLYING);

  const init = () => {
    const newPopulation = []
    for (let i = 0; i < configuration.value.population_size; i++) {
      const chromosome = []
      for (let j = 0; j < configuration.value.chromosome_size; j++) {
        chromosome.push(Gene.random());
      }
      newPopulation.push(chromosome);
    }
    population.value = newPopulation
  }

  const improve = async () => {
    while (currentStatus.value !== SimulationStatus.LANDING) {
      population.value = crossover(select());
      await sleep(1000);
    }
  }

  const select = () => {
    const selectedPopulation = [];
    const sortedPopulation = [...population.value].sort(chromosomeComparator);
    selectedPopulation.push(...sortedPopulation.slice(0, configuration.value.elitism_size));

    while (selectedPopulation.length < configuration.value.selection_size) {
      const tournament = [];
      for (let i = 0; i < 5; i++) {
        tournament.push(sortedPopulation[randInt(0, configuration.value.population_size - 1)]);
      }

      selectedPopulation.push(tournament.sort(chromosomeComparator)[0]);
    }

    return selectedPopulation;
  }

  const crossover = (basePopulation) => {
    const newPopulation = [];
    const sortedPopulation = [...population.value].sort(chromosomeComparator);
    newPopulation.push(...sortedPopulation.slice(0, configuration.value.elitism_size));

    const parentA = basePopulation[0];
    const parentB = basePopulation[1];

    while (newPopulation.length < configuration.value.population_size) {
      const parentC = basePopulation[randInt(0, configuration.value.selection_size - 1)];
      const parentD = basePopulation[randInt(0, configuration.value.selection_size - 1)];

      const crossoverFunction = {
        "MATE": mate,
        "MIX": mix,
      }

      const [child1, child2] = crossoverFunction[configuration.value.strategy](parentA, parentB);
      const [child3, child4] = crossoverFunction[configuration.value.strategy](parentC, parentD);

      newPopulation.push(child1, child2, child3, child4);
    }

    return newPopulation;
  }

  const mate = (parentA, parentB) => {
    const childA = [];
    const childB = [];

    for (let i = 0; i < configuration.value.chromosome_size; i++) {
      const r = Math.random();

      const pA = r * parentA[i].power + (1 - r) * parentB[i].power;
      const dA = r * parentA[i].angle + (1 - r) * parentB[i].angle;

      const pB = (1 - r) * parentA[i].power + r * parentB[i].power;
      const dB = (1 - r) * parentA[i].angle + r * parentB[i].angle;

      const geneA = new Gene(Math.round(pA), Math.round(dA)).mutate(configuration.value.mutation_probability);
      const geneB = new Gene(Math.round(pB), Math.round(dB)).mutate(configuration.value.mutation_probability);

      childA.push(geneA);
      childB.push(geneB);
    }

    return [childA, childB]
  }

  const mix = (parentA, parentB) => {
    const childA = [];
    const childB = [];

    const randomRange = randInt(0, configuration.value.chromosome_size);

    for (let i = 0; i < randomRange; i++) {
      childA.push(parentB[i].mutate(configuration.value.mutation_probability));
      childB.push(parentA[i].mutate(configuration.value.mutation_probability));
    }

    for (let i = randomRange; i < configuration.value.chromosome_size; i++) {
      childA.push(parentA[i].mutate(configuration.value.mutation_probability));
      childB.push(parentB[i].mutate(configuration.value.mutation_probability));
    }

    return [childA, childB];
  }

  const evaluateChromosome = (ch) => {
    const relativeAngle = (position) => {
      const landing = surfaceMap.getLandingPosition();
      const origin = new Position(landing.x, 0);

      const a = hypot(origin.x - position.x, origin.y - position.y);
      const b = hypot(landing.x - origin.x, landing.y - origin.y);
      const c = hypot(landing.x - position.x, landing.y - position.y);

      return toDegrees(Math.acos((pow(c, 2) - pow(a, 2) - pow(b, 2))/-(2*a*b)));
    }

    const target = surfaceMap.getLandingPosition();
    const {lastPosition, currentPosition, state: lander, getResult} = SimulationResult(ch, surfaceMap, initialLander);

    const lastStatus = getResult();

    const intersections = surfaceMap.getIntersections(lastPosition.value.x, lastPosition.value.y, target.x, target.y + 1);
    const degreeToTarget = relativeAngle(currentPosition.value);

    let finalEvaluation = 0;

    switch (lastStatus) {
      case SimulationStatus.LOST:
        finalEvaluation = 40000 + 40000 * (intersections - degreeToTarget);
        break;
      case SimulationStatus.CRASH:
        finalEvaluation = 30000 + 30000 * (intersections - degreeToTarget) + hypot(target.x - currentPosition.value.x, target.y - currentPosition.value.y);
        break;
      case SimulationStatus.FLYING:
        finalEvaluation = 20000 + 20000 * (intersections - degreeToTarget) + hypot(target.x - currentPosition.value.x, target.y - currentPosition.value.y);
        break;
      case SimulationStatus.LANDING_CRASH:
        finalEvaluation = 10000 + Math.abs(lander.value.vx) + Math.abs(lander.value.vy) + Math.abs(lander.value.angle);
        break;
      case SimulationStatus.LANDING:
        finalEvaluation = 1/lander.value.fuel;
        break;
    }

    return finalEvaluation
  }

  const chromosomeComparator = (chA, chB) => {
    const evaluationA = evaluateChromosome(chA);
    const evaluationB = evaluateChromosome(chB);

    if (evaluationA < evaluationB) return -1;
    if (evaluationA > evaluationB) return 1;
    return 0;
  }

  watch(initialLander, () => {
    console.log("CHANGING");
    reset();
  }, {deep: true});

  return {
    initialLander,
    status,
    state,
    configuration,
    population,
    init,
    improve,
    setUp,
    evaluateChromosome,
    chromosomeComparator,
  };
}

export default useGeneticLander;
