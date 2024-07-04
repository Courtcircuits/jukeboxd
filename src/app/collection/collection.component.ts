import { Component, Pipe, PipeTransform } from '@angular/core';
import {
  Music,
  MusicService,
  ResponseCollection,
} from '../../data/music.service';
import { Observable } from 'rxjs';
import { MusicCardComponent } from '../components/music-card/music-card.component';

@Pipe({
  name: 'defined',
  standalone: true,
})
export class DefinedPipe implements PipeTransform {
  transform(val: string | undefined): string {
    return val || '';
  }
}
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  standalone: true,
  imports: [MusicCardComponent, DefinedPipe],
})
export class CollectionComponent {
  observableMusics: Observable<ResponseCollection>;
  musics: Music[] = [];
  constructor(private musicService: MusicService) {
    this.observableMusics = this.musicService.getCollection();
    this.observableMusics.subscribe((musics) => {
      this.musics = musics.items.map((music) => {
        console.log(music.id);
        return {
          title: music.title,
          artist: music.artist,
          album: music.album,
          cover: music.cover,
          spotify_link: music.spotify_link,
          preview: music.preview,
          id: music.id || '',
        };
      });
    });
  }
}
