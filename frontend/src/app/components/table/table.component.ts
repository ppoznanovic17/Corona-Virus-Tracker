import { Component, OnInit } from '@angular/core';
import {TableModel} from '../../models/TableModel';
import {TableServiceService} from '../../service/table-service.service';
import {BlicModel} from '../../models/BlicModel';
import {BlicServiceService} from '../../service/blic-service.service';
import {iterator} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private blicSize = 15
  private currentPage = 1
  private limit = 3
  private iterator = this.blicSize/this.limit
  private iteratorList: Iterator[] = new Array()





  private distance: TableModel[]
  private mostCases: TableModel[]
  private blic: BlicModel[]

  constructor(private service: TableServiceService,
              private blicservice: BlicServiceService) { }

  ngOnInit() {
    this.do()
      this.refresh()
    this.getBlic(this.currentPage,this.limit)

  }

  refresh() {
    this.getDistance()
    this.getMostCases()

  }


  getDistance(){
    this.service.getNearSerbia().subscribe(
      res => {
        //console.log(res)
        this.distance = res
      },
      error => {
        console.log(error.toString())
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

  pom(x) {
    if(x==0){
      return ''
    }
    return x
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
    }
    this.getBlic(this.currentPage, this.limit)
  }

  increase(){
    if(this.currentPage < 5){
      this.currentPage++;
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

}

export class Iterator {
  private iterator:number

  constructor(iterator:number){
    this.iterator = iterator
  }

}
