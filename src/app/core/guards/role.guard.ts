import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const requestedRoute = state.url;
    const userRole = this.authService.getRoleForUsername(user.username);

    // Check if the user's role matches the requested route
    if (requestedRoute.includes('business') && userRole === 'business') {
      return true;
    }
    if (requestedRoute.includes('admin') && userRole === 'admin') {
      return true;
    }

    if (requestedRoute.includes('qc') && userRole === 'qc') {
      return true;
    }

    // Redirect to appropriate dashboard based on role
    if (userRole === 'business') {
      this.router.navigate(['/business']);
    } else if (userRole === 'qc') {
      this.router.navigate(['/qc']);
    } else if (userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const requestedRoute = state.url;
  const userRole = authService.getRoleForUsername(user.username);

  // Check if the user's role matches the requested route
  if (requestedRoute.includes('business') && userRole === 'business') {
    return true;
  }

  if (requestedRoute.includes('admin') && userRole === 'admin') {
    return true;
  }

  if (requestedRoute.includes('qc') && userRole === 'qc') {
    return true;
  }

  // Redirect to appropriate dashboard based on role
  if (userRole === 'business') {
    router.navigate(['/business']);
    return false;
  } else if (userRole === 'qc') {
    router.navigate(['/qc']);
    return false;
  } else if (userRole === 'admin') {
    router.navigate(['/admin']);
    return false;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
