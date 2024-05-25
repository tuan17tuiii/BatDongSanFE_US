import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { TestComponent } from './app/test.component';
import { Logincomponet } from './app/login.component';

const bootstrap = () => bootstrapApplication(Logincomponet, config);

export default bootstrap;
