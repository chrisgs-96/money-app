import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TotalsPageComponent } from './totals-page/totals-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionComponent } from './transactions-page/transaction/transaction.component';
import { TransactionsGroupComponent } from './transactions-page/transactions-group/transactions-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TotalsPageComponent,
    TransactionsPageComponent,
    TransactionComponent,
    TransactionsGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
