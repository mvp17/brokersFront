import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse } from '../../domain/AuthenticationResponse';
import { paths } from 'src/app/core/application/paths.routes';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];
  public signInForm: FormGroup;
  public submitted: boolean;

  constructor(
      public authService: AuthService,
      private fb: FormBuilder,
      private router: Router
    ) {
    this.subscriptions = [];
  }

  // convenience getter for easy access to form fields
  get signInFormControls() { return this.signInForm.controls; }

  ngOnInit() {
    this.signInForm = this.fb.group({
        email: ['', [
                      Validators.required, 
                      Validators.email,
                      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                    ]
              ],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public onSubmit(): void {
    this.submitted = true;

     // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value));

    this.subscriptions.push(
      this.authService.signIn(this.signInForm.value).subscribe((res: AuthenticationResponse) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['']);
      })
    );
  }

  public goToSignUp(): void {
    this.router.navigate([paths.signup]);
  }

  public resetForm(signInForm: FormGroup): void {
    signInForm.reset();
  }

}
