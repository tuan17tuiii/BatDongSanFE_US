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
    async searchfilter( key:string,address:string,pricemin:string,pricemax:string,areamin:string,areamax:string ){
      let string:string=""
        if(key!=null){
            string+="&key="+key
        }
        if(address!=null){
            string+="&address="+address
        }
        if(pricemin!=null){
            string+="&pricemin="+pricemin
        }if(pricemax!=null){
            string+="&pricemax="+pricemax
        }
        if(areamin!=null){
            string+="&areamin="+areamin
        }
        console.log(this.baseUrlService.BaseUrl +  'realstate/searchfilter?no=n'+string)
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/searchfilter?no=n'+string ))
    }
    async findById(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findById/'+ id))
    }  
    async findByCityRegion(city : string , region : string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findByCityRegion/'+ city + "/" + region))
    } 
    async findByUserSellTrue(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findByUserSellTrue/'+ id))
    } 
    async findByUserSellFalse(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findByUserSellFalse/'+ id))
    }   
      async findByUserSell(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/findByUserSell/'+ id))
    } 

    async MarkExpired(){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'realstate/expire',{}))
    }

    async totalById(id : number ){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl +  'realstate/totalById/'+ id))
    } 

    
}