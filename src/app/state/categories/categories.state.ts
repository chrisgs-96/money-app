import { State, Action, StateContext, Select } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { CategoriesStateModel } from 'src/app/header/models/transaction.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from './categories.action';

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoriesState {
  constructor(private db: AngularFirestore) {}

  @Action(Categories.Fetch)
  fetchCategories(ctx: StateContext<CategoriesStateModel>) {
    const state = ctx.getState();
    let subscription = this.db
      .collection('categories')
      .valueChanges()
      .subscribe((data: any) => {
        const categories = data;
        ctx.setState({
          ...state,
          categories,
        });
        subscription.unsubscribe();
      });
  }
}
