import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LocalStorageKeys } from '../constants/constants';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private baseURL = environment.apiBaseUrl;

  getAccessTokenFromLocalStorage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(LocalStorageKeys.accessToken);
    }
    return null;
  }

  getRefreshTokenFromLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.refreshToken);
  }

  saveCredentialsToLocalStorage(data: any) {
    localStorage.setItem(LocalStorageKeys.accessToken, data.accessToken);
    localStorage.setItem(LocalStorageKeys.refreshToken, data.refreshToken);
  }

  getUserProfile() {
    return this.httpClient.get(`${this.baseURL}/user-profile`);
  }
}
