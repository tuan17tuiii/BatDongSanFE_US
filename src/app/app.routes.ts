
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PostUpComponent } from './postup.component';
import { AboutComponent } from './about.component';
import { ContacComponent } from './contact.component';
import { Property_listComponent } from './property_list.component';
import { Property_typeComponent } from './property_type.component';
import { Property_agentComponent } from './property_agent.component';
import { InforComponent } from './infor.component';
import { BlogbuyComponent } from './blogbuy.component';

export const routes: Routes = [
   {
      path: '',
      component: HomeComponent
   },
   {
      path: 'home',
      component: HomeComponent
   },
   {
      path: 'post-up',
      component: PostUpComponent
   },
   {
      path: "about",
      component: AboutComponent
   },
   {
      path: "contact",
      component: ContacComponent
   },
   {
      path: "property_list",
      component: Property_listComponent
   },
   {
      path: "property_type",
      component: Property_typeComponent
   },
   {
      path: "property_agent",
      component: Property_agentComponent
   },
   {
      path: "information",
      component: InforComponent
   },
   {
      path: "blog",
      component: InforComponent//
   }
   ,{
      path: "blogbuy",
      component: BlogbuyComponent
   }
];

