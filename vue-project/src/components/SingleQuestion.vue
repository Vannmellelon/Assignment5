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
    // TODO make unclickable/greyed out
}
</script>

<template>
    <ul> 
        <div id="question-container" v-for="question in props.questions">
            <p>{{question.question}}</p>
            <div id="all-buttons">
                <div id="tf-buttons">
                    <input type="radio" class="answer" name="{{question.question}}" 
                        id="{{question.correct_answer}}" 
                        v-on:click="funcClickQuestion(question.correct_answer, question)" >
                    <label for="{{question.correct_answer}}">{{question.correct_answer}}</label>
                    
                    <input type="radio" class="answer" name="{{question.question}}" 
                        id="{{question.incorrect_answers[0]}}" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[0], question)" >
                    <label for="{{question.correct_answer}}">{{question.incorrect_answers[0]}}</label>                    
                </div>
                <!-- Only if multiple choice -->
                <div v-if="question.type == 'multiple'">
                    <input type="radio" class="answer" name="{{question.question}}" 
                        id="{{question.incorrect_answers[1]}}" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[1], question)" >
                    <label for="{{question.correct_answer}}">{{question.incorrect_answers[1]}}</label>

                    <input type="radio" class="answer" name="{{question.question}}" 
                        id="{{question.incorrect_answers[2]}}" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[2], question)" >
                    <label for="{{question.correct_answer}}">{{question.incorrect_answers[2]}}</label> 
                </div>
            </div>
        </div>
    </ul>
</template>