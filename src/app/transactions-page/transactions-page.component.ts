import { Component, OnInit } from '@angular/core';
import { TransactionModel, TransactionsContainer } from '../header/models/transaction.model';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent implements OnInit {

  transactions = [
    {
      name: 'Transaction #1',
      amount: 10.23,
      isIncome: false,
      date: new Date(2022, 1, 4),
    },
    {
      name: 'Transaction #3',
      amount: 100,
      isIncome: true,
      date: new Date(2020, 10, 7),
    },
    {
      name: 'Transaction #2',
      amount: 15,
      isIncome: false,
      date: new Date(2022, 1, 14),
    },
    {
      name: 'Transaction #6',
      amount: 10.23,
      isIncome: true,
      date: new Date(new Date(2020, 1, 4)),
    },
    {
      name: 'Transaction #4',
      amount: 16.23,
      isIncome: false,
      date: new Date(2020, 10, 4),
    },
    {
      name: 'Transaction #5',
      amount: 20.23,
      isIncome: false,
      date: new Date(2020, 1, 14),
    },
  ]

  sortFunc = (a: TransactionModel, b: TransactionModel) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    let bDate = new Date(b.date).getTime();
    let aDate = new Date(a.date).getTime();

    return bDate - aDate;
  }

  sortTransactions(transactions: TransactionModel[]) {
    // transactions: TransactionModel[],
    // month: number,
    // year: number,
    // totalIncome: number,
    // totalOutcome: number,

    // --------------------
    // {
    // name: 'Transaction #2',
    // amount: 15,
    // isIncome: false,
    // date: new Date(2022,1,14),
    //   },
    let _transactions = transactions.sort((a, b) => this.sortFunc(a, b));
    let groupedTransactions: any = {}
    let dateOrder: string[] = [];
    _transactions.forEach(tran => {
      let id = tran.date.getMonth() + '/' + tran.date.getFullYear();
      if (!groupedTransactions[id]) {
        dateOrder.push(id);
        groupedTransactions[id] = {
          transactions: [tran],
          month: tran.date.getMonth(),
          year: tran.date.getFullYear(),
          totalIncome: tran.isIncome ? tran.amount : 0,
          totalOutcome: !tran.isIncome ? tran.amount : 0,
        }
      } else {
        groupedTransactions[id].totalIncome += tran.isIncome ? tran.amount : 0;
        groupedTransactions[id].totalOutcome = !tran.isIncome ? tran.amount : 0
        groupedTransactions[id].transactions.push(tran);
      }
    })
    return { groupedTransactions, dateOrder };
  }

  constructor() {
    this.sortTransactions(this.transactions);
  }

  ngOnInit(): void {
  }

}
