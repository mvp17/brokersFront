import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../login/auth/auth.service';
import { Observable } from 'rxjs';
import { ICountryData, IDataPoint } from '../interfaces/ICountryData';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL: string;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.URL = environment.urlBackendApi;
  }

  public getCountries(): Observable<ICountryData[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getIdToken()}`);
    return this.http.get<ICountryData[]>(this.URL + 'api/data/countries', { headers });
  }

  public getSingle(): Observable<IDataPoint[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getIdToken()}`);
    return this.http.get<IDataPoint[]>(this.URL + 'api/data/single', { headers });
  }
}
