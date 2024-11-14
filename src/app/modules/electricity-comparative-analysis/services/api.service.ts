import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../login/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IidNameDto } from 'src/app/core/interfaces/idNameDto';

@Injectable({
  providedIn: 'root'
})
export class ElectricityComparativeAnalysisApiService {
  
  private URL: string;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.URL = environment.urlBackendApi;
  }

  public getAgencyRates(): Observable<IidNameDto[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getIdToken()}`);
    return this.http.get<IidNameDto[]>(this.URL + 'api/electricityComparativeAnalysis/agencyRates', { headers });
  }
}
