import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgxsModule } from '@ngxs/store';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { TransactionComponent } from './pages/transactions-page/transaction/transaction.component';
import { TransactionsGroupComponent } from './pages/transactions-page/transactions-group/transactions-group.component';
import { NewTransactionComponent } from './pages/new-transaction/new-transaction.component';
import { TransactionsState } from './state/transactions/transactions.state';
import { ReactiveFormsModule } from '@angular/forms';
import { IsIncomeButtonsComponent } from './pages/new-transaction/is-income-buttons/is-income-buttons.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CategoriesState } from './state/categories/categories.state';
import { CategoriesComponent } from './pages/new-transaction/categories/categories.component';
import { MultiSelectionButtonComponent } from './common/components/multi-selection-button/multi-selection-button.component';
import { TransactionsSummaryComponent } from './pages/transactions-summary/transactions-summary.component';
import { CategoriesManagementComponent } from './pages/categories-management/categories-management.component';
import { FormsModule } from '@angular/forms';
import { LoaderState } from './state/loader/loader.state';
import { LoaderComponent } from './common/components/loader/loader.component';
import { ModalComponent } from './common/components/modal/modal.component';
import { ModalState } from './state/modal/modal.state';
import { CategoryBubbleComponent } from './pages/categories-management/category-bubble/category-bubble.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthState } from './state/auth/auth.state';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './guardians/AuthGuard';
import { BlockWhenLoggedGuard } from './guardians/BlockWhenLoggedGuard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsPageComponent,
    TransactionComponent,
    TransactionsGroupComponent,
    NewTransactionComponent,
    IsIncomeButtonsComponent,
    CategoriesComponent,
    MultiSelectionButtonComponent,
    TransactionsSummaryComponent,
    CategoriesManagementComponent,
    LoaderComponent,
    ModalComponent,
    CategoryBubbleComponent,
    LoginPageComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      TransactionsState,
      CategoriesState,
      LoaderState,
      ModalState,
      AuthState,
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'money-manager'
    ),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [AuthenticationService, AuthGuard, BlockWhenLoggedGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
