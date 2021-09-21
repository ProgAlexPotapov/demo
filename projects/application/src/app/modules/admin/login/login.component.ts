import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { authLogin, AppState, selectIsAuthenticated, AlertService } from '../../../core/core.module';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.less'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isAuthenticated$: Observable<boolean>;
  error = '';

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private store: Store<AppState>
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/catalog'])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.store.dispatch(authLogin());
          this.alertService.showInfo(this.translate.instant('success.login'), '');
        },
        error => {
          this.alertService.showError(this.translate.instant('error.login'), '');
          this.error = error;
          this.loading = false;
        });
  }
}
