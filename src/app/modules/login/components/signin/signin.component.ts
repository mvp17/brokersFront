import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse } from '../../interfaces/AuthenticationResponse';
import { BrokersApiService } from 'src/app/core/services/brokers/brokers-api.service';
import { IidNameDto } from 'src/app/core/interfaces/idNameDto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];
  public signInForm!: FormGroup;
  public submitted!: boolean;

  constructor(
      public authService: AuthService,
      private fb: FormBuilder,
      private brokersApiService: BrokersApiService,
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
    this.subscriptions.push(
      this.authService.signIn(this.signInForm.value).subscribe((res: AuthenticationResponse) => {
        sessionStorage.setItem('token', res.token);
        this.authService.setFullName(res.fullName);
        this.getBrokers();
        this.router.navigate(['']);
      })
    );
  }

  private getBrokers() {
    this.brokersApiService.getBrokers().subscribe((brokers: IidNameDto[]) => {
      this.brokersApiService.brokers = brokers;
      this.brokersApiService.filteredBrokers = [...this.brokersApiService.brokers];
    })
  }

  public goToSignUp(): void {
    this.router.navigate(['/login/signup']);
  }

  public resetForm(signInForm: FormGroup): void {
    signInForm.reset();
  }

}
