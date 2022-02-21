import axios from "axios";
//import { CATEGORIES } from "category-list.ts";

const CATEGORIES_URL = "https://opentdb.com/api_category.php";

export interface CategoriesResponse {
    trivia_categories: Category[]
}

export interface Category {
     name: string
}

export async function findAllCategories(): Promise<[string | null, Category[]]> {
	try {
		const { data } = await axios.get<CategoriesResponse>(CATEGORIES_URL);
		return [null, data.trivia_categories]; // ??
	} catch (error: any) {
		return [error.message, []];
	}
}
