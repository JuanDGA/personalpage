<script setup>
  import { computed, onMounted, ref, watch } from "vue";
  import JgButton from "@/components/JgButton.vue";
  import { useKeyUp } from "@/hooks/useKeyboard";

  const game = ref();
  const context = ref();
  const playing = ref(false);

  const foodIsMissing = ref(true);
  const currentFood = ref([]);
  const snake = ref([]);
  const dir = ref("UP");
  const growQueue = ref([]);

  const points = ref(0);
  const history = ref([]);

  const { keycode } = useKeyUp();

  const betterScore = computed(() => {
    if (history.value.length === 0) return 0;
    return [...history.value].sort()[history.value.length - 1];
  });

  const getCtx = () => context.value;

  const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

  const play = async () => {
    playing.value = true;
    while (playing.value) {
      await sleep(250);
      move();
      checkEating();
      checkGrowing();
      repaint();
    }
  };

  const move = () => {
    const temp = [...snake.value];
    snake.value = [];
    for (let i = 1; i < temp.length; i++) {
      snake.value.push(temp[i - 1]);
    }
    switch (dir.value) {
      case "UP":
        snake.value.unshift([temp[0][0], temp[0][1] - 1]);
        break;
      case "DOWN":
        snake.value.unshift([temp[0][0], temp[0][1] + 1]);
        break;
      case "RIGHT":
        snake.value.unshift([temp[0][0] + 1, temp[0][1]]);
        break;
      case "LEFT":
        snake.value.unshift([temp[0][0] - 1, temp[0][1]]);
        break;
    }
    checkGameOver();
  };

  const checkGameOver = () => {
    if (snake.value[0][0] > 21 || snake.value[0][0] < 0) gameOver();
    if (snake.value[0][1] > 21 || snake.value[0][1] < 0) gameOver();

    for (let i = 1; i < snake.value.length; i++) {
      const head = snake.value[0];
      const bodyPart = snake.value[i];
      if (head[0] === bodyPart[0] && head[1] === bodyPart[1]) gameOver();
    }
  };

  const gameOver = () => {
    playing.value = false;
    foodIsMissing.value = true;
    snake.value = [];
    growQueue.value = [];
    history.value.push(points.value);
    points.value = 0;
    setupGame();
  };

  const checkEating = () => {
    if (snake.value[0][0] === currentFood.value[0] && snake.value[0][1] === currentFood.value[1]) {
      points.value += 10;
      foodIsMissing.value = true;
      growQueue.value.push(currentFood.value);
    }
  };

  const checkGrowing = () => {
    if (growQueue.value.length === 0) return;
    const nextFood = growQueue.value[0];
    const inSnake = snake.value.some((it) => it[0] === nextFood[0] && it[1] === nextFood[1]);
    if (inSnake) return;
    snake.value.push(growQueue.value.shift());
  };

  const drawFood = () => {
    let x, y;
    getCtx().fillStyle = "green";
    if (foodIsMissing.value) {
      while (foodIsMissing.value) {
        x = Math.floor(Math.random() * 22);
        y = Math.floor(Math.random() * 22);
        currentFood.value = [x, y];
        foodIsMissing.value = snake.value.some((it) => it[0] === x && it[1] === y);
      }
    } else {
      x = currentFood.value[0];
      y = currentFood.value[1];
    }
    getCtx().fillRect(x * 15, y * 15, 15, 15);
  };

  const drawEaten = () => {
    for (let i of growQueue.value) {
      const pos = i;
      const isHead = pos[0] === snake.value[0][0] && pos[1] === snake.value[0][1];
      getCtx().fillStyle = isHead ? "#F3F17F" : "#28b463";
      let x = pos[0] * 15;
      let y = pos[1] * 15;
      x -= 2;
      y -= 2;
      getCtx().fillRect(x, y, 19, 19);
    }
  };

  const drawSnake = () => {
    for (let j = 0; j < snake.value.length; j++) {
      const i = snake.value[j];
      getCtx().fillStyle = j === 0 ? "#F3F17F" : "#58d68d";
      getCtx().fillRect(i[0] * 15, i[1] * 15, 15, 15);
    }
  };

  const repaint = () => {
    getCtx().fillStyle = "black";
    getCtx().fillRect(0, 0, 330, 330);
    drawFood();
    drawSnake();
    drawEaten();
  };

  const setupGame = () => {
    snake.value.push([10, 10]);
    dir.value = "UP";
    getCtx().fillStyle = "black";
    getCtx().fillRect(0, 0, 330, 330);
    drawFood();
    drawSnake();
  };

  onMounted(() => {
    context.value = game.value.getContext("2d");
  });

  watch(context, () => setupGame());
  watch(keycode, (value) => {
    if (!playing.value) return;
    switch (value) {
      case 37:
        if (dir.value === "RIGHT") break;
        dir.value = "LEFT";
        break;
      case 38:
        if (dir.value === "DOWN") break;
        dir.value = "UP";
        break;
      case 39:
        if (dir.value === "LEFT") break;
        dir.value = "RIGHT";
        break;
      case 40:
        if (dir.value === "UP") break;
        dir.value = "DOWN";
        break;
      default:
        break;
    }
  });
</script>

<template>
  <div class="points">
    <div>Points: {{ points }}</div>
    <jg-button v-if="!playing" @click="play">Play</jg-button>
    <div>Best: {{ betterScore }}</div>
  </div>
  <div class="game-container">
    <canvas ref="game" width="330" height="330" />
  </div>
</template>

<style scoped>
  .game-container {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .points {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    max-width: 330px;
    margin: 30px auto 0 auto;
  }
</style>
