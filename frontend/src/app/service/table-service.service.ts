import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Live} from '../models/LiveModel';
import {BASE_URL} from '../app.constants';
import { TableModel} from '../models/TableModel';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  private baseUrl= 'http://localhost:8000/'

  constructor(private http:HttpClient) { }








  getTopAll(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});


    return this.http.get<TableModel[]>(`${BASE_URL}cases/`, {headers: headers})
  }

  getTop () {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});


    return this.http.get<TableModel[]>(`${BASE_URL}cases10/`, {headers: headers})
  }



}
