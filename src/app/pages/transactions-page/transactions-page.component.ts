import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Transactions } from '../../state/transactions/transactions.action';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from '../../state/categories/categories.action';
import { GroupedTransactionsModel, TransactionModel } from 'src/app/state/transactions/transactions.model';
import { TransactionsState } from 'src/app/state/transactions/transactions.state';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  @Select(TransactionsState.transactionsRaw) transactions$: Observable<TransactionModel[]>;
  @Select(TransactionsState.transactionsGrouped) groupedTransactions$: Observable<GroupedTransactionsModel>;

  constructor(private store: Store, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.store.dispatch(new Transactions.Fetch());
  }
}
