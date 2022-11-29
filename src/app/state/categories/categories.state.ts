import { State, Action, StateContext, Select, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from './categories.action';
import { state } from '@angular/animations';
import { Loader } from '../loader/loader.action';
import { Modal } from '../modal/modal.action';
import {
  CategoriesStateModel,
  CategoryModel,
} from 'src/app/models/transaction.model';

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoriesState {
  constructor(private db: AngularFirestore, private store: Store) {}

  generateUniqSerial(): string {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      return r.toString(16);
    });
  }

  showModal(message: string) {
    this.store.dispatch(
      new Modal.Show({
        message,
      })
    );
  }

  @Action(Categories.Add)
  addCategory(
    ctx: StateContext<CategoriesStateModel>,
    data: { payload: CategoryModel }
  ) {
    this.store.dispatch(new Loader.Show());
    const email = this.store.selectSnapshot<string>(
      (state) => state.auth.email
    );
    this.db
      .collection('categories')
      .add({ ...data.payload, id: this.generateUniqSerial(), email })
      .catch(() =>
        this.showModal(
          'There was an error with adding the category ' + data.payload.name
        )
      )
      .finally(() => {
        this.store.dispatch(new Loader.Hide());
        this.store.dispatch(new Categories.Fetch());
      });
  }

  @Action(Categories.Remove)
  removeCategory(
    ctx: StateContext<CategoriesStateModel>,
    data: { payload: CategoryModel }
  ) {
    this.store.dispatch(new Loader.Show());
    let subscription = this.db
      .collection('categories', (ref) => ref.where('id', '==', data.payload.id))
      .get()
      .subscribe((rows) => {
        rows.forEach((entry) => {
          entry.ref
            .delete()
            .catch(() =>
              this.showModal(
                'Problem with deleting category ' + data.payload.name
              )
            );
        });
        subscription.unsubscribe();
        this.store.dispatch(new Loader.Hide());
        this.store.dispatch(new Categories.Fetch());
      });
  }

  @Action(Categories.Fetch)
  fetchCategories(ctx: StateContext<CategoriesStateModel>) {
    this.store.dispatch(new Loader.Show());
    const state = ctx.getState();
    const email = this.store.selectSnapshot<string>(
      (state) => state.auth.email
    );
    let subscription = this.db
      .collection('categories', (ref) => ref.where('email', '==', email))
      .valueChanges()
      .subscribe((data: any) => {
        ctx.setState({
          ...state,
          categories: data,
        });
        this.store.dispatch(new Loader.Hide());
        subscription.unsubscribe();
      });
  }
}
