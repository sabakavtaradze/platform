// src/app/services/user/authentication/authentication.service.ts
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import {
  RegisterData,
  RegistrationResponse,
} from 'src/app/interfaces/authentication/register-data';
import { environment } from 'src/environments/environment';

/* ---------------------------------------------
   JWT Payload Interface (matches your backend)
--------------------------------------------- */
interface CustomTokenPayload extends JwtPayload {
  nameid?: string;
  email?: string;
  family_name?: string;
  role?: string | string[];
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
  userID?: number;
  email?: string;
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
  providedIn: 'root',
})
export class AuthenticationService implements CanActivate {
  authenticatedUser: AuthenticatedUser | null | undefined;

  private readonly apiUrlBase = `${environment.apiUrl}/api/auth/`;
  private readonly chatApiBase = `${environment.apiUrl}/api/Chat/`;
  private readonly TOKEN_KEY = 'authToken';
  private readonly VERIF_EMAIL_KEY = 'verifId';

  private authStateSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public authState$ = this.authStateSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  private hasValidToken(): boolean {
    const token = this.getAuthToken();
    return !!token;
  }

  /* ---------------------------------------------
     Token Helpers
  --------------------------------------------- */
  setAuthToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.authStateSubject.next(true);
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
    this.authStateSubject.next(false);
    console.log('🔴 Token removed from localStorage');
  }

  /* ---------------------------------------------
     API: Unseen Count
  --------------------------------------------- */
  getUnseenCount(): Observable<UnseenCountResponse> {
    const token = this.getAuthToken();
    const url = `${this.chatApiBase}unseen-count`;

    if (!token) {
      return of({
        data: 0,
        isSuccess: false,
        errorMessage: 'User not authenticated',
      } as UnseenCountResponse);
    }

    return this.http.get<UnseenCountResponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching unseen count:', error);
        return of({
          data: 0,
          isSuccess: false,
          errorMessage: error.message || 'Server error',
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
          console.error('Login failed:', response.errorMessage);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error during sign-in:', error);
        const backend = error.error?.errorMessage || error.error?.message;

        return of({
          data: '',
          isSuccess: false,
          errorMessage: backend || error.message || 'Server error',
        } as LoginResponse);
      })
    );
  }

  /* ---------------------------------------------
     Refresh Token (get latest roles/claims)
  --------------------------------------------- */
  refreshToken(): Observable<LoginResponse> {
    const url = `${this.apiUrlBase}refresh-token`;
    return this.http.post<LoginResponse>(url, {}).pipe(
      tap((res) => {
        if (res?.isSuccess && res.data) {
          this.setAuthToken(res.data);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error during refresh-token:', error);
        return of({
          data: '',
          isSuccess: false,
          errorMessage: error.error?.errorMessage || error.message || 'Server error',
          message: '',
        } as LoginResponse);
      })
    );
  }

  // Convenience: returns boolean success and does nothing if not authenticated
  refreshTokenSilently(): Observable<boolean> {
    const token = this.getAuthToken();
    if (!token) {
      return of(false);
    }
    return this.refreshToken().pipe(
      tap((res) => {
        if (!res.isSuccess) {
          console.warn('Token refresh failed');
        }
      }),
      map((res) => !!res?.isSuccess),
      catchError(() => of(false))
    );
  }

  isVerifiedByEmail(email: string): Observable<VerificationStatusResponse> {
    const url = `${this.apiUrlBase}is-verified-by-email`;
    const params = new HttpParams().set('email', email);
    return this.http.get<VerificationStatusResponse>(url, { params });
  }

  sendCodeByID(userId: number): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}send-code-by-id`;
    return this.http.post<RegistrationResponse>(url, { userId });
  }

  sendCodeByEmail(email: string): Observable<RegistrationResponse> {
    const url = `${this.apiUrlBase}send-code-by-email`;
    return this.http.post<RegistrationResponse>(url, { email });
  }

  verifyByCode(data: VerificationDTO) {
    return this.http.post<RegistrationResponse>(`${this.apiUrlBase}verify-code`, data);
  }

  verifyByID(data: VerificationDTO) {
    return this.http.post<RegistrationResponse>(`${this.apiUrlBase}verify-id`, data);
  }

  verifyByEmail(data: VerificationDTO) {
    return this.http.post<RegistrationResponse>(`${this.apiUrlBase}verify-email`, data);
  }

  /* ---------------------------------------------
     AUTH GUARD — Allows ALL logged users
--------------------------------------------- */
  canActivate(): boolean | UrlTree {
    const token = this.getAuthToken();

    if (!token) {
      return this.router.createUrlTree(['/auth/welcome']);
    }

    return true; // normal users and admin can enter website
  }

  /* ---------------------------------------------
     ADMIN CHECK (used in AdminGuard)
--------------------------------------------- */
  isAdmin(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Common places roles are stored
      const msRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const role = payload['role'];
      const roles = payload['roles'] as string[] | undefined;

      if (typeof msRole === 'string' && msRole.toLowerCase() === 'admin') return true;
      if (typeof role === 'string' && role.toLowerCase() === 'admin') return true;
      if (Array.isArray(roles) && roles.some((r) => (r || '').toLowerCase() === 'admin'))
        return true;

      return false;
    } catch {
      return false;
    }
  }
  /* ---------------------------------------------
     Decode & Validate User
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

      this.authenticatedUser = {
        attributes: {
          sub: tokenPayload.nameid,
          email: tokenPayload.email ?? '',
          family_name: tokenPayload.family_name ?? '',
        },
      };

      return this.authenticatedUser;
    } catch (error) {
      console.error('Failed to decode token:', error);
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
