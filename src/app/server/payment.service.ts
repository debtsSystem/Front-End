import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  getPayment(): Observable<Payment[]> {
    let apiUrl = 'https://localhost:7229/api/Payment/GetAllPayment';
    const a = this.http.get<Payment[]>(apiUrl);
    debugger
    console.log(a);
    return a;
  }
  // getAllCustomer() {
  //   let url = 'https://localhost:7264/Api/Customer/GetAllCus';
  //   return this.httpClient.get<giveMan[]>(url);
  // }
 }