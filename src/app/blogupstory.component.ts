import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router, RouterOutlet } from '@angular/router';
import { ProvinceAPIService } from "./services/provinceapi.service";
import { Province } from './entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from './entities/district.entities';
import { Ward } from './entities/ward.entities';
import { TypeRealState } from './entities/typerealstate.entities';
import { TypeRealStateAPIService } from './services/typerealstate.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
import { ImageRealStateAPIService } from './services/image.service';
import { CommonModule, formatDate } from '@angular/common';
import { eventNames } from 'process';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    DragDropModule,
    CommonModule
  ],

  providers: [ConfirmationService, MessageService],
  templateUrl: 'blogupstory.component.html',
  styleUrl: '../assets/css/styleblogupstory.css'

})
export class BlogupstoryComponent implements OnInit {
  selectedTab: string = "rent" // Set mặc định cho tab "Cho thuê"

  newrealstate: number
  files: File[]
  fileNames: string[] = []
  province: any
  district: any
  ward: any
  type: any
  formGroup: FormGroup
  id: string
  msg: string
  typerealstates: TypeRealState[]
  wards: Ward[]
  provinces: Province[]
  districts: District[]
  images: string[] = []
  user: User
  constructor(
    private formBuilder: FormBuilder,
    private provinceService: ProvinceAPIService,
    private realstateService: RealStateAPIService,
    private http: HttpClient,
    private typeRealStateService: TypeRealStateAPIService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private router: Router,
    private imageService: ImageRealStateAPIService,
    private userService: UserServices
  ) { }
  ngOnInit(): void {

    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      this.userService.findByUsername(sessionStorage.getItem('username')).then(
        res => {
          if (res) {
            this.user = res as User
          }
        }
      )
    }else{
      
    }

    this.formGroup = this.formBuilder.group({
      title: '',

      bathrooms: ['', [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('^[0-9]+$')
      ]],
      bedrooms: ['', [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('^[0-9]+$')
      ]],
      describe: '',
      price: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(0),
      ]],
      acreage: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],

    })

    this.provinceService.findAll().then(
      res => {
        this.provinces = res['results'] as Province[];

      },
      error => {
        console.log(error)
      }
    )
    this.typeRealStateService.findAll().then(
      res => {
        this.typerealstates = res as TypeRealState[]

      },
      error => {
        console.log(error)
      }

    )

  }
  selectTab(tab: string): void {

    this.selectedTab = tab;
    console.log(this.selectedTab);
  }

  find_districts(evt: any) {
    var district_id = evt.target.value;
    this.id = district_id
    this.provinceService.find_Name_Province(this.id).then(
      res => {
        this.province = res as Province[];
      }
    )
    this.provinceService.findDistrict(district_id).then(
      res => {
        this.districts = res['results'] as District[];

      },
      error => {
        console.log(error)
      }
    )
  }
  find_ward(evt: any) {
    var ward_id = evt.target.value;

    this.provinceService.find_Name_District(this.districts, ward_id).then(
      res => {
        this.district = res as District

      }, error => {
        console.log(error)
      }
    )

    this.provinceService.findWard(ward_id).then(
      res => {
        this.wards = res['results'] as Ward[];

      },
      error => {
        console.log(error)
      }
    )
  }
  find_Name_Ward(evt: any) {
    this.ward = evt.target.value;
  }
  selectType(evt: any) {
    this.type = evt.target.value;
  }
  selectFiles(event: any) {
    if (this.files == null) {
        // Nếu mảng files chưa được khởi tạo
        const selectedFiles: File[] = Array.from(event.target.files) as File[]; // Chuyển FileList thành mảng File[]
        this.files = selectedFiles; // Gán mảng vào this.files
        if (this.files.length >= 4) {
            this.error("Faild", "Please choose 4 photos");
        } else {
            for (let i = 0; i < this.files.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.images.push(reader.result as string);
                };
                reader.readAsDataURL(this.files[i]);
                this.fileNames[i] = this.files[i].name;
            }
        }
        console.log(this.files);
    } else {
        // Nếu mảng files đã được khởi tạo
        const selectedFiles: File[] = Array.from(event.target.files) as File[]; // Chuyển FileList thành mảng File[]
        if (this.files.length + selectedFiles.length > 4) {
            this.error("Faild", "You can only choose up to 4 photos");
        } else {
            for (const file of selectedFiles) {
                // Kiểm tra xem file có tồn tại trong mảng files không
                const existingFile = this.files.find(existingFile => existingFile.name === file.name);
                if (!existingFile) {
                    // Nếu file không tồn tại trong mảng files, thêm vào
                    this.files.push(file);
                    const reader = new FileReader();
                    reader.onload = () => {
                        this.images.push(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                    this.fileNames.push(file.name);
                }
            }
        }
        console.log(this.files);
    }
}



  save() {
    console.log(this.files.length)
    if (this.files.length > 0) {
      let realstate: RealState = this.formGroup.value as RealState;
      if (realstate.bathrooms.toString() == '' && realstate.bedrooms.toString() == '') {
        realstate.bathrooms = null
        realstate.bedrooms = null
      } else if (realstate.bathrooms.toString() == '') {
        realstate.bathrooms = null
      } else if (realstate.bedrooms.toString() == '') {
        realstate.bedrooms = null
      }
      realstate.sold = false //trang thai chua ban 
      realstate.expired = false // trang thai chua het han

      realstate.city = this.province[0].province_name
      realstate.region = this.district.district_name
      realstate.street = this.ward
      realstate.type = this.type
      realstate.status = false
      let createdAt =  new Date()
      realstate.createdAt = formatDate(createdAt, 'dd/MM/yyyy', 'en-US')
      
      let createdEnd = new Date()
      createdEnd.setDate(createdAt.getDate() + this.user.advertisement.quantityDates)
      realstate.createdEnd = formatDate(createdEnd, 'dd/MM/yyyy', 'en-US'); // định dạng ngày hôm nay


      realstate.transactionType = this.selectedTab
      realstate.usersellId = this.user.id.toString()
      console.log(realstate.title+"day la titiit")
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].size > 100000000) {
          this.error("Failed", "One or more files exceed the size limit of 15000 bytes.");
          return; // Ngăn chặn việc tiếp tục nếu có file lớn hơn 15000 byte
        }
      }
      if (this.files.length <= 4) {
        this.realstateService.create(realstate).then(
          res => {
            if (res['result']) {
              this.newrealstate = res['productId']
              console.log(this.newrealstate)
              let formData = new FormData();//tao form data
              for (let i = 0; i < this.files.length; i++) {
                formData.append('files', this.files[i]);
                formData.append('id', this.newrealstate.toString())
              }
              this.imageService.uploads(formData).then(
                res => {
                  this.fileNames = res['fileNames'];
                  this.show()
                  this.router.navigate([''])//quay ve trang home
                },
                err => {
                  this.error("Faild", "An error has occurred")
                }
              )
            } else {
              this.error("Faild", "Created Faild")
            }
          },
          error => {
            this.error("Faild", "Created Faild")
          }
        )
      } else {
        this.error("Faild", "Please choose 4 photos!")
      }
    } else {
      this.error("Faild", "No Image")
    }

  }
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Done',
      detail: 'Add Success',

    })
  }
  error(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }
  uploads() {
    let realstate: RealState = this.formGroup.value as RealState;
    realstate.createdAt = formatDate(new Date(), 'dd/MM/yyyy', 'en-US')
    console.log(realstate.createdAt)
    let result = new Date()
    console.log(result)
    result.setDate(result.getDate()+ 27)
    console.log(result)
    //realstate.createdEnd = formatDate(realstate.createdAt + 30, 'dd/MM/yyyy', 'en-US'); 
    //console.log(realstate.createdEnd)
  }
  removeImage(index: number) {
    this.images.splice(index, 1);
    this.files.splice(index, 1);
    this.fileNames.splice(index, 1);
    console.log(this.files);
  }
  onDrop(event: CdkDragDrop<string[]>) {

    if (!event.isPointerOverContainer) {
      // Người dùng chưa thả chuột, không cần cập nhật
      return;
    }

    // Kéo và thả từ vùng khác vào, cần cập nhật vị trí của các files, images và fileNames
    const filesCopy = [...this.files];
    moveItemInArray(filesCopy, event.previousIndex, event.currentIndex);
    this.files = filesCopy;

    const imagesCopy = [...this.images];
    moveItemInArray(imagesCopy, event.previousIndex, event.currentIndex);
    this.images = imagesCopy;

    const fileNamesCopy = [...this.fileNames];
    moveItemInArray(fileNamesCopy, event.previousIndex, event.currentIndex);
    this.fileNames = fileNamesCopy;

    console.log(this.files);
  }
}
