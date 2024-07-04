import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, icons } from 'lucide-angular';
import { authenticationReducer } from '../states/authentication.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      auth: authenticationReducer,
    }),
    importProvidersFrom(LucideAngularModule.pick(icons)),
    provideToastr(),
    provideHttpClient(),
  ],
};
