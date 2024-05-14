import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProvinceAPIService } from "./services/provinceapi.service";
import { Province } from './entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from './entities/district.entities';
import { Ward } from './entities/ward.entities';
import { TypeRealState } from './entities/typerealstate.entities';
import { TypeRealStateAPIService } from './services/typerealstate.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './postup.component.html',
  host: { 'collision-id': 'HomeComponent' },
})
export class PostUpComponent implements OnInit {
  id : string 
  msg: string
  typerealstates : TypeRealState[]
  wards : Ward[]
  provinces: Province[]
  districts: District[]
  constructor(
    private provinceService: ProvinceAPIService,
    private http: HttpClient,
    private typeRealStateService : TypeRealStateAPIService
  ) { }
  ngOnInit(): void {//khi nhan ve thì là nhận về chuỗi hết nên phải khai báo chuỗi k là lỗi

    this.provinceService.findAll().then(
      res => {
        this.provinces = res['results'] as Province[];
        console.log(this.provinces)
      },
      error => {
        console.log(error)
      }
    )
    this.typeRealStateService.findAll().then(
      res=>{
        this.typerealstates = res as TypeRealState[]
        
      },
      error=>{
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
}

