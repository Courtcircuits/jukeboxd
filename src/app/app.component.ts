import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'jukeboxd';
  data: any;
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
