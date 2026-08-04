import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AppInfoService, AuthGuardService, AuthService, ScreenService } from './shared/services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    AuthGuardService,
    provideHttpClient(),
    AuthService,
    ScreenService,
    AppInfoService,
  ],
};
