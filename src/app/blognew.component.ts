import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NewsService } from './services/News.Services';
import { News } from './entities/News.entities';
import { BaseUrlService } from './services/baseurl.service';
import { ImageRealStateAPIService } from './services/image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: 'blognew.component.html',
  
})
export class BlognewComponent implements OnInit{
news:News[]
imgsurl:string
  constructor(private newsSv :NewsService,
    private imgsv:BaseUrlService,
    private imgsvv:ImageRealStateAPIService
  ){

  }  
  ngOnInit(): void {
    this.imgsurl=this.imgsv.ImageUrl
this.newsSv.FindAllNews().then(
  res=>{
    this.news=res as News[]
  },
  err=>{
    
  }
)
  }
}
