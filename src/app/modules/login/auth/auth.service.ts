import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../interfaces/AuthenticationRequest';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { AuthenticationResponse } from '../interfaces/AuthenticationResponse';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string;
  private fullName: string;

  constructor(private http: HttpClient, private router: Router) {
    this.URL = environment.urlBackendApi;
    this.fullName = "";
  }

  public getFullName(): string {
    return this.fullName;
  }

  public setFullName(fullName: string): void {
    this.fullName = fullName;
  }

  public signUp(request: RegisterRequest): Observable<AuthenticationResponse> {
    sessionStorage.setItem('email', request.email);
    return this.http.post<AuthenticationResponse>(this.URL + 'auth/signup', request);
  }

  public signIn(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    sessionStorage.setItem('email', request.email);
    return this.http.post<AuthenticationResponse>(this.URL + 'auth/login', request);
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
      this.router.navigate(['/login/signin']);
    }
  }

}
