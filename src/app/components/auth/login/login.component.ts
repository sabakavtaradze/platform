import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  LoginData,
  LoginResponse,
  // Assuming VerificationStatusResponse is needed but not imported explicitly here
} from 'src/app/services/user/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  // used by template
  authFalse: boolean = false;
  usernotfound: boolean = false;

  // Use a constant for consistency across checks
  private readonly UNVERIFIED_TEXT = 'account not verified. please verify your email first.';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Getter for easy access to form controls in the template
   */
  get f() { return this.loginForm.controls; } // 🎯 FIX: Added missing getter

  /**
   * Normalize a backend HTTP error payload that might be:
   * - an object with errorMessage / userID
   * - a string (JSON or plain)
   */
  private normalizeHttpError(err: HttpErrorResponse): { errorMessage: string; userID?: number } {
    let msg = '';
    let uid: number | undefined;

    try {
      if (typeof err.error === 'string') {
        // try to parse JSON string
        const maybe = JSON.parse(err.error);
        msg = (maybe?.errorMessage || maybe?.message || err.message || '').toString();
        uid = typeof maybe?.userID === 'number' ? maybe.userID : undefined;
      } else if (err.error && typeof err.error === 'object') {
        msg = (err.error.errorMessage || err.error.message || err.message || '').toString();
        uid = typeof err.error.userID === 'number' ? err.error.userID : undefined;
      } else {
        msg = err.message || '';
      }
    } catch {
      msg = (err.message || '').toString();
    }

    return { errorMessage: msg, userID: uid };
  }

  private toLowerSafe(s?: string | null) {
    return (s ?? '').toLowerCase();
  }

  /**
   * Handles the login submission. Arguments are ignored, data is read from the form.
   * We keep the arguments to satisfy the HTML template binding without errors.
   */
  signIn($event1: any, $event2: any): void { // 🎯 FIX: Changed signature to accept arguments for HTML compatibility

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authFalse = false;
    this.usernotfound = false;
    this.errorMessage = null;

    // 🎯 FIX: Read data directly from the form for correctness
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    const loginData: LoginData = { email, password };

    this.authService.login(loginData).pipe(

      // Handle raw HTTP errors (e.g., 400) and convert into stream
      catchError((err: HttpErrorResponse) => {
        const { errorMessage, userID } = this.normalizeHttpError(err);

        // If this is the unverified-account case, stash keys and redirect
        if (this.toLowerSafe(errorMessage).includes(this.UNVERIFIED_TEXT)) {
          localStorage.setItem('register_email', email);
          localStorage.setItem('register_psw', password); // 🎯 FIX: Stash password
          // even if userID is missing in error, store empty string to keep keys consistent
          localStorage.setItem('register_uid', (userID ?? '').toString());
          this.loading = false;
          this.router.navigate(['/auth/registerconfrom']);
          // return a short-circuit value so downstream doesn't run
          return of({ isSuccess: false } as LoginResponse);
        }

        // Other errors -> show message and stop
        this.loading = false;
        this.errorMessage = errorMessage || 'Connection error';
        this.authFalse = true;
        return of({ isSuccess: false } as LoginResponse);
      }),

      // Successful HTTP response path (still could be business-failure)
      switchMap((res: LoginResponse) => {
        if (!res || !res.isSuccess) {
          // Business-level failure from API (200 with isSuccess=false)
          const msg = this.toLowerSafe(res?.errorMessage);

          // Same unverified check here
          if (msg.includes(this.UNVERIFIED_TEXT)) {
            localStorage.setItem('register_email', email);
            localStorage.setItem('register_psw', password); // 🎯 FIX: Stash password
            localStorage.setItem('register_uid', (res.userID ?? '').toString());
            this.loading = false;
            this.router.navigate(['/auth/registerconfrom']);
            return of(res);
          }

          // Other business error → show UI flags
          this.loading = false;
          this.errorMessage = res?.errorMessage || 'Invalid email or password';
          if (this.errorMessage.toLowerCase().includes('not found')) {
            this.usernotfound = true;
          } else {
            this.authFalse = true;
          }
          return of(res);
        }

        // SUCCESS login: stash keys (email + password + userID) then check verification
        localStorage.setItem('verifId', email);
        localStorage.setItem('verifpsw', password); // 🎯 FIX: Stash password
        localStorage.setItem('register_uid', (res.userID ?? '').toString());

        return this.authService.isVerifiedByEmail(email);
      })

    ).subscribe((ver: any) => {
      // This runs for success path (isVerifiedByEmail result) or if earlier returned a value
      this.loading = false;

      // If earlier we short-circuited with an error object or null, ver might be a non-object or non-verification response
      if (!ver || typeof ver !== 'object' || typeof ver.data === 'undefined') return;

      // Verified -> home; Not verified -> confirmation
      if (ver.data === true) {
        this.router.navigate(['']);
      } else {
        console.log(ver)
         localStorage.setItem('verifId', email);
        localStorage.setItem('verifpsw', password); // 🎯 FIX: Stash password

        this.router.navigate(['/auth/registerconfrom']);
      }
    });
  }
}