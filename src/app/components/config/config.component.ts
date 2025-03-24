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
  categories: { id: number, name: string }[] = [];
  difficulties: { id: string, name: string }[] = [];
  types: { id: string, name: string }[] = [];

  config = {
    firstName: "",
    lastName: "",
    quantity: 5,
    difficulty: 'any',
    category: 9,
    type: 'any'
  };

  constructor(
    private profileService: ProfileService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadOptions();
    const profile= this.profileService.getProfile();
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
    this.profileService.setProfile(profile);
  }

  updateConfig(): void {
    
    this.config = {
      firstName: this.firstName,
      lastName: this.lastName,
      quantity: this.config.quantity,
      difficulty: this.config.difficulty,
      category: this.config.category,
      type: this.config.type
    }
  }

  loadOptions(): void {
    this.apiService.getAllOptions().subscribe({
      next: (options: AllOptions) => {
        this.categories = options.categories;
        this.difficulties = options.difficulties;
        this.types = options.types;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des options:', err);
      }
    });
  }

  onSubmit() {
    this.updateProfile();
    this.updateConfig();
    console.log('Configuration : ', this.config);
  }
}
