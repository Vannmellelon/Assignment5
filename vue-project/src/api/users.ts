import axios from "axios";

const apiURL = `https://new-cool-quiz.herokuapp.com/trivia`
const apiKey = "54321";


export interface User {
	id: number;
    username: string;
    highScore: number;
}

export async function getUser(username: string): Promise<[string | null, User | undefined]> {
	try {
		const { data } = await axios.get<User[]>(apiURL + "?username=" + username);
		return [null, data.pop()]; // pop returns undefined if array is empty
	} catch (error:any) {
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
		const response = await fetch(apiURL, config)
		const { data } = await response.json()
		return [ null, data ]
	}
	catch(error:any) {
		return [error.message, null]
	}
}

//const userId = 1;

export async function updateHighScore(highScore: number, userId: number) {
    try {
        const config = {
            method: "PATCH",
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
    catch(error:any) {
        return [error.message, null]
    }
}
