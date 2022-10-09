import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsGroupComponent } from './transactions-group.component';

describe('TransactionsGroupComponent', () => {
  let component: TransactionsGroupComponent;
  let fixture: ComponentFixture<TransactionsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
