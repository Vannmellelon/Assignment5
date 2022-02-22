<style>
  @import "./singleQuestion.css";
</style>

<script setup lang="ts">
import { type PropType } from "vue";
import type { Question } from "../api/questions";

const props = defineProps({
    questions: {
        type: Array as PropType<Question[]>,
        required: true
    }
});
</script>

<template>
    <ul> 
        <div id="question-container" v-for="question in props.questions">
            <p>{{question.question}}</p>
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