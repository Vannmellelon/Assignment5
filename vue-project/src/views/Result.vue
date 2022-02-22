<script lang="ts" setup>
import { computed, onMounted, ref, type ComputedRef } from "vue";
import type { Question } from "../api/questions";
import { useStore } from "vuex";
import Results from "../components/Results.vue";

const store = useStore();

const questions:ComputedRef<Question[]> = computed(() => store.state.questions);
const score:ComputedRef<number> = computed(() => store.getters.getScore);
const highScore:ComputedRef<number> = computed(() => store.getters.getHighscore);
const username:ComputedRef<string> = computed(() => store.getters.getUsername);
</script>

<template>
    <h1>RESULTS</h1>
    <!-- <div v-for="question in questions">
        <p> {{question.correct_answer}} </p>
    </div> -->
    <Results 
    :questions="questions" 
    :score="score" 
    :highScore="highScore"
    :username="username" />
    <div id="result-buttons">
        <router-link to="/questions">
            <Button class="big-button" id="result-button">Play again</Button>
        </router-link>
        <router-link to="/">
            <Button class="big-button" id="new-button">New player</Button>
        </router-link>
    </div>
</template>