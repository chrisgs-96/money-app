import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsPageComponent } from './totals-page.component';

describe('TotalsPageComponent', () => {
  let component: TotalsPageComponent;
  let fixture: ComponentFixture<TotalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
