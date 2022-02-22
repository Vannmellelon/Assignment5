import type { StructuralDirectiveTransform } from "@vue/compiler-core";
import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { Category } from "./api/categories";
import type { Question } from "./api/questions";
import type { User } from "./api/users"
import UserBarVue from "./components/UserBar.vue";

export interface State {
    questions: Question[];
    categories: Category[];
    user: User;
    //username: string;
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
        //username: "",
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
            state.user.username = payload;
        },
        setUserCategory: (state: State, payload: string) => {
            state.userCategory = payload;
        },
        setUserDifficulty: (state: State, payload: string) => {
            state.userDifficulty = payload;
        },
        // Locates current question in store
        // Inserts the user's answer into that question object
        setUserAnswer: (state: State, payload: any[]) => {
            const [ans, inpQ] = payload;
            for (const stateQ of state.questions) {
				if (stateQ.question === inpQ) {
					stateQ.userAnswer = ans;
					break;
				}
			}
        }
    },
    getters: {
        // Get the id of the user's selected category
        getUserCategoryId: (state: State) => {
            if (state.userCategory === "") { return -1;}
            else{ return state.categories.find(cat => cat.name === state.userCategory)?.id;}
        },
        getUserCategory: (state: State) => {
            return state.userCategory;
        },
        getUserDifficulty: (state: State) => {
            return state.userDifficulty;
        },
        // Calculates score based on user's answer in question objects
        getScore: (state: State) => {
            // rewrite to reduce?
            let score = 0;
            for (const q of state.questions) {
                if (q.userAnswer == q.correct_answer) {
                    score += 10;
                }
            }
            return score;
        },
        getUserId: (state: State) => {
            return state.user.id;
        }
    },
});

export function useStore() {
    return baseUseStore(key);
}