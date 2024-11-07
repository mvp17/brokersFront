import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedDecimalInputComponent } from './formatted-decimal-input.component';

describe('FormattedDecimalInputComponent', () => {
  let component: FormattedDecimalInputComponent;
  let fixture: ComponentFixture<FormattedDecimalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormattedDecimalInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormattedDecimalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
