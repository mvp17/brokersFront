import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityPredefinedRatesComponent } from './electricity-predefined-rates/electricity-predefined-rates.component';
import { ElectricityPredefinedRatesRoutingModule } from './electricity-predefined-rates-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ElectricityPredefinedRatesComponent
  ],
  imports: [
    CommonModule,
    ElectricityPredefinedRatesRoutingModule,
    HttpClientModule,
  ]
})
export class ElectricityPredefinedRatesModule { }
