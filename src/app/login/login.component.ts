import { Component } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { TextInputComponent } from '../components/inputs/text-input.component';
import { ButtonComponent } from '../components/buttons/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuComponent, TextInputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
