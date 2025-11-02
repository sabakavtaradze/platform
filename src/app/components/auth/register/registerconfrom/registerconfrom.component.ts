import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs'; 
import { RegistrationResponse } from 'src/app/interfaces/authentication/register-data'; 
import { ErrorCheckeService } from 'src/app/services/error-check.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Component({
  selector: 'app-registerconfrom',
  templateUrl: './registerconfrom.component.html',
  styleUrls: ['./registerconfrom.component.scss']
})
export class RegisterconfromComponent implements OnInit {
  code = "";
  username = ""; 
  email: any = "";
  password: any = ""; 
  UserID: any = ""; 
  
  showManualEmailInput: boolean = false;
  manualEmail: string = '';
  isUserIDMissing: boolean = false; 
  loading: boolean = false;

  constructor(
    private router: Router, 
    private errorService: ErrorCheckeService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // Load values from localStorage 
    this.email = localStorage.getItem("verifId") || ""; // Assuming 'verifId' holds the email
    this.password = localStorage.getItem("verifpsw") || "";
    this.UserID = localStorage.getItem("UserID") || "";

    const hasId = !!this.UserID;
    const hasEmail = !!this.email;

    if (!hasId && !hasEmail) {
      // Neither ID nor Email is present, require manual input
      this.showManualEmailInput = true;
      this.isUserIDMissing = true;
      console.warn("User data missing from storage. Manual email entry required.");
      return;
    }
    
    // Automatically attempt to resend the code using available data
    this.resendCode();
  }

  /**
   * Unifies the logic for resending the verification code.
   * Calls sendCodeByID if UserID is valid, otherwise calls sendCodeByEmail if email is present.
   */
 resendCode() {
  this.loading = true;

  const emailToUse = (this.manualEmail || this.email).trim().toLowerCase();
  if (!emailToUse) {
    this.loading = false;
    alert("Enter your email manually.");
    this.showManualEmailInput = true;
    return;
  }

  this.authService.sendCodeByEmail(emailToUse).subscribe({
    next: (response) => {
      this.loading = false;
      if (response.isSuccess) alert("Code sent.");
      else alert(response.errorMessage || 'Failed to send code.');
    },
    error: (err: HttpErrorResponse) => {
      this.loading = false;
      alert(this.errorService.extractMessage(err));
    }
  });
}
  /**
   * 🔑 NEW UNIFIED METHOD: Determines whether to call verifyByID or verifyByEmail.
   */
 handleVerification() {
  this.loading = true;

  const emailToUse = (this.manualEmail || this.email).trim().toLowerCase();
  const codeToUse = this.code.trim();

  if (!codeToUse) {
    this.loading = false;
    alert('Please enter the verification code.');
    return;
  }

  const dto = { email: emailToUse, code: codeToUse };

  this.authService.verifyByEmail(dto).subscribe({
    next: (response) => {
      this.loading = false;
      if (response.isSuccess) {
        alert("Account verified successfully!");
        this.handleSuccessfulVerification(false);
      } else {
        alert(response.errorMessage || 'Invalid code');
      }
    },
    error: (err: HttpErrorResponse) => {
      this.loading = false;
      alert(this.errorService.extractMessage(err));
    }
  });
}

  /**
   * Handles cleanup and navigation after successful verification/login.
   */
  handleSuccessfulVerification(forceLogin: boolean = false) {
    // Cleanup local storage items used for verification state
    localStorage.removeItem("verifId");
    localStorage.removeItem("verifpsw");
    localStorage.removeItem("UserID");
    
    if (forceLogin || !this.authService.getAuthToken()) {
        this.router.navigate(['/auth/login']); 
    } else {
        this.router.navigate(['']); 
    }
  }
}