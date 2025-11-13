import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  LoginData,
  LoginResponse,
} from 'src/app/services/user/authentication/authentication.service';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  authFalse: boolean = false;
  usernotfound: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  private normalizeError(err: HttpErrorResponse): BaseResponse<any> {
    if (err.error && typeof err.error === 'object') {
      if ('isSuccess' in err.error && 'errorMessage' in err.error)
        return err.error as BaseResponse<any>;
    }
    return {
      isSuccess: false,
      data: null,
      errorMessage: err.error?.message || err.message || 'Unknown error',
    };
  }

  private storeCredentials(email: string, password: string, userId?: string) {
    localStorage.setItem('register_email', email);
    localStorage.setItem('register_psw', password);
    if (userId) localStorage.setItem('register_uid', userId);
    localStorage.setItem('verifId', email);
    localStorage.setItem('verifpsw', password);
  }

  signIn($event1: any, $event2: any): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authFalse = false;
    this.errorMessage = null;

    const email = this.f['email'].value;
    const password = this.f['password'].value;
    const loginData: LoginData = { email, password };

    this.authService
      .login(loginData)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.loading = false;
          const error = this.normalizeError(err);

          console.log("BACKEND ERROR MESSAGE >>>", error.errorMessage);
          console.log("FULL ERROR OBJECT >>>", err.error);

          // UNVERIFIED ACCOUNT
          if (
            error.errorMessage?.toLowerCase().includes('verify') ||
            err.error?.toString().toLowerCase().includes('verify')
          ) {
            const userId = (err.error?.userID ?? '').toString();
            this.storeCredentials(email, password, userId);
            this.router.navigate(['/auth/registerconfrom']);
            return of({ isSuccess: false } as LoginResponse);
          }

          // INVALID CREDENTIALS
          if (error.errorMessage == 'Invalid email or password.') {
            this.errorMessage = error.errorMessage ?? null;
            this.authFalse = true;
            return of({ isSuccess: false } as LoginResponse);
          }

          // ANY OTHER ERROR
          this.errorMessage = error.errorMessage ?? null;
          this.authFalse = true;
          return of({ isSuccess: false } as LoginResponse);
        }),

        switchMap((res: LoginResponse) => {
          return of(res);
        })
      )
      .subscribe((res) => {
        this.loading = false;

        console.log('SUBSCRIBE - Full response:', res);
        console.log('SUBSCRIBE - Error message:', res?.errorMessage);

        // Handle failure cases
        if (!res?.isSuccess) {
          // Check for unverified account
          if (res.errorMessage === 'Account not verified. Please verify your email first.') {
            console.log('UNVERIFIED DETECTED - Redirecting to registerconfrom');
            this.storeCredentials(email, password, res.userID?.toString());
            this.router.navigate(['/auth/registerconfrom']);
            return;
          }

          // Handle invalid credentials
          if (res.errorMessage === 'Invalid email or password.') {
            this.errorMessage = res.errorMessage;
            this.authFalse = true;
            return;
          }

          // Other errors
          this.errorMessage = res.errorMessage || 'An error occurred';
          this.authFalse = true;
          return;
        }

        // SUCCESS CASE
        this.storeCredentials(email, password, (res.userID ?? '').toString());
        this.router.navigate(['']);
      });
  }
}
