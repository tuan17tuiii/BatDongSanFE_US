import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Province } from "../entities/province.entities";
import { District } from "../entities/district.entities";
import { Ward } from "../entities/ward.entities";

@Injectable({
  providedIn: 'root'
})
export class ProvinceAPIService {
  constructor(
    private httpClient: HttpClient,

  ) {

  }
  async findAll() {
    return lastValueFrom(this.httpClient.get('https://vapi.vnappmob.com/api/province'))
  }
  async findDistrict(id: number) {
    return lastValueFrom(this.httpClient.get('https://vapi.vnappmob.com/api/province/district/' + id))
  }
  async findWard(id: number) {
    return lastValueFrom(this.httpClient.get('https://vapi.vnappmob.com/api/province/ward/' + id))
  }
  async find_Name_Province(id: string) {
    let provinces: Province[]; // Định nghĩa biến provinces với kiểu Province[]
    try {
      const response: any = await this.findAll(); // Sử dụng kiểu any tạm thời cho response, sau đó sẽ ép kiểu thành đúng
      provinces = response.results as Province[]; // Ép kiểu response.results thành một mảng các đối tượng Province

      let abc = provinces.filter(province => {
        return province.province_id === id;
      });
      return abc;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async find_Name_District(districts : District[], id : string) {
    for(var i = 0 ; i < districts.length ; i ++){
      if(districts[i].district_id==id){
        return districts[i]
      }
    }
    return null ; 
  }
  


}