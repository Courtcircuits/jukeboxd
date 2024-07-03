import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  standalone: true,
})
export class TextInputComponent {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() formControl = null;
}
