import { Component } from '@angular/core';
import { multi, single } from '../../mock/data';
import { CountryData } from '../../interfaces/ICountryData';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor() {}

  view: [number, number] = [700, 400]; // Chart size
  multi: CountryData[] = multi;
  single: { name: string; value: number }[] = single;
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

  onSelect(event: any) {
    console.log(event);
  }
}
