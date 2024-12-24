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
      return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    }
    return null;
  }

  getRefreshTokenFromLocalStorage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
    }
    return null;
  }

  saveCredentialsToLocalStorage(data: any) {
    if (data.accessToken && data.refreshToken) {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, data.refreshToken);
    } else {
      throw new Error('Invalid response from server');
    }
  }

  getUserProfile() {
    return this.httpClient.get(`${this.baseURL}/user-profile`);
  }

  getUserClaims() {
    const accessToken = this.getAccessTokenFromLocalStorage();
    if (accessToken) {
      const claims = accessToken.split('.')[1];
      const decodedClaims = atob(claims);
      console.log('decodedClaims', decodedClaims);
      return JSON.parse(decodedClaims);
    } else {
      return null;
    }
  }
}
