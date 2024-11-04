import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { predefinedRatesApiService } from '../../services/api.service';
import { IPostElectricityPredefinedRates } from '../../interfaces/post-electricity-predefined-rates';
import { IGetElectricityPredefinedRates } from '../../interfaces/get-electricity-predefined-rates';

@Component({
  selector: 'modal-boots',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule, NgbModule, FormsModule],
})
export class ModalComponent {
  @Input() createNewRateOrigin: boolean;
  @Input() readCurrentRateOrigin: boolean;

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
    private apiService: predefinedRatesApiService
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
      marPotP1: Number(this.formatInternalValue(this.marPots[0])),
      marPotP2: Number(this.formatInternalValue(this.marPots[1])),
      marPotP3: Number(this.formatInternalValue(this.marPots[2])),
      marPotP4: Number(this.formatInternalValue(this.marPots[3])),
      marPotP5: Number(this.formatInternalValue(this.marPots[4])),
      marPotP6: Number(this.formatInternalValue(this.marPots[5])),
      marEneP1: Number(this.formatInternalValue(this.marEnes[0])),
      marEneP2: Number(this.formatInternalValue(this.marEnes[1])),
      marEneP3: Number(this.formatInternalValue(this.marEnes[2])),
      marEneP4: Number(this.formatInternalValue(this.marEnes[3])),
      marEneP5: Number(this.formatInternalValue(this.marEnes[4])),
      marEneP6: Number(this.formatInternalValue(this.marEnes[5]))
    };
    this.apiService
      .createNewPredefinedRate(newPredefinedRate)
      .subscribe((newPredefinedRateCreated: IGetElectricityPredefinedRates) => {
        console.log(newPredefinedRateCreated);
        this.activeModal.close(true);
      });
  }

  onGreenPowerCheckboxChange(): void {}

  // Converts dot to comma for display (not strictly necessary with ngModel)
  formatDisplayValue(value: string): string {
    return value ? value.replace('.', ',') : '';
  }

  // Converts comma to dot for internal value
  formatInternalValue(value: string): string {
    return value ? value.replace(',', '.') : '';
  }

  // Handle input change
  onInputChange(event: any): void {
    let inputValue = event.target.value;

    // Replace dots with commas and keep only numbers and one comma
    const cleanedValue = this.cleanInput(inputValue);

    // Update the display value by formatting
    if (cleanedValue !== inputValue) {
      event.target.value = this.formatDisplayValue(cleanedValue);
    }
  }

  // Cleans the input to ensure only valid format is accepted
  cleanInput(value: string): string {
    // Remove all non-numeric characters except for a single comma
    const cleanedValue = value.replace(/[^0-9,]/g, '');

    // Match and format to '##,######'
    const regex = /^(\d{0,2})(,\d{0,6})?$/; // Matches '##,######'
    const match = cleanedValue.match(regex);

    if (match) {
      return match[0]; // Return the matched portion (valid format)
    } else {
      return ''; // Return an empty string if not matched
    }
  }

  // Handle keypress to prevent invalid characters
  onKeyPress(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Tab',
      'Enter',
      ',',
    ];
    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
