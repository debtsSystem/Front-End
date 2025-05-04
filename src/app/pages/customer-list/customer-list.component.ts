import { CustomerService } from '../../server/customer.service';
import { Customer } from '../../models/customer.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms'; // ייבוא של FormsModule
import { ButtonModule } from 'primeng/button';
// Add these to your existing imports if not already present
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-customer-list',
  imports: [ ButtonModule,  HttpClientModule, FormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
  providers: [HttpClient],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  standalone: true,
})

export class CustomerListComponent implements OnInit {

  customers!: Customer[];

  // representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  // activityValues: number[] = [0, 100];

  constructor(private customerService: CustomerService) {}

  // ngOnInit() {
  //   this.customerService.getCustomer().subscribe((customers) => {
  //     this.customers = customers;
  //     this.loading = false;

  // });
  // }
  ngOnInit() {
    this.loading = true; // מתחילים בטעינה
this.customerService.getCustomer().subscribe({
        next: (customers) => {
            this.customers = customers;
            this.loading = false; // מסיימים את מצב הטעינה
        },
        error: (err) => {
            console.error('שגיאה בטעינת לקוחות', err);
            this.loading = false; // מסיימים את מצב הטעינה במקרה של שגיאה
        }
    });
}


    // this.customerService.getCustomer().subscribe(data => {
    //   this.customers = data;
    //   console.log(this.customers); // ודא שהלקוחות נטענים
    //   this.loading = false;
    // });
    // console.log(this.customers);

       
      // this.representatives = [
      //     { name: 'Amy Elsner', image: 'amyelsner.png' },
      //     { name: 'Anna Fali', image: 'annafali.png' },
      //     { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      //     { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      //     { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      //     { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      //     { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      //     { name: 'Onyama Limba', image: 'onyamalimba.png' },
      //     { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      //     { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
      // ];

      // this.statuses = [
      //     { label: 'Unqualified', value: 'unqualified' },
      //     { label: 'Qualified', value: 'qualified' },
      //     { label: 'New', value: 'new' },
      //     { label: 'Negotiation', value: 'negotiation' },
      //     { label: 'Renewal', value: 'renewal' },
      //     { label: 'Proposal', value: 'proposal' }
      // ];
  

  clear(table: Table) {
      table.clear();
  }

  // getSeverity(status: string) {
  //     switch (status) {
  //         case 'unqualified':
  //             return 'danger';

  //         case 'qualified':
  //             return 'success';

  //         case 'new':
  //             return 'info';

  //         case 'negotiation':
  //             return 'warn';

  //         case 'renewal':
  //             return null;
  //     }
  // }
}

  

