import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'blogsellerdetails.component.html',
  styleUrl:'../assets/css/styleblogdel.css'
  
})
export class BlogsellerdetailsComponent implements OnInit{
  ngOnInit(): void {

  }
}
