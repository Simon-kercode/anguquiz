import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../service/api.service";
import { AllOptions } from "../../service/api.service";
import { ProfileService } from "../../service/profile.service";
import { CurrentQuizService } from "../../service/current-quiz.service";
import { QuizDifficultyId } from "../../model/difficulty";
import { QuizTypeId } from "../../model/type";
import { Router } from "@angular/router";

@Component({
    selector: "app-config",
    imports: [FormsModule, CommonModule],
    templateUrl: "./config.component.html",
    styleUrl: "./config.component.css",
})
export class ConfigComponent implements OnInit {
    firstName = "";
    lastName = "";
    loading = true;
    categories: { id: number; name: string }[] = [];
    difficulties: { id: string; name: string }[] = [];
    types: { id: string; name: string }[] = [];

    config = {
        firstName: "",
        lastName: "",
        quantity: 5,
        difficulty: "any",
        category: 9,
        type: "any",
    };

    constructor(
        private profileService: ProfileService,
        private apiService: ApiService,
        private currentQuizService: CurrentQuizService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadOptions();
        const profile = this.profileService.getProfile();
        if (profile) {
            this.firstName = profile.firstName;
            this.lastName = profile.lastName;
        }
    }

    loadOptions(): void {
        this.loading = true;
        this.apiService.getAllOptions().subscribe({
            next: (options: AllOptions) => {
                this.categories = options.categories;
                this.difficulties = options.difficulties;
                this.types = options.types;
                this.loading = false;
            },
            error: (err) => {
                console.error("Erreur lors de la récupération des options:", err);
            },
        });
    }

    onSubmit() {
        this.profileService.setProfile({
            firstName: this.firstName,
            lastName: this.lastName,
        });
        this.currentQuizService.setParams({
            amount: this.config.quantity,
            category: this.config.category,
            difficulty: this.config.difficulty as QuizDifficultyId,
            type: this.config.type as QuizTypeId,
        });
        this.router.navigate(["quiz"]);
    }
}
