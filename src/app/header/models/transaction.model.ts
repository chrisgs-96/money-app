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