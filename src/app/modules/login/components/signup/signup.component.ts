import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationResponse } from '../../interfaces/AuthenticationResponse';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];
  public signUpForm!: FormGroup;
  public submitted!: boolean;

  constructor( 
      public authService: AuthService,
      private fb: FormBuilder,
      private location: Location,
      private router: Router
    ) {
    this.subscriptions = [];
  }

  // convenience getter for easy access to form fields
  get signUpFormControls() { return this.signUpForm.controls; }

  ngOnInit() {
    this.signUpForm = this.fb.group({
        fullName: ['', Validators.required],
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
    if (this.signUpForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpForm.value));

    this.subscriptions.push(
      this.authService.signUp(this.signUpForm.value).subscribe((res: AuthenticationResponse) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['']);
      })
    );
  }

  public onCancel(): void {
    this.location.back();
  }

  public resetForm(form: FormGroup): void {
      form.reset();
  }
}
