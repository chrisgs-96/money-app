export namespace Categories {
  export interface Action {}

  export class Fetch {
    static readonly type = '[Categories] Fetch';
    constructor() {}
  }
}
