import { State, Action, StateContext, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Transactions } from './transactions.action';
import { pipe } from 'rxjs';
import {
  GroupedTransactionsModel,
  TransactionAddPayload,
  TransactionModel,
  TransactionsStateModel,
} from 'src/app/header/models/transaction.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@State<TransactionsStateModel>({
  name: 'transactions',
  defaults: {
    transactionsRaw: [],
    transactionsGrouped: {
      transactions: {},
      dateOrder: [],
    },
  },
})
@Injectable()
export class TransactionsState {
  constructor(private db: AngularFirestore) {}

  @Action(Transactions.Add)
  addTransaction(
    ctx: StateContext<TransactionsStateModel>,
    data: { payload: TransactionModel }
  ) {
    const state = ctx.getState();
    let promise = new Promise<any>(() => {
      this.db.collection('transactions').add(data.payload);
    });
    promise.then((data) => {
      const groupedTransactions = this.addTransactionToGrouped(
        data.payload,
        state.transactionsGrouped
      );
      ctx.setState({
        ...state,
        transactionsRaw: [...state.transactionsRaw, data.payload],
        transactionsGrouped: groupedTransactions,
      });
    });
  }

  sortFunc = (a: TransactionModel, b: TransactionModel) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    let bDate = new Date(b.date).getTime();
    let aDate = new Date(a.date).getTime();

    return bDate - aDate;
  };

  safeAdd = (a: string | number, b: string | number) => {
    let _a = typeof a === 'string' ? parseFloat(a) : a;
    let _b = typeof b === 'string' ? parseFloat(b) : b;
    return parseFloat((_a + _b).toFixed(2));
  };

  addTransactionToGrouped(
    transaction: TransactionModel,
    groupedTransactions: GroupedTransactionsModel
  ) {
    const parsedTransDate = new Date(transaction.date);
    let id = parsedTransDate.getMonth() + '/' + parsedTransDate.getFullYear();
    if (!groupedTransactions.transactions[id]) {
      groupedTransactions.dateOrder.push(id);
      groupedTransactions.transactions[id] = {
        transactions: [transaction],
        month: parsedTransDate.getMonth(),
        year: parsedTransDate.getFullYear(),
        totalIncome: transaction.isIncome ? transaction.amount : 0,
        totalOutcome: !transaction.isIncome ? transaction.amount : 0,
      };
    } else {
      if (transaction.isIncome)
        groupedTransactions.transactions[id].totalIncome = this.safeAdd(
          groupedTransactions.transactions[id].totalIncome,
          transaction.amount
        );
      else
        groupedTransactions.transactions[id].totalOutcome = this.safeAdd(
          groupedTransactions.transactions[id].totalOutcome,
          transaction.amount
        );
      groupedTransactions.transactions[id].transactions.push(transaction);
    }
    return groupedTransactions;
  }

  groupTransactions(transactions: TransactionModel[]) {
    let _transactions = transactions.sort((a, b) => this.sortFunc(a, b));
    let groupedTransactions: GroupedTransactionsModel = {
      transactions: [] as any,
      dateOrder: [],
    };
    _transactions.forEach((tran: TransactionModel) => {
      const parsedTransDate = new Date(tran.date);
      let id = parsedTransDate.getMonth() + '/' + parsedTransDate.getFullYear();
      if (!groupedTransactions.transactions[id]) {
        groupedTransactions.dateOrder.push(id);
        groupedTransactions.transactions[id] = {
          transactions: [tran],
          month: parsedTransDate.getMonth(),
          year: parsedTransDate.getFullYear(),
          totalIncome: tran.isIncome ? tran.amount : 0,
          totalOutcome: !tran.isIncome ? tran.amount : 0,
        };
      } else {
        if (tran.isIncome)
          groupedTransactions.transactions[id].totalIncome = this.safeAdd(
            groupedTransactions.transactions[id].totalIncome,
            tran.amount
          );
        else
          groupedTransactions.transactions[id].totalOutcome = this.safeAdd(
            groupedTransactions.transactions[id].totalOutcome,
            tran.amount
          );
        groupedTransactions.transactions[id].transactions.push(tran);
      }
    });
    return groupedTransactions;
  }

  @Action(Transactions.Fetch)
  fetchTransactions(ctx: StateContext<TransactionsStateModel>) {
    const state = ctx.getState();
    console.log('fetching');
    let transactions;
    let subscription = this.db
      .collection('transactions')
      .valueChanges()
      .subscribe((data: any) => {
        transactions = data;
        console.log(transactions);
        const groupedTransactions = this.groupTransactions(transactions);
        ctx.setState({
          ...state,
          transactionsRaw: transactions,
          transactionsGrouped: groupedTransactions,
        });
        subscription.unsubscribe();
      });
  }
}
