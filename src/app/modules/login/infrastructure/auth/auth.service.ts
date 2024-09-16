import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../../domain/AuthenticationRequest';
import { RegisterRequest } from '../../domain/RegisterRequest';
import { AuthenticationResponse } from '../../domain/AuthenticationResponse';
import { Observable } from 'rxjs';
import { paths } from 'src/app/core/application/paths.routes';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string;

  constructor(private http: HttpClient, private router: Router) {
    this.URL = environment.urlBackendApi;
   }

  public signUp(request: RegisterRequest): Observable<AuthenticationResponse> {
    sessionStorage.setItem('email', request.email);
    return this.http.post<AuthenticationResponse>(this.URL + 'auth/register', request);
  }

  public signIn(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    sessionStorage.setItem('email', request.email);
    return this.http.post<AuthenticationResponse>(this.URL + 'auth/authenticate', request);
  }

  public loggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  public getIdToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  public logout(): void {
    if (confirm("Leaving already?")){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      this.router.navigate([paths.signin]);
    }
  }

}
