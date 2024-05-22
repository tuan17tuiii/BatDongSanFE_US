import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet,NavigationEnd } from '@angular/router';
import { ProvinceAPIService } from "./services/provinceapi.service";
import { Province } from './entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from './entities/district.entities';
import { Ward } from './entities/ward.entities';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  host: { 'collision-id': 'HomeComponent' },
})
export class HomeComponent implements OnInit {
  id : string 
  msg: string
  wards : Ward[]
  provinces: Province[]
  districts: District[]
  data_input1:string
  constructor(
    private provinceService: ProvinceAPIService,
    private http: HttpClient,
    private router:Router
  ) { }
  ngOnInit(): void {//khi nhan ve thì là nhận về chuỗi hết nên phải khai báo chuỗi k là lỗi
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.provinceService.findAll().then(
      res => {
        this.provinces = res['results'] as Province[];
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
    console.log(district_id)
    this.provinceService.findDistrict(district_id).then(
      res => {
        this.districts = res['results'] as District[];
        
      },
      error => {
        console.log(error)
      }
    )
  }
  find_ward(evt : any){
    var ward_id = evt.target.value;
    this.provinceService.findWard(ward_id).then(
      res=>{
        this.wards = res['results'] as Ward[];
        console.log(this.wards)
      },
      error=>{
        console.log(error)
      }
    )
  }
  changeinput(){
  }
}

