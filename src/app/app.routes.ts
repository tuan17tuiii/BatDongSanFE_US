
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
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';


export const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            component: HomeComponent,
         },
         {
            path: 'home',
            component: HomeComponent,
         },
         {
            path: 'post-up',
            component: PostUpComponent,
         },
         {
            path: "about",
            component: AboutComponent,
         },
         {
            path: "contact",
            component: ContacComponent,
         },
         {
            path: "property_list",
            component: Property_listComponent,
         },
         {
            path: "property_type",
            component: Property_typeComponent,
         },
         {
            path: "property_agent",
            component: Property_agentComponent,
         },
         {
            path: "information",
            component: InforComponent,
            canActivate: [UserSecurity],
            children: [
               {
                  path: "",
                  component: InfordetailsComponent,
               },
               {
                  path: "details",
                  component: InfordetailsComponent,
               },
               {
                  path: "update",
                  component: InforupdateComponent,
               },
               {
                  path: "home",
                  component: InforhomeComponent,
               },
               {
                  path: "formrgs",
                  component: InforformrgsComponent,
               },
               {
                  path: "selectadv",
                  component: SelectadvComponent,
               },
               {
                  path: "inforuser",
                  component: InforuserComponent,
               }
            ]
         },
         {
            path: "inforview",
            component: InforviewComponent,
         },
         {
            path: "blog",
            component: InforComponent,
         }
         , {
            path: "blogbuy",
            component: BlogbuyComponent,
         },
         {
            path: "blognew",
            component: BlognewComponent,
         }, {
            path: "blogsellerdetails",
            component: BlogsellerdetailsComponent,
         }, {
            path: "blogupstory",
            component: BlogupstoryComponent,
         }
      ]
   },
   {
      path: "Login",
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
  {
      path : 'paypal',
      component : PaypalButtonComponent
  }
];

