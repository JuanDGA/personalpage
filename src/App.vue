<script setup>
  import AppWrapper from "@/components/AppWrapper.vue";
</script>

<template>
  <app-wrapper>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </app-wrapper>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 200ms ease,
      transform 200ms ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(6px);
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-enter-active,
    .fade-leave-active {
      transition: none;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 1;
      transform: none;
    }
  }
</style>
