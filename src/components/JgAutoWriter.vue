<script setup>
  import { onMounted, ref } from "vue";

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
  });

  const currentText = ref("");

  const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

  const startWriting = async () => {
    await awaitForText(3200);
    for (let i of props.text) {
      await sleep(100);
      currentText.value += i;
    }
    await awaitForText(5000);
    deleteWritten();
  };

  const deleteWritten = async () => {
    while (currentText.value.length > 0) {
      await sleep(100);
      currentText.value = currentText.value.slice(0, currentText.value.length - 1);
    }
    startWriting();
  };

  const awaitForText = async (ms) => {
    let finished = false;
    setTimeout(() => (finished = true), ms);
    let added = false;
    while (!finished) {
      await sleep(400);
      if (!added) {
        currentText.value += "|";
        added = true;
      } else {
        currentText.value = currentText.value.slice(0, currentText.value.length - 1);
        added = false;
      }
    }
    if (added) currentText.value = currentText.value.slice(0, currentText.value.length - 1);
  };

  onMounted(() => {
    startWriting();
  });
</script>

<template>
  <h2 style="min-height: 32px">{{ currentText }}</h2>
</template>
