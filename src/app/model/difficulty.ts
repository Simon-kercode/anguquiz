export type QuizDifficultyId = "any" | "easy" | "medium" | "hard";

export interface QuizDifficulty {
    id: QuizDifficultyId;
    name: string;
}

export const DIFFICULTIES: Readonly<Record<QuizDifficultyId, Readonly<QuizDifficulty>>> =
    Object.freeze(
        (() => {
            const values: QuizDifficulty[] = [
                {
                    id: "any",
                    name: "Any Difficulty",
                },
                {
                    id: "easy",
                    name: "Easy",
                },
                {
                    id: "medium",
                    name: "Medium",
                },
                {
                    id: "hard",
                    name: "Hard",
                },
            ];

            return values.reduce(
                (map, entry) => {
                    map[entry.id] = Object.freeze(entry);
                    return map;
                },
                {} as Record<QuizDifficultyId, QuizDifficulty>,
            );
        })(),
    );

export const DEFAULT_DIFFICULTY = "any" satisfies QuizDifficultyId;
