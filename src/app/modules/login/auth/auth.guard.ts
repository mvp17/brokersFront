
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  public canActivate(): boolean {
    if (this.authService.loggedIn())
      return true;

    this.router.navigate(['/login/signin']);
    return false;
  }
  
}
