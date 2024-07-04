import { Component } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { CreateMusicFormComponent } from '../components/create-music-form/create-music-form.component';

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
    LucideAngularModule,
    CreateMusicFormComponent,
  ],
})
export class HomeComponent {
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
