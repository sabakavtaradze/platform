import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { RegistrationResponse } from 'src/app/interfaces/authentication/register-data';
import { ErrorCheckeService } from 'src/app/services/error-check.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Component({
  selector: 'app-registerconfrom',
  templateUrl: './registerconfrom.component.html',
  styleUrls: ['./registerconfrom.component.scss'],
})
export class RegisterconfromComponent implements OnInit {
  code = '';
  username = '';
  email: any = '';
  password: any = '';
  UserID: any = '';

  showManualEmailInput: boolean = false;
  manualEmail: string = '';
  isUserIDMissing: boolean = false;
  loading: boolean = false;
  private static readonly CODE_RESEND_COOLDOWN_MS = 120000; // 2 minutes

  constructor(
    private router: Router,
    private errorService: ErrorCheckeService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // Load values from localStorage
    // Prefer new canonical keys, fallback to legacy keys
    this.email = localStorage.getItem('register_email') || localStorage.getItem('verifId') || '';
    this.password = localStorage.getItem('register_psw') || localStorage.getItem('verifpsw') || '';
    this.UserID = localStorage.getItem('register_uid') || localStorage.getItem('UserID') || '';

    const hasId = !!this.UserID;
    const hasEmail = !!this.email;

    if (!hasId && !hasEmail) {
      // Neither ID nor Email is present, require manual input
      this.showManualEmailInput = true;
      this.isUserIDMissing = true;
      console.warn('User data missing from storage. Manual email entry required.');
      return;
    }

    // Automatically attempt to resend only if cooldown expired
    const lastSent = parseInt(localStorage.getItem('register_last_code_sent') || '0', 10);
    const now = Date.now();
    if (now - lastSent >= RegisterconfromComponent.CODE_RESEND_COOLDOWN_MS) {
      this.resendCode();
    } else {
      const remainingMs = RegisterconfromComponent.CODE_RESEND_COOLDOWN_MS - (now - lastSent);
      const remainingSec = Math.ceil(remainingMs / 1000);
      console.log(`Skip auto resend. Cooldown ${remainingSec}s remaining.`);
    }
  }

  /**
   * Unifies the logic for resending the verification code.
   * Calls sendCodeByID if UserID is valid, otherwise calls sendCodeByEmail if email is present.
   */
  resendCode() {
    // Cooldown guard
    const lastSent = parseInt(localStorage.getItem('register_last_code_sent') || '0', 10);
    const now = Date.now();
    if (now - lastSent < RegisterconfromComponent.CODE_RESEND_COOLDOWN_MS) {
      const remainingMs = RegisterconfromComponent.CODE_RESEND_COOLDOWN_MS - (now - lastSent);
      const remainingSec = Math.ceil(remainingMs / 1000);
      alert(`Please wait ${remainingSec}s before requesting a new code.`);
      return;
    }
    this.loading = true;
    let resend$: Observable<RegistrationResponse> = EMPTY;

    const userIdNumber = parseInt(this.UserID, 10);
    const hasValidId = !isNaN(userIdNumber) && userIdNumber > 0;
    const emailToUse = this.manualEmail || this.email;
    const hasEmail = !!emailToUse;

    // 🔑 FIX: PRIORITIZE EMAIL. If email is available, use it, regardless of ID status.
    if (hasEmail) {
      console.log(`Resending code using Email: ${emailToUse}`);
      resend$ = this.authService.sendCodeByEmail(emailToUse);

      // 🔑 FALLBACK: If NO email is available, check for a valid User ID.
    } else if (hasValidId) {
      console.log(`Email missing. Resending code using UserID: ${userIdNumber}`);
      resend$ = this.authService.sendCodeByID(userIdNumber);

      // 🛑 FAILURE: If neither email nor ID is available.
    } else {
      this.loading = false;
      console.error('Cannot resend code. Missing User ID and Email data.');
      alert('Cannot resend code. Please enter your email manually.');
      this.showManualEmailInput = true;
      return;
    }

    resend$.subscribe({
      next: (response: RegistrationResponse) => {
        this.loading = false;
        if (response.isSuccess) {
          alert('Verification code sent/resent successfully.');
          this.showManualEmailInput = false;
          localStorage.setItem('register_last_code_sent', Date.now().toString());
        } else {
          console.error('Server reported failure:', response.errorMessage);
          alert(`Error resending code: ${response.errorMessage || 'Failed to resend code.'}`);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('HTTP Error sending verification code:', err);
        // Assuming this.errorService is a property on the component
        alert(`A network error occurred: ${this.errorService.extractMessage(err)}`);
      },
    });
  }
  /**
   * 🔑 NEW UNIFIED METHOD: Determines whether to call verifyByID or verifyByEmail.
   */
  handleVerification() {
    this.loading = true;
    let verify$: Observable<RegistrationResponse> = EMPTY;

    const emailToUse = this.manualEmail || this.email;
    const userIdNumber = parseInt(this.UserID, 10);
    const codeToUse = this.code;

    const hasValidId = !isNaN(userIdNumber) && userIdNumber > 0;
    const hasEmail = !!emailToUse;

    if (!codeToUse) {
      this.loading = false;
      alert('Please enter the verification code.');
      return;
    }

    const verificationData = {
      userID: userIdNumber,
      email: emailToUse,
      code: codeToUse,
    };

    // 1. 🔑 NEW PRIORITY: Check for and prioritize verification by Email
    if (hasEmail) {
      console.log('Verifying by Email (Priority)...');
      verify$ = this.authService.verifyByEmail(verificationData);

      // 2. Fallback to verification by User ID if Email is missing
    } else if (hasValidId) {
      console.log('Verifying by User ID (Fallback)...');
      verify$ = this.authService.verifyByID(verificationData);
    } else {
      this.loading = false;
      alert('Cannot verify. Missing User ID and Email data.');
      return;
    }

    verify$.subscribe({
      next: (response: RegistrationResponse) => {
        this.loading = false;
        if (response.isSuccess) {
          if (response.token) {
            this.authService.setAuthToken(response.token);
            alert('Account verified and logged in successfully!');
            this.handleSuccessfulVerification();
          } else {
            alert('Account verified. Please log in manually.');
            this.handleSuccessfulVerification(true);
          }
        } else {
          alert(`Verification failed: ${response.errorMessage || 'Invalid code.'}`);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('API Verification error:', err);
        alert(`Verification failed: ${this.errorService.extractMessage(err)}`);
      },
    });
  }
  /**
   * Handles cleanup and navigation after successful verification/login.
   */
  handleSuccessfulVerification(forceLogin: boolean = false) {
    // Cleanup local storage items used for verification state
    // Legacy keys
    localStorage.removeItem('verifId');
    localStorage.removeItem('verifpsw');
    localStorage.removeItem('UserID');
    // Canonical keys
    localStorage.removeItem('register_email');
    localStorage.removeItem('register_psw');
    localStorage.removeItem('register_uid');

    if (forceLogin || !this.authService.getAuthToken()) {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['']);
    }
  }
}
