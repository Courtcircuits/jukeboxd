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
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
