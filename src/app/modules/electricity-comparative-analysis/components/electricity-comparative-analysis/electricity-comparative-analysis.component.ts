import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectricityComparativeAnalysisApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { ElectricityPredefinedRatesApiService } from 'src/app/modules/electricity-predefined-rates/services/api.service';
import { IGetElectricityPredefinedRates } from 'src/app/modules/electricity-predefined-rates/interfaces/get-electricity-predefined-rates';
import { IidNameDto } from 'src/app/core/interfaces/idNameDto';

@Component({
  selector: 'app-electricity-comparative-analysis',
  templateUrl: './electricity-comparative-analysis.component.html',
  styleUrls: ['./electricity-comparative-analysis.component.scss']
})
export class ElectricityComparativeAnalysisComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[];
	
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
	agencyRateId: number;
	agencyRateOptions: IidNameDto[];
	predefinedRateId: number;
	predefinedRateOptions: IidNameDto[];
	annualSavings: string;
	monthlySavings: string;
	percentageSavings: string;
	annualCostClient: string;
	monthlyCostClient: string;
	annualCostEN: string;
	monthlyCostEN: string;
	isAgencyRatesDropdown: boolean = false;
	isPredefinedRatesDropdown: boolean = false;

  	constructor(
		private electricityComparativeAnalysisApiService: ElectricityComparativeAnalysisApiService,
		private electricityPredefinedRatesApiService: ElectricityPredefinedRatesApiService
	) {
		this.subscriptions = [];
		this.rate = '';
		this.annualSavings = '';
		this.monthlySavings = '';
		this.percentageSavings = '';
		this.annualCostClient = '';
		this.monthlyCostClient = '';
		this.annualCostClient = '';
		this.annualCostEN = '';
		this.monthlyCostEN = '';
		this.predefinedRateId = 0;
		this.agencyRateId = 0;
		this.predefinedRateOptions = [];
		this.agencyRateOptions = [];
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

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
	ngOnInit(): void {
		this.getAgencyRates();
		this.getPredefinedRates();
	}

	getAgencyRates() {
		this.subscriptions.push(
      		this.electricityComparativeAnalysisApiService.getAgencyRates().subscribe((agencyRates: IidNameDto[]) => {
				console.log(agencyRates)
				this.agencyRateOptions = agencyRates;
			})
		);
	}
	getPredefinedRates() {
		this.subscriptions.push(
			this.electricityPredefinedRatesApiService.getPredefinedRates().subscribe((predefinedRates: IGetElectricityPredefinedRates[]) => {				
				console.log(predefinedRates)
				predefinedRates.map((predefinedRate: IGetElectricityPredefinedRates) => {
					this.predefinedRateOptions.push(
						{
							id: predefinedRate.id,
							name: predefinedRate.name
						}
					);
				});
		  })
	  );
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

	selectAgencyRateOption(agencyRateId: number) : void {
		this.agencyRateId = agencyRateId;
		this.isPredefinedRatesDropdown = true;
	}

	selectPredefinedRateOption(predefinedRateId: number): void {
		this.predefinedRateId = predefinedRateId;
		this.isAgencyRatesDropdown = true;
	}

	resetPriceSelection() {
		this.agencyRateId = 0;
		this.predefinedRateId = 0;
		this.isAgencyRatesDropdown = false;
		this.isPredefinedRatesDropdown = false;
	}

	printComparative(): void {

	}

	generateContract(): void {
		
	}
}
