import { Router, Routes } from "@angular/router";
import { ConfigComponent } from "./components/config/config.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { inject } from "@angular/core";
import { CurrentQuizService } from "./service/current-quiz.service";

export const routes: Routes = [
    { path: "config", component: ConfigComponent },
    {
        path: "quiz",
        component: QuizComponent,
        canActivate: [
            () => {
                const current = inject(CurrentQuizService);
                const router = inject(Router);
                if (current.params() == null) {
                    router.navigate(["config"]);
                    return false;
                }
                return true;
            },
        ],
    },
    { path: "", redirectTo: "/config", pathMatch: "full" },
];
