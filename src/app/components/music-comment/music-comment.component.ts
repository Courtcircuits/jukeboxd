import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { DefinedPipe } from '../../collection/collection.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsService } from '../../../data/posts.service';

@Component({
  selector: 'app-music-comment',
  templateUrl: './music-comment.component.html',
  imports: [ReactiveFormsModule, DefinedPipe, LucideAngularModule],
  standalone: true,
})
export class MusicCommentComponent implements OnInit {
  @Input() dataCreator: string | undefined = '';
  @Input() content: string = '';
  @Input() creator: string | undefined = '';
  @Input() musicCreator: string | undefined = '';
  @Input() postId: string = '';
  @Input() musicId: string | undefined = '';
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  editing = false;
  myId: string = '';
  contentControl = new FormControl('');

  constructor(private postService: PostsService) {}

  ngOnInit() {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const authContent = JSON.parse(authData);
      if (authContent) {
        this.myId = authContent.baseModel.id;
      }
    }
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.delete.emit(id);
    });
  }

  editPost(id: string) {
    this.postService
      .editPost(id, this.contentControl.value || '')
      .subscribe(() => {
        this.delete.emit(id);
        this.editing = false;
      });
  }

  toggleEdit() {
    this.editing = !this.editing;
    this.contentControl.setValue(this.content);
  }
}
