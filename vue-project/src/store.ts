import type { StructuralDirectiveTransform } from "@vue/compiler-core";
import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { Category } from "./api/categories";
import type { Question } from "./api/questions";
import type { User } from "./api/users"
import type { UserInput } from "./views/Start.vue";

export interface State {
    questions: Question[];
    categories: Category[];
    user: User;
    username: string;
    userCategory: string;
    userDifficulty: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore({
    state: {
        questions: [],
        user: {
            id: 0,
            username: "",
            highScore: 0,
        },
        categories: [],
        // is this necessary?
        username: "",
        userCategory: "",
        userDifficulty: "",

    }, 
    mutations: {
        setQuestions: (state: State, payload: Question[]) => {
            state.questions = [...payload];
        },
        setUsers: (state: State, payload: User) => {
            state.user = payload;
        },
        setCategories: (state: State, payload: Category[]) => {
            state.categories = [...payload];
        },
        setUsername: (state: State, payload: string) => {
            state.username = payload;
        },
        setUserCategory: (state: State, payload: string) => {
            state.userCategory = payload;
        },
        setUserDifficulty: (state: State, payload: string) => {
            state.userDifficulty = payload;
        },
    },
    getters: {

    },
});

export function useStore() {
    return baseUseStore(key);
}