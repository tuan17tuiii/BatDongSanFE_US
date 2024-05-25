
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
import { BlognewComponent } from './blognew.component';
import { InfordetailsComponent } from './infordetails.component';
import { InforhomeComponent } from './inforhome.component';
import { InforupdateComponent } from './inforupdate.component';
import { InforviewComponent } from './inforview.component';
import { InforformrgsComponent } from './inforformrgs.component';
import { BlogsellerdetailsComponent } from './blogsellerdetails.component';
import { BlogupstoryComponent } from './blogupstory.component';
import { SelectadvComponent } from './selectadv.component';
import { InforuserComponent } from './inforuser.component';
import { Logincomponet } from './login.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout.component';
import { UserSecurity } from './services/Security.Services';
import { RegisterComponent } from './register.component';
import { VerifyWebComponent } from './VerifyWeb.component';

export const routes: Routes = [
   {
      path: 'bds',
      component: LayoutComponent,
      canActivate: [UserSecurity],
      data: {
         role: 'user'
     },
      children: [
         {
            path: 'home',
            component: HomeComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: 'post-up',
            component: PostUpComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "about",
            component: AboutComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "contact",
            component: ContacComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "property_list",
            component: Property_listComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "property_type",
            component: Property_typeComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "property_agent",
            component: Property_agentComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "information",
            component: InforComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
            children: [
               {
                  path: "",
                  component: InfordetailsComponent,
                  canActivate: [UserSecurity],
                  data: {
                     role: 'user'
                 },
               },
               {
                  path: "details",
                  component: InfordetailsComponent,
                  canActivate: [UserSecurity],
                  data: {
                     role: 'user'
                 },
               },
               {
                  path: "update",
                  component: InforupdateComponent,
                  canActivate: [UserSecurity],
                  data: {
                     role: 'user'
                 },
               },
               {
                  path: "home",
                  component: InforhomeComponent,
                  canActivate: [UserSecurity],
                  data: {
                     role: 'user'
                 },
               },
               {
                  path: "formrgs",
                  component: InforformrgsComponent,
                  canActivate: [UserSecurity],
                  data: {
                     role: 'user'
                 },
               },
               {
                  path: "selectadv",
                  component: SelectadvComponent,
                  canActivate: [UserSecurity],
                  data: {
                     role: 'user'
                 },
               },
               {
                  path: "inforuser",
                  component: InforuserComponent,
                  canActivate: [UserSecurity],
                  data: {
                     role: 'user'
                 },
               }
            ]
         },
         {
            path: "inforview",
            component: InforviewComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "blog",
            component: InforComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         }
         , {
            path: "blogbuy",
            component: BlogbuyComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         },
         {
            path: "blognew",
            component: BlognewComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         }, {
            path: "blogsellerdetails",
            component: BlogsellerdetailsComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         }, {
            path: "blogupstory",
            component: BlogupstoryComponent,
            canActivate: [UserSecurity],
            data: {
               role: 'user'
           },
         }
      ]
   },
   {
      path: "",
      component: Logincomponet
   },
   {
      path: "Register",
      component: RegisterComponent
   },
   {
      path: 'verify',
      component: VerifyWebComponent
  },
];

