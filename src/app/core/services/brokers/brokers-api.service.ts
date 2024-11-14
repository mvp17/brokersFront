import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/login/auth/auth.service';
import { environment } from 'src/environments/environment';
import { IidNameDto } from '../../interfaces/idNameDto';

@Injectable({
  providedIn: 'root'
})
export class BrokersApiService {

  private URL: string;
  brokers: IidNameDto[];
  filteredBrokers: IidNameDto[];
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.URL = environment.urlBackendApi;
    this.brokers = [];
    this.filteredBrokers = [];
  }

  public getBrokers(): Observable<IidNameDto[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getIdToken()}`);
    return this.http.get<IidNameDto[]>(this.URL + 'api/core/brokers', { headers });
  }
}
