import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../Layout.component';
import { UserServices } from '../services/User.Services';
import { User } from '../entities/User.entities';
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
  avatar: string;
  url: string;
  id: number;

  ngOnInit(): void {
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userServices.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            let user: User = res as User;
            this.id = user.id;
            this.avatar = user.avatar;
            console.log(this.avatar);
            this.infoForm = this.formBuilder.group({
              id: user.id,
              username: user.username,
              name: [user.name, [Validators.required]],
              email: [user.email, [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
              phone: [user.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
              roleId: user.roleId,
              password: user.password,
              status: user.status,
              securityCode: user.securityCode,
              advertisementId: user.advertisementId,
              avatar: user.avatar
            });
          };
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  SelectFile(Event: any) {
    const file: File = Event.target.files[0];
    this.Upload(file);
  }

  Upload(file: File) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', String(this.id));
    this.userServices.Upload(formData).then(
      res => {
        this.messageService.add({ severity: 'success', summary: 'Success !', detail: 'Update Avatar Success', key: 'tl', life: 2000 });
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  Save() {
    let user: User = this.infoForm.value as User;
    let avartarurl = user.avatar;
    let avatar = avartarurl.lastIndexOf('/');
    user.avatar = avartarurl.slice(avatar + 1);
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

