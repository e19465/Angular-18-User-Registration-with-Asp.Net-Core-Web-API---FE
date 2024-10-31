import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private baseURL = environment.apiBaseUrl;

  userRegister(formData: any) {
    return this.httpClient.post(`${this.baseURL}/signup`, formData);
  }

  userLogin(formData: any) {
    return this.httpClient.post(`${this.baseURL}/signin`, formData);
  }

  refreshTokens() {
    console.log('Refreshing tokens...');
    return this.httpClient.post(`${this.baseURL}/user/refresh`, {
      RefreshToken: this.userService.getRefreshTokenFromLocalStorage(),
    });
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigateByUrl('/sign-in');
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.userService.getAccessTokenFromLocalStorage();
      return !!token;
    }
    return false;
  }
}
