import { effect, Injectable, signal, untracked } from "@angular/core";
import { ApiService, Params } from "./api.service";
import { KnownQuestion } from "../model/question";

@Injectable({
    providedIn: "root",
})
export class CurrentQuizService {
    private readonly _questions = signal<KnownQuestion[] | undefined>(undefined);
    private readonly _currentQuestionIndex = signal(0);
    private readonly _correctAnswerCount = signal(0);
    private readonly _params = signal<Params | undefined>(undefined);
    private readonly _loading = signal(false);

    constructor(private apiService: ApiService) {
        effect(() => {
            const params = this._params();
            this._questions.set(undefined);
            if (params != null) {
                this._loading.set(true);
                apiService.getQuestions(params).subscribe((q) => {
                    this._questions.set(q);
                    this._loading.set(false);
                });
            }
        });
    }

    isLoading() {
        return this._loading();
    }

    params() {
        return this._params();
    }

    setParams(params: Params) {
        this._params.set(params);
    }

    questions() {
        return this._questions();
    }

    currentQuestionIndex() {
        return this._currentQuestionIndex();
    }

    finished() {
        const questions = this._questions();
        return questions != null && this._currentQuestionIndex() > questions.length;
    }

    currentQuestion() {
        return this._questions()?.[this?._currentQuestionIndex()];
    }

    correctAnswerCount() {
        return this._correctAnswerCount();
    }

    incrementCorrectAnswers() {
        const questions = untracked(() => this._questions());
        if (questions == null) return;
        this._correctAnswerCount.update((v) => Math.min(questions.length, v + 1));
    }

    /**
     * @returns `true` if it is the current question is the last one
     */
    next() {
        const questions = untracked(() => this._questions());
        if (questions == null) return false;
        const currentQuestionIndex = untracked(() => this._currentQuestionIndex());
        if (currentQuestionIndex >= questions.length) return;
        this._currentQuestionIndex.update((v) => v + 1);
        return false;
    }

    reset() {
        this._questions.set(undefined);
        this._params.set(undefined);
        this._currentQuestionIndex.set(0);
        this._correctAnswerCount.set(0);
    }
}
