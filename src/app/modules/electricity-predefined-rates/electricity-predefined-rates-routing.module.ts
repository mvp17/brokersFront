
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectricityPredefinedRatesComponent } from './components/electricity-predefined-rates/electricity-predefined-rates.component';

const routes: Routes = [
    {
        path: '',
        component: ElectricityPredefinedRatesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectricityPredefinedRatesRoutingModule { }
