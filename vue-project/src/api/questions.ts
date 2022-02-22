import axios from "axios";
import store from "@/store";
import { computed } from "vue";

const QUESTIONS_URL = "https://opentdb.com/api.php?amount=10";
const DIFFICULTY_FRAGMENT = "&difficulty=";
const CATEGORY_FRAGMENT = "&category=";

const userDiff = computed(() => store.getters.getUserDifficulty);
const catId = computed(() => store.getters.getUserCategoryId);

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
		let CONCAT_URL = QUESTIONS_URL

		// adds difficulty and category to the URL
		console.log("findAll diff", userDiff.value);
		console.log("findAll cat id", catId.value);
		if (userDiff.value != "" && userDiff != undefined) {
			CONCAT_URL += DIFFICULTY_FRAGMENT+userDiff.value;
		}
		if (catId.value != -1 && catId != undefined) {
			CONCAT_URL += CATEGORY_FRAGMENT+catId.value;
		}

		console.log("URL", CONCAT_URL);
		const { data } = await axios.get<QuestionsResponse>(CONCAT_URL);
		return [null, data.results]; // ??
	} catch (error: any) {
		return [error.message, []];
	}
}
