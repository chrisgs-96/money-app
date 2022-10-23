import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgxsModule } from '@ngxs/store';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionComponent } from './transactions-page/transaction/transaction.component';
import { TransactionsGroupComponent } from './transactions-page/transactions-group/transactions-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsPageComponent,
    TransactionComponent,
    TransactionsGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
