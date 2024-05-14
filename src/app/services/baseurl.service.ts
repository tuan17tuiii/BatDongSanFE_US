import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})//su dung injection

export class BaseUrlService  {
   public BaseUrl : string = 'https://localhost:7195/'
}