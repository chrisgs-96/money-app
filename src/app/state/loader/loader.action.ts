import { CategoryModel } from 'src/app/header/models/transaction.model';

export namespace Loader {

  export class Show {
    static readonly type = '[Loader] Show';
    constructor() {}
  }
  export class Hide {
    static readonly type = '[Loader] Hide';
    constructor() {}
  }
}
