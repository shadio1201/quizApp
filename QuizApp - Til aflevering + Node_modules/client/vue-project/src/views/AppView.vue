<template>
    <div class="login">
      <div class="h-fit flex flex-col justify-center items-center w-full"
      v-for="question, index in questions"
      :key="index"
      >
      <quizElement :quiz="question"></quizElement>
      </div>
    </div>
  </template>
  
  <script setup>
  import Quiz from '../services/Quiz'
  import quizElement from '../components/quizElement.vue'


  const questions = Quiz.getQuiz();
  
  </script>