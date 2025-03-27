export interface QuestionBase {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    answers: string[];
    correct: number[];
}

export interface BooleanQuestion extends QuestionBase {
    type: "boolean";
}

export interface MultiQuestion extends QuestionBase {
    type: "multiple";
}

export type KnownQuestion = BooleanQuestion | MultiQuestion;
export type QuestionType = KnownQuestion["type"];
