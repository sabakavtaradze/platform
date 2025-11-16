import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/user/authentication/authentication.service';

export const adminGuard: CanActivateFn = ():
  | boolean
  | UrlTree
  | import('rxjs').Observable<boolean | UrlTree> => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  const token = auth.getAuthToken();
  if (!token) {
    // Not authenticated → send to welcome
    return router.createUrlTree(['/auth/welcome']);
  }

  // Refresh to pick up latest role, then decide
  return auth.refreshTokenSilently().pipe(
    switchMap(() => {
      const isAdmin = auth.isAdmin();
      if (isAdmin) return of(true);
      // Authenticated but not admin → redirect to feed
      return of(router.createUrlTree(['/feed']));
    }),
    catchError(() => of(router.createUrlTree(['/auth/welcome'])))
  );
};
