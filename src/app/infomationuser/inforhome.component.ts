import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from '../services/User.Services';
import { User } from '../entities/User.entities';
import { RealStateAPIService } from '../services/realstate.service';
import { RealState } from '../entities/realstate.entities';
import { CommonModule } from '@angular/common';
import { BaseUrlService } from '../services/baseurl.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule,TableModule],
  templateUrl: './inforhome.component.html',
  host: { 'collision-id': 'HomeComponent' },
})
export class InforhomeComponent implements OnInit {
  constructor(
    private userService: UserServices,
    private realStateService: RealStateAPIService,
    private baseUrl: BaseUrlService,
  ) { }
  user: User
  approvedlists: RealState[] // list da dc phe duyet
  unapprovedlists: RealState[]// list chua duoc phe duyet
  imageUrl: string
  ngOnInit(): void {
    this.imageUrl = this.baseUrl.ImageUrl
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userService.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            this.user = res as User
            this.realStateService.findByUserSellTrue(this.user.id).then(
              res => {
                if (res) {
                  this.approvedlists = res as RealState[]//list dc phe duyet
                  
                }
              }
            )
            this.realStateService.findByUserSellFalse(this.user.id).then(
              res => {
                if (res) {
                  this.unapprovedlists = res as RealState[]
                  console.log(this.unapprovedlists)
                }
              }
            )
          }
        }
      )
    }
  }
  truncateText(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  }
  

}

