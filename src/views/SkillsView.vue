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
    {name: "Kotlin", img: kotlin, level: "Advanced"},
    {name: "Java", img: java, level: "Advanced"},
    {name: "Python", img: python, level: "Advanced"},
    {name: "Javascript", img: js, level: "Expert"},
  ];

  const frameworks = [
    {name: "SpringBoot", img: spring, level: "Advanced"},
    {name: "Vue", img: vue, level: "Expert"},
    {name: "React", img: react, level: "Intermediate"},
    {name: "Angular", img: angular, level: "Intermediate"},
  ];

  const languages = [
    {name: "English", img: english, level: "Advanced"},
    {name: "German", img: german, level: "Novice"},
    {name: "Spanish", img: spanish, level: "Primary language"},
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
