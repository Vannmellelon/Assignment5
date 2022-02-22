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
    }
});

</script>

<template>
    <div id="score-disp">
        <p>Your score: {{score}}</p>
    </div>
    <ul>
        <div id="question-container" v-for="question in props.questions">
            <h2>{{question.question}}</h2>
            <div id="all-buttons">
                <div id="tf-buttons">
                    <p class="answer" 
                        id="correct-answer">
                        {{question.correct_answer}}</p>
                    <p class="answer" 
                        v-bind:class="{'wrong-answer' : question.incorrect_answers[0] == question.userAnswer}">
                        {{question.incorrect_answers[0]}}
                    </p>
                </div>
                <div v-if="question.type == 'multiple'">
                    <p class="answer" 
                        v-bind:class="{'wrong-answer' : question.incorrect_answers[1] == question.userAnswer}">
                        {{question.incorrect_answers[1]}}
                    </p>
                    <p class="answer" 
                        v-bind:class="{'wrong-answer' : question.incorrect_answers[2] == question.userAnswer}">
                        {{question.incorrect_answers[2]}}
                    </p>
                </div>
            </div>
        </div>
    </ul>
</template>