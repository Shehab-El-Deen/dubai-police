import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminOverview } from './components/admin-overview/admin-overview';
import { canDeactivateGuard } from '../../core/guards/can-deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: AdminOverview,
         canDeactivate: [canDeactivateGuard],
      },
      { 
        path: 'overview', 
        component: AdminOverview,
         canDeactivate: [canDeactivateGuard],
      }
    ])
  ]
})
export class AdminUserModule {}
