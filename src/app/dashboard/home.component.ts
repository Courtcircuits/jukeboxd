import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { CreateMusicFormComponent } from '../components/create-music-form/create-music-form.component';
import { Music, MusicService } from '../../data/music.service';
import { MusicCardComponent } from '../components/music-card/music-card.component';
import { DefinedPipe } from '../collection/collection.component';

interface Genre {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    HttpClientModule,
    DefinedPipe,
    MusicCardComponent,
    LucideAngularModule,
    CreateMusicFormComponent,
  ],
})
export class HomeComponent implements OnInit {
  musics: Music[] = [];
  genres: Genre[] = [
    {
      name: 'Rock',
      selected: false,
    },
    {
      name: 'Hip hop',
      selected: true,
    },
  ];
  queryControl = new FormControl('');

  showForm = false;

  constructor(private musicService: MusicService) {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  ngOnInit() {
    this.getMusics();
  }

  getMusics() {
    this.musicService.getMusics().subscribe((musics) => {
      this.musics = musics.items;
    });
  }

  searchMusics() {
    this.musicService
      .searchMusics(this.queryControl.value || '')
      .subscribe((musics) => {
        this.musics = musics.items;
      });
  }

  select(name: string) {
    this.genres = this.genres.map((genre) => {
      if (genre.name === name) {
        console.log(genre);
        genre.selected = !genre.selected;
        return genre;
      }
      return genre;
    });
  }
}
