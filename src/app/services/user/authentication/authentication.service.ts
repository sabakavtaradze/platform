// src/app/services/user/authentication/authentication.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { RegisterData, RegistrationResponse } from 'src/app/interfaces/authentication/register-data';
import { environment } from 'src/environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';

/* ---------------------------------------------
   JWT Payload Interface (matches your backend)
--------------------------------------------- */
interface CustomTokenPayload extends JwtPayload {
  nameid?: string;
  email?: string;
  family_name?: string;
  role?: string;
}

/* ---------------------------------------------
   Shared Interfaces
--------------------------------------------- */
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: string;
  userID?: number;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
}

export interface VerificationStatusResponse {
  data: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
}

export interface UserAttributes {
  sub: string;
  email: string;
  family_name: string;
}

export interface AuthenticatedUser {
  attributes: UserAttributes;
}

interface SendCodeByIDDTO {
  userId: number;
}

interface SendCodeByEmailDTO {
  email: string;
}

interface VerificationDTO {
<<<<<<< HEAD
  userID?: number;   // optional
  email?: string;    // optional
=======
  userID: number;
  email: string;
>>>>>>> 8d5ef69 (removed mostly aws and created functions for .net)
  code: string;
}

export interface UnseenCountResponse {
  data: number;
  isSuccess: boolean;
  errorMessage: string;
}

/* ---------------------------------------------
   Main Authentication Service
--------------------------------------------- */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  authenticatedUser: AuthenticatedUser | null | undefined;

  private readonly apiUrlBase = `${environment.apiUrl}/api/auth/`;
  private readonly chatApiBase = `${environment.apiUrl}/api/Chat/`;
  private readonly TOKEN_KEY = 'authToken';
  private readonly VERIF_EMAIL_KEY = 'verifId';

  constructor(private router: Router, private http: HttpClient) {}

  /* ---------------------------------------------
     Token Management Helpers
  --------------------------------------------- */
  setAuthToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log('🟢 Token saved to localStorage');
  }

  setUnverifiedEmail(email: string): void {
    localStorage.setItem(this.VERIF_EMAIL_KEY, email);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authenticatedUser = null;
    console.log('🔴 Token removed from localStorage');
  }

  /* ---------------------------------------------
     API: Unseen Count (relies on AuthInterceptor)
  --------------------------------------------- */
  getUnseenCount(): Observable<UnseenCountResponse> {
    const token = this.getAuthToken();
    const url = `${this.chatApiBase}unseen-count`;

    if (!token) {
      return of({
        data: 0,
        isSuccess: false,
        errorMessage: 'User not authenticated'
      } as UnseenCountResponse);
    }

    return this.http.get<UnseenCountResponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching unseen count:', error);
        return of({
          data: 0,
          isSuccess: false,
          errorMessage: error.message || 'Server error'
        });
      })
    );
  }

  /* ---------------------------------------------
     Core API Methods
  --------------------------------------------- */
  register(data: RegisterData): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}register`;
    return this.http.post<RegistrationResponse>(url, data);
  }

  login(data: LoginData): Observable<LoginResponse> {
    const url = `${this.apiUrlBase}login`;
    return this.http.post<LoginResponse>(url, data).pipe(
      tap((response) => {
        if (response.isSuccess && response.data) {
          this.setAuthToken(response.data);
        } else {
          this.removeAuthToken();
          console.error(
            'Login failed (API):',
            response.errorMessage || response.message || 'Unknown reason.'
          );
        }
      }),
      catchError((error) => {
        console.error('HTTP Error during sign-in:', error);
        this.removeAuthToken();
        return of({
          data: '',
          isSuccess: false,
          errorMessage: error.message || 'Server error',
          message: 'Failed to connect'
        } as LoginResponse);
      })
    );
  }

  isVerifiedByEmail(email: string): Observable<VerificationStatusResponse> {
    const url = `${this.apiUrlBase}is-verified-by-email`;
    let params = new HttpParams().set('email', email);
    return this.http.get<VerificationStatusResponse>(url, { params });
  }

  sendCodeByID(userId: number): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}send-code-by-id`;
    const dto: SendCodeByIDDTO = { userId };
    return this.http.post<RegistrationResponse>(url, dto);
  }

  sendCodeByEmail(email: string): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}send-code-by-email`;
    const dto: SendCodeByEmailDTO = { email };
    return this.http.post<RegistrationResponse>(url, dto);
  }

  verifyByCode(data: VerificationDTO): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}verify-code`;
    return this.http.post<RegistrationResponse>(url, data);
  }

  verifyByID(data: VerificationDTO): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}verify-id`;
    return this.http.post<RegistrationResponse>(url, data);
  }

<<<<<<< HEAD
verifyByEmail(data: { email: string; code: string }): Observable<RegistrationResponse> {
  const url = `${this.apiUrlBase}verify-email`;
  return this.http.post<RegistrationResponse>(url, data);
}
=======
  verifyByEmail(data: VerificationDTO): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}verify-email`;
    return this.http.post<RegistrationResponse>(url, data);
  }
>>>>>>> 8d5ef69 (removed mostly aws and created functions for .net)

  /* ---------------------------------------------
     Auth Guard
  --------------------------------------------- */
  canActivate(): boolean | UrlTree {
    const token = this.getAuthToken();
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      this.router.navigate(['/auth/welcome']);
      return false;
    }
    return true;
  }

  /* ---------------------------------------------
     Decode JWT & Validate User
  --------------------------------------------- */
  async GuardUserAuth(): Promise<AuthenticatedUser | null> {
    const token = this.getAuthToken();

    if (!token) {
      this.authenticatedUser = null;
      return null;
    }

    try {
      const tokenPayload = jwtDecode<CustomTokenPayload>(token);
      const now = Date.now() / 1000;

      if (tokenPayload.exp && tokenPayload.exp < now) {
        console.warn('⚠️ Token expired. Logging out.');
        this.logout();
        return null;
      }

      if (!tokenPayload.nameid) {
        console.error("Token missing 'nameid'.");
        this.logout();
        return null;
      }

      const userAttributes: UserAttributes = {
        sub: tokenPayload.nameid,
        email: tokenPayload.email ?? '',
        family_name: tokenPayload.family_name ?? ''
      };

      this.authenticatedUser = { attributes: userAttributes };
      return this.authenticatedUser;
    } catch (error) {
      console.error('Failed to decode or process token:', error);
      this.logout();
      return null;
    }
  }

  /* ---------------------------------------------
     Logout
  --------------------------------------------- */
  logout(): void {
    this.removeAuthToken();
    this.router.navigate(['/welcome']);
  }
}
