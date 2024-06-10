import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProvinceAPIService } from "../services/provinceapi.service";
import { Province } from '../entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from '../entities/district.entities';
import { Ward } from '../entities/ward.entities';
import { TypeRealState } from '../entities/typerealstate.entities';
import { TypeRealStateAPIService } from '../services/typerealstate.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealStateAPIService } from '../services/realstate.service';
import { RealState } from '../entities/realstate.entities';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
import { RippleModule } from 'primeng/ripple';
import { LayoutComponent } from '../Layout.component';
import { UserServices } from '../services/User.Services';
import { User } from '../entities/User.entities';
import { ImageRealStateAPIService } from '../services/image.service';
import { CommonModule } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConfirmDialogModule, ConfirmPopupModule,RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule, CommonModule],
  providers: [ConfirmationService, MessageService],


  templateUrl: './inforformrgs.component.html',
  styleUrls: ['../../assets/css/style_tt.css', '../../assets/css/styleblogupstory.css']


})
export class InforformrgsComponent implements OnInit {

  constructor(private imgservices: ImageRealStateAPIService, private router: Router, private userServices: UserServices, private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  filesall: File[] = []
  files: File[] = []
  file1: File
  file2: File
  file3: File
  images1: any=null
  images2: any=null
  images3: any=null
  images: string[] = []
  infoForm: FormGroup;
  user: User;

  ngOnInit(): void {//khi nhan ve thì là nhận về chuỗi hết nên phải khai báo chuỗi k là lỗi
    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userServices.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            let user: User = res as User;
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
              images1:this.images1,
              images2:this.images2,
               images3:this.images3
            });
          };
        },
        err => {
          console.log(err);
        }
      );
    }

  }
  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 300000 });
            this.Save();
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}
  Save() {

    if (this.file1 != null && this.file2 != null && this.file3 != null) {
      let user: User = this.infoForm.value as User;

      this.filesall.push(this.file1)
      this.filesall.push(this.file2)
      this.filesall.push(this.file3)
      if (this.files != null) {
        for (let i = 0; i < this.files.length; i++) {
          this.filesall.push(this.files[i])
        }
      }
      let avartarurl = user.avatar;
      // let avatar = avartarurl.lastIndexOf('/');
      // user.avatar = avartarurl.slice(avatar + 1);
      user.statusUpdate = true;
      console.log(user)
      console.log(this.filesall)
      console.log(this.file1 + "toi ress nef")

      this.userServices.Update(user).then(
        res => {
          console.log(res)


          let formData = new FormData();//tao form data

          for (let i = 0; i < this.filesall.length; i++) {
            formData.append('files', this.filesall[i]);
            formData.append('id', (user.id).toString())
            formData.append('dataname', 'user')
          }

          this.imgservices.uploads(formData).then(
            ress => {
              this.router.navigate(['/information/home'])
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Success', key: 'bl', life: 1500 });
            },
            errr => {
              console.log(errr + "img")
            })
        },
        err => {
          console.log(err)
        }

      )

    }
  }
  selectFiles1(event: any): void {
    const input = event.target;
    this.file1 = event.target.files[0];
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images1 = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  selectFiles2(event: any): void {
    this.file2 = event.target.files[0];
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images2 = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  selectFiles3(event: any): void {
    const input = event.target;
    this.file3 = event.target.files[0];
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images3 = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  selectFiles(event: any): void {
    this.images = [];
    const files = event.target.files as FileList;
    if (files) {
      this.files = Array.from(files); // Chuyển đổi FileList thành một mảng các đối tượng File
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.images.push(e.target.result as string); // Thêm dữ liệu hình ảnh vào mảng images
        };

        reader.readAsDataURL(file); // Đọc tệp hình ảnh

        // Cập nhật chuỗi tên tệp

      }
    }
  }
  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.files.splice(index, 1);
  }
}
