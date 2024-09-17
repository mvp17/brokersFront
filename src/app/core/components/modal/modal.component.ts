import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'modal-boots',
    standalone: true,
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	imports: [CommonModule, NgbModule, FormsModule]
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
	type: string;
	type2td: string;
	cons: string[];
	pot: string[];

	constructor(public activeModal: NgbActiveModal) {
		this.createNewRateOrigin = false;
		this.cons = ['', '', '', '', '', ''];
		this.pot = ['', '', '', '', '', ''];
		this.readCurrentRateOrigin = false;
		this.showType2td = false;
		this.showType = false;
		this.showBasePriceGrid = false;
		this.productTypeOptions = ['Fixed', 'Indexed'];
		this.rateOptions = ['2.0TD', '3.0TD'];
		this.type2tdOptions = ['24h', 'Trio'];
		this.rate = '';
		this.type = '';
		this.type2td = '';
	}

	selectTypeOption(option: string) {
		this.type = option;
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
		}
		else {
			this.showType2td = false;
		}
	}

	saveNewRate() {
		console.log(this.cons, this.pot)
		this.activeModal.close('Close click');
	}
	// Converts dot to comma for display
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
		// Replace dots with commas and remove non-numeric characters except commas
		inputValue = inputValue.replace(/\./g, ',').replace(/[^0-9,]/g, '');
		
	  }

	  // Handle keypress to prevent invalid characters
	onKeyPress(event: KeyboardEvent): void {
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', 'Enter', ',', '.'];
		if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
		event.preventDefault();
		}
	}
}
