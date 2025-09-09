import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegularCustomer } from '../models/regularcustomer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://localhost:7229/api/Customers/';
  getCustomer(): Observable<Customer[]> {
   
    return this.http.get<Customer[]>(`${this.apiUrl}GetAllCustomers` ).pipe(
      catchError(error => {
        console.error('Error fetching customers:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
 
  // getCustomer(): Observable<Customer[]> {
  //     let apiUrl = 'https://localhost:7229/api/Payment/GetAllCustomer';
  //     const a = this.http.get<Customer[]>(apiUrl);
  //     debugger
  //     console.log(a);
  //     return a;
  //   }
    // getAllCustomer() {
  //   let url = 'https://localhost:7264/Api/Customer/GetAllCus';
  //   return this.httpClient.get<giveMan[]>(url);
  // }
}
