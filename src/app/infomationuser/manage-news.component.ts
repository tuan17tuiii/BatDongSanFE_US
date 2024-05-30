import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from '../services/User.Services';
import { User } from '../entities/User.entities';
import { RealStateAPIService } from '../services/realstate.service';
import { RealState } from '../entities/realstate.entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './manage-news.component.html',
  styleUrl: '../../assets/css/manage-new.css',
})
export class ManageNewsComponent implements OnInit {
  constructor(
    private userService: UserServices ,
    private realStateService : RealStateAPIService 
  ) { }
  
  user: User
  approvedlists : RealState[] // list da dc phe duyet
  unapprovedlists : RealState[]// list chua duoc phe duyet
  ngOnInit(): void {
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userService.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            this.user = res as User
            this.realStateService.findByUserSellTrue(this.user.id).then(
              res=>{
                if(res){
                  this.approvedlists = res as RealState[]//list dc phe duyet
                  console.log(this.approvedlists)
                }
              }
            )
            this.realStateService.findByUserSellFalse(this.user.id).then(
              res=>{
                if(res){
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

}

