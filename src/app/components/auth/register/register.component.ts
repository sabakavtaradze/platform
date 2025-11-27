import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  RegisterData,
  RegistrationResponse,
} from 'src/app/interfaces/authentication/register-data';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
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
  ) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const today = new Date();
    this.maxDate = this.subtractYears(today, 18);
    this.minDate = this.subtractYears(today, 120);

    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
        date: ['', [Validators.required, this.dateRangeValidator.bind(this)]],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$'),
          ],
        ],

        repeatPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (!password || !repeatPassword || password.value === repeatPassword.value) {
      return null;
    }

    return { passwordMismatch: true };
  }

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
      BirthDate: this.formatBirthDate(form.value.date),
    };

    this.authService.register(data).subscribe({
      next: (response: RegistrationResponse) => {
        this.loading = false;

        if (response.isSuccess) {
          if (response.data) {
            const userID = response.data.toString();

            // Clear legacy keys to avoid stale state
            localStorage.removeItem('verifId');
            localStorage.removeItem('verifpsw');
            localStorage.removeItem('UserID');

            // Write canonical keys
            localStorage.setItem('register_uid', userID);
            localStorage.setItem('register_email', form.value.email);
            localStorage.setItem('register_psw', form.value.password);

            // Also write legacy keys for backward compatibility with confirm component
            localStorage.setItem('UserID', userID);
            localStorage.setItem('verifId', form.value.email);
            localStorage.setItem('verifpsw', form.value.password);

            localStorage.setItem('register_last_code_sent', Date.now().toString());

            this.router.navigate(['/auth/registerconfrom']);
          } else {
            alert('Registration complete, but verification data is missing.');
            this.router.navigate(['/auth/login']);
          }
        } else {
          this.errorEmail = true;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        console.error('Registration error:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.error?.errorMessage || err.message);
        console.error('Full error object:', err.error);

        if (
          err.status === 409 ||
          (err.error &&
            err.error.errorMessage &&
            err.error.errorMessage.includes('email already exists'))
        ) {
          this.errorEmail = true;
        } else if (err.status === 500) {
          this.errorEmail = false;
          const errorMsg = err.error?.errorMessage || err.error?.message || 'Internal server error';
          alert(
            `Server error: ${errorMsg}\n\nPlease check the console for more details or contact support.`
          );
        } else {
          this.errorEmail = false;
          alert('A server error occurred. Please try again later.');
        }
      },
    });
  }

  scrollToFirstInvalidControl(): void {
    const formElement = document.getElementById('formid');

    if (formElement) {
      const firstInvalidControl = formElement.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstInvalidControl as HTMLElement).focus();
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private subtractYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() - years);
    return result;
  }

  private dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const selectedDate = new Date(value);
    if (selectedDate < this.minDate || selectedDate > this.maxDate) {
      return { dateOutOfRange: true };
    }

    return null;
  }

  private formatBirthDate(value: string | Date | null): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString();
  }
}
