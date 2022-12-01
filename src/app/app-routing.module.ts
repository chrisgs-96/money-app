import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesManagementComponent } from './pages/categories-management/categories-management.component';
import { AuthGuard } from './guardians/AuthGuard';
import { BlockWhenLoggedGuard } from './guardians/BlockWhenLoggedGuard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewTransactionComponent } from './pages/new-transaction/new-transaction.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { TransactionsSummaryComponent } from './pages/transactions-summary/transactions-summary.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [BlockWhenLoggedGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [BlockWhenLoggedGuard],
  },
  { path: 'add', component: NewTransactionComponent, canActivate: [AuthGuard] },
  {
    path: 'history',
    component: TransactionsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'summary',
    component: TransactionsSummaryComponent,
    canActivate: [AuthGuard],
  },
  { path: '*', component: TransactionsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
