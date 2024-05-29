import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './Layout.component';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule],
  providers: [MessageService],
  templateUrl: './infordetails.component.html',

})
export class InfordetailsComponent implements OnInit {

  constructor(private router: Router, private layoutComponent: LayoutComponent, private userServices: UserServices, private formBuilder: FormBuilder, private messageService: MessageService) { }

  infoForm: FormGroup;
  user: User;

  ngOnInit(): void {
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userServices.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            let user: User = res as User;
            this.infoForm = this.formBuilder.group({
              id: user.id,
              username: user.username,
              name: [user.name, [Validators.required]],
              email: [user.email, [Validators.required]],
              phone: [user.phone, [Validators.required]],
              roleId: user.roleId,
              password: user.password,
              status: user.status,
              securityCode: user.securityCode,
              advertisementId: user.advertisement_id
            });
          };
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  Save() {
    let user: User = this.infoForm.value as User;

    this.userServices.Update(user).then(
      res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Success', key: 'bl', life: 1500 });
      },
      err => {
        console.log(err);
      }
    );
  }
}

