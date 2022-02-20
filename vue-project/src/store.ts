import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { Question } from "./api/questions";
import type { User } from "./api/users"

export interface State {
    questions: Question[];
    user: User;
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
    }, 
    mutations: {
        setQuestions: (state: State, payload: Question[]) => {
            state.questions = [...payload];
        },
        setUsers: (state: State, payload: User) => {
            state.user = payload;
        },
    },
    getters: {

    },
});

export function useStore() {
    return baseUseStore(key);
}