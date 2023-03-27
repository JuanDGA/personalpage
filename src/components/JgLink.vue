<script setup>
  defineProps({
    href: {
      type: String,
      default: "",
    }
  })
</script>

<template>
  <div v-if="!href">
    <slot/>
  </div>
  <a v-else :href="href" target="_blank">
    <slot />
  </a>
</template>
