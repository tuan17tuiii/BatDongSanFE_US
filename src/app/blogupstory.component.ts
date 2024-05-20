import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'blogupstory.component.html',
  styleUrl:'../assets/css/styleblogupstory.css'
  
})
export class BlogupstoryComponent implements OnInit{
  ngOnInit(): void {

  }
}
