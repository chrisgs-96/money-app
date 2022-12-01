import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Modal } from '../../../state/modal/modal.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Select((state: any) => state.modal.isVisible)
  isVisible$: Observable<boolean>;

  @Select((state: any) => state.modal.message)
  message$: Observable<string>;

  constructor(private store: Store) { }

  hide() {
    this.store.dispatch(new Modal.Hide());
  }

  ngOnInit(): void { }
}
