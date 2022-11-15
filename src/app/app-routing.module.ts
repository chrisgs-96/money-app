import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesManagementComponent } from './categories-management/categories-management.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionsSummaryComponent } from './transactions-summary/transactions-summary.component';

const routes: Routes = [
  { path: '', component: TransactionsPageComponent },
  { path: 'add', component: NewTransactionComponent },
  { path: 'categories', component: CategoriesManagementComponent},
  { path: 'summary', component: TransactionsSummaryComponent},
  { path: '*', component: TransactionsPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
