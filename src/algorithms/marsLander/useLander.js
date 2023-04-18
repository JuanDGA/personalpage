import { ref } from "vue";
import { toRadians } from "@/algorithms/marsLander/utils";

const useLander = () => {
  const state = ref({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    power: 0,
    fuel: 0,
  });

  const setUp = (x, y, vx, vy, angle, power, fuel) => {
    state.value.x = x;
    state.value.y = y;
    state.value.vx = vx;
    state.value.vy = vy;
    state.value.angle = angle;
    state.value.power = power;
    state.value.fuel = fuel;
  }

  const advance = (gene) => {
    state.value.power = state.value.power + gene.power > 4 ? 4 : state.value.power + gene.power < 0 ? 0 : state.value.power + gene.power
    state.value.angle = state.value.angle + gene.angle > 90 ? 90 : state.value.angle + gene.angle < -90 ? -90 : state.value.angle + gene.angle

    if (state.value.fuel <= state.value.power) {
      state.value.power = state.value.fuel
    }

    state.value.fuel -= state.value.power

    const aX = state.value.power * Math.cos(toRadians(state.value.angle + 90))
    const aY =  -3.711 + (state.value.power * Math.sin(toRadians(state.value.angle + 90)))

    state.value.x = state.value.x + state.value.vx + (0.5 * aX);
    state.value.y = state.value.y + state.value.vy + (0.5 * aY);

    state.value.vx = state.value.vx + aX
    state.value.vy = state.value.vy + aY
  }

  return {state, setUp, advance}
}

export default useLander;
