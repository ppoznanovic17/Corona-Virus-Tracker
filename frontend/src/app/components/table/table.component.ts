import { Component, OnInit } from '@angular/core';
import {TableModel} from '../../models/TableModel';
import {TableServiceService} from '../../service/table-service.service';
import {BlicModel} from '../../models/BlicModel';
import {BlicServiceService} from '../../service/blic-service.service';
import {iterator} from 'rxjs/internal-compatibility';
import {element} from "protractor";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private blicSize = 21
  private currentPage = 1
  private limit = 3
  private iterator = this.blicSize/this.limit
  private iteratorList: Iterator[] = new Array()

  private seeMoreBool = false


  private mostCases: TableModel[]
  private blic: BlicModel[]

  private interval

  constructor(private service: TableServiceService,
              private blicservice: BlicServiceService) { }

  ngOnInit() {
    this.do()
      this.refresh()
    this.getBlic(this.currentPage,this.limit)

    this.interval = setInterval(() => {this.slider()}, 10000)

  }

  refresh() {
    this.getMostCases()

  }

  seeMore() {
    this.service.getTopAll().subscribe(
      res =>{
        this.mostCases = res
        this.limit = 18
        this.currentPage = 1
        this.blicservice.getNews(1, this.limit).subscribe(
          res => {
            this.blic = res
            this.seeMoreBool = true
            clearInterval(this.interval)
          }, error => {
            console.log(error)
          }
        )
      }, error => {

      }
    )
  }

  seeLess() {
    this.service.getTop().subscribe(
      res =>{
        this.mostCases = res
        this.limit = 3
        this.currentPage = 1
        this.blicservice.getNews(this.currentPage, this.limit).subscribe(
          res => {
            this.blic = res
            this.seeMoreBool = false
            this.interval = setInterval(() => {this.slider()}, 10000)
          }, error => {
            console.log(error)
          }
        )
      }, error => {

      }
    )
  }


  getMostCases() {
    this.service.getTop().subscribe(
      res => {
        //console.log(res)
        this.mostCases = res
      },
      error => {
        console.log(error.toString())
      }
    )
  }

  getBlic(off, lim) {
    this.blicservice.getNews(off, lim).subscribe(
      res => {
        //console.log(res)
        this.blic = res
      },
      error => {
        console.log(error.toString())
      }
    )
  }




  formatText(text:String){
    if(text.length > 300 ) {
      return text.slice(0,300) + "..."
    }
    return text
  }

  decrease(){
    const div = document.getElementById(this.currentPage+'')

    if(this.currentPage > 1){
      this.currentPage--;
    }else {
      this.currentPage = 7
    }
    this.getBlic(this.currentPage, this.limit)
  }

  increase(){
    if(this.currentPage < 7){
      this.currentPage++;
    }
    else{
      this.currentPage = 1
    }
    this.getBlic(this.currentPage, this.limit)
  }

  setPage(x:number){
    this.currentPage = x
    this.getBlic(this.currentPage, this.limit)
}

  do(){
    for (let i = 0; i < this.iterator; i++) {
      this.iteratorList.push(new Iterator(i))
    }

  }

  slider(){
    if(this.currentPage < 5){
      this.currentPage++
    }else{
      this.currentPage = 1
    }

   this.getBlic(this.currentPage, this.limit)

  }
}

export class Iterator {
  private iterator:number

  constructor(iterator:number){
    this.iterator = iterator
  }

}
