import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
export type ButtonType = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [LucideAngularModule],
})
export class ButtonComponent {
  @Input() text = '';
  @Input() type: ButtonType = 'primary';
  @Input() icon = '';
}
