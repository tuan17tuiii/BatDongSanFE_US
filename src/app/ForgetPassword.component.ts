import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule, PasswordModule, DividerModule, FloatLabelModule, InputTextModule],
  templateUrl: 'ForgetPassword.component.html',
  providers: [MessageService]
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private messageService: MessageService) { }

  ForgetForm: FormGroup;
  email: string;
  password: string;

  ngOnInit() {
    this.ForgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
    });
  }

  Retrieve() {
    this.email = this.ForgetForm.get('email')?.value;
    this.userServices.ForgetPassword(this.email).then(
        res =>{
            this.messageService.add({ severity: 'success', summary: 'Send Email Success !', detail: 'Send Email Successful! Please check your Email !', key: 'tl', life: 2000 });
            this.ForgetForm.reset();
        },
        err =>{
            console.log(err);
        }
    )
  }

  
}
