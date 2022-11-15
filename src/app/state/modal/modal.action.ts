import { CategoryModel } from 'src/app/header/models/transaction.model';

export namespace Modal {

  export interface Action {}

  export class Show implements Action {
    static readonly type = '[Modal] Show';
    constructor(public payload: { message: string }) {}
  }

  export class Hide {
    static readonly type = '[Modal] Hide';
    constructor() {}
  }
}
