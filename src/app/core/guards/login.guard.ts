import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const LoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // If user is authenticated AND has already navigated after login
  if (authService.isAuthenticated() && authService.hasNavigated()) {
    const user = authService.getCurrentUser();
    if (user) {
      const role = authService.getRoleForUsername(user.username);
      
      if (role === 'business') {
        router.navigate(['/business']);
      } else if (role === 'qc') {
        router.navigate(['/qc']);
      } else if (role === 'admin') {
        router.navigate(['/admin']);
      }
    }
    return false;
  }
  
  // Allow access to login page
  return true;
};