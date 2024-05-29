import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProvinceAPIService } from "../services/provinceapi.service";
import { Province } from '../entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from '../entities/district.entities';
import { Ward } from '../entities/ward.entities';
import { LayoutComponent } from '../Layout.component';
import { User } from '../entities/User.entities';
import { UserServices } from '../services/User.Services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './infor.component.html',
  host: { 'collision-id': 'HomeComponent' },
})
export class InforComponent implements OnInit {

  constructor(private router: Router, private layoutComponent: LayoutComponent, private userServices: UserServices){}

  ngOnInit(): void {//khi nhan ve thì là nhận về chuỗi hết nên phải khai báo chuỗi k là lỗi
    
  }
  
  Logout(){
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      sessionStorage.removeItem('username');
      this.router.navigate(['/home']).then(p => {
        window.location.reload();
      });
    }
  }

}

