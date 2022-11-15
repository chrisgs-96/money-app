import { State, Action, StateContext, Select, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import {
  CategoriesStateModel,
  CategoryModel,
} from 'src/app/header/models/transaction.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from './categories.action';
import { state } from '@angular/animations';
import { Loader } from '../loader/loader.action';

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoriesState {
  constructor(private db: AngularFirestore, private store: Store) {}

  @Action(Categories.Add)
  addCategory(
    ctx: StateContext<CategoriesStateModel>,
    data: { payload: CategoryModel }
  ) {
    this.store.dispatch(new Loader.Show());
    const state = ctx.getState();
    let promise = new Promise<any>((resolve) => {
      resolve(this.db.collection('categories').add(data.payload));
    })
      .then(() => {
        ctx.setState({
          ...state,
          categories: [...state.categories, data.payload],
        });
      })
      .finally(() => this.store.dispatch(new Loader.Hide()));
  }

  @Action(Categories.Remove)
  removeCategory(
    ctx: StateContext<CategoriesStateModel>,
    data: { payload: CategoryModel }
  ) {
    this.store.dispatch(new Loader.Show());
    const state = ctx.getState();
    let subscription = this.db
      .collection('categories', (ref) =>
        ref.where('name', '==', data.payload.name)
      )
      .get()
      .subscribe((rows) =>
        rows.forEach((entry) => {
          entry.ref
            .delete()
            .then(() => console.log('Deleted ok'))
            .catch(() => console.log('Not ok'))
            .finally(() => subscription.unsubscribe());
          ctx.setState({
            ...state,
            categories: state.categories.filter(
              (category: any) => category.name !== data.payload.name
            ),
          });
          this.store.dispatch(new Loader.Hide());
        })
      );
  }

  @Action(Categories.Fetch)
  fetchCategories(ctx: StateContext<CategoriesStateModel>) {
    this.store.dispatch(new Loader.Show());
    const state = ctx.getState();
    let subscription = this.db
      .collection('categories')
      .valueChanges()
      .subscribe((data: any) => {
        console.log(data);
        const categories = data;
        ctx.setState({
          ...state,
          categories,
        });
        this.store.dispatch(new Loader.Hide());
        subscription.unsubscribe();
      });
  }
}
