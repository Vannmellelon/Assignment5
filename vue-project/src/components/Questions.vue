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
    // TODO make unclickable/greyed out
}
</script>

<template>
    <ul> 
        <div id="question-container" 
            v-for="question in props.questions"
            :key="question.question">
            <h2>{{question.question}}</h2>
            <div class="all-buttons" >
                <div class="buttons" >    
                    <input class="answer-input" type="radio" :name="question.question"
                        :id="question.correct_answer + question.question" 
                        v-on:click="funcClickQuestion(question.correct_answer, question)" >
                    <label class="answer" :for="question.correct_answer + question.question">
                        {{question.correct_answer}}
                    </label>
                               
                    <input class="answer-input" type="radio" :name="question.question" 
                        :id="question.incorrect_answers[0] + question.question" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[0], question)" >
                    <label class="answer" :for="question.incorrect_answers[0] + question.question">
                        {{question.incorrect_answers[0]}}
                    </label>
                </div>
                <!-- Only if multiple choice -->
                <div class="buttons" v-if="question.type == 'multiple'">
                    <input class="answer-input" type="radio" :name="question.question" 
                        :id="question.incorrect_answers[1]" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[1], question)" >
                    <label class="answer" :for="question.incorrect_answers[1]">
                        {{question.incorrect_answers[1]}}
                    </label>

                    <input class="answer-input" type="radio" :name="question.question" 
                        :id="question.incorrect_answers[2]" 
                        v-on:click="funcClickQuestion(question.incorrect_answers[2], question)" >
                    <label class="answer" :for="question.incorrect_answers[2]">
                        {{question.incorrect_answers[2]}}
                    </label>
                </div>
            </div>
        </div>
    </ul>
</template>