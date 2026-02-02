import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BusinessLayout } from './layouts/business-layout/business-layout';
import { QcLayout } from './layouts/qc-layout/qc-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'business',
    component: BusinessLayout,
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () =>
      import('./features/business-user/business-user.module').then(m => m.BusinessUserModule)
  },
  {
    path: 'qc',
    component: QcLayout,
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () =>
      import('./features/qc-user/qc-user.module').then(m => m.QcUserModule)
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () =>
      import('./features/admin-user/admin-user.module').then(m => m.AdminUserModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

