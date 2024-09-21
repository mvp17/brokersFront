import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityPredefinedRatesComponent } from './electricity-predefined-rates.component';

describe('ElectricityPredefinedRatesComponent', () => {
  let component: ElectricityPredefinedRatesComponent;
  let fixture: ComponentFixture<ElectricityPredefinedRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityPredefinedRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricityPredefinedRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
