import { Component, Input } from '@angular/core';
import { TransactionsContainer } from 'src/app/state/transactions/transactions.model';

@Component({
  selector: 'app-transactions-group',
  templateUrl: './transactions-group.component.html',
  styleUrls: ['./transactions-group.component.scss']
})
export class TransactionsGroupComponent {
  @Input() transactions: TransactionsContainer;

  constructor() { }

  returnMonthName(month: number) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return window.innerWidth >= 350 ? months[month] : months[month].substring(0, 3);
  }

}
