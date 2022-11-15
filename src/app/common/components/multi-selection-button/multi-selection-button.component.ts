import { Component, Input, OnInit } from '@angular/core';
import { ActionType } from '@ngxs/store';

@Component({
  selector: 'app-multi-selection-button',
  templateUrl: './multi-selection-button.component.html',
  styleUrls: ['./multi-selection-button.component.scss'],
})
export class MultiSelectionButtonComponent implements OnInit {
  @Input() isSelected: boolean;
  @Input() onClick: any;
  @Input() text: string;
  @Input() value: any;
  @Input() form: any;

  constructor() {}

  ngOnInit(): void {}
}
