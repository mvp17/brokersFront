import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityComparativeAnalysisComponent } from './electricity-comparative-analysis.component';

describe('ElectricityComparativeAnalysisComponent', () => {
  let component: ElectricityComparativeAnalysisComponent;
  let fixture: ComponentFixture<ElectricityComparativeAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityComparativeAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricityComparativeAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
