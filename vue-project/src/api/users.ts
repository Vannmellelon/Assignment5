import axios from "axios";
import { useStore } from "vuex";
import { computed, onMounted, ref, type PropType, type Ref } from "vue";

const store = useStore();
const username:username = computed(() => store.state.username);
const error = ref<string | null>(null);

const user = 'dewaldels'
const apiURL = `https://new-cool-quiz.herokuapp.com/trivia?username=${user}`
const apiKey = "54321";


export interface User {
	id: number;
    username: string;
    highScore: number;
}

export async function getUser(): Promise<[string | null, User]> {
	try {
		const { data } = await axios.get<User>(apiURL);
		return [null, data]; // ??
	} catch (error: any) {
		return [error.message, undefined];
	}
}

export async function registrerUser(username: string, highScore: number) {
	try {
		const config = {
			method: "POST",
			headers: {
				"X-API-KEY": apiKey,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				highScore: highScore
			})
		}
		const response = await fetch("https://new-cool-quiz.herokuapp.com/trivia", config)
		const { data } = await response.json()
		return [ null, data ]
	}
	catch(error) {
		return [error.message, null]
	}
}

const userId = 1;

export async function updateHighScore(highScore: number) {
	try {
		const config = {
			method: "POST",
			headers: {
				"X-API-KEY": apiKey,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				highScore: highScore
			})
		}
		const response = await fetch(`https://new-cool-quiz.herokuapp.com/trivia/${userId}`, config)
		const { data } = await response.json()
		return [ null, data ]
	}
	catch(error) {
		return [error.message, null]
	}
}
