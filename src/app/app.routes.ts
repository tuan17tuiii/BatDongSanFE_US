
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PostUpComponent } from './postup.component';

export const routes: Routes = [
   {
    path : '',
    component : HomeComponent
   },
   {
      path : 'post-up',
      component : PostUpComponent
     }
];

