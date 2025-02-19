import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaymentListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'debts-system';
}
