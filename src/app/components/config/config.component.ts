import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-config',
  imports: [FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  config = {
    name: null,
    firstname: null,
    quantity: 5,
    difficulty: 'medium',
    category: 'science',
    questionType: 'multiple' // Par défaut : "Choix multiple"
  };

  onSubmit() {
    console.log('Configuration : ', this.config);
  }
}
