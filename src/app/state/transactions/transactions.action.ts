export namespace Transactions {

    export interface Action { }

    export class Add implements Action {
        static readonly type = '[Categories] Add';
        constructor(public payload: { value: any }) { }
    }

    export class Fetch {
        static readonly type = '[Categories] Fetch';
        constructor() { }
    }
}