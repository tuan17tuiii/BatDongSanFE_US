import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseurl.service";
import { User } from "../entities/User.entities";
import { News } from "../entities/News.entities";


@Injectable({
    providedIn: 'root'
})

export class NewsService{
    constructor(private baseUrlService: BaseUrlService, private httpClient: HttpClient){

    }
    async FindAllNews(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'news/findallNews'));
    }

    async Create(news: News){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'news/Create', news));
    }
    async Update(id: number){
        return lastValueFrom(this.httpClient.put (this.baseUrlService.BaseUrl + 'news/Delete/' + id,id));
    }
    async Delete(id: number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'news/Delete/' + id));
    }
}