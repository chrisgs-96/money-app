import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryModel } from 'src/app/state/categories/categories.model';

@Component({
  selector: 'app-category-bubble',
  templateUrl: './category-bubble.component.html',
  styleUrls: ['./category-bubble.component.scss'],
})
export class CategoryBubbleComponent implements OnInit {
  @Input() category: CategoryModel;
  @Output() cliked = new EventEmitter<CategoryModel>();
  color: string;
  antiColor: string;

  getRandomArbitrary() {
    return Math.random() * 254 + 1;
  }

  constructor() {}

  emitSignal() {
    this.cliked.next(this.category);
  }

  max(nums: number[]) {
    let min = -1;
    nums.forEach((num) => {
      if (num > min) min = num;
    });
    return min;
  }

  ngOnInit(): void {
    const r = this.getRandomArbitrary();
    const g = this.getRandomArbitrary();
    const b = this.getRandomArbitrary();
    this.color = `rgb(${r / 2.5},${g / 2.5},${this.max([r, g, b])})`;
    this.antiColor = `rgb(${255 - r},${255 - g},${255 - b})`;
  }
}
