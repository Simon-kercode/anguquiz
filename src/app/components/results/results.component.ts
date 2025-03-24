import { Component, computed } from "@angular/core";
import { CurrentQuizService } from "../../service/current-quiz.service";
import { ProfileService } from "../../service/profile.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-results",
    imports: [],
    templateUrl: "./results.component.html",
    styleUrl: "./results.component.css",
})
export class ResultsComponent {
    total = computed(() => this.current.questions()?.length ?? 0);
    ratio = computed(() => {
        const correct = this.current.correctAnswerCount();
        const total = this.total();
        if (correct < 1 || total < 1) return 0;
        return correct / total;
    });
    term = computed(() => (this.ratio() < 0.33 ? "Too bad 😢" : "Congrats 👏"));

    constructor(
        protected current: CurrentQuizService,
        protected profile: ProfileService,
        protected router: Router,
    ) {}

    restart() {
        this.current.reset();
        this.router.navigate(["config"]);
    }
}
