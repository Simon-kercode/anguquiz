import { Component } from "@angular/core";
import { CurrentQuizService } from "../../service/current-quiz.service";
import { ProfileService } from "../../service/profile.service";

@Component({
    selector: "app-results",
    imports: [],
    templateUrl: "./results.component.html",
    styleUrl: "./results.component.css",
})
export class ResultsComponent {
    constructor(
        protected current: CurrentQuizService,
        protected profile: ProfileService,
    ) {}

    restart() {
        this.current.reset();
    }
}
