import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from '../app.constants';
import {Live} from '../models/LiveModel';

@Injectable({
  providedIn: 'root'
})
export class LiveServiceService {

  private baseUrl= 'http://localhost:8000/'

  constructor(private http:HttpClient,
             ) {

  }

  getLiveData(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});


    return this.http.get<Live>(`${BASE_URL}live/`, {headers: headers})
  }

}
