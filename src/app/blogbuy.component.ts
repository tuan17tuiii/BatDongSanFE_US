import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';
import { BaseUrlService } from './services/baseurl.service';
import { ImageRealStateAPIService } from './services/image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: 'blogbuy.component.html',

})
export class BlogbuyComponent implements OnInit {
  realstates:RealState[];
  adv:string[]
  imgsvs:string;
  constructor(
    private realstatesv: RealStateAPIService,
  private imgsv:BaseUrlService,
  private imgsvv:ImageRealStateAPIService
  ) {
this.realstates
  }
  ngOnInit(): void {
    this.imgsvs=this.imgsv.ImageUrl;
  
    this.realstatesv.findAll().then(
      res => {  
        this.realstates = res['$values'] as RealState[]; // Gán mảng dữ liệu vào this.realstates
        console.log(this.realstates);
      },
      err => {
        console.log("Đã xảy ra lỗi khi tải dữ liệu", err);
      }
    );
    
    
}
}
