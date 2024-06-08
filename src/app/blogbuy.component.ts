import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';
import { BaseUrlService } from './services/baseurl.service';
import { ImageRealStateAPIService } from './services/image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: 'blogbuy.component.html',

})
export class BlogbuyComponent implements OnInit {
  realstates: RealState[];
  adv: string[]
  imgsvs: string;
  key: string = null
  city: string = null
  pricemin: string = null
  areamin: string = null
  pricemax: string = null
  areamax: string = null
  constructor(
    private realstatesv: RealStateAPIService,
    private imgsv: BaseUrlService,
    private imgsvv: ImageRealStateAPIService,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.imgsvs = this.imgsv.ImageUrl;
    this.activatedRoute.queryParamMap.subscribe(p => {
      console.log(p)
      console.log("day la p")
      if (p.get('key') != null) {
        this.key = p.get('key');
        console.log(p.get('key') + "day la tse tere");
      }
      if (p.get('city') != null) {
        this.city = p.get('city');
      }
      if (p.get('pricemin') != null) {
        this.pricemin = p.get('pricemin');
      }
      if (p.get('pricemax') != null) {
        this.pricemax = p.get('pricemax');
      }
      if (p.get('areamin') != null) {
        this.areamin = p.get('areamin');
      }
      if (p.get('areamax') != null) {
        this.areamax = p.get('areamax');
      }

      // Sau khi gán giá trị từ paramMap, thực hiện cuộc gọi hàm searchfilter
      this.performSearch();
    });
  }

  performSearch() {
    // Kiểm tra xem có bất kỳ tham số nào đã được truyền qua URL hay không
    if (this.key != null || this.city != null || this.pricemin != null || this.pricemax != null || this.areamin != null || this.areamax != null) {
      this.realstatesv.searchfilter(this.key, this.city, this.pricemin, this.pricemax, this.areamin, this.areamax).then(
        res => {
          this.realstates = res as RealState[]; // Gán mảng dữ liệu vào this.realstates
          console.log(this.realstates);
        },
        err => {
          console.log("Đã xảy ra lỗi khi tải dữ liệu", err);
        }
      );
    } else {
      // Nếu không có tham số nào, thực hiện cuộc gọi hàm findAll để lấy tất cả dữ liệu
      this.realstatesv.findAll().then(
        res => {
          this.realstates = res as RealState[]; // Gán mảng dữ liệu vào this.realstates
          console.log(this.realstates);
        },
        err => {
          console.log("Đã xảy ra lỗi khi tải dữ liệu", err);
        }
      );
    }
  }
  load() {
    console.log('Key:', this.key);
    console.log('City:', this.city);
    console.log('Min Price:', this.pricemin);
    console.log('Min Area:', this.areamin);
    console.log('Max Price:', this.pricemax);

  }
}
