import { TransactionAddPayload, TransactionModel } from "src/app/header/models/transaction.model";

export namespace Transactions {

    export interface Action { }

    export class Add implements Action {
        static readonly type = '[Categories] Add';
        constructor(public payload: TransactionModel) { }
    }

    export class Fetch {
        static readonly type = '[Categories] Fetch';
        constructor() { }
    }
}