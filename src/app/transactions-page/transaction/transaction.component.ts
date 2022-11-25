import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { TransactionModel } from 'src/app/models/transaction.model';
import { Transactions } from 'src/app/state/transactions/transactions.action';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @Input() transaction: TransactionModel;
  @Input() isLast: boolean;

  constructor(private store: Store) {}

  deleteTransaction() {
    const confirmation = confirm(
      'Are you sure you want to delete the transaction with description "' +
        this.transaction.name +
        '"?'
    );
    if (confirmation)
      this.store.dispatch(new Transactions.Delete(this.transaction));
  }

  ngOnInit(): void {}
}
