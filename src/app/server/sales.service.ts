import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sales } from '../models/sales.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {


    constructor(private http: HttpClient) { }
  
    getSales(): Observable<Sales[]> {
      let apiUrl = 'https://localhost:7229/api/Sales/GetAllSale';
      const a = this.http.get<Sales[]>(apiUrl);
      debugger
      console.log(a);
      return a;
    }
  }
  
  
  
  
