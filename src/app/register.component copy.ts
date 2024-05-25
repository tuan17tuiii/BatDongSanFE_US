import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: 'register.component.html',
  host: { 'collision-id': 'RegisterComponent' },
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router) { }

  registerForm: FormGroup;
  username: string;
  email: string;
  password: string;
  msg: string;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      roleId: 2,
    });
  }

  Register() {
    let user: User = this.registerForm.value as User;

    this.userServices.Register(user).then(
      res => {
        if(res){
          this.router.navigate(['Login']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  
}
