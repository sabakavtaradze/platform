import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RegisterData, RegistrationResponse } from 'src/app/interfaces/authentication/register-data'; // 🔑 Import DTO/Model
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service'; // 🔑 Import the new service
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  maxDate!: Date;
  minDate!: Date;
  errorEmail: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 12, 0, 1);
    this.minDate = new Date(currentYear - 120, 0, 1);

    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(6)],
        ],
        date: ['', Validators.required],
        
        // Password pattern: at least 6 length, uppercase, lowercase, and a symbol
        password: ['', [Validators.required, Validators.minLength(6), 
                        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\#\?\!\@\$\%\^\&\*\-]).{6,}$')]],
        
        repeatPassword: ['', Validators.required],
        
        acceptTerms: [false, Validators.requiredTrue], 
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  /**
   * Custom validator to check if password and repeatPassword fields match.
   */
  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (!password || !repeatPassword || password.value === repeatPassword.value) {
      return null;
    }
    
    return { passwordMismatch: true };
  }


  /**
   * Handles the form submission, validation, and API call for registration.
   */
  async signup(form: FormGroup): Promise<void> {
    this.errorEmail = false; 
    
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      this.scrollToFirstInvalidControl();
      return;
    }
    
    this.loading = true;

    const data: RegisterData = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
    };
    
    this.authService.register(data).subscribe({
        next: (response: RegistrationResponse) => {
            this.loading = false;
            
            if (response.isSuccess) {
                
                // 🔑 FIX: Safely check for 'response.data' which holds the UserID (number | undefined)
                if (response.data) {
                    const userID = response.data.toString();
                    
                    console.log('Registration successful. User ID:', response.data);
                    
                    // Store data for confirmation/verification page
                    localStorage.setItem('UserID', userID);
                    localStorage.setItem('verifId', form.value.email);
                    localStorage.setItem('verifpsw', form.value.password);
    
                    this.router.navigate(['/auth/registerconfrom']);
                } else {
                    // This scenario should not happen if the API is correct, but handles missing data
                    console.error('Registration succeeded but UserID data is missing from response.');
                    alert('Registration complete, but verification data is missing. Please check your email and try to log in.');
                    this.router.navigate(['/auth/login']);
                }

            } else {
                // API returned a logical failure (e.g., email already registered)
                this.errorEmail = true;
                console.error('Registration failed:', response.errorMessage);
            }
        },
        error: (err: HttpErrorResponse) => {
            this.loading = false;
            console.error('HTTP Post failed:', err);
            
            // Check for specific error status or message from API
            if (err.status === 409 || (err.error && err.error.errorMessage && err.error.errorMessage.includes('email already exists'))) {
                this.errorEmail = true;
            } else {
                // Generic error message
                this.errorEmail = false; 
                alert('A server error occurred. Please try again later.');
            }
        }
    });
  }

  /**
   * Finds the first invalid form field, scrolls it into view, and focuses it.
   */
  scrollToFirstInvalidControl(): void {
    // Note: Assumes the HTML form has the attribute #formid: <form #formid [formGroup]="form" ...>
    const formElement = document.getElementById('formid'); 
    if (formElement) {
        // Look for any control with the Angular 'ng-invalid' class
        const firstInvalidControl = formElement.querySelector('.ng-invalid');
        if (firstInvalidControl) {
            firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (firstInvalidControl as HTMLElement).focus();
        }
    }
  }
  
  /**
   * Recursively marks all controls in a FormGroup as touched, triggering visual error messages.
   */
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}