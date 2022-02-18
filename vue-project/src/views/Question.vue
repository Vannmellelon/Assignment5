<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted, ref } from "vue";
import { findAllQuestions, type Question } from "../api/questions";

// store greier
const store = useStore();

const questions:Question[] = computed(() => store.state.questions);
const error = ref<string | null>(null);

onMounted(async () => {
    const [_error, _questions] = await findAllQuestions();
    store.commit("setQuestions", _questions);
    error.value = _error;
});


</script>


<template>
<h1>Questions</h1>

</template>