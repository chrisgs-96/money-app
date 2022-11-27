import { EmailPayload } from "./auth.model";

export namespace AuthActions {
  export interface Action {}

  export class Logout {
    static readonly type = '[Auth] Logout';
    constructor() {}
  }

  export class Login implements Action {
    static readonly type = '[Auth] Login';
    constructor(public payload: EmailPayload) {}
  }

  export class SignUp implements Action {
    static readonly type = '[Auth] SignUp';
    constructor(public payload: EmailPayload) {}
  }

  export class GoogleSignUp implements Action {
    static readonly type = '[Auth] GoogleSignUp';
    constructor() {}
  }

  export class GoogleLogin implements Action {
    static readonly type = '[Auth] GoogleLogin';
    constructor() {}
  }
}
