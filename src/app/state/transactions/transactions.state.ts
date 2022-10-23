import { State, Action, StateContext, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Transactions } from './transactions.action';
import { GroupedTransactionsModel, TransactionModel, TransactionsStateModel } from 'src/app/header/models/transaction.model';

@State<TransactionsStateModel>({
    name: 'transactions',
    defaults: {
        transactionsRaw: [],
        transactionsGrouped: {
            transactions: {},
            dateOrder: [],
        },
    }
})

@Injectable()
export class TransactionsState {

    @Action(Transactions.Add)
    addTransaction(ctx: StateContext<TransactionsStateModel>) {
        const state = ctx.getState();
        console.log('adding');
    }

    sortFunc = (a: TransactionModel, b: TransactionModel) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        let bDate = new Date(b.date).getTime();
        let aDate = new Date(a.date).getTime();

        return bDate - aDate;
    }

    safeAdd = (a: number, b: number) => {
        return parseFloat((a + b).toFixed(2));
    }

    groupTransactions(transactions: TransactionModel[]) {
        let _transactions = transactions.sort((a, b) => this.sortFunc(a, b));
        let groupedTransactions: GroupedTransactionsModel = {
            transactions: [] as any,
            dateOrder: []
        };
        _transactions.forEach((tran: TransactionModel) => {
            let id = tran.date.getMonth() + '/' + tran.date.getFullYear();
            if (!groupedTransactions.transactions[id]) {
                groupedTransactions.dateOrder.push(id);
                groupedTransactions.transactions[id] = {
                    transactions: [tran],
                    month: tran.date.getMonth(),
                    year: tran.date.getFullYear(),
                    totalIncome: tran.isIncome ? tran.amount : 0,
                    totalOutcome: !tran.isIncome ? tran.amount : 0,
                }
            } else {
                if (tran.isIncome)
                    groupedTransactions.transactions[id].totalIncome = this.safeAdd(groupedTransactions.transactions[id].totalIncome, tran.amount);
                else
                    groupedTransactions.transactions[id].totalOutcome = this.safeAdd(groupedTransactions.transactions[id].totalOutcome, tran.amount);
                groupedTransactions.transactions[id].transactions.push(tran);
            }
        })
        return groupedTransactions;
    }

    @Action(Transactions.Fetch)
    fetchTransactions(ctx: StateContext<TransactionsStateModel>) {
        const state = ctx.getState();
        console.log('fetching')

        setTimeout(() => {
            const transactions = [
                {
                    name: 'Transaction #1' + Math.random(),
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
                    name: 'Transaction #8',
                    amount: 20.03,
                    isIncome: false,
                    date: new Date(2020, 10, 4),
                },
                {
                    name: 'Transaction #9',
                    amount: 30.51,
                    isIncome: true,
                    date: new Date(2020, 10, 4),
                },
                {
                    name: 'Transaction #5',
                    amount: 20.23,
                    isIncome: false,
                    date: new Date(2020, 1, 14),
                },
            ]
            const groupedTransactions = this.groupTransactions(transactions)
            ctx.setState({
                ...state,
                transactionsRaw: transactions,
                transactionsGrouped: groupedTransactions,
            })
        }, 2000)
    }
}