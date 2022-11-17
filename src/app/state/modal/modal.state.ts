import { State, Action, StateContext, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Modal } from './modal.action';
import { state } from '@angular/animations';
import { ModalStateModel } from 'src/app/models/transaction.model';

@State<ModalStateModel>({
  name: 'modal',
  defaults: {
    isVisible: false,
    message: '',
  },
})
@Injectable()
export class ModalState {
  constructor(private db: AngularFirestore) {}

  @Action(Modal.Show)
  showModal(
    ctx: StateContext<ModalStateModel>,
    data: { payload: { message: string } }
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isVisible: true,
      message: data.payload.message,
    });
  }

  @Action(Modal.Hide)
  hideModal(ctx: StateContext<ModalStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isVisible: false,
      message: '',
    });
  }
}
