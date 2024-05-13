import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { TestComponent } from './app/test.component';

const bootstrap = () => bootstrapApplication(TestComponent, config);

export default bootstrap;
