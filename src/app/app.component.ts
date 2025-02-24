import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './pages/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, PaymentListComponent, HttpClientModule, NavbarComponent]
})
export class AppComponent {
 
  title = 'debts-system';
}
