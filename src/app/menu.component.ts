import { Component, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../data/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  standalone: true,
  templateUrl: `./menu.component.html`,
  styleUrl: `./menu.component.scss`,
})
export class MenuComponent {
  isConnected = false;
  constructor(private authService: AuthService) {
    effect(() => {
      this.isConnected = this.authService.isLoggedIn();
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
