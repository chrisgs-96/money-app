import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Select((state: any) => state.loader.isVisible)
  isVisible$: Observable<boolean>;
  isVisible: boolean;

  constructor() {
    this.isVisible$.subscribe((isVisible) => (this.isVisible = isVisible));
  }

  ngOnInit(): void {}
}
