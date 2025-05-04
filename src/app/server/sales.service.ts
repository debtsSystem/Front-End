import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sales } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {


    constructor() { }
  
    getSales(): Observable<Sales[]> {
      // בהמשך זה יכול להיות API call אמיתי
      const sales: Sales[] = [
        { saleId: 1, saleName: 'Product A', eventTime: '2023-01-15'},
        { saleId: 2, saleName: 'Product B',eventTime: '2023-02-20' },
        { saleId: 3, saleName: 'Product C',  eventTime: '2023-03-25' },
        { saleId: 4, saleName: 'Product D',  eventTime: '2023-04-10' },
        { saleId: 5, saleName: 'Product E',  eventTime: '2023-05-05' },
      ];
      return of(sales);
    }
  }
  
  
  
  
