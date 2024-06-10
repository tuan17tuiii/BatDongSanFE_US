
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { Property_listComponent } from './property_list.component';
import { Property_typeComponent } from './property_type.component';
import { Property_agentComponent } from './property_agent.component';

import { BlogbuyComponent } from './blogbuy.component';
import { BlognewComponent } from './blognew.component';

import { InforhomeComponent } from './infomationuser/inforhome.component';

import { InforviewComponent } from './infomationuser/inforview.component';
import { InforformrgsComponent } from './infomationuser/inforformrgs.component';
import { BlogsellerdetailsComponent } from './blogsellerdetails.component';
import { BlogupstoryComponent } from './blogupstory.component';
import { SelectadvComponent } from './selectadv.component';
import { InforuserComponent } from './infomationuser/inforuser.component';
import { Logincomponet } from './login.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout.component';
import { UserSecurity } from './services/Security.Services';
import { RegisterComponent } from './register.component';
import { VerifyWebComponent } from './VerifyWeb.component';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';
import { ChangePassComponent } from './ChangePass.component';
import { InfordetailsComponent } from './infomationuser/infordetails.component';
import { InforComponent } from './infomationuser/infor.component';
import { ManageNewsComponent } from './infomationuser/manage-news.component';
import { EditComponent } from './edit.component';


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
            path: "about",
            component: AboutComponent,
         },
         {
            path: "contact",
            component: ContactComponent,
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
            data: {
               role: '2, 4'
            },
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
                  path: "home",
                  component: InforhomeComponent,
               },
               {
                  path: "edit",
                  component: EditComponent,
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
                  path: "manage-news",
                  component: ManageNewsComponent,
               },
               {
                  path: "inforuser",
                  component: InforuserComponent,
               },
               {
                  path: "ChangePass",
                  component: ChangePassComponent,
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
            canActivate: [UserSecurity],
            data: {
               role: '2, 4'
            },
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
      path: 'paypal',
      component: PaypalButtonComponent
   },
   {
      path: 'forgetpassword',
      component: ForgetPasswordComponent,
  },
  {
      path: 'resetpassword',
      component: ChangeForgetComponent
  },
];

