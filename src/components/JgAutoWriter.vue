<script setup>
  import { onMounted, onUnmounted, ref } from "vue";

  const props = defineProps({
    texts: {
      type: Array,
      default: () => [],
    },
    speed: {
      type: Number,
      default: 80,
    },
    deleteSpeed: {
      type: Number,
      default: 50,
    },
    pauseDuration: {
      type: Number,
      default: 2000,
    },
  });

  const currentText = ref("");
  const isTyping = ref(true);
  const isDeleting = ref(false);
  const wordIndex = ref(0);
  let timeoutId = null;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const type = () => {
    const fullText = props.texts[wordIndex.value % props.texts.length];

    if (prefersReducedMotion()) {
      currentText.value = fullText;
      return;
    }

    if (isTyping.value) {
      if (currentText.value.length < fullText.length) {
        currentText.value = fullText.slice(0, currentText.value.length + 1);
        timeoutId = setTimeout(type, props.speed);
      } else {
        isTyping.value = false;
        timeoutId = setTimeout(() => {
          isDeleting.value = true;
          type();
        }, props.pauseDuration);
      }
    } else if (isDeleting.value) {
      if (currentText.value.length > 0) {
        currentText.value = currentText.value.slice(0, -1);
        timeoutId = setTimeout(type, props.deleteSpeed);
      } else {
        isDeleting.value = false;
        isTyping.value = true;
        wordIndex.value = (wordIndex.value + 1) % props.texts.length;
        timeoutId = setTimeout(type, props.speed);
      }
    }
  };

  onMounted(() => {
    type();
  });

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
</script>

<template>
  <h2 class="autowriter">
    <span class="autowriter__text">{{ currentText }}</span>
    <span class="autowriter__cursor" aria-hidden="true"></span>
  </h2>
</template>

<style scoped>
  .autowriter {
    min-height: 2rem;
    font-family: var(--font-mono);
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--color-text-muted);
  }

  .autowriter__cursor {
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background-color: var(--color-accent);
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .autowriter__cursor {
      animation: none;
      opacity: 1;
    }
  }
</style>