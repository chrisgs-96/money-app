import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryModel } from 'src/app/header/models/transaction.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() categories: CategoryModel[];
  @Input() form: any;

  constructor() {}

  changeValue(val: string) {
    this.form.patchValue({
      category: val,
    });
  }

  ngOnInit(): void {}
}
