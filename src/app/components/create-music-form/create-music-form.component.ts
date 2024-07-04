import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Music, MusicService } from '../../../data/music.service';
import { MusicPreviewComponent } from '../music-preview/music-preview.component';

@Component({
  selector: 'app-create-music-form',
  templateUrl: './create-music-form.component.html',
  imports: [ReactiveFormsModule, MusicPreviewComponent],
  styleUrls: ['./create-music-form.component.scss'],
  standalone: true,
})
export class CreateMusicFormComponent {
  title = new FormControl('');
  artist = new FormControl('');
  suggestions: Music[] = [];
  constructor(private musicService: MusicService) {}

  onChange() {
    console.log('Searching for music...', this.title.value, this.artist.value);
    let title = this.title.value || '';
    let artist = this.artist.value || '';
    this.musicService.searchMusic(title, artist).subscribe({
      next: (data) => {
        console.log('Music found', data);
        this.suggestions = data;
      },
      error: (error) => {
        console.error('Error searching for music', error);
      },
    });
  }
}
