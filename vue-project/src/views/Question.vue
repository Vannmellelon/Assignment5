<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted, ref, type ComputedRef } from "vue";
import { findAllQuestions, type Question } from "../api/questions";
import Questions from "../components/Questions.vue";
import { updateHighScore } from '@/api/users';

// store greier
const store = useStore();

const questions:ComputedRef<Question[]> = computed(() => store.state.questions);
const score:ComputedRef<number> = computed(() => store.getters.getScore);
const userId:ComputedRef<number> = computed(() => store.getters.getUserId);
const error = ref<string | null>(null);

onMounted(async () => {
    const [_error, _questions] = await findAllQuestions();
    store.commit("setQuestions", _questions);
    error.value = _error;
    console.log(error.value);
});

const updateHighScoreClick = async () => {
    console.log("score", score.value);
    console.log("userId", userId.value);
    const [error, user ] = await updateHighScore(score.value, userId.value);
    console.log("ERR", error)
    console.log("USER", user)
}
</script>

<template>
    <Questions :questions="questions" />
    <router-link to="/results">
        <Button class="big-button" id="result-button" @click="updateHighScoreClick">Show results</Button>                
    </router-link>
</template>