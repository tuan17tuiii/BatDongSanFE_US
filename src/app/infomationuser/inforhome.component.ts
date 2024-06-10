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
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RemainService } from '../services/remain.service';
import { Remain } from '../entities/remain.entities';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConfirmPopupModule,ConfirmDialogModule, ToastModule, RouterOutlet, RouterLink, CommonModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './inforhome.component.html',
  host: { 'collision-id': 'HomeComponent' },
  providers: [ConfirmationService, MessageService]
})
export class InforhomeComponent implements OnInit {
  constructor(
    private userService: UserServices,
    private remainService : RemainService,
    private realStateService: RealStateAPIService,
    private baseUrl: BaseUrlService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    
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
            console.log(this.user)
            this.find_realStateService_true(this.user.id)
           
          }
        }
      )
    }
  }
  find_realStateService_true(id: number) {
    this.realStateService.findByUserSellTrue(id).then(
      res => {
        if (res) {
          this.approvedlists = res as RealState[]//list dc phe duyet
          console.log(this.approvedlists)
        }
      }
    )
  }
  find_realStateService_false(id: number) {
    this.realStateService.findByUserSellFalse(id).then(
      res => {
        if (res) {
          this.approvedlists = res as RealState[]
        }
      }
    )
  }
  opentrue() {
    this.find_realStateService_true(this.user.id)
  }
  openfalse() {
    this.find_realStateService_false(this.user.id);
  }
  truncateText(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  }
  delete(id: string) {
    let flag : boolean 
    this.realStateService.findById(Number(id)).then(
      res=>{
        let realstate = res as RealState
        flag = realstate.status
      }
    )
    
    this.remainService.findById(this.user.id.toString()).then(
      res=>{
        let remain = res as Remain
        this.realStateService.delete(Number(id)).then(
          res => {
            if (res['result']) {
              console.log("Xoa thanh cong")
              if(flag == false){
                remain.remaining += 1 
                this.remainService.Update(remain).then(
                  res=>{
                    console.log("vat pham chua duoc duyet , + remaining thanh cong")
                  }
                )
              }else{
                console.log("Vat pham da duoc duyet, ko dc +  ")
              }
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentUrl]);
              });
    
            } else {
              console.log("Xoa that bai")
            }
          },
          err => {
            console.log(err);
          }
        )
      }
    )

    
  }
}

