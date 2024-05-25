import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './app.component.css'
})
export class LayoutComponent implements OnInit {
  
  constructor(private router: Router){}

  username: string;
 
  ngOnInit(){ 
    
  }

  Logout(){
    sessionStorage.removeItem('username');
    this.router.navigate(['']);
  }
}
