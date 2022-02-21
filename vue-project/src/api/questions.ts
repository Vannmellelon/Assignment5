import axios from "axios";
// import { MOCK_QUESTIONS } from "";

const QUESTIONS_URL = "https://opentdb.com/api.php?amount=10";

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
		const { data } = await axios.get<QuestionsResponse>(QUESTIONS_URL);
		return [null, data.results]; // ??
	} catch (error: any) {
		return [error.message, []];
	}
}
