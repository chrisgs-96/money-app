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
import { Modal } from '../modal/modal.action';

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

  generateUniqSerial(): string {
    console.log('generateUniqSerial and showModal in utils.js');
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      return r.toString(16);
    });
  }

  showModal(message: string) {
    this.store.dispatch(
      new Modal.Show({
        message,
      })
    );
  }

  @Action(Transactions.Add)
  addTransaction(
    ctx: StateContext<TransactionsStateModel>,
    data: { payload: TransactionModel }
  ) {
    this.store.dispatch(new Loader.Show());
    this.db
      .collection('transactions')
      .add({ ...data.payload, id: this.generateUniqSerial() })
      .catch(() =>
        this.showModal('There was an error with adding the transaction')
      )
      .finally(() => {
        this.store.dispatch(new Loader.Hide());
      });
  }

  @Action(Transactions.Delete)
  deleteTransaction(
    ctx: StateContext<TransactionsStateModel>,
    data: { payload: TransactionModel }
  ) {
    this.store.dispatch(new Loader.Show());
    let subscription = this.db
      .collection('transactions', (ref) =>
        ref.where('id', '==', data.payload.id)
      )
      .get()
      .subscribe((rows) => {
        rows.forEach((entry) => {
          entry.ref
            .delete()
            .catch(() => this.showModal('Could not delete the entry'));
        });
        this.store.dispatch(new Loader.Hide());
        this.store.dispatch(new Transactions.Fetch());
        subscription.unsubscribe();
      });
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
}
