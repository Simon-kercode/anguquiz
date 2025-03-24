import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { AllOptions } from '../../service/api.service';

@Component({
  selector: 'app-config',
  imports: [FormsModule, CommonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit {
  categories: string[] = [];
  difficulties: string[] = [];
  types: string[] = [];

  config = {
    name: null,
    firstname: null,
    quantity: 5,
    difficulty: 'medium',
    category: 'science',
    questionType: 'multiple'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.apiService.getAllOptions().subscribe({
      next: (options: AllOptions) => {
        this.categories = options.categories.map(category => category.name);
        this.difficulties = options.difficulties.map(difficulty => difficulty.name);
        this.types = options.types.map(type => type.name);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des options:', err);
      }
    });
  }

  onSubmit() {
    console.log('Configuration : ', this.config);
  }
}
