import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import PocketBase from 'pocketbase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login, logout } from '../states/authentication.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8090/api/';
  private sdkUrl = 'http://127.0.0.1:8090';
  private isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const authData = localStorage.getItem('authData');
    console.log('Auth data', authData);
    if (authData) {
      const pb = new PocketBase(this.sdkUrl);
      pb.authStore = JSON.parse(authData);
      this.isLoggedIn = true;
    }
  }

  register(email: string, password: string): Observable<any> {
    console.log('Registering...', email);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      `${this.apiUrl}collections/users/records`,
      {
        username: email,
        password,
        passwordConfirm: password,
      },
      { headers },
    );
  }

  async login(email: string, password: string): Promise<void> {
    const pb = new PocketBase(this.sdkUrl);
    await pb.collection('users').authWithPassword(email, password);
    console.log('Logged in', pb.authStore);

    localStorage.setItem('authData', JSON.stringify(pb.authStore));
    this.isLoggedIn = true;
    this.router.navigate(['/home']);
  }

  logout(): void {
    localStorage.removeItem('authData');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
