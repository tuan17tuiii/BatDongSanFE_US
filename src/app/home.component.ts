import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  host: { 'collision-id': 'HomeComponent' },
})
export class HomeComponent implements OnInit {
  id: string
  msg: string
  imageUrl: string
  realstates: RealState[]
  images: Image[]
  wards: Ward[]
  provinces: Province[]
  districts: District[]
  data_input1: string
  constructor(
    private provinceService: ProvinceAPIService,
    private imageService: ImageRealStateAPIService,
    private realstateService: RealStateAPIService,
    private baseUrlService: BaseUrlService,
    private http: HttpClient,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.imageUrl = this.baseUrlService.ImageUrl;
    this.provinceService.findAll().then(
      res => {
        this.provinces = res['results'] as Province[];

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
  changeinput() {
  }
 
}

