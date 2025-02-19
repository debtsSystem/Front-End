import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../server/payment.service/payment.service.component'; 
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-list',
  imports: [],
  standalone:true,
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  payment: Payment[] | undefined;

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getPayment().subscribe(data => {
      this.payment = data;
    });
  }

}

  
