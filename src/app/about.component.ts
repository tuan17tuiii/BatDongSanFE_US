import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'about.component.html',
  
})
export class AboutComponent implements OnInit{
  ngOnInit(): void {

  }
}
