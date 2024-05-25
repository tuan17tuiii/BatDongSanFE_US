import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { error } from 'node:console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: 'VerifyWeb.component.html',
  host: { 'collision-id': 'VerifyWebComponent' },
})
export class VerifyWebComponent implements OnInit {
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userServices: UserServices){}

  msg: string;

  ngOnInit(){
      this.activatedRoute.paramMap.subscribe(p =>{
        let securityCode = p.get('securityCode');
        let username = p.get('username');
        this.userServices.Verify(securityCode, username).then(
          res =>{
            this.msg = 'Account verified successfully!'
          },
          err =>{
            this.msg = 'Account verified failed !'
          }
        );

      });
  } 
}
