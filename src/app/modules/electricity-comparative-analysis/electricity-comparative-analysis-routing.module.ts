
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectricityComparativeAnalysisComponent } from './electricity-comparative-analysis/electricity-comparative-analysis.component';

const routes: Routes = [
    {
        path: '',
        component: ElectricityComparativeAnalysisComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectricityComparativeAnalysisRoutingModule { }
