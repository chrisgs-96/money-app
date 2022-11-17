import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { TransactionModel } from 'src/app/header/models/transaction.model';
import { Transactions } from 'src/app/state/transactions/transactions.action';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @Input() transaction: TransactionModel;

  constructor(private store: Store) { }

  deleteTransaction() {
    this.store.dispatch(new Transactions.Delete(this.transaction));
  }

  ngOnInit(): void {
  }

}
