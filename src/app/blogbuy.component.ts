import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RealStateAPIService } from './services/realstate.service';
import { RealState } from './entities/realstate.entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: 'blogbuy.component.html',

})
export class BlogbuyComponent implements OnInit {
  realstates:RealState[]
  constructor(
    private realstatesv: RealStateAPIService

  ) {

  }
  ngOnInit(): void {
    this.realstatesv.findAll().then(
      res => { this.realstates=res as RealState[],
        console.log(this.realstates)
       }
      ,
      err => {
        console.log("kloi r ba oi")
      }
    )
  }
}
