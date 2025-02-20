import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, PaymentListComponent]
})
export class AppComponent {
  title = 'debts-system';
}
