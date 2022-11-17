import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GroupedTransactionsModel } from '../models/transaction.model';
import { Categories } from '../state/categories/categories.action';
import { Transactions } from '../state/transactions/transactions.action';

@Component({
  selector: 'app-transactions-summary',
  templateUrl: './transactions-summary.component.html',
  styleUrls: ['./transactions-summary.component.scss'],
})
export class TransactionsSummaryComponent implements OnInit {
  @Select((state: any) => state.transactions.transactionsGrouped)
  transactionsGrouped$: Observable<GroupedTransactionsModel>;
  @Select((state: any) => state.categories.categories)
  categories$: Observable<GroupedTransactionsModel>;

  transactionsGrouped: any;
  categories: any;

  constructor(private store: Store) {
    this.transactionsGrouped$.subscribe((transactionsGrouped) => {
      this.transactionsGrouped = transactionsGrouped;
      console.log(transactionsGrouped);
    });
    this.categories$.subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new Transactions.Fetch());
    this.store.dispatch(new Categories.Fetch());
  }
}
