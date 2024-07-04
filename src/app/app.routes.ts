import { Routes, UrlSegment } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './dashboard/home.component';
import { CollectionComponent } from './collection/collection.component';
import { MusicPageComponent } from './music/music-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'collection',
    component: CollectionComponent,
  },
  {
    matcher: (url) => {
      if (url.length === 2 && url[0].path.match(/^music/)) {
        return {
          consumed: url,
          posParams: {
            music_id: new UrlSegment(url[1].path, {}),
          },
        };
      }
      return null;
    },
    component: MusicPageComponent,
  },
];
