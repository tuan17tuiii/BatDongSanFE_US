import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
import { eventNames, title } from 'process';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { Remain } from './entities/remain.entities';
import { RemainService } from './services/remain.service';
import { Image } from './entities/image.entities';
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
    templateUrl: 'edit.component.html',
    styleUrl: '../assets/css/styleblogupstory.css'
})
export class EditComponent implements OnInit {
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
    realstate: RealState[]
    maximumnews: number
    remain: Remain

    iduser: string

    provincename : string
    districtname : string 
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
        private userService: UserServices,
        private remainService: RemainService,
        private activatedRoute: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(p => {
            this.iduser = p.get('id');
            this.realstateService.findById(Number(this.iduser)).then(
                res => {
                    let realstate: RealState = res as RealState;
                    this.provincename = realstate.city
                    this.districtname = realstate.region
                    console.log(realstate)
                    this.formGroup = this.formBuilder.group({
                        id: realstate.id,
                        acreage: [realstate.acreage, [
                            Validators.required,
                            Validators.pattern('^[0-9]+$')
                        ]] ,
                        
                        title: realstate.title,
                        describe: realstate.describe,
                        price: [realstate.price, [
                            Validators.required,
                            Validators.pattern('^[0-9]+$')
                        ]] ,
                        
                        bathrooms: 
                        [realstate.bathrooms, [
                            Validators.min(0),
                            Validators.max(100),
                            Validators.pattern('^[0-9]+$')
                        ]],
                        bedrooms: [realstate.bedrooms, [
                            Validators.min(0),
                            Validators.max(100),
                            Validators.pattern('^[0-9]+$')
                        ]],
                        type: realstate.type,
                        city: realstate.city,
                        street: realstate.street,
                        region: realstate.region,
                        status: realstate.status,
                        usersellId: realstate.usersellId,
                        transaction: realstate.transactionType,
                        sold: realstate.sold,
                        expired: realstate.expired,
                        createdEnd: realstate.createdEnd,
                        createdAt: realstate.createdAt,
                        statusupdate : realstate.statusupdate
                    })
                },
                err => {
                    this.msg = 'Faild'
                }
            )
        })
        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            this.userService.findByUsername(sessionStorage.getItem('username')).then(
                res => {
                    if (res) {
                        this.user = res as User
                        this.remainService.findById(this.user.id.toString()).then(
                            res => {
                                this.remain = res as Remain
                                console.log(this.remain)
                            }
                        )
                        this.realstateService.totalById(this.user.id).then(
                            res => {
                                this.realstate = res as RealState[]

                            }
                        )
                    }
                }
            )
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
            type: [''],
            id: [''],
            city: [''],
            region: [''],
            street: [''],
            status: [''],
            usersellId: [''],
            transaction: [''],
            sold: [''],
            expired: [''],
            createdEnd: [''],
            createdAt: [''],
            statusupdate : [''],
        })

        this.provinceService.findAll().then(
            res => {
                this.provinces = res['data'] as Province[]
                if(this.provincename!=null){
                    for(var i = 0 ; i < this.provinces.length ; i ++){
                        if(this.provinces[i].full_name == this.provincename){
                            this.provinceService.findDistrict(Number(this.provinces[i].id)).then(
                                res=>{
                                    console.log(res)
                                    this.districts = res['data'] as District[];
                                    if(this.districtname != null){
                                        for(var i = 0 ; i < this.districts.length; i++){
                                            if(this.districts[i].full_name==this.districtname){
                                                this.provinceService.findWard(Number(this.districts[i].id)).then(
                                                    res=>{
                                                        this.wards = res['data'] as Ward[]
                                                    }
                                                )
                                            }
                                        }
                                    }
                                }
                            )
                        }
                    }
                }else{
                    console.log("chua tim thay")
                }
                
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
    find_districts(evt: Event) {
        const target = evt.target as HTMLSelectElement;
        const selectedOption = target.options[target.selectedIndex];
        const provinceName = selectedOption.value;
        const provinceId = selectedOption.getAttribute('data-name');
        this.province = provinceName
        this.provinceService.findDistrict(Number(provinceId)).then(
            res => {
                this.districts = res['data'] as District[];
            },
            error => {
                console.log(error);
            }
        );
    }

    find_ward(evt: Event) {
        const target = evt.target as HTMLSelectElement;
        const selectedOption = target.options[target.selectedIndex];
        const districtName = selectedOption.value;
        const districtId = selectedOption.getAttribute('data-name');
        console.log('District ID:', districtId);
        console.log('District Name:', districtName);
        this.district = districtName

        this.provinceService.findWard(Number(districtId)).then(
            res => {
                this.wards = res['data'] as Ward[];
            },
            error => {
                console.log(error)
            }
        )
    }
    onWardChange(evt: any) {
        var wardName = evt.target.value;
        this.ward = wardName
    }

    selectType(evt: any) {
        this.type = evt.target.value;
    }
    selectFiles(event: any) {
        if (this.files == null) {
            // Nếu mảng files chưa được khởi tạo
            const selectedFiles: File[] = Array.from(event.target.files) as File[]; // Chuyển FileList thành mảng File[]
            this.files = selectedFiles; // Gán mảng vào this.files
            if (this.files.length > 6) {
                this.error("Faild", "Please choose 66 photos");
                this.files = null
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
            if (this.files.length + selectedFiles.length > 6) {
                this.error("Faild", "You can only choose up to 6 photos");
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
            realstate.sold = false //trang thai chua ban 
            realstate.transactionType = this.selectedTab
            if(realstate.status){
                realstate.statusupdate = true 
                realstate.status = false 
            }else{
                realstate.statusupdate = false 
            }

            this.realstateService.Update(realstate).then(
                res => {
                    console.log("Update thanh cong")
                    let formData = new FormData();//tao form data


                    for (let i = 0; i < this.files.length; i++) {
                        formData.append('files', this.files[i]);
                        formData.append('dataname', "realstate");
                        formData.append('id', this.iduser)
                    }
                    this.imageService.findByRealStateId(Number(realstate.id)).then(
                        res => {

                        }
                    )
                    this.imageService.findByRealStateId(Number(realstate.id)).then(
                        res => {
                            let filescu = res as Image[]
                            for (var i = 0; i < filescu.length; i++) {
                                this.imageService.delete(Number(filescu[i].id))
                            }
                            this.imageService.uploads(formData).then(
                                res => {
                                    console.log("Update image thanh cong")
                                    this.fileNames = res['fileNames'];
                                    this.show()
                                    setTimeout(() => {
                                        this.router.navigate(['/information/home']);
                                      }, 1000);
                                },
                                err => {
                                    this.error("Faild", "An error has occurred")
                                }
                            )
                        }
                    )


                }, err => {
                    console.log("Up date loi k thanh cong")
                }
            )
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
        console.log(realstate.createdEnd)
        console.log(realstate.createdAt)
    }
    removeImage(index: number) {
        this.images.splice(index, 1);
        this.files.splice(index, 1);
        this.fileNames.splice(index, 1);

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
