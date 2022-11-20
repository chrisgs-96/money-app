import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Transactions } from '../state/transactions/transactions.action';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from '../state/categories/categories.action';
import { GroupedTransactionsModel, TransactionModel } from '../models/transaction.model';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  @Select((state: any) => state.transactions.transactionsRaw)
  transactions$: Observable<TransactionModel[]>;
  @Select((state: any) => state.transactions.transactionsGrouped)
  groupedTransactions$: Observable<GroupedTransactionsModel>;

  transactions: TransactionModel[] = [];
  groupedTransactions: GroupedTransactionsModel;

  log() {
    console.log(this.groupedTransactions);
  }

  constructor(private store: Store, private db: AngularFirestore) {
    this.transactions$.subscribe((data) => (this.transactions = data));
    this.groupedTransactions$.subscribe(
      (data) => (this.groupedTransactions = data)
    );
  }

  fetchTransactions() {
    this.store.dispatch(new Transactions.Fetch());
  }

  ngOnInit(): void {
    console.log('ngondestroy on components to unsubscribe');
    this.fetchTransactions();
  }
}
