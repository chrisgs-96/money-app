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

export interface TransactionAddPayload {
  value: TransactionModel;
}

export interface CategoriesStateModel {
  categories: CategoryModel[];
}

export interface CategoryModel {
  id?: string;
  name: string;
}

export interface LoaderStateModel {
  isVisible: boolean;
}

export interface ModalStateModel {
  isVisible: boolean;
  message: string;
}
