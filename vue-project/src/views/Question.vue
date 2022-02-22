<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted, ref, type ComputedRef } from "vue";
import { findAllQuestions, type Question } from "../api/questions";
import SingleQuestion from "../components/SingleQuestion.vue";

// store greier
const store = useStore();

const questions:ComputedRef<Question[]> = computed(() => store.state.questions);
const error = ref<string | null>(null); //???

onMounted(async () => {
    const [_error, _questions] = await findAllQuestions();
    store.commit("setQuestions", _questions);
    error.value = _error;
    console.log(error.value);
});


</script>

<template>
    <SingleQuestion :questions="questions" />
    <router-link to="/results">
        <Button>Show results</Button>                
    </router-link>
</template>