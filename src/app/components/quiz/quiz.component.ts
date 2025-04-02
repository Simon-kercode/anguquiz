import { Component, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CurrentQuizService } from "../../service/current-quiz.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-quiz",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./quiz.component.html",
    styleUrl: "./quiz.component.css",
})
export class QuizComponent {
    selectedAnswers = new Set<number>();
    isAnswered = false;
    isMultiple = computed(() => (this.quizService.currentQuestion()?.correct.length ?? 0) > 1);

    constructor(
        public quizService: CurrentQuizService,
        private router: Router,
    ) {}

    setSelectedByEvent(index: number, event: Event) {
        this.setSelected(index, (event.target as HTMLInputElement).checked);
    }

    setSelected(index: number, selected: boolean) {
        if (this.isAnswered) return;

        if (selected) {
            if (this.isMultiple()) {
                this.selectedAnswers.add(index);
            } else {
                this.selectedAnswers = new Set([index]);
            }
        } else {
            this.selectedAnswers.delete(index);
        }
    }

    onSubmit() {
        if (this.selectedAnswers.size < 1) return;

        this.isAnswered = true;

        const isCorrect = this.quizService
            .currentQuestion()
            ?.correct.every((idx) => this.selectedAnswers.has(idx)) ?? false;

        if (isCorrect) {
            this.quizService.incrementCorrectAnswers();
        }
    }

    nextQuestion() {
        this.selectedAnswers = new Set();
        this.isAnswered = false;
        this.quizService.next();

        if (this.quizService.finished()) {
            this.router.navigate(["results"]);
        }
    }
}
