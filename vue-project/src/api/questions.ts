import axios from "axios";
// import { MOCK_QUESTIONS } from "";

const QUESTIONS_URL = "https://opentdb.com/api.php?amount=10";

export interface QuestionsResponse {
    result: Question[];
}

export interface Question {
    type: string; // "multiple" | "boolean"
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
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
		return [null, data.result]; // ??
	} catch (error: any) {
		return [error.message, []];
	}
}
