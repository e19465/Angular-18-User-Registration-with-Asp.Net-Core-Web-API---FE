import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private baseURL = 'https://localhost:7288/api';
  private httpClient = inject(HttpClient);

  getAccessTokenFromLocalStorage() {
    return localStorage.getItem('accesToken') || '';
  }

  getRefreshTokenFromLocalStorage() {
    return localStorage.getItem('refreshToken') || '';
  }

  saveCredentialsToLocalStorage(data: any) {
    localStorage.setItem('accesToken', data.accesToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }
}
