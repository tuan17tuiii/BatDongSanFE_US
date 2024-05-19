import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'blognew.component.html',
  
})
export class BlognewComponent implements OnInit{
  ngOnInit(): void {

  }
}
