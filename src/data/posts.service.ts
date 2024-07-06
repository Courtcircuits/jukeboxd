import { HttpClient, HttpHeaders } from '@angular/common/http';
import PocketBase, { RecordModel } from 'pocketbase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Root } from './music.service';
import { User, UserService } from './user.service';

export interface ResponsePost {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Post[];
}

export interface Post {
  id: string;
  content: string;
  creator: string;
  music: string;
  dataCreator?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'http://127.0.0.1:8090/api/';
  private sdkUrl = 'http://127.0.0.1:8090';

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  async postPost(content: string, music: string): Promise<RecordModel> {
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authContent) {
      throw new Error('Not authenticated');
    }
    const pb = new PocketBase(this.sdkUrl);
    if (!pb.authStore.model) {
      throw new Error('Not authenticated');
    }
    const record = await pb.collection('posts').create({
      content: content,
      creator: pb.authStore.model['id'] || '',
      music,
    });

    return record;
  }

  deletePost(id: string): Observable<any> {
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authContent) {
      throw new Error('Not authenticated');
    }
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + authContent.baseToken,
      'Content-Type': 'application/json',
    });
    const toReturn = this.http.delete<any>(
      `${this.apiUrl}collections/posts/records/${id}`,
      {
        headers: httpHeaders,
      },
    );
    return toReturn;
  }

  getPosts(music: string): Observable<ResponsePost> {
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authData) {
      throw new Error('Not authenticated');
    }
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + authContent.baseToken,
      'Content-Type': 'application/json',
    });
    const toReturn = this.http.get<ResponsePost>(
      `${this.apiUrl}collections/posts/records?filter=(music='${music}')`,
      {
        headers: httpHeaders,
      },
    );

    return toReturn;
  }

  editPost(id: string, content: string): Observable<any> {
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authContent) {
      throw new Error('Not authenticated');
    }
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + authContent.baseToken,
      'Content-Type': 'application/json',
    });
    const toReturn = this.http.patch<any>(
      `${this.apiUrl}collections/posts/records/${id}`,
      {
        content,
      },
      {
        headers: httpHeaders,
      },
    );
    return toReturn;
  }
}
