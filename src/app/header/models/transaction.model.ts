export interface TransactionModel {
    name: string,
    amount: number,
    isIncome: boolean,
    date: Date,
}

export interface TransactionsContainer {
    transactions: TransactionModel[],
    month: number,
    year: number,
    totalIncome: number,
    totalOutcome: number,
}

export interface GroupedTransactionsModel {
    transactions: {[key: string]: TransactionsContainer},
    dateOrder: string[]
}

export interface TransactionsStateModel {
    transactionsRaw: TransactionModel[],
    transactionsGrouped: GroupedTransactionsModel,
}

export interface TransactionAddPayload {
    value: TransactionModel;
}