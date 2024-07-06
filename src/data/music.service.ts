import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PocketBase, { ListResult, RecordModel } from 'pocketbase';
import { Observable } from 'rxjs';

export interface ResponseCollection {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Music[];
}

export interface Item {
  collectionId?: string;
  collectionName?: string;
  created?: string;
  updated?: string;
}

export interface Root {
  baseToken: string;
  baseModel: BaseModel;
  _onChangeCallbacks: any[];
  storageFallback: StorageFallback;
  storageKey: string;
}

export interface BaseModel {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
}

export interface StorageFallback {}

export interface Music extends Item {
  id?: string;
  title: string;
  artist: string;
  cover: string;
  album: string;
  preview: string;
  spotify_link: string;
  creator?: string;
}

@Injectable({
  providedIn: 'any',
})
export class MusicService {
  private apiUrl = 'http://127.0.0.1:8090/api/';
  private sdkUrl = 'http://127.0.0.1:8090';
  private backendUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  async postMusic(
    title: string,
    artist: string,
    album: string,
    cover: string,
    preview: string,
  ): Promise<RecordModel> {
    const pb = new PocketBase(this.sdkUrl);
    console.log('Posting music...', title);
    if (!pb.authStore.model) {
      throw new Error('Not authenticated');
    }
    const record = await pb.collection('music').create({
      title: title,
      artist,
      album,
      cover,
      preview,
      creator: pb.authStore.model['id'] || '',
    });
    return record;
  }

  async searchMusicInformation(artist: string, name: string) {}

  async deleteMusic(id: string): Promise<void> {
    console.log('Deleting music...', id);
    const pb = new PocketBase(this.sdkUrl);
    await pb.collection('music').delete(id);
  }

  searchMusic(name: string, artist: string): Observable<Music[]> {
    console.log('Searching for music...', name, artist);
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authData) {
      throw new Error('Not authenticated');
    }
    const id = authContent.baseModel.id;
    if (!id) {
      throw new Error('Not authenticated');
    }
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${id}`,
    });

    return this.http.get<Music[]>(`${this.backendUrl}/search`, {
      params: { name, artist },
      headers: httpHeaders,
    });
  }

  getCollection(): Observable<ResponseCollection> {
    console.log('Getting collection...');
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authData) {
      throw new Error('Not authenticated');
    }
    const filter = `?filter=(creator='${authContent.baseModel.id}')`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authContent.baseToken}`,
    });
    return this.http.get<ResponseCollection>(
      `${this.apiUrl}collections/music/records${filter}`,
      { headers: httpHeaders },
    );
  }

  searchMusics(query: string): Observable<ResponseCollection> {
    console.log('Searching music...', query);
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authData) {
      throw new Error('Not authenticated');
    }
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authContent.baseToken}`,
    });
    return this.http.get<ResponseCollection>(
      `${this.apiUrl}collections/music/records?filter=(title~'${query}')`,
      { headers: httpHeaders },
    );
  }

  getMusics(): Observable<ResponseCollection> {
    console.log('Getting music...');
    let authData = localStorage.getItem('authData');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    let authContent = JSON.parse(authData) as Root;
    if (!authData) {
      throw new Error('Not authenticated');
    }
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authContent.baseToken}`,
    });
    return this.http.get<ResponseCollection>(
      `${this.apiUrl}collections/music/records`,
      { headers: httpHeaders },
    );
  }

  deleteItem(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .delete<void>(`${this.apiUrl}collections/music/records/${id}`)
        .subscribe({
          next: () => {
            resolve();
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }

  getMusic(id: string): Observable<Music> {
    return this.http.get<Music>(
      `${this.apiUrl}collections/music/records/${id}`,
    );
  }
}
