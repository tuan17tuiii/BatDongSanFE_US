import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseurl.service";
import { Remain } from "../entities/remain.entities";
import { Transaction } from "../entities/transaction.entities";

@Injectable({
    providedIn: 'root'
})
export class TransactionService{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }
   
    async create(transaction : Transaction){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'transaction/create' , transaction))
    }
    
}