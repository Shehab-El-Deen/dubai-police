import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QcOverview } from './components/qc-overview/qc-overview';
import { canDeactivateGuard } from '../../core/guards/can-deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QcOverview,
        canDeactivate: [canDeactivateGuard],
      },
      {
        path: 'overview',
        component: QcOverview,
        canDeactivate: [canDeactivateGuard],
      },
    ]),
  ],
})
export class QcUserModule {}
