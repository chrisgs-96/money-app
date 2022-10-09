import { Component, OnInit, Input } from '@angular/core';
import { TransactionModel } from 'src/app/header/models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @Input() transaction: TransactionModel;

  constructor() { }

  ngOnInit(): void {
  }

}
