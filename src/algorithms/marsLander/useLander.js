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
    let power = state.value.power + gene.power;
    let angle = state.value.angle + gene.angle;

    if (power < 0) power = 0;
    if (power > 4) power = 4;
    if (angle < -90) angle = -90;
    if (angle > 90) angle = 90;

    const aX = power * Math.cos(toRadians(angle + 90));
    const aY = -3.711 + (power * Math.sin(toRadians(angle + 90)));

    const newX = state.value.x + state.value.vx + (0.5 * aX);
    const newY = state.value.y + state.value.vy + (0.5 * aY);

    const newVx = state.value.vx + aX;
    const newVy = state.value.vy + aY;

    state.value.x = newX;
    state.value.y = newY;

    state.value.vx = newVx;
    state.value.vy = newVy;

    state.value.fuel = state.value.fuel - power;
    state.value.power = power;
    state.value.angle = angle;
  }

  return {state, setUp, advance}
}

export default useLander;
