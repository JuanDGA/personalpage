<script setup>
  defineProps({
    items: {
      type: Array,
      required: true,
    }
  });
</script>

<template>
  <div class="icons">
    <div v-for="(item, i) in items" class="logo" :key="i">
      <div class="icon-container">
        <img :src="item.img" :alt="item.name + ' logo'" class="icon"/>
        <span :style="{background: item.bg}">{{item.name}}</span>
        <div class="skill-level">{{item.level}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.icons {
  display: flex;
}

.logo {
  background: #181818;
  padding: 5px;
  border-radius: 5px;
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon-container span {
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  font-weight: bold;
  font-size: 1.5rem;
}

.skill-level {
  font-style: italic;
  color: #888888;
  font-size: 0.9em;
}

.icon {
  margin: 5px;
  transition: 300ms;
  height: 70px;
  object-fit: cover;
}

.icon:hover {
  transform: scale(105%);
}
</style>
