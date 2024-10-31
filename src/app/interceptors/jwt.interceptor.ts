import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../shared/services/user.service';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';
import { HTTP_STATUS } from '../shared/constants/constants';

export const jWTInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);

  let isRefreshing = false;
  let accessToken = userService.getAccessTokenFromLocalStorage();

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return next(authRequest).pipe(
    catchError((error: any) => {
      if (error.status === HTTP_STATUS.HTTP_401_UNAUTHORIZED) {
        if (!isRefreshing && authService.isLoggedIn()) {
          isRefreshing = true;
          return authService.refreshTokens().pipe(
            switchMap((res: any) => {
              isRefreshing = false;
              if (!res.accessToken || !res.refreshToken) {
                throw new Error('Invalid response from server');
              }
              userService.saveCredentialsToLocalStorage(res);
              const newAccessToken = res.accessToken;

              const newAuthRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next(newAuthRequest);
            }),
            catchError((refreshError: any) => {
              isRefreshing = false;
              authService.logoutUser();
              toastr.info('Please login again', 'Session Expired');
              return throwError(() => refreshError);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
