import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { AllOptions } from '../../service/api.service';
import { ProfileService } from '../../service/profile.service';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-config',
  imports: [FormsModule, CommonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  categories: string[] = [];
  difficulties: string[] = [];
  types: string[] = [];

  config = {
    name: null,
    firstname: null,
    quantity: 5,
    difficulty: 'Medium',
    category: 'General Knowledge',
    questionType: 'multiple'
  };

  constructor(
    private profileSerice: ProfileService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadOptions();
    const profile= this.profileSerice.getProfile();
    if (profile) {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName; 
    }
  }

  updateProfile(): void {
    const profile: Profile = {
      firstName: this.firstName,
      lastName: this.lastName
    }
    this.profileSerice.setProfile(profile);
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
    this.updateProfile()
    console.log('Configuration : ', this.config);
  }
}
