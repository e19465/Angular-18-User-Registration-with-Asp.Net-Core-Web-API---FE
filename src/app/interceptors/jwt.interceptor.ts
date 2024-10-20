import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../shared/services/user.service';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const jWTInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const HTTP_403_FORBIDDEN = 403;
  const accessToken = userService.getAccessTokenFromLocalStorage();

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(authRequest).pipe(
    catchError((error: any) => {
      if (error.status === HTTP_403_FORBIDDEN) {
        return authService.refreshTokens().pipe(
          switchMap((res: any) => {
            if (!res.accessToken || !res.refreshToken) {
              throw new Error('Invalid response from server');
            }
            userService.saveCredentialsToLocalStorage(res);
            const newAuthRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`,
              },
            });
            return next(newAuthRequest);
          }),
          catchError((refreshError: any) => {
            authService.logoutUser();
            console.log('Error during token refresh:', refreshError);
            return throwError(() => refreshError); // Use throwError to return an observable with the error
          })
        );
      }
      return throwError(() => error); // Use throwError to return an observable with the original error
    })
  );
};
