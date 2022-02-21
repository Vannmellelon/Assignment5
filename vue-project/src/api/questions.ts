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
	/*
    // mock
    return new Promise((resolve) => {
		setTimeout(() => {
			resolve([null, MOCK_QUESTIONS.results]); // make
		}, 2000);
	});
    */
	// The actual HTTP request.
	try {
		console.log("user cat", store.getters.getUserCategory);
		const catId = store.getters.getCategoryId(store.getters.getUserCategory);
		console.log("cat id", catId)
		const CONCAT_URL = QUESTIONS_URL;
		const { data } = await axios.get<QuestionsResponse>(QUESTIONS_URL);
		return [null, data.results]; // ??
	} catch (error: any) {
		return [error.message, []];
	}
}
