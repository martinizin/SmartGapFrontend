import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimización de detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Proveedor de enrutamiento
    provideRouter(routes),

    // Habilitación de SSR y reproducción de eventos
    provideClientHydration(withEventReplay()),

    // Cliente HTTP con API Fetch
    provideHttpClient(withFetch())
  ]
};
