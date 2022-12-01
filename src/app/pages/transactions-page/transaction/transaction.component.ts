import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Transactions } from 'src/app/state/transactions/transactions.action';
import { TransactionModel } from 'src/app/state/transactions/transactions.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input() transaction: TransactionModel;
  @Input() isLast: boolean;

  constructor(private store: Store) { }

  deleteTransaction() {
    const confirmation = confirm(
      'Are you sure you want to delete the transaction with description "' +
      this.transaction.name +
      '"?'
    );
    if (confirmation)
      this.store.dispatch(new Transactions.Delete(this.transaction));
  }

}
