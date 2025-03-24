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

  constructor(
    public quizService: CurrentQuizService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.quizService.questions()) {
      console.error("quiz non initialisé !");
    }
  }

  onSelectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  onSubmit() {
    if (this.selectedAnswer === this.quizService.currentQuestion()?.correct_answer) {
      this.quizService.incrementCorrectAnswers();
    }
    this.selectedAnswer = null;
    this.quizService.next();
    
    if (this.quizService.finished()) {
      this.router.navigate(["results"]);
    }
  }
}
