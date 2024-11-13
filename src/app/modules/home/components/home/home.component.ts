import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ICountryData, IDataPoint } from '../../interfaces/ICountryData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];
  
  countries: ICountryData[];
  single: IDataPoint[];
  view: [number, number] = [700, 400]; // Chart size
  colorSchemeMulti: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  colorSchemeSingle = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle: string = 'Years';
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  constructor(private apiService: ApiService) {
    this.subscriptions = [];
    this.countries = [];
    this.single = [];
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  
  ngOnInit(): void {
    this.getCountries();
    this.getSingle();
  }

  private getCountries(): void {
    this.subscriptions.push(
      this.apiService.getCountries().subscribe((countries: ICountryData[]) => {
        this.countries = countries;
      })
    );
  }

  private getSingle(): void {
    this.subscriptions.push(
      this.apiService.getSingle().subscribe((single: IDataPoint[]) => {
        this.single = single;
      })
    );
  }

  onSelect(event: any) {
    console.log(event);
  }
}
