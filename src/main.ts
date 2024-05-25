import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TestComponent } from './app/test.component';
import { Logincomponet } from './app/login.component';

bootstrapApplication(Logincomponet, appConfig)
  .catch((err) => console.error('loi'));
