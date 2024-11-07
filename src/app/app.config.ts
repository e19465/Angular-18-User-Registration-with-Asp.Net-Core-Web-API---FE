import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { jWTInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 5000, // Duration before the toast disappears
      positionClass: 'toast-top-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      progressBar: true, // Show progress bar
      closeButton: true, // Show close button
      easeTime: 300, // Animation ease time
      enableHtml: true, // Enable HTML content in toast
    }),
    // provideHttpClient(),
    provideHttpClient(withFetch(), withInterceptors([jWTInterceptor])), // use interceptor when JWT authentication is ready
  ],
};
