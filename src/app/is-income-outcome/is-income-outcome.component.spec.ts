import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsIncomeOutcomeComponent } from './is-income-outcome.component';

describe('IsIncomeOutcomeComponent', () => {
  let component: IsIncomeOutcomeComponent;
  let fixture: ComponentFixture<IsIncomeOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsIncomeOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsIncomeOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
