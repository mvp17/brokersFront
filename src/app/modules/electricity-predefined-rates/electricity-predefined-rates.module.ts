import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityPredefinedRatesComponent } from './components/electricity-predefined-rates/electricity-predefined-rates.component';
import { ElectricityPredefinedRatesRoutingModule } from './electricity-predefined-rates-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/core/shared.module';
import { ExcelService } from 'src/app/core/services/excel/excel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ElectricityPredefinedRatesComponent
  ],
  imports: [
    CommonModule,
    ElectricityPredefinedRatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    [ExcelService]
  ],
  bootstrap: [ElectricityPredefinedRatesComponent]
})
export class ElectricityPredefinedRatesModule { }
