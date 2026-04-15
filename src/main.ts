import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Make sure this points to your app.ts file

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
