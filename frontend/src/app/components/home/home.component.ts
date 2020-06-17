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
    let str = '' + x
    let strWithCommas = ''
    let j=0
    for(let i = str.length-1; i>=0; i-- ){
      if(j%3 == 2){
        strWithCommas += str.charAt(i) + ','
      }else{
        strWithCommas += str.charAt(i)
      }
      j++
    }

    let helper = strWithCommas.split('').reverse().join('')
    if( helper.startsWith(',')){
      return helper.substring(1, helper.length)
    }
    return helper

  }

}
