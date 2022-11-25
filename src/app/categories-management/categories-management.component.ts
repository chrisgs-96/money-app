import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/transaction.model';
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
    if (this.categoryName) {
      this.store.dispatch(new Categories.Add({ name: this.categoryName }));
      this.categoryName = '';
    } else
      this.store.dispatch(
        new Modal.Show({ message: 'Please fill in the name input field' })
      );
  }

  deleteCategory(category: CategoryModel) {
    const confirmation = confirm('Are you sure you want to delete the category "' + category.name + '"?');
    if (confirmation) this.store.dispatch(new Categories.Remove(category));
  }

  ngOnInit(): void {
    this.store.dispatch(new Categories.Fetch());
  }
}
