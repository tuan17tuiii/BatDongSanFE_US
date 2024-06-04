import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
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
newsst1:News
imgsurl:string
id:string
  constructor(private newsSv :NewsService,
    private imgsv:BaseUrlService,
    private imgsvv:ImageRealStateAPIService,
    private activatedRoute: ActivatedRoute,
  ){

  }  
  ngOnInit(): void {
    this.imgsurl=this.imgsv.ImageUrl
    
    this.Renderr()
    

}
async Renderr() :Promise<void>{
  try {
    this.news = await this.newsSv.FindAllNews() as News[];
    this.newsst1 = this.news[0];

    this.activatedRoute.paramMap.subscribe(async p => {
      this.id = p.get('id');
      let newsId = Number(this.id);

      if (newsId > 0) {
        try {
          this.newsst1 = await this.newsSv.FindbynewsId(this.id) as News;
        } catch (error) {
          console.error('Error fetching news by ID:', error);
          // Handle error (e.g., show a message to the user)
        }
      } else {
        this.newsst1 = this.news[0];
      }
    });
  } catch (error) {
    console.error('Error fetching all news:', error);
    // Handle error (e.g., show a message to the user)
  }
}
update(id:string){
  if(this.news.find(x=>Number(x.id)==Number(id))!=null){
    this.newsst1=this.news.find(x=>Number(x.id)==Number(id))
  }
}
}
