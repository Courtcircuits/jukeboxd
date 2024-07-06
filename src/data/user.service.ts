import { Injectable } from '@angular/core';
import { Item } from './music.service';
import { HttpClient } from '@angular/common/http';

export interface User extends Item {
  id: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8090/api/';
  private sdkUrl = 'http://127.0.0.1:8090';

  constructor(private http: HttpClient) {}

  async getUser(id: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http
        .get<User>(this.apiUrl + 'collections/users/records/' + id)
        .subscribe({
          next: (user) => {
            resolve(user);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }
}
