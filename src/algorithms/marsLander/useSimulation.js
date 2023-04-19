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
  const {getPosition, nextState, status, state} = useSimulation(lander, map);

  const lastPosition = ref(getPosition());
  const currentPosition = ref(getPosition());
  const finished = ref(false);

  const initSimulation = () => {
    for (let gene of chromosome) {
      lastPosition.value = getPosition();
      nextState(gene);
      currentPosition.value = getPosition();
      if (SimulationStatus.isFinish(status.value)) break;
    }
    return status.value;
  }

  const getResult = () => {
    return initSimulation();
  }

  return {finished, status, state, lastPosition, currentPosition, getResult}
}

const useSimulation = (initialLander, surface) => {
  const {setUp, advance, state} = useLander();

  const status = ref(SimulationStatus.FLYING);

  const history = ref([]);

  const init = () => setUp(initialLander.value.x, initialLander.value.y, initialLander.value.vx, initialLander.value.vy, initialLander.value.angle, initialLander.value.power, initialLander.value.fuel);
  init();

  const evaluateStatus = () => {
    const landing = surface.getLandingPosition();
    const lastState = history.value[history.value.length - 1];

    const {x, y, vx, vy, angle} = state.value;

    const inTerrain = surface.getIntersections(lastState.x, lastState.y, x, y) !== 0;

    if (x < 0 || x > 6999 || y > 2999) status.value = SimulationStatus.LOST;
    else if (!inTerrain) status.value = SimulationStatus.FLYING;
    else if (x < landing.x - 250 || x > landing.x + 250) status.value = SimulationStatus.CRASH;
    else if (angle !== 0 || Math.abs(vx) > 20 || Math.abs(vy) > 40) status.value = SimulationStatus.CRASH;
    else status.value = SimulationStatus.LANDING;
  }

  const nextState = (action) => {
    history.value.push({...state.value });
    advance(action);
    evaluateStatus();
  };

  const getPosition = () => new Position(state.value.x, state.value.y);

  const reset = () => {
    init();
    status.value = SimulationStatus.FLYING;
  }

  return { status, state, nextState, getPosition, reset };
}

export default useSimulation;
