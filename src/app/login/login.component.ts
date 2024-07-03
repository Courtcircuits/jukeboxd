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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MenuComponent,
    TextInputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  error = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  onClick() {
    if (!this.email.value || !this.password.value) {
      return;
    }
    console.log('Registering...', this.email.value, this.password.value);
    this.authService
      .login(this.email.value, this.password.value)
      .then(() => {
        this.error = '';
        this.toastr.success('Logged in');
      })
      .catch((e) => {
        this.error = e.message;
      });
  }
}
