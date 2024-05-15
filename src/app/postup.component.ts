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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './postup.component.html',

})
export class PostUpComponent implements OnInit {
  province: any
  district: any
  ward: any
  type: any

  formGroup: FormGroup
  id: string
  msg: string
  typerealstates: TypeRealState[]
  wards: Ward[]
  provinces: Province[]
  districts: District[]
  constructor(
    private formBuilder: FormBuilder,
    private provinceService: ProvinceAPIService,
    private realstateService: RealStateAPIService,
    private http: HttpClient,
    private typeRealStateService: TypeRealStateAPIService
  ) { }
  ngOnInit(): void {//khi nhan ve thì là nhận về chuỗi hết nên phải khai báo chuỗi k là lỗi
    this.formGroup = this.formBuilder.group({
      title: '',
      bathrooms: '',
      bedrooms: '',
      describe: '',
      price: '',
      acreage: '',

    })

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
      res => {
        this.typerealstates = res as TypeRealState[]

      },
      error => {
        console.log(error)
      }

    )

  }
  find_districts(evt: any) {
    var district_id = evt.target.value;
    this.id = district_id
    this.provinceService.find_Name_Province(this.id).then(
      res => {
        this.province = res as Province[];
      }
    )
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

    this.provinceService.find_Name_District(this.districts, ward_id).then(
      res => {
        this.district = res as District

      }, error => {
        console.log(error)
      }
    )

    this.provinceService.findWard(ward_id).then(
      res => {
        this.wards = res['results'] as Ward[];

      },
      error => {
        console.log(error)
      }
    )
  }
  find_Name_Ward(evt: any) {
    this.ward = evt.target.value;
  }
  selectType(evt: any) {
    this.type = evt.target.value;
  }
  save() {

    let realstate: RealState = this.formGroup.value as RealState;
    realstate.city = this.province[0].province_name
    realstate.region = this.district.district_name
    realstate.street = this.ward
    realstate.type = this.type
    realstate.status = false
    this.realstateService.create(realstate).then(
      res => {
        if(res['result']){
          console.log('Succes')
      }else{
          this.msg = 'Failed'
      } 
      },
      error => {
        console.log(error)
      }
    )
    

  }
}

