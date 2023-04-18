import { ref } from "vue";
import useSimulation from "@/algorithms/marsLander/useSimulation";
import { Gene } from "@/algorithms/marsLander/utils";
import useLander from "@/algorithms/marsLander/useLander";

const useGeneticLander = (map) => {
  const configuration = ref({
    population_size: 80,
    chromosome_size: 100,
    elitism_size: 10,
  });

  const status = ref("")

  const population = ref([]);

  const {} = useLander();

  const {state} = useSimulation();

  const init = () => {
    population.value = []
    const newPopulation = []
    for (let i = 0; i < configuration.value.population_size; i++) {
      const chromosome = []
      for (let j = 0; j < configuration.value.chromosome_size; j++) {
        chromosome.push(Gene.random())
      }
      newPopulation.push(chromosome)
    }
    population.value = newPopulation
  }

  const improve = () => {

  }

  const select = () => {

  }

  const crossover = () => {

  }

  const better = () => {

  }

  return {
    status,
    state,
    configuration,
    population,
    init,
  };
}

export default useGeneticLander;
