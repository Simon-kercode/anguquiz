import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { QuizCategory } from "../model/category";
import {
    DEFAULT_DIFFICULTY,
    DIFFICULTIES,
    QuizDifficulty,
    QuizDifficultyId,
} from "../model/difficulty";
import { DEFAULT_TYPE, QuizType, QuizTypeId, TYPES } from "../model/type";
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

    getAllOptions(): Observable<AllOptions> {
        // if we later need to wait for multiple observables:
        // return forkJoin([categories$, additionalData$]).pipe(map(([categories, additionalData]) => ({ ... }));
        return this.getCategories().pipe(
            map((categories) => ({
                categories,
                difficulties: this.getDifficulties(),
                types: this.getTypes(),
            })),
        );
    }

    getQuestions(params: Params): Observable<KnownQuestion[]> {
        const { amount, category, difficulty, type } = params;

        const httpParams = new HttpParams();

        if (amount != null) {
            httpParams.set("amount", amount);
        }
        if (category != null) {
            httpParams.set("category", category);
        }
        if (difficulty != null && difficulty !== DEFAULT_DIFFICULTY) {
            httpParams.set("difficulty", difficulty);
        }
        if (type != null && type !== DEFAULT_TYPE) {
            httpParams.set("type", type);
        }

        return this.http
            .get<ApiGenerateResponse>(`${this.baseUrl}/api.php`, {
                params: httpParams,
            })
            .pipe(map((res) => res.results));
    }
}

export interface Params {
    amount?: number;
    category?: number;
    difficulty?: QuizDifficultyId;
    type?: QuizTypeId;
}

export interface AllOptions {
    categories: QuizCategory[];
    difficulties: QuizDifficulty[];
    types: QuizType[];
}

interface ApiCategoryResponse {
    trivia_categories: QuizCategory[];
}

interface ApiGenerateResponse {
    response_code: number;
    results: KnownQuestion[];
}
