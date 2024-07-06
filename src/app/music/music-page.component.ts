import { Component, Input, OnInit } from '@angular/core';
import { Music, MusicService } from '../../data/music.service';
import { Post, PostsService } from '../../data/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DefinedPipe } from '../collection/collection.component';
import { UserService } from '../../data/user.service';
import { LucideAngularModule } from 'lucide-angular';
import { MusicCommentComponent } from '../components/music-comment/music-comment.component';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  imports: [
    ReactiveFormsModule,
    DefinedPipe,
    LucideAngularModule,
    MusicCommentComponent,
  ],
  standalone: true,
})
export class MusicPageComponent implements OnInit {
  music: Music = {
    title: '',
    artist: '',
    cover: '',
    album: '',
    creator: '',
    preview: '',
    spotify_link: '',
  };
  music_id: string;
  posts: Post[] = [];
  myId: string = '';
  content: FormControl = new FormControl('');
  constructor(
    private musicService: MusicService,
    private userService: UserService,
    private postService: PostsService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.music_id = '';

    this.activatedRoute.params.subscribe((params) => {
      console.log('Params', params);
      this.music_id = params['music_id'];
    });
  }

  ngOnInit(): void {
    if (this.music_id) {
      this.musicService.getMusic(this.music_id).subscribe((music) => {
        this.music = music;
      });
      this.refetch();
    }
    const authData = localStorage.getItem('authData');
    if (authData) {
      const authContent = JSON.parse(authData);
      if (authContent) {
        this.myId = authContent.baseModel.id;
      }
    }
  }

  post() {
    console.log('Posting...', this.content.value);
    if (!this.content.value) {
      return;
    }
    this.postService.postPost(this.content.value, this.music_id).then(() => {
      return this.refetch();
    });
  }

  refetch() {
    this.postService.getPosts(this.music_id).subscribe((posts) => {
      for (let post of posts.items) {
        this.userService.getUser(post.creator).then((user) => {
          post.dataCreator = user.username;
        });
      }
      this.posts = posts.items;
    });
  }
}
