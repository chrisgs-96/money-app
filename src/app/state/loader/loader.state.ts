import { State, Action, StateContext, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Loader } from './loader.action';
import { state } from '@angular/animations';
import { LoaderStateModel } from 'src/app/models/transaction.model';

@State<LoaderStateModel>({
  name: 'loader',
  defaults: {
    isVisible: false,
  },
})
@Injectable()
export class LoaderState {
  constructor(private db: AngularFirestore) {}

  @Action(Loader.Show)
  showLoader(ctx: StateContext<LoaderStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isVisible: true,
    });
  }

  @Action(Loader.Hide)
  hideLoader(ctx: StateContext<LoaderStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isVisible: false,
    });
  }
}
