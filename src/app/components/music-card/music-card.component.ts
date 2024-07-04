import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() id: string = '';

  constructor(private router: Router) {}

  goToMusicPage() {
    this.router.navigate(['music', this.id]);
  }
}
