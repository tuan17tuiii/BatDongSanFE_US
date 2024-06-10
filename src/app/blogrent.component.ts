import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';
import { BaseUrlService } from './services/baseurl.service';
import { ImageRealStateAPIService } from './services/image.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule and NgModel
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { Image } from './entities/image.entities';
import { Ward } from './entities/ward.entities';
import { Province } from './entities/province.entities';
import { ProvinceAPIService } from './services/provinceapi.service';

import { SelectButtonModule } from 'primeng/selectbutton';
      
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,InputTextModule,SelectButtonModule,SliderModule,DropdownModule,FormsModule],
  templateUrl: 'blogrent.component.html',

})
export class BlogrentComponent implements OnInit {
  stateOptions: any[] = [{label: 'Rent', value: 'rent'}, {label: 'Sell', value: 'sell'}];
  realstates: RealState[];
  rangeValues: number[] = [0,100];
  value: string = 'rent';
  id: string
  items: SelectItem[];
  adv: string[]
  imgsvs: string;
  key: string = null
  city: string = ""
  pricemin: string = null
  areamin: string = null
  pricemax: string = null
  areamax: string = null
  msg: string
  imageUrl: string
  images: Image[]
  provinces: Province[]
  data_input1: string
  price:string= null
  area:string="0"

  constructor(
    private realstatesv: RealStateAPIService,
    private imgsv: BaseUrlService,
    private imgsvv: ImageRealStateAPIService,
    private activatedRoute: ActivatedRoute,
    private provinceService: ProvinceAPIService,
    private router:Router
  ) {
  }
  ngOnInit(): void {
    this.imgsvs = this.imgsv.ImageUrl;
    this.activatedRoute.queryParamMap.subscribe(p => {
      console.log(p)
      console.log("day la p")
      if (p.get('key') != null) {
        this.key = p.get('key');
        console.log(p.get('key') + "day la tse tere");
      }
      if (p.get('city') != null) {
        this.city = p.get('city');
      }
      if (p.get('pricemin') != null) {
        this.pricemin = p.get('pricemin');
      }
      if (p.get('pricemax') != null) {
        this.pricemax = p.get('pricemax');
      }
      if (p.get('areamin') != null) {
        this.areamin = p.get('areamin');
      }
      if (p.get('areamax') != null) {
        this.areamax = p.get('areamax');
      }

      // Sau khi gán giá trị từ paramMap, thực hiện cuộc gọi hàm searchfilter
      this.performSearch();
    });
    this.provinceService.findAll().then(
      res => {
        this.provinces = res['data'] as Province[];
        console.log(res)
        console.log(this.provinces)

      },
      error => {
        console.log(error)
      }
    )
  }

  find_districts(evt: any) {

    var district_id = evt.target.value;
    this.id = district_id

  }
  performSearch() {
    // Kiểm tra xem có bất kỳ tham số nào đã được truyền qua URL hay không
    if (this.key != null || this.city != null || this.pricemin != null || this.pricemax != null || this.areamin != null || this.areamax != null) {
      this.realstatesv.searchfilter(this.key, this.city, this.pricemin, this.pricemax, this.areamin, this.areamax).then(
        res => {
          this.realstates = res as RealState[]; // Gán mảng dữ liệu vào this.realstates
          console.log(this.realstates);
          this.realstates = this.realstates.filter(x=>x.transactionType=="rent")
        
        },
        err => {
          console.log("Đã xảy ra lỗi khi tải dữ liệu", err);
        }
      );
    } else {
      // Nếu không có tham số nào, thực hiện cuộc gọi hàm findAll để lấy tất cả dữ liệu
      this.realstatesv.findAll().then(
        res => {
          this.realstates = res as RealState[]; // Gán mảng dữ liệu vào this.realstates
          this.realstates = this.realstates.filter(x=>x.transactionType=="rent")
          console.log(this.realstates);
        },
        err => {
          console.log("Đã xảy ra lỗi khi tải dữ liệu", err);
        }
      );
    }
  }
  load() {
    console.log('Key:', this.key);
    console.log('City:', this.city);
    console.log('Min Price:', this.pricemin);
    console.log('Min Area:', this.areamin);
    console.log('Max Price:', this.pricemax);
    if(this.value=="sell"){
      this.router.navigate(['/blogbuy'], { queryParams: { key: this.key,city: this.city,pricemin: this.pricemin,pricemax: this.pricemax,areamin: this.area } });
    }else if(this.value=="rent"){
      this.router.navigate(['/blogrent'], { queryParams: { key: this.key,city: this.city,pricemin: this.pricemin,pricemax: this.pricemax,areamin: this.area } });
  
    }

  }
  chang(){
    console.log("co cc nef")
    this.price=(this.rangeValues[0]*10000).toString()+" $ - "+(this.rangeValues[1]*10000).toString()+" $";
    this.pricemin=(this.rangeValues[0]*10000).toString();
    this.pricemax=(this.rangeValues[1]*10000).toString();
    console.log( this.pricemax+"-"+this.pricemin)
console.log(this.area)
console.log(this.key)
   }
}
