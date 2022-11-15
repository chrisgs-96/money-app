import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Transactions } from '../state/transactions/transactions.action';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent implements OnInit {
  newTransactionForm: FormGroup;

  convertDateToString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  constructor(private store: Store) {
    this.newTransactionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      isIncome: new FormControl(false),
      date: new FormControl(this.convertDateToString(new Date()), [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.newTransactionForm.status === 'VALID')
      this.store.dispatch(
        new Transactions.Add({
          ...this.newTransactionForm.value,
          date: new Date(this.newTransactionForm.value.date),
        })
      );
    else alert('Please fill your form correctly');
  }
}
