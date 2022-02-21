<script setup lang="ts">
import { computed, onMounted, ref, type PropType, type Ref } from "vue";
import { useStore } from "vuex";
import { findAllCategories, type Category } from "../api/categories"; 
import { getUser, type User, registrerUser, updateHighScore } from "../api/users";


// store
const store = useStore();
const categories:Category[] = computed(() => store.state.categories);
const user:User = computed(() => store.state.user);
const error = ref<string | null>(null); 

const username:Ref<string> = ref("");
const userCategory:Ref<string> = ref("");
const userDifficulty:Ref<string> = ref("easy");

onMounted(async () => {
    const [_error, _categories] = await findAllCategories();
    store.commit("setCategories", _categories);
    error.value = _error;
    console.log(error.value);
});
onMounted(async () => {
    const [_error, _users] = await getUser();
    store.commit("setUsers", _users);
    error.value = _error;
    console.log(error.value);
});

const onRegistrerClick = async () => {
    const [error, user ] = await registrerUser(username.value, 0)
    console.log("ERR", error)
    console.log("USER", user)
}

const updateHighScoreClick = async () => {
    const [error, user ] = await updateHighScore(100, 1)
    console.log("ERR", error)
    console.log("USER", user)
}
/*
const ui: UserInput = {
    username: ref("Username"),
    userCategory: ref("Category"),
    userDifficulty: ref("Difficulty")
}
*/
// user-input variables, v-model binds input to these

// TODO: make onclick for button that swooshes ui to state
// OR hook to lifecycle event?
</script>
<template>
    <div id="start-container">
        <div id="play-container">
            <h1>Vilgeir & Annes Spectacular Quiz</h1>
        <form id="input-form">
            
                <input id="user-input" type="text" v-model="username" placeholder="User">
                <!-- <button @click="onRegistrerClick" type="button">registrer</button> -->
            
            
            <select id="category-select" v-model="userCategory">
                    <option value="" selected disabled>Select a category</option>
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
                <p>Difficulty level: {{userDifficulty}}</p>
            </div>
        </form>
        
        <router-link to="/questions"> 
            <Button id="play-button">Play Now</Button>
        </router-link>
    </div>
    </div>
</template>