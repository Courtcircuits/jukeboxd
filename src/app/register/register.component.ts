import { Component, effect, signal } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MenuComponent } from '../menu.component';
import { TextInputComponent } from '../components/inputs/text-input.component';
import { ButtonComponent } from '../components/buttons/button.component';
import { LucideAngularComponent, LucideAngularModule } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../data/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    MenuComponent,
    TextInputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
  ],
  styleUrls: ['../login/login.component.scss'],
})
export class RegisterComponent {
  email = new FormControl('');
  password = new FormControl('');
  error = '';

  constructor(private authService: AuthService) {}

  onClick() {
    if (!this.email.value || !this.password.value) {
      return;
    }
    console.log('Registering...', this.email.value, this.password.value);
    this.authService.register(this.email.value, this.password.value).subscribe({
      next: (data) => {
        console.log('Registered', data);
        this.error = '';
      },
      error: (error) => {
        console.error('Error registering', error);
        this.error = error.error.message;
      },
    });
  }
}
