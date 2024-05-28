import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { RealStateAPIService } from './services/realstate.service';
import { ImageRealStateAPIService } from './services/image.service';
import { RealState } from './entities/realstate.entities';
import { Image } from './entities/image.entities';
import { BaseUrlService } from './services/baseurl.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: 'blogsellerdetails.component.html',
  styleUrl: '../assets/css/styleblogdel.css',
  
})
export class BlogsellerdetailsComponent implements OnInit {
  id: any;
  realState : RealState
  images : Image[]
  imagechinh : string  
  imageUrl : string 
  formattedPrice: string;

  constructor(
    private imageService: ImageRealStateAPIService,
    private realstateService: RealStateAPIService,
    private activatedRoute: ActivatedRoute,
    private baseUrlService : BaseUrlService,
    

  ) { }
  ngOnInit(): void {

    this.imageUrl = this.baseUrlService.ImageUrl ; 
    this.activatedRoute.paramMap.subscribe(p => {
      this.id = p.get('id');
      
    })
    this.imageService.findByRealStateId(this.id).then(
      res => {
        this.images = res as Image[]
        

      }, error => {
        console.log(error)
      }
    )
    
    
    this.realstateService.findById(this.id).then(
      res => {
        this.realState = res as RealState
         // Gọi phương thức để định dạng giá

      }, error => {
        console.log(error)
      }
    )
    
  }
  // Phương thức để định dạng giá
// Phương thức để định dạng giá




}
