export interface ModalStateModel {
  isVisible: boolean;
  message: string;
}

export interface ModalPayload {
  payload: ModalMessage
}

export interface ModalMessage {
  message: string;
}