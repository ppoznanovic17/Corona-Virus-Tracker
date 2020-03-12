import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TableModel} from '../models/TableModel';
import {BASE_URL} from '../app.constants';
import {BlicModel} from '../models/BlicModel';

@Injectable({
  providedIn: 'root'
})
export class BlicServiceService {

  constructor(private http: HttpClient) { }

  getNews (of, lim) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});


    return this.http.get<BlicModel[]>(`${BASE_URL}blic/offset=${of}&limit=${lim}/`, {headers: headers})
  }


}
