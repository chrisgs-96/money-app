import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryModel } from 'src/app/state/categories/categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() categories: CategoryModel[];
  @Input() form: FormGroup;

  constructor() {}

  changeValue(val: string) {
    this.form.patchValue({
      category: val,
    });
  }

  ngOnInit(): void {}
}
