import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseurl.service";
import { Remain } from "../entities/remain.entities";

@Injectable({
    providedIn: 'root'
})
export class RemainService{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }
    async Update(remain: Remain){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'remain/update', remain));
    }
    async create(remain : Remain){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'remain/create' , remain))
    }
    async findAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'remain/findall'))
    }
    async findById(id : string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'remain/findById/' + id))
    }
}