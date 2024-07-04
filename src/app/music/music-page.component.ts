import { Component, Input, OnInit } from '@angular/core';
import { Music, MusicService } from '../../data/music.service';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
})
export class MusicPageComponent implements OnInit {
  music: Music = {
    title: '',
    artist: '',
    cover: '',
    album: '',
    preview: '',
    spotify_link: '',
  };
  music_id: string;
  constructor(private musicService: MusicService) {
    const url = window.location.pathname.split('/');
    this.music_id = url[url.length - 1];
  }

  ngOnInit(): void {
    if (this.music_id) {
      this.musicService.getMusic(this.music_id).subscribe((music) => {
        this.music = music;
      });
    }
  }
}
