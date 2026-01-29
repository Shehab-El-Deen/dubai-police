import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminOverview } from './components/admin-overview/admin-overview';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: AdminOverview
      },
      { 
        path: 'overview', 
        component: AdminOverview
      }
    ])
  ]
})
export class AdminUserModule {}
