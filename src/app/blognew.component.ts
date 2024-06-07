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
index:number=6
news:News[]
newsfull:News[]
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
    this.newsfull = await this.newsSv.FindAllNews() as News[];
    this.news =  this.newsfull.slice(0, 7);
    this.newsst1 = this.news[0];
console.log(this.news)
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

    const index = this.news.findIndex(x => Number(x.id) === Number(id));
    
    if (index !== -1) {
      // Xóa phần tử khỏi mảng news
      this.news.splice(index, 1);
  
      // Lấy phần tử mới từ mảng finall (ví dụ: lấy phần tử đầu tiên)
      this.index=this.index+1
      if(this.index>this.newsfull.length-1){
        this.index=0
      }
   
      const newElement = this.newsfull[this.index];
     
      // Thêm phần tử mới vào mảng news
      this.news.push(newElement);
  
      // Cuộn lên đầu trang
      window.scrollTo(0, 0);
  
      console.log('Updated news:', this.news);
    }
  }
}
}
