import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'property_agent.component.html',
  
})
export class Property_agentComponent implements OnInit {
ngOnInit(): void {
  
}
}
