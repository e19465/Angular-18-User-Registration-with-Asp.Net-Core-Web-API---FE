import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constants/constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private baseURL = environment.apiBaseUrl;
  private httpClient = inject(HttpClient);

  getAccessTokenFromLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.accessToken) || '';
  }

  getRefreshTokenFromLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.refreshToken) || '';
  }

  saveCredentialsToLocalStorage(data: any) {
    localStorage.setItem(LocalStorageKeys.accessToken, data.accessToken);
    localStorage.setItem(LocalStorageKeys.refreshToken, data.refreshToken);
  }

  getUserProfile() {
    return this.httpClient.get(`${this.baseURL}/user-profile`);
  }
}
