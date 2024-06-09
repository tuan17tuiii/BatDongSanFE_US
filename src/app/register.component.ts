import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Remain } from './entities/remain.entities';
import { RemainService } from './services/remain.service';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule, PasswordModule, DividerModule],
  templateUrl: 'register.component.html',
  providers: [MessageService],
  host: { 'collision-id': 'RegisterComponent' },
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private userServices: UserServices,
    private router: Router,
    private messageService: MessageService,
    private remainService: RemainService
  ) { }

  registerForm: FormGroup;
  username: string;
  email: string;
  password: string;
  users: User[];
  remain: Remain = new Remain()
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/), Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
      roleId: 2,
    });
  }

  Register() {
    let user: User = this.registerForm.value as User;

    this.userServices.AccountExists(user.username, user.email).then(
      res => {
        if (res) {
          this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Username or Email already exists !', key: 'tl', life: 2000 });
        } else {
          this.userServices.Register(user).then(
            res => {
              if (res) {
                this.messageService.add({ severity: 'success', summary: 'Register Success !', detail: 'Register Successful! Please go to your Email and Verify the account !', key: 'tl', life: 2000 });
                this.userServices.FindAll().then(
                  res => {
                    this.users = res as User[]
                    console.log(this.users)
                    let latestUser = this.users.sort((a, b) => b.id - a.id)[0];
                    console.log('Latest User:', latestUser);
                    this.remain.idUser = latestUser.id.toString()
                    this.remain.remaining = '1'
                    this.remainService.create(this.remain).then(
                      res => {
                        console.log('Setup remain success')
                      }, err => {
                        console.log(err)
                      }
                    )
                  }
                )
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }


}
