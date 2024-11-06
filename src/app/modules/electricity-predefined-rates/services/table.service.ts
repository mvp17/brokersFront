import { Injectable } from '@angular/core';
import { ElectricityPredefinedRatesResultDataTable } from '../interfaces/electricity-predefined-rates-result-data-table';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  public results: ElectricityPredefinedRatesResultDataTable[];
  public pageNumber: number;
  public pageResults: number;
  public orderBy: string;

  constructor() {
    this.results = [];
    this.pageNumber = 0;
    this.pageResults = 0;
    this.orderBy = '';
  }
}

export const HEADERS = {
  tableHeader: [
    {
      width: '',
      value: 'RATE ID',
      windowSize: 0,
      isPrincipal: true,
      isOrdenable: true,
      isFiltrable: true,
      order: '',
      busqueda: '',
      isHidden: false,
      orderName: 'rateId',
    },
    {
      width: '',
      value: 'RATE NAME',
      windowSize: 0,
      isPrincipal: false,
      isOrdenable: true,
      isFiltrable: true,
      order: '',
      busqueda: '',
      isHidden: false,
      orderName: 'rateName',
    },
    {
      width: '',
      value: 'RATE',
      windowSize: 0,
      isPrincipal: false,
      isOrdenable: true,
      isFiltrable: true,
      order: '',
      busqueda: '',
      isHidden: false,
      orderName: 'rate',
    },
    {
      width: '',
      value: 'PRODUCT TYPE',
      windowSize: 0,
      isPrincipal: false,
      isOrdenable: true,
      isFiltrable: true,
      order: '',
      busqueda: '',
      isHidden: false,
      orderName: 'productType',
    },
    {
      width: '',
      value: 'SINGLE PRICE',
      windowSize: 0,
      isPrincipal: false,
      isOrdenable: true,
      isFiltrable: true,
      order: '',
      busqueda: '',
      isHidden: false,
      orderName: 'singlePrice',
    },
    {
      width: '',
      value: 'GREEN POWER',
      windowSize: 0,
      isPrincipal: false,
      isOrdenable: true,
      isFiltrable: true,
      order: '',
      busqueda: '',
      isHidden: false,
      orderName: 'greenPower',
    },
    {
      width: '',
      value: '',
      windowSize: 0,
      isPrincipal: false,
      isOrdenable: false,
      isFiltrable: false,
      order: '',
      busqueda: '',
      isHidden: false,
      orderName: '',
      action: 'excel',
    }
  ],
};