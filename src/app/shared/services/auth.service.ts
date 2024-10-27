import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private httpClient = inject(HttpClient);
  private userService = inject(UserService);
  private baseURL = 'https://localhost:7288/api';
  private router = inject(Router);

  userRegister(formData: any) {
    return this.httpClient.post(`${this.baseURL}/signup`, formData);
  }

  userLogin(formData: any) {
    return this.httpClient.post(`${this.baseURL}/signin`, formData);
  }

  refreshTokens() {
    return this.httpClient.post(`${this.baseURL}/refresh`, {
      refresh: this.userService.getRefreshTokenFromLocalStorage(),
    });
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
