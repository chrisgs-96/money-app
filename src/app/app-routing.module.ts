import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalsPageComponent } from './totals-page/totals-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';

const routes: Routes = [
  { path: '', component: TotalsPageComponent },
  { path: 'transactions', component: TransactionsPageComponent },
  { path: '*', component: TotalsPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
