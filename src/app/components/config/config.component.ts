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
        console.log(options)
        this.categories = options.categories.map(category => ({ id: category.id, name: category.name }));
        this.difficulties = options.difficulties.map(difficulty => ({ id: difficulty.id, name: difficulty.name }));
        this.types = options.types.map(type => ({ id: type.id, name: type.name }));
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
