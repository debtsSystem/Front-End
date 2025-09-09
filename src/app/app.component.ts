import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ NavbarComponent,HttpClientModule,
    MatSlideToggleModule,RouterOutlet
  ]
})
export class AppComponent {
 
  title = 'debts-system';
}
