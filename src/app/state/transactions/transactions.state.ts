import { State, Action, StateContext, Select, Store } from '@ngxs/store';
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
import { Loader } from '../loader/loader.action';

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
  constructor(private db: AngularFirestore, private store: Store) {}

  @Action(Transactions.Add)
  addTransaction(
    ctx: StateContext<TransactionsStateModel>,
    data: { payload: TransactionModel }
  ) {
    this.store.dispatch(new Loader.Show());
    const state = ctx.getState();
    let promise = new Promise<any>((resolve) => {
      resolve(this.db.collection('transactions').add(data.payload));
    });
    promise
      .then(() => {
        const groupedTransactions = this.addTransactionToGrouped(
          data.payload,
          state.transactionsGrouped
        );
        ctx.setState({
          ...state,
          transactionsRaw: [...state.transactionsRaw, data.payload],
          transactionsGrouped: groupedTransactions,
        });
      })
      .finally(() => this.store.dispatch(new Loader.Hide()));
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
        summary: {
          [transaction.category as any]: transaction.isIncome
            ? transaction.amount
            : -1 * transaction.amount,
        },
      };
    } else {
      if (
        !groupedTransactions.transactions[id].summary[
          transaction.category as any
        ]
      ) {
        groupedTransactions.transactions[id].summary[
          transaction.category as any
        ] = 0;
      }
      groupedTransactions.transactions[id].summary[
        transaction.category as any
      ] = this.safeAdd(
        groupedTransactions.transactions[id].summary[
          transaction.category as any
        ],
        transaction.amount * (transaction.isIncome ? 1 : -1)
      );

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
          summary: {
            [tran.category as any]: tran.isIncome
              ? tran.amount
              : -1 * tran.amount,
          },
        };
      } else {
        if (
          !groupedTransactions.transactions[id].summary[tran.category as any]
        ) {
          groupedTransactions.transactions[id].summary[
            tran.category as any
          ] = 0;
        }
        groupedTransactions.transactions[id].summary[tran.category as any] =
          this.safeAdd(
            groupedTransactions.transactions[id].summary[tran.category as any],
            tran.amount * (tran.isIncome ? 1 : -1)
          );

        if (tran.isIncome) {
          groupedTransactions.transactions[id].totalIncome = this.safeAdd(
            groupedTransactions.transactions[id].totalIncome,
            tran.amount
          );
        } else {
          groupedTransactions.transactions[id].totalOutcome = this.safeAdd(
            groupedTransactions.transactions[id].totalOutcome,
            tran.amount
          );
        }
        groupedTransactions.transactions[id].transactions.push(tran);
      }
    });
    return groupedTransactions;
  }

  calculateTransactionsSummary(groupedTransactions: any) {
    console.log('---');
    console.log(groupedTransactions);
    const keys = Object.keys(groupedTransactions.transactions);
    keys.forEach((key: any) => {
      groupedTransactions.transactions[key].summary = {};
      groupedTransactions.transactions[key].transactions.forEach(
        (transaction: any) => {
          if (
            !groupedTransactions.transactions[key].summary[
              transaction?.category
            ]
          ) {
            groupedTransactions.transactions[key].summary[
              transaction.category
            ] = 0;
          }
          groupedTransactions.transactions[key].summary[transaction.category] =
            this.safeAdd(
              transaction.amount * (transaction.isIncome ? 1 : -1),
              groupedTransactions.transactions[key].summary[
                transaction.category
              ]
            );
        }
      );
    });
    return groupedTransactions;
  }

  @Action(Transactions.Fetch)
  fetchTransactions(ctx: StateContext<TransactionsStateModel>) {
    this.store.dispatch(new Loader.Show());
    console.log('remove "any" types');
    const state = ctx.getState();
    let transactions;
    let subscription = this.db
      .collection('transactions')
      .valueChanges()
      .subscribe((data: any) => {
        transactions = data;
        let groupedTransactions = this.groupTransactions(transactions);
        groupedTransactions =
          this.calculateTransactionsSummary(groupedTransactions);
        ctx.setState({
          ...state,
          transactionsRaw: transactions,
          transactionsGrouped: groupedTransactions,
        });
        this.store.dispatch(new Loader.Hide());
        subscription.unsubscribe();
      });
  }
}
