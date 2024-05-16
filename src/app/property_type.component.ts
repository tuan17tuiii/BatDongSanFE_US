import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'property_type.component.html',
  
})
export class Property_typeComponent implements OnInit {
ngOnInit(): void {
  
}
}
