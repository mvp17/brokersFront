export interface IDataPoint {
  name: string;
  value: number;
}

export interface ICountryData {
  name: string;
  series: IDataPoint[];
}
