import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private httpClient = inject(HttpClient);
  private userService = inject(UserService);
  private baseURL = environment.apiBaseUrl;
  private router = inject(Router);

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

  isLoggedIn() {
    return !!this.userService.getAccessTokenFromLocalStorage();
  }
}
