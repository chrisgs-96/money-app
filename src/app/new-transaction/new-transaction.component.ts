import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Transactions } from '../state/transactions/transactions.action';
import { Observable } from 'rxjs';
import { Categories } from '../state/categories/categories.action';
import { CategoryModel } from '../models/transaction.model';
import { Loader } from '../state/loader/loader.action';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent implements OnInit {
  @Select((state: any) => state.categories.categories)
  categories$: Observable<CategoryModel[]>;
  newTransactionForm: any;

  convertDateToString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  constructor(private store: Store) {
    this.newTransactionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      category: new FormControl('Other', [Validators.required]),
      isIncome: new FormControl(false),
      date: new FormControl(this.convertDateToString(new Date()), [
        Validators.required,
      ]),
    });
  }

  aa() {
    this.store.dispatch(new Loader.Show());
  }

  ngOnInit(): void {
    this.store.dispatch(new Categories.Fetch());
  }

  onSubmit() {
    if (this.newTransactionForm.status === 'VALID')
      this.store.dispatch(new Transactions.Add(this.newTransactionForm.value));
    else this.newTransactionForm.markAllAsTouched();
  }
}
