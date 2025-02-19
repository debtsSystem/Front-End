import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7229/api/Payment/GetAllPayment';

  constructor(private http: HttpClient) { }

  getPayment(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

