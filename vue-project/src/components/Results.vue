<style>
  @import "./components.css";
</style>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Question } from "../api/questions";

const props = defineProps({
    questions: {
        type: Array as PropType<Question[]>,
        required: true
    },
    score: {
        type:Number,
        required: true
    },
    highScore: {
        type:Number,
        required: true
    },
    username: {
        type:String,
        required: true
    },
});

</script>

<template>
    <div id="score-disp">
        <h1>Hi {{username}}! </h1>
        <h2>Your previous high score: {{highScore}}</h2>
        <h2>Your current score: {{score}}</h2>
    </div>
    <ul>
        <div id="question-container" v-for="question in props.questions">
            <h2><span v-html="question.question"></span></h2>
            <div id="all-buttons">
                <div id="tf-buttons">
                    <p class="results" 
                        id="correct-answer">
                        <span v-html="question.correct_answer"></span></p>
                    <p class="results" 
                        v-bind:class="{'wrong-answer' : question.incorrect_answers[0] == question.userAnswer}">
                        <span v-html="question.incorrect_answers[0]"></span></p>
                </div>
                <div v-if="question.type == 'multiple'">
                    <p class="results" 
                        v-bind:class="{'wrong-answer' : question.incorrect_answers[1] == question.userAnswer}">
                        <span v-html="question.incorrect_answers[1]"></span></p>
                    <p class="results" 
                        v-bind:class="{'wrong-answer' : question.incorrect_answers[2] == question.userAnswer}">
                        <span v-html="question.incorrect_answers[2]"></span></p>
                </div>
            </div>
        </div>
    </ul>
</template>