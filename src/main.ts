import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Make sure this path is correct and matches to actual file structure
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
