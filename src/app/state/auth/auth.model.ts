export interface EmailPayload {
  email: string;
  password: string;
}

export interface EmailPayloadObj {
  payload: EmailPayload;
}

export interface AuthStateModel {
  isLoggedIn: boolean;
  email: string;
}