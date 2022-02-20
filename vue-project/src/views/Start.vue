<script lang="ts" setup>

import { useStore } from 'vuex';
import { computed, onMounted, ref } from "vue";
import { getAllUsers, type User } from "../api/users";


const store = useStore();

const user:User = computed(() => store.state.user);
const error = ref<string | null>(null);

onMounted(async () => {
    const [_error, _users] = await getAllUsers();
    store.commit("setUsers", _users);
    error.value = _error;
    console.log(error.value);
});

</script>

<template>
    <div id="play-container">
        <p>user:</p>
        <p v-for="userr in user">{{userr.username}}</p>
        <router-link to="/questions">
            <select></select>
            <Button id="play-button">Play Now</Button>
        </router-link>
    </div>
</template>