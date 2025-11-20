import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { errorInterceptor } from './interceptors/error.interceptor';

if (typeof process !== 'undefined') {
  // Default favorites flag on if not provided
  const curr = process.env?.['NG_APP_FEATURE_FLAGS'];
  if (!curr) (process.env as any)['NG_APP_FEATURE_FLAGS'] = 'favorites';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([errorInterceptor]))
  ]
};
