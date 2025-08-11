import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes';

const bootstrap = () =>
  bootstrapApplication(App, {
    providers: [
      provideAnimations(),
      provideHttpClient(withFetch()), // 👈 HttpClient en servidor
      provideToastr(),
      provideRouter(routes)
    ]
  });

export default bootstrap;
