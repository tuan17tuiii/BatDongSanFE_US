import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
})
export class Logincomponet implements OnInit{

  constructor(private userServices: UserServices, private router: Router, private messageService:MessageService) {

  }

  username: string;
  password: string;
  msg: string;

  ngOnInit() {

  }

  Login(){
    let user = new User();
    user
    user.username = this.username;
    user.password = this.password;
    
    this.userServices.LoginUser(user).then(
      res =>{
        if(res['result']){
          if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            sessionStorage.setItem('username', this.username);
            this.router.navigate(['/home']);
          }
        }else {
          this.messageService.add({ severity: 'error', summary: 'Login Failed !', detail: 'Username or Password is not correct !', key: 'tl', life: 2000 });
      }
      },
      err =>{
        console.log(err);
      }
    );
  }
}
