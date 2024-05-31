import { Component, NgZone, OnInit, Inject, PLATFORM_ID, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
import { Advertisement } from './entities/advertisement.entities';
import { AdvertisementAPIService } from './services/advertisement.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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

  constructor(
    private advertisementService: AdvertisementAPIService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
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
    // PayPal buttons initialization has been moved to ngOnInit after advertisements are loaded.
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
                alert('Transaction completed by ' + details.payer.name.given_name);
              });
            });
          }
        }).render(`#paypal-button-container-${index}`);
      });
    });
  }
}
