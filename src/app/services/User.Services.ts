import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseurl.service";
import { User } from "../entities/User.entities";


@Injectable({
    providedIn: 'root'
})

export class UserServices{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }

    async FindAll(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAll'));
    }

    async FindAllAdmin(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAllAdmin'));
    }

    async FindAllUser(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAllUser'));
    }

    async Register(account: User){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/Register', account));
    }

    async LoginAdmin(account: User){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/loginAdmin', account));
    }

    async LoginUser(account: User){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/loginUser', account));
    }

    async Verify(securityCode: string, username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/Verify/' + securityCode + '/' + username));
    }

    async findByUsername(username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findByUsername/' + username));
    }

    async findById(id: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findById/' + id));
    }

    async AccountExists(username: string, email:string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/Exists/' + username + '/' + email));
    }

    async Update(user: User){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'account/Update', user));
    }

    async ChangePass(password: string, username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/ChangePass/' + password + '/' + username));
    }

    async PasswordVerify(password: string, username: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/PasswordVerify/' + password + '/' + username));
    }
    
    async Delete(id: number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'account/Delete/' + id));
    }
}