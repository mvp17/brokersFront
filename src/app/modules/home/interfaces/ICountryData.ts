export interface DataPoint {
  name: string;
  value: number;
}

export interface CountryData {
  name: string;
  series: DataPoint[];
}
