import { CategoryModel } from "src/app/models/transaction.model";

export namespace Categories {
  export interface Action {}

  export class Fetch {
    static readonly type = '[Categories] Fetch';
    constructor() {}
  }

  export class Add implements Action {
    static readonly type = '[Categories] Add';
    constructor(public payload: CategoryModel) {}
  }
  export class Remove implements Action {
    static readonly type = '[Categories] Remove';
    constructor(public payload: CategoryModel) {}
  }
}
