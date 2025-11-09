import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  RegisterData,
  RegistrationResponse,
} from 'src/app/interfaces/authentication/register-data';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
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
        email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
        date: ['', Validators.required],

        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$')
        ]],

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
    };

    this.authService.register(data).subscribe({
      next: (response: RegistrationResponse) => {
        this.loading = false;

        if (response.isSuccess) {
          if (response.data) {
            const userID = response.data.toString();

            localStorage.setItem('register_uid', userID);
            localStorage.setItem('register_email', form.value.email);
            localStorage.setItem('register_psw', form.value.password);

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

        if (
          err.status === 409 ||
          (err.error &&
            err.error.errorMessage &&
            err.error.errorMessage.includes('email already exists'))
        ) {
          this.errorEmail = true;
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
}
