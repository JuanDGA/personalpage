<script setup>
  defineProps({
    to: {
      type: String,
      default: "none",
    }
  });
</script>

<template>
  <router-link v-if="to !== 'none'" :to="to">
    <template #default>
      <button class="link"><slot /></button>
    </template>
  </router-link>
  <button v-else class="link"><slot /></button>
</template>

<style scoped>
  .link {
    border-radius: 0;
    border: none;
    box-shadow: none;
    padding: 3px 0;
    width: 130px;
    cursor: pointer;
    font-size: 1.5em;
    border-bottom: 5px solid #58d68d;
    background-color: #fff0;
    color: white;
    transition: 300ms;
  }

  .link:hover {
    padding: 3px 0;
    width: 135px;
    border-bottom: 7px solid #58d68d;
  }
</style>