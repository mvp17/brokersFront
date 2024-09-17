import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityPredefinedRatesComponent } from './electricity-predefined-rates/electricity-predefined-rates.component';
import { ElectricityPredefinedRatesRoutingModule } from './electricity-predefined-rates-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/core/shared.module';
import { ExcelService } from 'src/app/core/services/excel/excel.service';


@NgModule({
  declarations: [
    ElectricityPredefinedRatesComponent
  ],
  imports: [
    CommonModule,
    ElectricityPredefinedRatesRoutingModule,
    HttpClientModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    [ExcelService]
  ],
  bootstrap: [ElectricityPredefinedRatesComponent]
})
export class ElectricityPredefinedRatesModule { }
