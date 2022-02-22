<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type PropType, type Ref } from "vue";
import { useStore } from "vuex";
import { findAllCategories, type Category } from "../api/categories"; 
import { getUser, type User, registrerUser, updateHighScore } from "../api/users";


// store
const store = useStore();
const categories:ComputedRef<Category[]> = computed(() => store.state.categories);
const error = ref<string | null>(null); 

// user-input variables, v-model binds input to these
const username:Ref<string> = ref("");
const userCategory:Ref<string> = ref("");
const userDifficulty:Ref<string> = ref("mixed");


onMounted(async () => {
    const [_error, _categories] = await findAllCategories();
    store.commit("setCategories", _categories);
    error.value = _error;
    console.log(error.value);
});

// Registers the user in the trivia API
const onRegistrerClick = async () => {
    const [error, existsingUser ] = await getUser(username.value)
    if (!existsingUser) {
        const [error, newUser ] = await registrerUser(username.value, 0)
    }
    onLoginClick()
}

// Helper func for onRegisterClick
// TODO, combine them somehow. it works for now
const onLoginClick = async () => {
    const [error, existsingUser ] = await getUser(username.value)
    store.commit("setUsers", existsingUser);
}


// CCS stuff
const isActive = () => {
    if (username.value.length > 0) {
        return false
    } else {
        return true
    }
}

console.log("is active",isActive());

// onchange for user-selected category
const onChangeCategory = () => {
    console.log("CLICK, commiting category to store");
    store.commit("setUserCategory", userCategory.value);
}

// onchange for user-selected difficulty
const onChangeDifficulty = () => {
    console.log("CLICK, commiting difficulty to store");
    store.commit("setUserDifficulty", userDifficulty.value);
}

</script>
<template>
    <div id="start-container">
        <div id="play-container">
            <h1>Vilgeir & Annes Spectacular Quiz</h1>
        <form id="input-form">
            <input id="user-input" type="text" v-model="username" v-on:input="isActive" placeholder="Enter user" >
            <button @click="updateHighScoreClick" type="button">registrer</button>
            <select id="category-select" v-model="userCategory" @change="onChangeCategory">
                    <option value="" selected disabled>Select a category</option>
                    <option v-for="category in categories">{{category.name}}</option>
            </select>
            <div id="difficulty-lvl">
                <input type="radio" v-model="userDifficulty" id="mixed" name="difficulty-lvl" value="" @change="onChangeDifficulty">
                <label for="easy">Mixed</label>
                <input type="radio" v-model="userDifficulty" id="easy" name="difficulty-lvl" value="easy" @change="onChangeDifficulty">
                <label for="easy">Easy</label>
                <input type="radio" v-model="userDifficulty" id="medium" name="difficulty-lvl" value="medium" @change="onChangeDifficulty">
                <label for="medium">Medium</label>
                <input type="radio" v-model="userDifficulty" id="hard" name="difficulty-lvl" value="hard" @change="onChangeDifficulty">
                <label for="hard">Hard</label>
            </div>
            <div id="disp-user-settings">
                <p>Difficulty level: {{userDifficulty}}</p>
            </div>
        </form>
        <router-link id="enabled" v-bind:class="{ disabled: isActive() }" to="/questions"> 
            <Button class="big-button" id="play-button" @click="onRegistrerClick" type="button">Play Now
            </Button>
        </router-link>       
        </div>
    </div>
</template>