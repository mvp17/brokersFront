
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { paths } from 'src/app/core/application/paths.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  public canActivate(): boolean {
    if (this.authService.loggedIn())
      return true;

    this.router.navigate([paths.signin]);
    return false;
  }
  
}
