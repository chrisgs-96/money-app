import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryModel } from '../header/models/transaction.model';
import { Categories } from '../state/categories/categories.action';
import { Modal } from '../state/modal/modal.action';

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesManagementComponent implements OnInit {
  @Select((state: any) => state.categories.categories)
  categories$: Observable<CategoryModel[]>;
  categoryName = '';

  constructor(private store: Store) {}

  addCategory() {
    this.store.dispatch(new Categories.Add({ name: this.categoryName }));
  }

  deleteCategory(name: string) {
    this.store.dispatch(new Categories.Remove({ name }));
  }

  ngOnInit(): void {
    this.store.dispatch(new Categories.Fetch());
    console.log('add loader and modal!');
  }
}
