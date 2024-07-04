import { Component, Input, OnInit } from '@angular/core';
import { MusicService } from '../../../data/music.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-music-preview',
  templateUrl: './music-preview.component.html',
  standalone: true,
})
export class MusicPreviewComponent implements OnInit {
  @Input() title: string = '';
  @Input() artist: string = '';
  @Input() album: string = '';
  @Input() cover: string = '';
  @Input() preview: string = '';
  audio = new Audio();
  playing = false;

  constructor(
    private musicService: MusicService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.audio = new Audio(this.preview);
  }

  toggle() {
    if (this.audio.paused) {
      this.audio.play();
      this.playing = true;
      return;
    }
    this.audio.pause();
    this.playing = false;
  }

  startThread() {
    console.log('Posting music...', this.title);
    this.musicService
      .postMusic(this.title, this.artist, this.album, this.cover, this.preview)
      .then(() => {
        this.toastr.success('Posted music');
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }
}
