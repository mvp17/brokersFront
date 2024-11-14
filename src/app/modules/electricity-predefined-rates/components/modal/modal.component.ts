import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ElectricityPredefinedRatesApiService } from '../../services/api.service';
import { IPostElectricityPredefinedRates } from '../../interfaces/post-electricity-predefined-rates';
import { IGetElectricityPredefinedRates } from '../../interfaces/get-electricity-predefined-rates';
import { formatDisplayValue, formatInternalValue } from 'src/app/core/functions/formatting-value';
import { SharedModule } from "../../../../core/shared.module";

@Component({
  selector: 'modal-boots',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule, NgbModule, FormsModule, SharedModule],
})
export class ModalComponent implements OnInit{
  @Input() createNewRateOrigin: boolean;
  @Input() readCurrentRateOrigin: boolean;
  @Input() deleteCurrentRateOrigin: boolean;

  showType2td: boolean;
  showType: boolean;
  showBasePriceGrid: boolean;
  productTypeOptions: string[];
  rateOptions: string[];
  type2tdOptions: string[];

  rate: string;
  rateName: string;
  greenPower: boolean;
  type: string;
  type2td: string;
  cons: string[];
  pots: string[];
  preBaPots: string[];
  marPots: string[];
  preFiPots: string[];
  preBaEnes: string[];
  marEnes: string[];
  preFiEnes: string[];

  constructor(
    public activeModal: NgbActiveModal,
    private electricityPredefinedRatesApiService: ElectricityPredefinedRatesApiService
  ) {
    this.createNewRateOrigin = false;
    this.cons = ['', '', '', '', '', ''];
    this.pots = ['', '', '', '', '', ''];
    this.marPots = ['', '', '', '', '', ''];
    this.marEnes = ['', '', '', '', '', ''];

    // TODO: Get values from backend
    this.preBaPots = ['', '', '', '', '', ''];
    this.preBaEnes = ['', '', '', '', '', ''];

    // TODO: Calculated values
    this.preFiPots = ['', '', '', '', '', ''];
    this.preFiEnes = ['', '', '', '', '', ''];

    this.readCurrentRateOrigin = false;
    this.deleteCurrentRateOrigin = false;
    this.showType2td = false;
    this.showType = false;
    this.showBasePriceGrid = false;
    this.productTypeOptions = ['Fixed', 'Indexed'];
    this.rateOptions = ['2.0TD', '3.0TD'];
    this.type2tdOptions = ['24h', 'Trio'];
    this.rate = '';
    this.rateName = '';
    this.type = '';
    this.type2td = '';
    this.greenPower = false;
  }

  ngOnInit(): void {
    if (this.readCurrentRateOrigin || this.deleteCurrentRateOrigin) {
      this.electricityPredefinedRatesApiService.getPredefinedRate().subscribe((predefinedRate: IGetElectricityPredefinedRates) => {
        this.rate = predefinedRate.rate;
        this.type = predefinedRate.type;
        if (this.rate === '2.0TD') {
          this.type2td = predefinedRate.singlePrice ? '24h' : 'Trio';
        }
        else {
          this.greenPower = predefinedRate.greenPower;
        }
        this.marPots = [
          formatDisplayValue(String(predefinedRate.marPotP1)), 
          formatDisplayValue(String(predefinedRate.marPotP2)), 
          formatDisplayValue(String(predefinedRate.marPotP3)),
          formatDisplayValue(String(predefinedRate.marPotP4)), 
          formatDisplayValue(String(predefinedRate.marPotP5)),
          formatDisplayValue(String(predefinedRate.marPotP6)),
        ];
        this.marEnes = [
          formatDisplayValue(String(predefinedRate.marEneP1)), 
          formatDisplayValue(String(predefinedRate.marEneP2)), 
          formatDisplayValue(String(predefinedRate.marEneP3)),
          formatDisplayValue(String(predefinedRate.marEneP4)), 
          formatDisplayValue(String(predefinedRate.marEneP5)), 
          formatDisplayValue(String(predefinedRate.marEneP6)),
        ]
      })
    }
  }

  selectTypeOption(option: string) {
    this.type = option;
    if (this.rate === '3.0TD') {
      this.showBasePriceGrid = true;
    }
  }

  selectType2tdOption(option: string) {
    this.type2td = option;
    this.showBasePriceGrid = true;
  }

  selectRateOption(option: string) {
    this.rate = option;
    this.showType = true;

    if (option === '2.0TD') {
      this.showType2td = true;
      this.showBasePriceGrid = false;
    } else {
      this.showType2td = false;
    }
  }

  saveNewRate() {
    const newPredefinedRate: IPostElectricityPredefinedRates = {
      name: this.rateName,
      singlePrice: this.type2td === '24h',
      greenPower: this.greenPower,
      rate: this.rate,
      type: this.type,
      marPotP1: Number(formatInternalValue(this.marPots[0])),
      marPotP2: Number(formatInternalValue(this.marPots[1])),
      marPotP3: Number(formatInternalValue(this.marPots[2])),
      marPotP4: Number(formatInternalValue(this.marPots[3])),
      marPotP5: Number(formatInternalValue(this.marPots[4])),
      marPotP6: Number(formatInternalValue(this.marPots[5])),
      marEneP1: Number(formatInternalValue(this.marEnes[0])),
      marEneP2: Number(formatInternalValue(this.marEnes[1])),
      marEneP3: Number(formatInternalValue(this.marEnes[2])),
      marEneP4: Number(formatInternalValue(this.marEnes[3])),
      marEneP5: Number(formatInternalValue(this.marEnes[4])),
      marEneP6: Number(formatInternalValue(this.marEnes[5]))
    };
    
    this.electricityPredefinedRatesApiService
      .createNewPredefinedRate(newPredefinedRate)
      .subscribe(() => {
        this.activeModal.close(true);
      });
    
  }

  onGreenPowerCheckboxChange(): void {}

  deletePredefinedRate(): void {
    this.electricityPredefinedRatesApiService.deleteCurrentPredefinedRate().subscribe(() => {
      this.activeModal.close(true);
    });
  }
}
