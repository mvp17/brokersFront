import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../login/auth/auth.service';
import { IGetElectricityPredefinedRates } from '../interfaces/get-electricity-predefined-rates';
import { IPostElectricityPredefinedRates } from '../interfaces/post-electricity-predefined-rates';

@Injectable({
  providedIn: 'root',
})
export class predefinedRatesApiService {
  private URL: string;

  public predefinedRates: IGetElectricityPredefinedRates[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.URL = environment.urlBackendApi;
    this.predefinedRates = [];
  }

  public getPredefinedRates(): Observable<IGetElectricityPredefinedRates[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getIdToken()}`);
    return this.http.get<IGetElectricityPredefinedRates[]>(this.URL + 'api/predefinedRates', { headers });
  }

  public createNewPredefinedRate(newPredefinedRate: IPostElectricityPredefinedRates): Observable<IGetElectricityPredefinedRates> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getIdToken()}`);
    return this.http.post<IGetElectricityPredefinedRates>(this.URL + 'api/predefinedRates', newPredefinedRate, { headers });
  }
}
