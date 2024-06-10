import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ProvinceAPIService } from "../services/provinceapi.service";
import { Province } from '../entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from '../entities/district.entities';
import { Ward } from '../entities/ward.entities';
import { RealState } from '../entities/realstate.entities';
import { Image } from '../entities/image.entities';
import { ImageRealStateAPIService } from '../services/image.service';
import { RealStateAPIService } from '../services/realstate.service';
import { BaseUrlService } from '../services/baseurl.service';
import { User } from '../entities/User.entities';
import { UserServices } from '../services/User.Services';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './inforview.component.html',
  host: { 'collision-id': 'HomeComponent' },
})
export class InforviewComponent implements OnInit {

  id: any;
  realState: RealState[]
  images: Image[]
  imagechinh: string
  imageUrl: string
  formattedPrice: string;
  user:User

  constructor(
    private imageService: ImageRealStateAPIService,
    private realstateService: RealStateAPIService,
    private activatedRoute: ActivatedRoute,
    private baseUrlService: BaseUrlService,
    private userService :UserServices


  ) { }
  ngOnInit(): void {
    this.imageUrl = this.baseUrlService.ImageUrl;
    this.activatedRoute.paramMap.subscribe(p => {
      this.id = p.get('id');
      this.loadData()
    })
    this.userService.findById(this.id).then(
      res=>{
        this.user=res as User
        console.log(this.user+"succcccc"+this.id);
      },
      err=>{
       console.log(err+"loi roiiii");
      }
    )
    
  }
  loadData(): void {
   
    this.realstateService.findAll().then(
      res => {
        this.realState = res as RealState[];
        this.realState = this.realState.filter(x=>x.usersellId==this.id)
        console.log(this.realState)
      },
      error => {
        console.log(error+"loat dataloi");
      }
    );  
  }


}

