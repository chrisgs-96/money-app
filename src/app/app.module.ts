import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgxsModule } from '@ngxs/store';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionComponent } from './transactions-page/transaction/transaction.component';
import { TransactionsGroupComponent } from './transactions-page/transactions-group/transactions-group.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionsState } from './state/transactions/transactions.state';
import { ReactiveFormsModule } from '@angular/forms';
import { IsIncomeOutcomeComponent } from './is-income-outcome/is-income-outcome.component';
import { IsIncomeButtonsComponent } from './new-transaction/is-income-buttons/is-income-buttons.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CategoriesState } from './state/categories/categories.state';
import { CategoriesComponent } from './new-transaction/categories/categories.component';
import { MultiSelectionButtonComponent } from './common/components/multi-selection-button/multi-selection-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsPageComponent,
    TransactionComponent,
    TransactionsGroupComponent,
    NewTransactionComponent,
    IsIncomeOutcomeComponent,
    IsIncomeButtonsComponent,
    CategoriesComponent,
    MultiSelectionButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([TransactionsState, CategoriesState]),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'money-manager'
    ),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
