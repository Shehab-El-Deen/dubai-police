import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage()
  );

  private hasNavigatedAfterLogin = false;

/**
 * Mark that user has navigated after login
 */
setNavigatedAfterLogin(): void {
  this.hasNavigatedAfterLogin = true;
  localStorage.setItem('hasNavigatedAfterLogin', 'true');
}

/**
 * Check if user has navigated after login
 */
hasNavigated(): boolean {
  return this.hasNavigatedAfterLogin || localStorage.getItem('hasNavigatedAfterLogin') === 'true';
}

/**
 * Reset navigation flag
 */
private resetNavigationFlag(): void {
  this.hasNavigatedAfterLogin = false;
  localStorage.removeItem('hasNavigatedAfterLogin');
}
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  /**
   * Authenticate user with username and password
   */
  login(username: string, password: string): Observable<User> {
    return new Observable(observer => {
      // TODO: Replace with actual backend API call
      const user: User = {
        username,
        email: `${username}@dubaipoliceDashboard.ae`,
        role: this.determineRole(username)
      };
      
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
       this.setNavigatedAfterLogin();
      this.currentUserSubject.next(user);
      
      observer.next(user);
      observer.complete();
    });
  }

  /**
   * Logout the current user
   */
  logout(): void {
    localStorage.removeItem('currentUser');
      this.resetNavigationFlag();
    this.currentUserSubject.next(null);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Determine role based on username
   */
  private determineRole(username: string): string {
    if (username.toLowerCase().includes('business')) {
      return 'business';
    } else if (username.toLowerCase().includes('qc')) {
      return 'qc';
    } else if (username.toLowerCase().includes('admin')) {
      return 'admin';
    }
    return 'user';
  }

  /**
   * Get role based on username
   */
  getRoleForUsername(username: string): string {
    return this.determineRole(username);
  }

  /**
   * Retrieve user from localStorage
   */
  private getUserFromStorage(): User | null {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }
}
