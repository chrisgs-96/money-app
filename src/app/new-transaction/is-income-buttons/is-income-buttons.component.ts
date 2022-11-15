import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-is-income-buttons',
  templateUrl: './is-income-buttons.component.html',
  styleUrls: ['./is-income-buttons.component.scss'],
})
export class IsIncomeButtonsComponent implements OnInit {
  @Input() form: any;

  constructor() {}

  changeSelection(isIncome: boolean) {
    this.form.patchValue({
      isIncome: isIncome,
    });
  }

  ngOnInit(): void {}
}
