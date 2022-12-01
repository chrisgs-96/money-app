import { ModalMessage } from "./modal.model";

export namespace Modal {

  export interface Action { }

  export class Show implements Action {
    static readonly type = '[Modal] Show';
    constructor(public payload: ModalMessage) { }
  }

  export class Hide {
    static readonly type = '[Modal] Hide';
    constructor() { }
  }
}
