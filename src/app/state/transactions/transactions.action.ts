import { TransactionModel } from "./transactions.model";

export namespace Transactions {
  export interface Action {}

  export class Add implements Action {
    static readonly type = '[Transactions] Add';
    constructor(public payload: TransactionModel) {}
  }

  export class Delete implements Action {
    static readonly type = '[Transactions] Delete';
    constructor(public payload: TransactionModel) {}
  }

  export class Fetch {
    static readonly type = '[Transactions] Fetch';
    constructor() {}
  }
}
