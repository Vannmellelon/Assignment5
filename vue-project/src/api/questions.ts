import axios from "axios";
import store from "@/store";

const QUESTIONS_URL = "https://opentdb.com/api.php?amount=10";
const DIFFICULTY_FRAGMENT = "&difficulty=";
const CATEGORY_FRAGMENT = "&category="

export interface QuestionsResponse {
    responseCode: number;
	results: Question[];
}

export interface Question {
	category: string;
    type: string; // "multiple" | "boolean"
	difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
	userAnswer: string;
}

export async function findAllQuestions(): Promise<[string | null, Question[]]> {
	// The actual HTTP request.
	try {
		const catId = store.getters.getCategoryId(store.getters.getUserCategory);
		const userDiff = store.getters.getUserDifficulty;

		let CONCAT_URL = QUESTIONS_URL+DIFFICULTY_FRAGMENT+userDiff;
		if (store.getters.getUserCategory != "") {
			CONCAT_URL += CATEGORY_FRAGMENT+catId;
		}
		console.log("URL", CONCAT_URL);
		const { data } = await axios.get<QuestionsResponse>(CONCAT_URL);
		return [null, data.results]; // ??
	} catch (error: any) {
		return [error.message, []];
	}
}
