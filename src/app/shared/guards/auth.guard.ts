import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

// Prevents unauthorized access to the application
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const claimReq = route.data['claimReq'] as Function;
    if (claimReq) {
      console.log('Hello');
      const claims = userService.getUserClaims();
      if (claims && claimReq(claims)) {
        return true;
      } else {
        router.navigateByUrl('/forbidden');
        return false;
      }
    } else {
      console.log('klo');
      return true;
    }
  } else {
    router.navigateByUrl('/sign-in');
    return false;
  }
};
