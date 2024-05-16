import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'contact.component.html',
  
})
export class ContacComponent implements OnInit{
  ngOnInit(): void {

  }
}
