<script lang="ts" setup>
import { computed, onMounted, ref, type ComputedRef } from "vue";
import type { Question } from "../api/questions";
import { useStore } from "vuex";
import Results from "../components/Results.vue";

const store = useStore();

const questions:ComputedRef<Question[]> = computed(() => store.state.questions);
</script>

<template>
    <h1>RESULTS</h1>
    <!-- <div v-for="question in questions">
        <p> {{question.correct_answer}} </p>
    </div> -->
    <Results :questions="questions" />
    <router-link to="/">
        <Button>Try again!</Button>
    </router-link>
</template>