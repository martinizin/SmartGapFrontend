import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes,),
    provideRouter(routes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
