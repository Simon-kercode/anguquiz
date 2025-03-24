import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { QuizCategory } from "../model/category";
import { DIFFICULTIES, QuizDifficulty, QuizDifficultyId } from "../model/difficulty";
import { QuizType, QuizTypeId, TYPES } from "../model/type";
import { KnownQuestion } from "../model/question";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    protected readonly baseUrl = "https://opentdb.com";

    constructor(private http: HttpClient) {}

    getCategories(): Observable<QuizCategory[]> {
        return this.http
            .get<ApiCategoryResponse>(`${this.baseUrl}/api_category.php`)
            .pipe(map((res) => res.trivia_categories));
    }

    getDifficulties() {
        return Object.values(DIFFICULTIES);
    }

    getDifficulty(id: QuizDifficultyId): QuizDifficulty;
    getDifficulty(id?: QuizDifficultyId | (string & {}) | null): QuizDifficulty | undefined;
    getDifficulty(id?: QuizDifficultyId | (string & {}) | null) {
        return DIFFICULTIES[id as QuizDifficultyId];
    }

    getTypes() {
        return Object.values(TYPES);
    }

    getType(id: QuizTypeId): QuizType;
    getType(id?: QuizTypeId | (string & {}) | null): QuizType | undefined;
    getType(id?: QuizTypeId | (string & {}) | null) {
        return TYPES[id as QuizTypeId];
    }

    getQuestions(params: {
        amount?: number;
        category?: number;
        difficulty?: QuizDifficultyId;
        type?: QuizTypeId;
    }): Observable<KnownQuestion[]> {
        return this.http
            .get<ApiGenerateResponse>(`${this.baseUrl}/api.php`, { params })
            .pipe(map((res) => res.results));
    }
}

interface ApiCategoryResponse {
    trivia_categories: QuizCategory[];
}

interface ApiGenerateResponse {
    response_code: number;
    results: KnownQuestion[];
}
