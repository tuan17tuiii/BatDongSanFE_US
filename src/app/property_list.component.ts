import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'property_list.component.html',
  
})
export class Property_listComponent implements OnInit {
  ngOnInit(): void {
    
  }
}
