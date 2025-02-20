import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../server/payment.service/payment.service'; 
import { Payment } from '../../models/payment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  providers: [PaymentService],
  imports: [CommonModule],
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = []; // עדכון לשם המשתנה

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getPayment().subscribe(data => { // עדכון לשם השיטה
      this.payments = data;
    });
  }
}
