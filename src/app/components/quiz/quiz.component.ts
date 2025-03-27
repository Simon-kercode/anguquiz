import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentQuizService } from '../../service/current-quiz.service';
import { KnownQuestion } from '../../model/question';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  selectedAnswer: string | null = null;
  isAnswered: boolean = false;

  constructor(
    public quizService: CurrentQuizService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.quizService.questions()) {
      console.error("quiz non initialisé !");
    }
  }

  onSubmit() {
    if (!this.selectedAnswer) return;
    this.isAnswered = true;
    if (this.selectedAnswer === this.quizService.currentQuestion()?.correct_answer) {
      this.quizService.incrementCorrectAnswers();
    }
  }

  nextQuestion() {
    this.selectedAnswer = null;
    this.isAnswered = false;
    this.quizService.next();

    if (this.quizService.finished()) {
      this.router.navigate(["results"]);
    }
  }
}
