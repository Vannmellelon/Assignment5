<style>
  @import "./singleQuestion.css";
</style>

<script setup lang="ts">
import type { PropType } from "vue";
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
                    <button class="answer">{{question.correct_answer}}</button>
                    <button class="answer">{{question.incorrect_answers[0]}}</button>
                </div>
                   <div v-if="question.type == 'multiple'">
                    <button class="answer">{{question.incorrect_answers[1]}}</button>
                    <button class="answer">{{question.incorrect_answers[2]}}</button>
                </div>
            </div>
        </div>
</ul>
</template>