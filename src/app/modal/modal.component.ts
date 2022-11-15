import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Modal } from '../state/modal/modal.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Select((state: any) => state.modal.isVisible)
  isVisible$: Observable<boolean>;
  isVisible: boolean;

  @Select((state: any) => state.modal.message)
  message$: Observable<string>;
  message: string;

  constructor(private store: Store) {
    this.isVisible$.subscribe((isVisible) => (this.isVisible = isVisible));
    this.message$.subscribe((message) => (this.message = message));
  }

  hide() {
    this.store.dispatch(new Modal.Hide());
  }

  ngOnInit(): void {}
}
