import { Component, OnInit,ViewChild, ElementRef,NgZone } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { ProvinceAPIService } from "./services/provinceapi.service";
import { Province } from './entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from './entities/district.entities';
import { Ward } from './entities/ward.entities';
import { Image } from './entities/image.entities';
import { ImageRealStateAPIService } from './services/image.service';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';
import { BaseUrlService } from './services/baseurl.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule and NgModel
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,
    FormsModule, DropdownModule,SliderModule,InputTextModule],
  templateUrl: './home.component.html',
  host: { 'collision-id': 'HomeComponent' },
})
export class HomeComponent implements OnInit {
  rangeValues: number[] = [0,100];
  value: number[] = [1,50];
  id: string
  items: SelectItem[];
  msg: string
  imageUrl: string
  realstates: RealState[]
  images: Image[]
  wards: Ward[]
  provinces: Province[]
  districts: District[]
  data_input1: string
  key: string = null
  city: string = null
  price:string= null
  area:string= "0"
  pricemin: string = null
  areamin: string = null
  pricemax: string = null
  areamax: string = null
  constructor(
    private provinceService: ProvinceAPIService,
    private imageService: ImageRealStateAPIService,
    private realstateService: RealStateAPIService,
    private baseUrlService: BaseUrlService,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.items = [];       
            this.items.push({ label: '< 50 m2', value: '0-50' });
            this.items.push({ label: '> 50 m2', value: '50-100' });
            this.items.push({ label: '> 100 m2', value: '100-200'});
            this.items.push({ label: '> 200 m2', value: '200-500' });
            this.items.push({ label: '> 500 m2', value: '500-1000'});
            this.items.push({ label: '> 1000 m2' , value: '1000'});
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
  ngOnInit(): void {
    this.realstateService.MarkExpired().then(
      res => {
        console.log("update success")
      }
    )
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.imageUrl = this.baseUrlService.ImageUrl;
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
    this.imageService.findAll().then(
      res => {
        this.images = res as Image[];

      },
      error => {
        console.log(error)
      }
    )
    this.realstateService.findAll().then(
      res => {
        this.realstates = res as RealState[];

      },
      error => {
        console.log(error)
      }
    )
  }

  find_districts(evt: any) {

    var district_id = evt.target.value;
    this.id = district_id

    this.provinceService.findDistrict(district_id).then(
      res => {
        this.districts = res['results'] as District[];

      },
      error => {
        console.log(error)
      }
    )
  }
  find_ward(evt: any) {
    var ward_id = evt.target.value;
    this.provinceService.findWard(ward_id).then(
      res => {
        this.wards = res['results'] as Ward[];

      },
      error => {
        console.log(error)
      }
    )
  }

  click(){
  }
  clickSearch(){
    this.router.navigate(['/blogbuy'], { queryParams: { key: this.key,city: this.city,pricemin: this.pricemin,pricemax: this.pricemax,areamin: this.area } });


  }

}

