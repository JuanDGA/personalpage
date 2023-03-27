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
        <span :class="item.name.toLowerCase()">{{item.name}}</span>
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
  background-clip: text;
  color: transparent;
  font-weight: bold;
  font-size: 1.5rem;
}

.icon-container .kotlin {
  background: linear-gradient(90deg, #0096D6, #816EE4, #C856BD, #F88A02, #F88A02);
}

.icon-container .python {
  background: linear-gradient(90deg, #599ED3, #FFD33B);
}

.icon-container .java {
  background: linear-gradient(90deg, #72A0FA, #DB380E);
}

.icon-container .javascript {
  background: #FFDD51;
}

.icon-container .springboot {
  background: #6DC647;
}

.icon-container .vue {
  background: linear-gradient(90deg, #42D392, #5F8BEE);
}

.icon-container .react {
  background: #60DAFA;
}

.icon-container .angular {
  background: linear-gradient(90deg, #DE002D, #C4002B);
}

.icon-container .english {
  background: linear-gradient(90deg, #C9082A, #F2F2F2);
}

.icon-container .spanish {
  background: linear-gradient(90deg, #FFCE00, #599ED3, #C9082A);
}

.icon-container .german {
  background: linear-gradient(90deg, #DD0000, #FFCE00);
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
