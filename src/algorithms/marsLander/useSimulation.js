import { ref } from "vue";
import useLander from "@/algorithms/marsLander/useLander";
import { Position } from "@/algorithms/marsLander/utils";

export const SimulationStatus = Object.freeze({
  FLYING: "f",
  CRASH: "c",
  LANDING_CRASH: "lc",
  LOST: "la",
  LANDING: "lo",
  isFinish(status) {
    return status !== SimulationStatus.FLYING
  }
});

export const SimulationResult = (chromosome, map, lander) => {
  const {getPosition, nextState, status, state} = useSimulation(lander);

  const lastPosition = ref(getPosition());
  const currentPosition = ref(getPosition());
  const finished = ref(true);

  for (let gene of chromosome) {
    lastPosition.value = getPosition();
    nextState(gene);
    currentPosition.value = getPosition();
    if (SimulationStatus.isFinish(status.value)) break;
  }
  finished.value = true;

  return {finished, status, state, lastPosition, currentPosition}
}

const useSimulation = (initialLander) => {
  const {setUp, advance, state} = useLander();

  const status = ref(SimulationStatus.FLYING);
  const init = () => setUp(initialLander.x, initialLander.y, initialLander.vx, initialLander.vy, initialLander.angle, initialLander.power, initialLander.fuel);
  init();

  const nextState = (action) => {
    advance(action);
  }

  const getPosition = () => new Position(state.value.x, state.value.y);

  const reset = () => {
    init();
    status.value = SimulationStatus.FLYING
  }

  return { status, state, nextState, getPosition, reset };
}

export default useSimulation;
