// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'user';

  constructor() {}

  login(name: string): void {
    localStorage.setItem(this.USER_KEY, name);
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }
}
