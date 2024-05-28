import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProvinceAPIService } from "./services/provinceapi.service";
import { Province } from './entities/province.entities';
import { error } from 'console';
import { HttpClient } from "@angular/common/http";
import { District } from './entities/district.entities';
import { Ward } from './entities/ward.entities';
import { TypeRealState } from './entities/typerealstate.entities';
import { TypeRealStateAPIService } from './services/typerealstate.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators   } from '@angular/forms';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule],
  providers: [ConfirmationService, MessageService],


  templateUrl: './selectadv.component.html',
  styleUrl:'../assets/css/selectadv.css'


})
export class SelectadvComponent implements OnInit {


  ngOnInit(): void {//khi nhan ve thì là nhận về chuỗi hết nên phải khai báo chuỗi k là lỗi
   
      
  }}
