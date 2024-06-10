import { Component, NgZone, OnInit, Inject, PLATFORM_ID, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
import { Advertisement } from './entities/advertisement.entities';
import { AdvertisementAPIService } from './services/advertisement.service';
import { CommonModule, formatDate, isPlatformBrowser } from '@angular/common';
import { User } from './entities/User.entities';
import { UserServices } from './services/User.Services';
import { RemainService } from './services/remain.service';
import { Remain } from './entities/remain.entities';
import { error } from 'console';
import { Router } from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    CommonModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './selectadv.component.html',
  styleUrl: '../assets/css/selectadv.css'
})
export class SelectadvComponent implements OnInit, AfterViewInit {
  advertisements: Advertisement[] = [];
  advertisement: Advertisement;
  user: User
  remain: Remain

  constructor(
    private advertisementService: AdvertisementAPIService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private userService: UserServices,
    private remainService: RemainService,
    private messageService: MessageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userService.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            this.user = res as User
            let avartarurl = this.user.avatar;
            let avatar = avartarurl.lastIndexOf('/');
            this.user.avatar = avartarurl.slice(avatar + 1);
            this.remainService.findById(this.user.id.toString()).then(
              res => {
                this.remain = res as Remain
                if (Number(this.remain.remaining) == 0) {
                  this.remain.idAdv = null
                  this.remainService.Update(this.remain).then(
                    res => {
                      console.log("Update remain thanh cong")
                    }
                  )

                  this.user.advertisement = null
                  this.userService.Update(this.user).then(
                    res => {
                      console.log("Update User Success")
                    }
                  )
                }
              }
            )
          }
        }
      )
    } else {
    }
    if (isPlatformBrowser(this.platformId)) {
      this.loadPaypalScript();
    }
    this.advertisementService.findAll().then(
      res => {
        this.advertisements = res as Advertisement[];
        console.log(this.advertisements);
        if (isPlatformBrowser(this.platformId)) {
          this.initializePaypalButtons();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  subscribe(id: string) {
    this.advertisementService.findById(id).then(
      res => {
        this.advertisement = res as Advertisement;
        console.log(this.advertisement);
      }
    );
  }

  ngAfterViewInit() {
  }
  show(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail

    })
  }
  error(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }
  loadPaypalScript() {
    const paypalClientId = "AcbVprLkjzuOtG-h1fqU8fH8RXhybsxGUT7-da5Rvrtmsk3EldV6UbI8KMP1y78KCEYNU_q1INSGUJXt";
    this.ngZone.runOutsideAngular(() => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`;
      script.onload = () => {
        this.ngZone.run(() => this.initializePaypalButtons());
      };
      script.onerror = (error) => {
        console.error('PayPal SDK could not be loaded.', error);
      };
      document.body.appendChild(script);
    });
  }
  selectPackage(id: any) {
    var number = id.target.value
    console.log(number)
  }
  initializePaypalButtons() {
    this.advertisements.forEach((advertisement, index) => {
      this.ngZone.runOutsideAngular(() => {
        paypal.Buttons({
          createOrder: (data, actions) => {
            if (this.user.advertisement && this.user.advertisement.price >= advertisement.price) {
              this.ngZone.run(() => {
                this.error("Failed", "Cannot buy lower or equal package!");
              });
              return actions.reject(); // Prevent the order from being created
            }
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: advertisement.price.toString()
                }
              }]
            });
          },
          onApprove: (data, actions) => {

            return actions.order.capture().then(details => {
              this.ngZone.run(() => {
                if (this.user.advertisement == null) {
                  this.user.advertisementId = Number(advertisement.id)
                  this.userService.Update(this.user).then(
                    res => {
                      console.log(this.user)
                      console.log('Nguoi dung da mua goi adv ' + advertisement.id + ' thanh cong')
                      this.remainService.findById(this.user.id.toString()).then(
                        res => {

                          let remain: Remain = res as Remain

                          remain.idAdv = advertisement.id
                          remain.remaining = advertisement.quantityNews.toString()
                          let createdEnd = new Date()
                          createdEnd.setDate(createdEnd.getDate() + 30)
                          remain.createdend = formatDate(createdEnd, 'dd/MM/yyyy', 'en-US');

                          this.remainService.Update(remain).then(
                            res => {
                              
                              this.show("Success", "Successful transaction !")
                              setTimeout(() => {
                                this.router.navigate(['/information/home']);
                              }, 3000); // 5000 milliseconds = 5 seconds
                            }, err => {
                              console.log("loi 2")
                            }
                          )
                        }, err => {
                          console.log("Khong tim thay Id")
                        }
                      )
                    }, err => {
                      console.log("Loi 1")
                    }
                  )
                } else if (this.user.advertisement.price < Number(advertisement.price)) {
                  this.user.advertisementId = Number(advertisement.id)
                  this.userService.Update(this.user).then(
                    res => {

                      this.remainService.findById(this.user.id.toString()).then(
                        res => {
                          console.log(res)
                          let remain: Remain = res as Remain

                          let createdEnd = new Date()
                          createdEnd.setDate(createdEnd.getDate() + 30)
                          remain.createdend = formatDate(createdEnd, 'dd/MM/yyyy', 'en-US');

                          remain.idAdv = advertisement.id
                          remain.remaining = advertisement.quantityNews.toString()
                          console.log(remain)
                          this.remainService.Update(remain).then(
                            res => {

                              this.show("Success", "Successful transaction !")
                              setTimeout(() => {
                                this.router.navigate(['/information/home']);
                              }, 3000); // 5000 milliseconds = 5 seconds
                            }, err => {
                              console.log(err)
                            }
                          )
                        }, err => {
                          console.log("Khong tim thay Id")
                        }
                      )
                    }, err => {
                      console.log("Loi 1")
                    }
                  )
                } else {
                  this.error("Faild", "Cannot buy lower package !")
                }
              });
            }).catch(err => {
              this.ngZone.run(() => {
                this.error("Failed", "Transaction failed: " + err.message);
              });
            });
          }
        }).render(`#paypal-button-container-${index}`);
      });
    });
  }

}
