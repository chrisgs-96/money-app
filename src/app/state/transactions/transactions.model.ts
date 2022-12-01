export interface TransactionModel {
    id?: string;
    name: string;
    amount: number;
    isIncome: boolean;
    date: Date;
    category?: string;
  }
  
  export interface TransactionsContainer {
    transactions: TransactionModel[];
    month: number;
    year: number;
    totalIncome: number;
    totalOutcome: number;
    summary?: any;
  }
  
  export interface GroupedTransactionsModel {
    transactions: { [key: string]: TransactionsContainer };
    dateOrder: string[];
  }
  
  export interface TransactionsStateModel {
    transactionsRaw: TransactionModel[];
    transactionsGrouped: GroupedTransactionsModel;
  }