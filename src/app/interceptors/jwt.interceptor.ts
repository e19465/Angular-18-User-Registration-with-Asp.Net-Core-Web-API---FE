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
      console.log('Error in JWT interceptor:', error);
      if (error.status === HTTP_STATUS.HTTP_401_UNAUTHORIZED) {
        console.log('error: ', error);
        if (!isRefreshing && authService.isLoggedIn()) {
          isRefreshing = true;
          console.log('Token expired, refreshing token...');
          return authService.refreshTokens().pipe(
            switchMap((res: any) => {
              isRefreshing = false;
              if (!res.accessToken || !res.refreshToken) {
                throw new Error('Invalid response from server');
              }
              console.log('Token refreshed successfully:', res);
              userService.saveCredentialsToLocalStorage(res);
              const newAccessToken = res.accessToken;
              console.log('New access token:', newAccessToken);

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
              console.log('Error during token refresh:', refreshError);
              return throwError(() => refreshError);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
