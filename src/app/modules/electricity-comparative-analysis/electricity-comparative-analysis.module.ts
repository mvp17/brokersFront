import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityComparativeAnalysisComponent } from './components/electricity-comparative-analysis/electricity-comparative-analysis.component';
import { ElectricityComparativeAnalysisRoutingModule } from './electricity-comparative-analysis-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../core/shared.module";


@NgModule({
  declarations: [
    ElectricityComparativeAnalysisComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ElectricityComparativeAnalysisRoutingModule,
    FormsModule,
    SharedModule
],
  bootstrap: [ElectricityComparativeAnalysisComponent]
})
export class ElectricityComparativeAnalysisModule { }
