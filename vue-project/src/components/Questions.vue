<style>
  @import "./components.css";
</style>

<script setup lang="ts">
import type { PropType } from "vue";
import { useStore } from "vuex";
import type { Question } from "../api/questions";

const props = defineProps({
    questions: {
        type: Array as PropType<Question[]>,
        required: true
    }
});

const store = useStore();

function funcClickQuestion(ans:string, que:Question) {
    store.commit("setUserAnswer", [ans, que.question]);
}

// TODO (in api/question.ts)
// scramble the questions, so that the first one is not always the correct one
// add array to question object, allAnswers, sort this
// use allAnswers to display answers instead
// user's answer still get's saved and checked against correct answer, so it should not be too troublesome to implement
</script>

<template>
    <ul> 
        <div id="question-container" 
            v-for="question in props.questions"
            :key="question.question">
            <h2><span v-html="question.question"></span></h2>
            <div class="all-buttons" >
                <div class="buttons" >    
                    <input class="answer-input" type="radio" :name="question.question"
                        :id="question.correct_answer + question.question" 
                        v-on:click="funcClickQuestion(question.correct_answer, question)" >
                    <label class="answer" :for="question.correct_answer + question.question">
                        <span v-html="question.correct_answer"></span>
                    </label>
                               
                    <input class="answer-input" type="radio" :name="question.question" 
                        :id="question.incorrect_answers[0] + question.question" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[0], question)" >
                    <label class="answer" :for="question.incorrect_answers[0] + question.question">
                        <span v-html="question.incorrect_answers[0]"></span>
                    </label>
                </div>
                <!-- Only if multiple choice -->
                <div class="buttons" v-if="question.type == 'multiple'">
                    <input class="answer-input" type="radio" :name="question.question" 
                        :id="question.incorrect_answers[1]" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[1], question)" >
                    <label class="answer" :for="question.incorrect_answers[1]">
                        <span v-html="question.incorrect_answers[1]"></span>                    </label>

                    <input class="answer-input" type="radio" :name="question.question" 
                        :id="question.incorrect_answers[2]" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[2], question)" >
                    <label class="answer" :for="question.incorrect_answers[2]">
                        <span v-html="question.incorrect_answers[2]"></span>                    </label>
                </div>
            </div>
        </div>
    </ul>
</template>