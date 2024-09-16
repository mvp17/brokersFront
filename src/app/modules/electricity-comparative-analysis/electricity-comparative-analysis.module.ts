import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityComparativeAnalysisComponent } from './electricity-comparative-analysis/electricity-comparative-analysis.component';
import { ElectricityComparativeAnalysisRoutingModule } from './electricity-comparative-analysis-routing.module';


@NgModule({
  declarations: [
    ElectricityComparativeAnalysisComponent
  ],
  imports: [
    CommonModule,
    ElectricityComparativeAnalysisRoutingModule
  ]
})
export class ElectricityComparativeAnalysisModule { }
