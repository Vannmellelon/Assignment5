<script lang="ts" setup>
import SingleQuestion from "../components/SingleQuestion.vue"
</script>

<template>
    <p>QuestionPage</p>
    <SingleQuestion />
    <router-link to="/results">
        <Button>Show results</Button>                
    </router-link>
</template>