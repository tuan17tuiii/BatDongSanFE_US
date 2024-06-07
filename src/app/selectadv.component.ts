import { Component, NgZone, OnInit, Inject, PLATFORM_ID, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
import { Advertisement } from './entities/advertisement.entities';
import { AdvertisementAPIService } from './services/advertisement.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { User } from './entities/User.entities';
import { UserServices } from './services/User.Services';
import { RemainService } from './services/remain.service';
import { Remain } from './entities/remain.entities';
import { error } from 'console';

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

  
  constructor(
    private advertisementService: AdvertisementAPIService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private userService: UserServices,
    private remainService: RemainService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userService.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            this.user = res as User
            console.log(this.user)
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
                this.user.advertisementId = Number(advertisement.id)
                console.log(this.user)
                this.userService.Update(this.user).then(
                  res => {
                    console.log('Nguoi dung da mua goi adv ' + advertisement.id + ' thanh cong')
                    this.remainService.findById(this.user.id.toString()).then(
                      res => {
                        console.log(res)
                        let remain : Remain = res as Remain
                        
                        remain.idAdv = advertisement.id
                        remain.remaining = advertisement.quantityNews.toString()
                        this.remainService.Update(remain).then(
                          res => {
                            console.log("Update remain thanh cong")
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

                alert('Transaction completed by ' + details.payer.name.given_name);
              });
            });
          }
        }).render(`#paypal-button-container-${index}`);
      });
    });
  }

}
