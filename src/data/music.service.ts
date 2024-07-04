import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PenBox } from 'lucide-angular';
import PocketBase, { ListResult, RecordModel } from 'pocketbase';
import { Observable } from 'rxjs';

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

export interface Music {
  title: string;
  artist: string;
  picture: string;
  album: string;
  preview: string;
  spotify_link: string;
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

  async getMusic(): Promise<ListResult<RecordModel>> {
    const pb = new PocketBase(this.sdkUrl);
    const records = await pb.collection('music').getList();
    return records;
  }
}
