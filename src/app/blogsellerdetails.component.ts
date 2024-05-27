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
        this.formatPrice(); // Gọi phương thức để định dạng giá

      }, error => {
        console.log(error)
      }
    )
    
  }
  // Phương thức để định dạng giá
// Phương thức để định dạng giá
formatPrice(): void {
  if (this.realState && this.realState.price) {
    const price = this.realState.price;
    if (price >= 1000000000) {
      this.formattedPrice = (price / 1000000000).toFixed(1) + ' tỷ'; // Đổi sang tỷ nếu giá lớn hơn hoặc bằng 1 tỷ
    } else if (price >= 1000000) {
      const million = price / 1000000;
      this.formattedPrice = million % 1 === 0 ? million.toString() + ' triệu' : million.toFixed(1) + ' triệu'; // Đổi sang triệu nếu giá lớn hơn hoặc bằng 1 triệu
    } else if (price >= 1000) {
      const thousand = price / 1000;
      this.formattedPrice = thousand % 1 === 0 ? thousand.toString() + 'k' : thousand.toFixed(1) + 'k'; // Đổi sang k (kilo) nếu giá lớn hơn hoặc bằng 1 nghìn
    } else {
      this.formattedPrice = price.toString(); // Giữ nguyên giá nếu nhỏ hơn 1 nghìn
    }
  }
}



}
