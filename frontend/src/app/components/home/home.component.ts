import { Component, OnInit } from '@angular/core';
import {LiveServiceService} from '../../service/live-service.service';
import {Live} from '../../models/LiveModel';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private live: Live = new Live()

  private allCasesString: String;


  constructor(private liveService: LiveServiceService) { }

  refresh () {
    this.liveService.getLiveData().subscribe(
      res => {
       // console.log(res)
        this.live = res
      },
      error => {
        console.log(error.toString())
      }
    )
  }

  ngOnInit() {
    this.refresh()
    setInterval(() => {this.refresh()}, 5000)

  }

  putComma(x:number){
    if( x > 1000) {
      let pom = x/1000
       let str = Math.floor(pom) + ','
      pom = x%1000
      if(pom < 10){
        str += '00' + pom
      }else if(pom < 100){
        str += '0' + pom
      }else{
        str += pom
      }
      return str

    }
    return x
  }

}
