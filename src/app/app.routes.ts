import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DebtsListComponent } from './pages/debts-list/debts-list.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { RegularcustomerListComponent } from './pages/regularcustomer-list/regularcustomer-list.component';
import { SalesListComponent } from './pages/sales-list/sales-list.component';

export const routes: Routes = [{
  path: '', component: AppComponent,
  children: [
    {
      path: 'navbar', component: NavbarComponent,
      children: [
        {
          path: 'customers', component: CustomerListComponent
          // children: [
          //   { path: 'regularCustomer', component: RegularcustomerListComponent },
          //   { path: 'customer', component: CustomerListComponent },

          // ]
        },
        { path: "debts", component: DebtsListComponent },
        { path: "sales", component: SalesListComponent }

      ]
    }],
}];
