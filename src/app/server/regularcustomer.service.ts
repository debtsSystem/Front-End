import { Injectable } from '@angular/core';
import { RegularCustomer } from '../models/regularcustomer.model';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegularcustomerService {

  constructor(private http: HttpClient) { }

  getRegCustomer(): Observable<RegularCustomer[]> {
    const apiUrl = 'https://localhost:7229/api/RegularCustomer/GetAllRegularCustomer';
    return this.http.get<RegularCustomer[]>(apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching customers:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
