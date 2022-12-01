import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/state/categories/categories.model';
import { CategoriesState } from 'src/app/state/categories/categories.state';
import { GroupedTransactionsModel } from 'src/app/state/transactions/transactions.model';
import { TransactionsState } from 'src/app/state/transactions/transactions.state';
import { Categories } from '../../state/categories/categories.action';
import { Transactions } from '../../state/transactions/transactions.action';

@Component({
  selector: 'app-transactions-summary',
  templateUrl: './transactions-summary.component.html',
  styleUrls: ['./transactions-summary.component.scss'],
})
export class TransactionsSummaryComponent implements OnInit {
  @Select(TransactionsState.transactionsGrouped) transactionsGrouped$: Observable<GroupedTransactionsModel>;
  @Select(CategoriesState.categories) categories$: Observable<CategoryModel[]>;

  constructor(private store: Store) { }

  parseDate(date: string) {
    const splitDate = date.split('/');
    const month = splitDate[0];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[parseInt(month)]} ${splitDate[1]}`;
  }

  ngOnInit(): void {
    this.store.dispatch(new Transactions.Fetch());
    this.store.dispatch(new Categories.Fetch());
  }
}
