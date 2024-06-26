import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  standalone: true,
  templateUrl: `./menu.component.html`,
  styleUrl: `./menu.component.scss`,
})
export class MenuComponent {}
