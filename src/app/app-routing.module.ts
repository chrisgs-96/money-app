import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesManagementComponent } from './categories-management/categories-management.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionsSummaryComponent } from './transactions-summary/transactions-summary.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'signup', component: SignupPageComponent},
  { path: 'add', component: NewTransactionComponent },
  { path: 'history', component: TransactionsPageComponent },
  { path: 'categories', component: CategoriesManagementComponent},
  { path: 'summary', component: TransactionsSummaryComponent},
  { path: '*', component: TransactionsPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
