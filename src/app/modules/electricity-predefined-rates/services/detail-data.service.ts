import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailDataService {
  public rate: string;
  public productType: string;
  public singlePrice: boolean;
  public type2td: string;
  public greenPower: boolean;
  public potFees: string[];
  public consFees: string[];
  
  constructor() {
    this.rate = '';
    this.productType = '';
    this.singlePrice = false;
    this.type2td = '';
    this.greenPower = false;
    this.potFees = ['1.10', '2.20', '3.30', '4.40', '5.50', '6.60'];
    this.consFees = ['7.10', '8.20', '9.30', '10.40', '11.50', '12.60'];
  }
}
