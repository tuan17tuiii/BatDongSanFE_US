import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'blogbuy.component.html',
  
})
export class BlogbuyComponent implements OnInit{
  ngOnInit(): void {

  }
}
