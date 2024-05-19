import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseurl.service";
import { RealState } from "../entities/realstate.entities";

@Injectable({
    providedIn : 'root'
})
export class RealStateAPIService  {
    constructor(
     private httpClient : HttpClient,
     private baseUrlService : BaseUrlService,
    ){

    }
    async findAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findall'))
    }
    async create(realstate : RealState){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'realstate/create' , realstate))
       }
    
}