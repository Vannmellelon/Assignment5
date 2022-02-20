import axios from "axios";

const username = 'dewaldels'
const apiURL = `https://new-cool-quiz.herokuapp.com/trivia?username=${username}`


export interface User {
	id: number;
    username: string;
    highScore: number;
}

export async function getAllUsers(): Promise<[string | null, User]> {
	try {
		const { data } = await axios.get<User>(apiURL);
		return [null, data]; // ??
	} catch (error: any) {
		return [error.message, undefined];
	}
}

