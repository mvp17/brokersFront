import { Component } from '@angular/core';

@Component({
  selector: 'app-electricity-comparative-analysis',
  templateUrl: './electricity-comparative-analysis.component.html',
  styleUrls: ['./electricity-comparative-analysis.component.scss']
})
export class ElectricityComparativeAnalysisComponent {

	rate: string;
	rateOptions: string[];
  	showType2td: boolean;
	showType: boolean;
  	type: string;
	type2td: string;
  	productTypeOptions: string[];
  	type2tdOptions: string[];
  	cons: string[];
	pots: string[];
	pricesEneEN: string[];
	pricesPotEN: string[];
	clientPricesEne: string[];
	clientPricesPot: string[];
	agencyRate: string;
	agencyRateOptions: string[];
	predefinedRate: string;
	predefinedRateOptions: string[];
	annualSavings: string;
	monthlySavings: string;
	percentageSavings: string;
	annualCostClient: string;
	monthlyCostClient: string;
	annualCostEN: string;
	monthlyCostEN: string;

  	constructor() {
		this.rate = '';
		this.annualSavings = '';
		this.monthlySavings = '';
		this.percentageSavings = '';
		this.annualCostClient = '';
		this.monthlyCostClient = '';
		this.annualCostClient = '';
		this.annualCostEN = '';
		this.monthlyCostEN = '';
		this.predefinedRate = '';
		this.agencyRate = '';
		this.predefinedRateOptions = ['rate 1', 'rate 2']
		this.agencyRateOptions = ['Fuji', 'Gala', 'Williams'];
		this.rateOptions = ['2.0TD', '3.0TD'];
		this.productTypeOptions = ['Fixed', 'Indexed'];
		this.showType2td = false;
		this.showType = false;
		this.type = '';
		this.type2td = '';
		this.type2tdOptions = ['24h', 'Trio'];
		this.cons = ['', '', '', '', '', ''];
		this.pricesEneEN = ['', '', '', '', '', ''];
		this.clientPricesEne = ['', '', '', '', '', ''];
		this.pots = ['', '', '', '', '', ''];
		this.pricesPotEN = ['', '', '', '', '', ''];
		this.clientPricesPot = ['', '', '', '', '', ''];
  	}

  	selectRateOption(option: string) {
		this.rate = option;
		this.showType = true;
    	this.type = '';
    	this.type2td = '';
    	this.showType2td = false;
	}

  	selectTypeOption(type: string) {
		this.type = type;
    	if (this.rate === '2.0TD') {
			this.showType2td = true;
		}
		else {
			this.showType2td = false;
		}
	}

  	selectType2tdOption(type2td: string) {
		this.type2td = type2td;
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

	selectAgencyRateOption(agencyRate: string) : void {
		this.agencyRate = agencyRate;
	}

	selectPredefinedRateOption(predefinedRate: string): void {
		this.predefinedRate = predefinedRate;
	}

	printComparative(): void {

	}

	generateContract(): void {
		
	}
}
