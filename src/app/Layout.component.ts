import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './app.component.css'
})
export class LayoutComponent implements OnInit {
  
  constructor(private router: Router, private userServices: UserServices){}

  username: string;
 
  ngOnInit(){ 
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userServices.findByUsername(sessionStorage.getItem('username')).then(
        res =>{
          let user : User = res as User;
          this.username = user.username;
        },
        err =>{
          console.log(err);
        }
      )
    }
  }

  reload(){
    this.router.navigate(['/blogupstory']).then(p =>{
      window.location.reload();
    });
  }
  
}
