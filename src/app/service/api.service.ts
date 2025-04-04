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
import { KnownQuestion, QuestionType } from "../model/question";

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

    // NOTE: could be used later
    // getDifficulty(id: QuizDifficultyId): QuizDifficulty;
    // getDifficulty(id?: QuizDifficultyId | (string & {}) | null): QuizDifficulty | undefined;
    // getDifficulty(id?: QuizDifficultyId | (string & {}) | null) {
    //     return DIFFICULTIES[id as QuizDifficultyId];
    // }

    getTypes() {
        return Object.values(TYPES);
    }

    // NOTE: could be used later
    // getType(id: QuizTypeId): QuizType;
    // getType(id?: QuizTypeId | (string & {}) | null): QuizType | undefined;
    // getType(id?: QuizTypeId | (string & {}) | null) {
    //     return TYPES[id as QuizTypeId];
    // }

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

        let httpParams = new HttpParams().set("encode", "base64");

        if (amount != null) {
            httpParams = httpParams.set("amount", amount);
        }
        if (category != null) {
            httpParams = httpParams.set("category", category);
        }
        if (difficulty != null && difficulty !== DEFAULT_DIFFICULTY) {
            httpParams = httpParams.set("difficulty", difficulty);
        }
        if (type != null && type !== DEFAULT_TYPE) {
            httpParams = httpParams.set("type", type);
        }

        return this.http
            .get<ApiGenerateResponse>(`${this.baseUrl}/api.php`, {
                params: httpParams,
            })
            .pipe(
                map((res) =>
                    res.results.map<KnownQuestion>((q) => {
                        // Future-proof correct answers
                        const correctTexts =
                            "correct_answer" in q
                                ? Array.isArray(q.correct_answer)
                                    ? q.correct_answer.map(atob)
                                    : [atob(q.correct_answer)]
                                : q.correct_answers.map(atob);

                        const answers = [...correctTexts, ...q.incorrect_answers.map(atob)];

                        const correct = correctTexts.map((answer) => answers.indexOf(answer));

                        return {
                            type: atob(q.type) as QuestionType,
                            difficulty: atob(q.difficulty),
                            category: atob(q.category),
                            question: atob(q.question),
                            answers,
                            correct,
                        };
                    }),
                ),
            );
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
    results: AllApiQuestion[];
}

type AllApiQuestion =
    | ApiQuestionBaseCurrent
    | ApiQuestionBaseMultiAnswerV1
    | ApiQuestionBaseMultiAnswerV2;

interface ApiQuestionBaseCurrent {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface ApiQuestionBaseMultiAnswerV1 {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string[];
    incorrect_answers: string[];
}

interface ApiQuestionBaseMultiAnswerV2 {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answers: string[];
    incorrect_answers: string[];
}
