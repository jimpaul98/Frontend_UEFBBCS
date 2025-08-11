import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth-interceptor';
bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) // 👈 Registramos el interceptor
    ),
    provideToastr(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
