import { Component } from '@angular/core';
import { RegularCustomer } from '../../models/regularcustomer.model';
import { RegularcustomerService } from '../../server/regularcustomer.service';

@Component({
  selector: 'app-regularcustomer-list',
  imports: [],
  templateUrl: './regularcustomer-list.component.html',
  styleUrl: './regularcustomer-list.component.css',
  standalone: true,  
})
export class RegularcustomerListComponent {
  
  constructor(private regularCustomerService: RegularcustomerService) {}

  regularcustomers!: RegularCustomer[];
  ngOnInit() {
    // this.loading = true; // מתחילים בטעינה
    this.regularCustomerService.getRegCustomer().subscribe({
        next: (regularcustomers) => {
            this.regularcustomers = regularcustomers;
            // this.loading = false; // מסיימים את מצב הטעינה
        },
        // error: (err) => {
        //     console.error('שגיאה בטעינת לקוחות', err);
        //     this.loading = false; // מסיימים את מצב הטעינה במקרה של שגיאה
        // }
    });
}

}
