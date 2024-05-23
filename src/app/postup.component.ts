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
import { CommonModule } from '@angular/common';
import { eventNames } from 'process';



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


  templateUrl: './postup.component.html',

})
export class PostUpComponent implements OnInit {
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
  vitribandau:any
  constructor(
    private formBuilder: FormBuilder,
    private provinceService: ProvinceAPIService,
    private realstateService: RealStateAPIService,
    private http: HttpClient,
    private typeRealStateService: TypeRealStateAPIService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private router: Router,
    private imageService: ImageRealStateAPIService
  ) { }
  ngOnInit(): void {//khi nhan ve thì là nhận về chuỗi hết nên phải khai báo chuỗi k là lỗi
    this.formGroup = this.formBuilder.group({
      title: '',
      bathrooms: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],
      bedrooms: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],
      describe: '',
      price: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
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
    this.files = event.target.files;
    for (let i = 0; i < this.files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
      reader.readAsDataURL(this.files[i]);
      this.fileNames[i] = this.files[i].name
    }
    console.log(this.files)
    
  }
  save() {

    let realstate: RealState = this.formGroup.value as RealState;
    realstate.city = this.province[0].province_name
    realstate.region = this.district.district_name
    realstate.street = this.ward
    realstate.type = this.type
    realstate.status = false

    this.realstateService.create(realstate).then(
      res => {
        if (res['result']) {
          this.show()
          this.newrealstate = res['productId']
          console.log(this.newrealstate)
          if (this.fileNames == null) {
            console.log("Not Found")
          } else {
            let formData = new FormData();
            for (let i = 0; i < this.files.length; i++) {
              formData.append('files', this.files[i]);
              
            }
            console.log(formData)
            formData.append('id',this.newrealstate.toString())
            this.imageService.uploads(formData).then(
              res => {

                this.fileNames = res['fileNames'];
                this.show()
                this.router.navigate([''])

              },
              err => {
                this.error()
              }
            )
          }

        } else {
          this.msg = 'Failed'
        }
      },
      error => {
        console.log(error)
      }
    )

  }
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Done',
      detail: 'Add Success',

    })
  }
  error() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error!',
      detail: 'Faild',

    })
  }
  uploads() {
    let formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
      
    }
    console.log(formData)
    formData.append('id','155')
    this.imageService.uploads(formData).then(
      res => {

        this.fileNames = res['fileNames'];
        this.show()
        

      },
      err => {
        this.error
      }
    )
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);

    // Swap file positions in the files array
    const filesArray = Array.from(this.files);
    const tempFile = filesArray[event.currentIndex];
    filesArray[event.currentIndex] = filesArray[event.previousIndex];
    filesArray[event.previousIndex] = tempFile;

    // Convert back to FileList
    const dataTransfer = new DataTransfer();
    filesArray.forEach(file => dataTransfer.items.add(file));
    this.files = Array.from(dataTransfer.files);
    console.log(this.files);
}



}

