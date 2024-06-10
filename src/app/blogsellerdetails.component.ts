import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { RealStateAPIService } from './services/realstate.service';
import { ImageRealStateAPIService } from './services/image.service';
import { RealState } from './entities/realstate.entities';
import { Image } from './entities/image.entities';
import { BaseUrlService } from './services/baseurl.service';
import { error } from 'console';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: 'blogsellerdetails.component.html',
  styleUrl: '../assets/css/styleblogdel.css',

})
export class BlogsellerdetailsComponent implements OnInit {
  id: any;
  realState: RealState
  realStateRelateds: RealState[]//bds lien quan
  images: Image[]
  imagechinh: string
  imageUrl: string
  formattedPrice: string;
  index:number=4;
 realstateful:RealState[]
  constructor(
    private imageService: ImageRealStateAPIService,
    private realstateService: RealStateAPIService,
    private activatedRoute: ActivatedRoute,
    private baseUrlService: BaseUrlService,


  ) { }
  ngOnInit(): void {
    this.imageUrl = this.baseUrlService.ImageUrl;
    this.activatedRoute.paramMap.subscribe(p => {
      this.id = p.get('id');
      this.loadData()
    })
    
    this.realstateService.findById(this.id).then(
      res => {
        this.realState = res as RealState
        // Gọi phương thức để định dạng giá
        this.realstateService.findByCityRegion(this.realState.city, this.realState.region).then(
          res => {
           
            this.realstateful =res as RealState[]
            this.index= this.realstateful.length-1
            this.realStateRelateds = this.realstateful
            if(this.realstateful.length>5){
            this.realStateRelateds = this.realstateful.splice(0,5)
            this.index=4
            }
            console.log(this.realStateRelateds)
          }, error => {
            console.log("Not Found")
          }
        )
      }, error => {
        console.log(error)
      }
    )
  }
  loadData(): void {
    this.imageService.findByRealStateId(this.id).then(
      res => {
        this.images = res as Image[];
      },
      error => {
        console.log(error);
      }
    )
    this.realstateService.findById(this.id).then(
      res => {
        this.realState = res as RealState;
        
      },
      error => {
        console.log(error);
      }
    );  
  }

  update(id:string){
    if(this.realStateRelateds.find(x=>Number(x.id)==Number(id))!=null){
      this.realState=this.realStateRelateds.find(x=>Number(x.id)==Number(id))
  
      const index = this.realStateRelateds.findIndex(x => Number(x.id) === Number(id));
      
      if (index !== -1) {
        // Xóa phần tử khỏi mảng news
        this.realStateRelateds.splice(index, 1);
    
        // Lấy phần tử mới từ mảng finall (ví dụ: lấy phần tử đầu tiên)
        this.index=this.index+1
        if(this.index>this.realstateful.length-1){
          this.index=0
        }
     
        const newElement = this.realstateful[this.index];
       
        // Thêm phần tử mới vào mảng news
        this.realStateRelateds.push(newElement);
    
        // Cuộn lên đầu trang
        window.scrollTo(0, 0);
    
        console.log('Updated news:', this.realStateRelateds);
      }
  
  }

}
}
