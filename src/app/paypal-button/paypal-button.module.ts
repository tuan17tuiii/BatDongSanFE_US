import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalButtonComponent } from './paypal-button.component';

@NgModule({
  declarations: [PaypalButtonComponent], // Thêm PaypalButtonComponent vào declarations
  imports: [
    CommonModule
  ],
  exports: [PaypalButtonComponent] // Export PaypalButtonComponent nếu cần
})
export class PaypalButtonModule { }
