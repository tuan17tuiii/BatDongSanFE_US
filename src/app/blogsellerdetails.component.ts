import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { RealStateAPIService } from './services/realstate.service';
import { ImageRealStateAPIService } from './services/image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'blogsellerdetails.component.html',
  styleUrl:'../assets/css/styleblogdel.css'
  
})
export class BlogsellerdetailsComponent implements OnInit{
  constructor(
    private imageService : ImageRealStateAPIService ,
    private realstateService : RealStateAPIService , 
    private activatedRoute : ActivatedRoute
) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(p=>{
      let id = p.get('id'); 
      console.log(id);
    })
  }
}
