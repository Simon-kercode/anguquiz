export type QuizTypeId = "any" | "multiple" | "boolean";

export interface QuizType {
    id: QuizTypeId;
    name: string;
}

export const TYPES: Readonly<Record<QuizTypeId, Readonly<QuizType>>> = Object.freeze(
    (() => {
        const values: QuizType[] = [
            {
                id: "any",
                name: "Any Type",
            },
            {
                id: "multiple",
                name: "Multiple Choice",
            },
            {
                id: "boolean",
                name: "True / False",
            },
        ];

        return values.reduce(
            (map, entry) => {
                map[entry.id] = Object.freeze(entry);
                return map;
            },
            {} as Record<QuizTypeId, QuizType>,
        );
    })(),
);

export const DEFAULT_TYPE = "any" satisfies QuizTypeId;
