import { Component, OnInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  
})
export class PaypalButtonComponent implements OnInit {

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPaypalScript();
    }
  }

  loadPaypalScript() {
    const paypalClientId = "AcbVprLkjzuOtG-h1fqU8fH8RXhybsxGUT7-da5Rvrtmsk3EldV6UbI8KMP1y78KCEYNU_q1INSGUJXt";

    // Sử dụng NgZone để đảm bảo rằng hàm loadScript được gọi trong vùng chạy của Angular
    this.ngZone.runOutsideAngular(() => {
      // Tạo một thẻ script để load PayPal SDK
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`;
      script.onload = () => {
        // Hàm này được gọi khi script đã load thành công
        this.initializePaypalButtons();
      };
      script.onerror = (error) => {
        console.error('PayPal SDK could not be loaded.', error);
      };
      document.body.appendChild(script);
    });
  }

  initializePaypalButtons() {
    // Khởi tạo nút thanh toán PayPal khi SDK đã load thành công
    window['paypal'].Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: '5.00' // Giá trị thanh toán
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }
}
