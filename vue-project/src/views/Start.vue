<script setup lang="ts">
import { computed, onMounted, ref, type PropType, type Ref } from "vue";
import { useStore } from "vuex";
import { findAllCategories, type Category } from "../api/categories"; 

/*
export interface UserInput {
    username: Ref<string>;
    userCategory: Ref<string>;
    userDifficulty: Ref<string>;
}
*/

// store
const store = useStore();
const categories:Category[] = computed(() => store.state.categories);
const error = ref<string | null>(null); //???

onMounted(async () => {
    const [_error, _categories] = await findAllCategories();
    store.commit("setCategories", _categories);
    error.value = _error;
    console.log(error.value);
});

/*
const ui: UserInput = {
    username: ref("Username"),
    userCategory: ref("Category"),
    userDifficulty: ref("Difficulty")
}
*/

// user-input variables, v-model binds input to these
const username:Ref<string> = ref("");
const userCategory:Ref<string> = ref("");
const userDifficulty:Ref<string> = ref("easy");

// TODO: make onclick for button that swooshes ui to state
// OR hook to lifecycle event?

</script>
<template>
    <div id="play-container">
        <input type="text" v-model="username">
        <select id="category-select" v-model="userCategory">
                <option value="none" selected disabled hidden>Select a category</option>
                <option v-for="category in categories">{{category.name}}</option>
        </select>
        <div id="difficulty-lvl">
        <input type="radio" v-model="userDifficulty" id="easy" name="difficulty-lvl" value="easy">
        <label for="easy">Easy</label>
        <input type="radio" v-model="userDifficulty" id="medium" name="difficulty-lvl" value="medium">
        <label for="medium">Medium</label>
        <input type="radio" v-model="userDifficulty" id="hard" name="difficulty-lvl" value="hard">
        <label for="hard">Hard</label>
        </div>
        <div id="disp-user-settings">
            <p>Username: {{username}}</p>
            <p>Category: {{userCategory}}</p>
            <p>Difficulty level: {{userDifficulty}}</p>
        </div>
        <router-link to="/questions"> 
            <Button id="play-button">Play Now</Button>
        </router-link>
    </div>
</template>