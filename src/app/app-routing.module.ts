import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';

const routes: Routes = [
  { path: '', component: TransactionsPageComponent },
  { path: '*', component: TransactionsPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
