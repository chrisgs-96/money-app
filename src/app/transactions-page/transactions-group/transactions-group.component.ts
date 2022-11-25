import { Component, Input, OnInit } from '@angular/core';
import { TransactionsContainer } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transactions-group',
  templateUrl: './transactions-group.component.html',
  styleUrls: ['./transactions-group.component.scss']
})
export class TransactionsGroupComponent implements OnInit {
  @Input() transactions: TransactionsContainer;

  constructor() { }

  returnMonthName(month: number) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return window.innerWidth >= 350 ? months[month] : months[month].substring(0,3);
  }

  ngOnInit(): void {
    console.log(this.transactions)
  }
  // month
  // totalIncome
  // totalOutcome
  // year
}
