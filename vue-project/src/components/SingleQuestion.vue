<style>
  @import "./singleQuestion.css";
</style>

<script setup lang="ts">
import { ref, type PropType, type Ref } from "vue";
import { useStore } from "vuex";
import type { Question } from "../api/questions";

const props = defineProps({
    questions: {
        type: Array as PropType<Question[]>,
        required: true
    }
});

const userAnswer:Ref<String> = ref("");
const store = useStore();

function funcClickQuestion(ans:string, que:Question) {
    store.commit("setUserAnswer", [ans, que.question]);
}
</script>

<template>
    <ul> 
        <div id="question-container" v-for="question in props.questions">
            <p>{{question.question}}</p>
            <div id="all-buttons">
                <div id="tf-buttons">
                    <button class="answer" v-on:click="funcClickQuestion(question.correct_answer, question)" >{{question.correct_answer}}</button>
                    <button class="answer" v-on:click="funcClickQuestion(question.incorrect_answers[0], question)">{{question.incorrect_answers[0]}}</button>
                </div>
                <div v-if="question.type == 'multiple'">
                    <button class="answer" v-on:click="funcClickQuestion(question.incorrect_answers[1], question)">{{question.incorrect_answers[1]}}</button>
                    <button class="answer" v-on:click="funcClickQuestion(question.incorrect_answers[2], question)">{{question.incorrect_answers[2]}}</button>
                </div>
            </div>
        </div>
    </ul>
</template>