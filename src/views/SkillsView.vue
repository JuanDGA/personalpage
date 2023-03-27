<script setup>
  import kotlin from "@/assets/icons/kotlin.png";
  import python from "@/assets/icons/python.png";
  import java from "@/assets/icons/java.png";
  import js from "@/assets/icons/js.png";
  import vue from "@/assets/icons/vue.png";
  import react from "@/assets/icons/react.png";
  import angular from "@/assets/icons/angular.png";
  import spring from "@/assets/icons/spring.png";
  import english from "@/assets/icons/english.png";
  import spanish from "@/assets/icons/spanish.png";
  import german from "@/assets/icons/german.png";
  import JgIconsList from "@/components/JgIconsList.vue";

  const programmingLanguages = [
    {name: "Kotlin", img: kotlin, level: "Advanced", bg: "linear-gradient(90deg, #0096D6, #816EE4, #C856BD, #F88A02, #F88A02)"},
    {name: "Java", img: java, level: "Advanced", bg: "linear-gradient(90deg, #72A0FA, #DB380E)"},
    {name: "Python", img: python, level: "Advanced", bg: "linear-gradient(90deg, #599ED3, #FFD33B)"},
    {name: "Javascript", img: js, level: "Expert", bg: "#FFDD51"},
  ];

  const frameworks = [
    {name: "SpringBoot", img: spring, level: "Advanced", bg: "#6DC647"},
    {name: "Vue", img: vue, level: "Expert", bg: "linear-gradient(90deg, #42D392, #5F8BEE)"},
    {name: "React", img: react, level: "Intermediate", bg: "#60DAFA"},
    {name: "Angular", img: angular, level: "Intermediate", bg: "linear-gradient(90deg, #DE002D, #C4002B)"},
  ];

  const languages = [
    {name: "English", img: english, level: "Advanced", bg: "linear-gradient(90deg, #C9082A, #F2F2F2)"},
    {name: "German", img: german, level: "Novice", bg: "linear-gradient(90deg, #DD0000, #FFCE00)"},
    {name: "Spanish", img: spanish, level: "Primary language", bg: "linear-gradient(90deg, #FFCE00, #599ED3, #C9082A)"},
  ];
</script>

<template>
  <div class="container">
    <div class="row">
      <h3 class="title">Programming languages</h3>
      <jg-icons-list :items="programmingLanguages"/>
    </div>
    <div class="row">
      <h3 class="title">Frameworks</h3>
      <jg-icons-list :items="frameworks"/>
    </div>
    <div class="row">
      <h3 class="title">Languages</h3>
      <jg-icons-list :items="languages"/>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 750px;
    max-width: 90vw;
    margin: 30px auto;
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .title {
    color: #58d68d;
    font-size: 1.3rem;
  }
</style>
