import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  standalone: true,
})
export class MusicCardComponent {
  @Input() title: string = '';
  @Input() artist: string = '';
  @Input() album: string = '';
  @Input() cover: string = '';
}
