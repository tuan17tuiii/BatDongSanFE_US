import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class ProvinceAPIService  {
    constructor(
     private httpClient : HttpClient
    ){

    }
    async findAll(){
        return lastValueFrom(this.httpClient.get('https://vapi.vnappmob.com/api/province'))
    }
    async findDistrict(id : number){
        return lastValueFrom(this.httpClient.get('https://vapi.vnappmob.com/api/province/district/' + id))
    }
    async findWard(id : number){
        return lastValueFrom(this.httpClient.get('https://vapi.vnappmob.com/api/province/ward/' + id))
    }
}