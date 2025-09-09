import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import * as XLSX from 'xlsx'; // ייבוא הספרייה
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SalesService } from '../../server/sales.service';
import { CustomerService } from '../../server/customer.service';
import { PaymentService } from '../../server/payment.service';

import { Sales } from '../../models/sales.model';
import { Customer } from '../../models/customer.model';
import { Payment } from '../../models/payment.model';
import { Debts } from '../../models/debts.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DebtsService } from '../../server/debts.service';
@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    ToggleButtonModule,
    ToastModule,
    RippleModule,
    TableModule,
    TagModule
  ],
  providers: [MessageService]
})
export class DebtsListComponent implements OnInit, OnChanges {
  @ViewChild('dt') dt!: Table;
  @ViewChild('debtForm') debtForm!: NgForm;
  @Input() selectedSale: Sales | null = null;
  isNavigatedFromNavbar: boolean = false;

  displayDialog: boolean = false;

  debt: Debts = {
    debtsId: 0,
    customerId: 0,
    sumOfDebts: 0,
    saleId: 0,
    isPaid: false,
    date: new Date(),
    nots: '',
    paymentType: 0
  };
  selectedSaleObject: Sales | null = null;

  customers: Customer[] = [];
  sales: Sales[] = [];
  paymentTypes: Payment[] = [];
  loading: boolean = false;
  submitting: boolean = false;

  filteredDebts: Debts[] = [];
  allDebts: any[] = [];
  searchTerm: string = '';
  selectedStatus: string | null = null;
  dateRange: Date[] | null = null;
  statusOptions = [
    { label: 'הכל', value: null },
    { label: 'שולם', value: 'paid' },
    { label: 'לא שולם', value: 'unpaid' }
  ];

  // משתני סיכום
  totalDebtsAmount: number = 0;
  paidDebtsAmount: number = 0;
  unpaidDebtsAmount: number = 0;


  constructor(
    private salesService: SalesService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private debtService: DebtsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.isNavigatedFromNavbar = this.router.url.includes('/navbar/debts');
    // אולי
    // 
    // if (this.isNavigatedFromNavbar) {
    //   this.selectedSale = null;
    // }

    if (this.isNavigatedFromNavbar) {
      this.loadAllDebts();
    }

    // this.loadCustomers();
    // if (this.selectedSale) {
    //   this.selectedSaleObject = this.selectedSale;
    //   this.debt.saleId = this.selectedSale.saleId;
    // }
    // else
    //     this.loadSales();
    // this.loadPaymentTypes();
  }
  ngOnChanges(changes: SimpleChanges) {
    // בדוק אם selectedSale השתנה
    if (changes['selectedSale'] && changes['selectedSale'].currentValue) {
      const sale = changes['selectedSale'].currentValue;
      this.selectedSaleObject = sale;

      // עדכן את הטופס עם נתוני המכירה
      this.debt.saleId = sale.saleId;

      // אם הדיאלוג לא פתוח, פתח אותו
      if (!this.displayDialog) {
        this.displayDialog = true;
      }

      console.log('Selected sale changed:', sale);
    }
  }

  loadAllDebts() {
    debugger
    this.loading = true;
    this.debtService.getDebts().subscribe({
      next: (data) => {
        this.allDebts = data;
        this.filteredDebts = this.allDebts
        this.calculateSummary();
        this.loading = false;
        console.log('Debts loaded:', this.allDebts);
      },
      error: (err) => {
        console.error('שגיאה בטעינת חובות', err);
        this.loading = false;
      }
    });
  }
  
  calculateSummary() {
    this.totalDebtsAmount = this.allDebts.reduce((sum, debt) => sum + debt.sumOfDebts, 0);
    this.paidDebtsAmount = this.allDebts
      .filter(debt => debt.isPaid)
      .reduce((sum, debt) => sum + debt.sumOfDebts, 0);
    this.unpaidDebtsAmount = this.totalDebtsAmount - this.paidDebtsAmount;
  }
/////////////////////////////////
  // פונקציות סינון
  ////לא 100%
  applyFilterGlobal(event: any) {
    const value = event.target.value;
     this.dt.filterGlobal(value, 'contains');
  }
/////////////////////////////////
// ניקוי סינון
  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = null;
    this.dateRange = null;
    this.dt.reset();
    this.loadAllDebts();
  }
/////////////////////////////
//////////סינון לפי סטטוס
  filterByStatus() {  
    if (!this.selectedStatus) {
      this.loadAllDebts();
    }
  else{
    const isPaid = this.selectedStatus === 'paid';
    this.allDebts = this.filteredDebts.filter(debt => debt.isPaid === isPaid);
  }
   
   
  }

  filterByDateRange() {
    debugger
    if (!this.dateRange || this.dateRange.length !== 2) {
      return;
    }

    const startDate = this.dateRange[0];
    const endDate = this.dateRange[1];

    this.loadAllDebts(); // טען מחדש את כל הנתונים

    // סנן לפי טווח תאריכים
    this.allDebts = this.allDebts.filter(debt => {
      const debtDate = new Date(debt.date);
      return debtDate >= startDate && debtDate <= endDate;
    });
  }
  loadCustomers() {
    this.loading = true;
    this.customerService.getCustomer().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('שגיאה בטעינת לקוחות', err);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן לטעון את רשימת הלקוחות',
          life: 5000
        });
        this.loading = false;
      }
    });
  }

  loadSales() {
    this.loading = true;
    this.salesService.getSales().subscribe({
      next: (data) => {
        this.sales = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('שגיאה בטעינת מכירות', err);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן לטעון את רשימת המכירות',
          life: 5000
        });
        this.loading = false;
      }
    });
  }

  loadPaymentTypes() {
    this.loading = true;
    this.paymentService.getPayment().subscribe({
      next: (data) => {
        this.paymentTypes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('שגיאה בטעינת סוגי תשלום', err);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן לטעון את סוגי התשלום',
          life: 5000
        });
        this.loading = false;
      }
    });
  }

  saveDebt() {
    if (!this.debtForm.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'שגיאת אימות',
        detail: 'אנא מלא את כל השדות הנדרשים',
        life: 5000
      });
      return;
    }

    this.submitting = true;

    // כאן תוכל להוסיף קריאה לשירות שישמור את החוב במסד הנתונים

    // לדוגמה: this.debtService.saveDebt(this.debt).subscribe(...)

    // לצורך הדגמה, נדמה שמירה מוצלחת
    //   setTimeout(() => {
    //     this.submitting = false;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'נשמר בהצלחה',
    //       detail: 'החוב נשמר בהצלחה במערכת',
    //       life: 3000
    //     });

    //     console.log('החוב שנשמר:', this.debt);
    //     this.resetForm();
    //   }, 1500);
  }

  resetForm() {
    this.debt = {
      debtsId: 0,
      customerId: 0,
      sumOfDebts: 0,
      saleId: 0,
      isPaid: false,
      date: new Date(),
      nots: '',
      paymentType: 0
    };

    if (this.debtForm) {
      this.debtForm.resetForm(this.debt);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'טופס אופס',
      detail: 'הטופס אופס בהצלחה',
      life: 3000
    });
  }

  // מחזיר את שם הלקוח לפי מזהה
  getCustomerName(customerId: number): string {
    const customer = this.customers.find(c => c.costomerId === customerId);
    return customer ? customer.customerName : 'לא ידוע';
  }

  // מחזיר את שם המכירה לפי מזהה
  // getSaleName(saleId: number): string {
  //   const sale = this.sales.find(s => s.saleId === saleId);
  //   return sale ? sale.saleName : 'לא ידוע';
  // }

  // מחזיר את שם סוג התשלום לפי קוד
  getPaymentTypeName(paymentTypeCode: number): string {
    const paymentType = this.paymentTypes.find(p => p.code === paymentTypeCode);
    return paymentType ? paymentType.type : 'לא ידוע';
  }

  openDialog(sale?: Sales) {
    if (sale) {
      this.selectedSale = sale;
      // עדכן את הטופס עם נתוני המכירה
      this.debt.saleId = sale.saleId;
      // אפשר גם להגדיר ערכי ברירת מחדל נוספים כאן
    }

    this.displayDialog = true;
    console.log('Dialog opened with sale:', this.selectedSale);
  }
  // פונקציות נוספות לטבלת החובות
applyFilterColumn(event: any, field: string) {
  debugger
  // הפעל סינון לפי עמודה ספציפית
  const value = event.target?.value || event.value;
  this.dt.filter(value, field, 'contains');
}

editDebt(debt: any) {
  // פתח דיאלוג לעריכת חוב
  console.log('עריכת חוב:', debt);
}

markAsPaid(debt: any) {
  // סמן חוב כשולם
  console.log('סימון חוב כשולם:', debt);
  debt.isPaid = true;
  // עדכן בשרת
  // this.debtService.updateDebt(debt).subscribe(...);
  this.calculateSummary();
}

deleteDebt(debt: any) {
  // מחק חוב
  console.log('מחיקת חוב:', debt);
  // אישור מחיקה
  if (confirm('האם אתה בטוח שברצונך למחוק חוב זה?')) {
    // מחק מהמערך המקומי
    this.allDebts = this.allDebts.filter(d => d.debtId !== debt.debtId);
    // מחק בשרת
    // this.debtService.deleteDebt(debt.debtId).subscribe(...);
    this.calculateSummary();
  }
}
exportToExcel() {
  // הכנת הנתונים לייצוא
  const exportData = this.allDebts.map(debt => {
    return {
      'מספר חוב': debt.debtId,
      'שם לקוח': debt.customerName,
      'שם מכירה': debt.saleName,
      'סכום החוב': debt.sumOfDebt,
      'תאריך': this.formatDate(debt.date),
      'סטטוס': debt.isPaid ? 'שולם' : 'לא שולם'
    };
  });
  
  // הוספת שורת סיכום
  exportData.push({
    'מספר חוב': '',
    'שם לקוח': '',
    'שם מכירה': '',
    'סכום החוב': this.totalDebtsAmount,
    'תאריך': '',
    'סטטוס': 'סה"כ'
  });
  
  // יצירת גיליון עבודה
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  
  // התאמת רוחב העמודות
  const columnWidths = [
    { wch: 10 }, // מספר חוב
    { wch: 20 }, // שם לקוח
    { wch: 20 }, // שם מכירה
    { wch: 15 }, // סכום החוב
    { wch: 15 }, // תאריך
    { wch: 10 }  // סטטוס
  ];
  
  worksheet['!cols'] = columnWidths;
  
  // יצירת חוברת עבודה
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'דוח חובות');
  
  // הורדת הקובץ
  const fileName = `דוח_חובות_${this.formatDateForFileName(new Date())}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

// פונקציה לפורמט תאריך לתצוגה
formatDate(date: Date): string {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

// פונקציה לפורמט תאריך לשם קובץ
formatDateForFileName(date: Date): string {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}_${(d.getMonth() + 1).toString().padStart(2, '0')}_${d.getFullYear()}`;
}


}
