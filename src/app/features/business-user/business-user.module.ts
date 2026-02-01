import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessOverview } from './components/business-overview/business-overview';
import { canDeactivateGuard } from '../../core/guards/can-deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BusinessOverview,
        canDeactivate: [canDeactivateGuard],
      },
      {
        path: 'overview',
        component: BusinessOverview,
        canDeactivate: [canDeactivateGuard],
      },
    ]),
  ],
})
export class BusinessUserModule {}
