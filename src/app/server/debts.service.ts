import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { HttpClient } from '@angular/common/http';
import { Debts } from '../models/debts.model';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  constructor(private http: HttpClient) { }

    getDebts(): Observable<Debts[]> {
      let apiUrl =   'https://localhost:7229/api/Debts/GetAllDebts';
      const a = this.http.get<Debts[]>(apiUrl);
      debugger
      console.log(a);
      return a;
    }
}
