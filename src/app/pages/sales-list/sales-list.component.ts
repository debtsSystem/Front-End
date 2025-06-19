import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { SalesService, } from '../../server/sales.service';
import { Sales } from '../../models/sales.model';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { DebtsListComponent } from '../debts-list/debts-list.component';
import { DialogModule} from 'primeng/dialog';
@Component({
  selector: 'app-sales-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    DialogModule,
    MultiSelectModule,
    CustomerListComponent ,
    DebtsListComponent,
    
  ],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css',
  standalone: true,
})
export class SalesListComponent implements OnInit {
  // משתנה שקובע מה להציג - מכירות או לקוחות
  displayMode: 'sales' | 'customers' = 'sales';
  sales: Sales[] = [];
  selectedSales: Sales[] = [];
  selectedSale: Sales | null = null; // המכירה הנבחרת להוספת חוב
  searchTerm: string = '';
  loading: boolean = true;
  displayDebtsDialog: boolean = false;

  @ViewChild('dt') table!: Table;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.loadSalesData();
  }

  // פונקציה לטעינת נתוני המכירות
  loadSalesData() {
    if (this.displayMode === 'sales') {
      this.loading = true;
      this.salesService.getSales().subscribe({
        next: (data) => {
          this.sales = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('שגיאה בטעינת מכירות', err);
          this.loading = false;
        }
      });
    }
  }
  openAddDebtDialog(sale: Sales) {
    this.selectedSale = sale;
    this.displayDebtsDialog = true;
    console.log('Opening debt dialog for sale:', sale);
  }
  // פונקציה להחלפת התצוגה
  switchToSales() {
    this.displayMode = 'sales';
    this.loadSalesData();
  }

  switchToCustomers() {
    this.displayMode = 'customers';

  }

  onSelectionChange(event: any) {
    this.selectedSales = event;
  }
  openDebtsDialog(sale: Sales) {
    this.selectedSale = sale;
    this.displayDebtsDialog = true;
  }
  closeDebtsDialog() {
    this.displayDebtsDialog = false;
    this.selectedSale = null;
  }
  // פונקציה לסינון גלובלי
  applyFilterGlobal(event: any) {
    this.table.filterGlobal(event.target.value, 'contains');
  }

  // פונקציה לסינון לפי עמודה ספציפית
  applyFilterColumn(event: any, field: string) {
    this.table.filter(event.target.value, field, 'contains');
  }

  // פונקציה לאיפוס כל הסינונים
  clearFilters() {
    this.table.clear();
    this.searchTerm = '';
  }
}
