import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from '../services/User.Services';
import { User } from '../entities/User.entities';
import { RealStateAPIService } from '../services/realstate.service';
import { RealState } from '../entities/realstate.entities';
import { CommonModule } from '@angular/common';
import { BaseUrlService } from '../services/baseurl.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConfirmDialogModule, ToastModule, RouterOutlet, RouterLink, CommonModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './inforhome.component.html',
  host: { 'collision-id': 'HomeComponent' },
  providers: [ConfirmationService, MessageService]
})
export class InforhomeComponent implements OnInit {
  constructor(
    private userService: UserServices,
    private realStateService: RealStateAPIService,
    private baseUrl: BaseUrlService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {

  }
  user: User
  approvedlists: RealState[] // list da dc phe duyet
  unapprovedlists: RealState[]// list chua duoc phe duyet
  imageUrl: string
  visible: boolean = false;
  acceptButtonEnabled: boolean = true;
  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-4',
      rejectIcon: 'pi pi-times mr-4',
      acceptVisible: true,
      accept: () => {
        if (this.acceptButtonEnabled) {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          this.router.navigate(['/information/formrgs'])
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }
  showDialog() {
    this.visible = true;
  }
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
                  console.log(this.approvedlists)
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

