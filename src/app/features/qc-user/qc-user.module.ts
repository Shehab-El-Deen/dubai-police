import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QcOverview } from './components/qc-overview/qc-overview';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: QcOverview
      },
      { 
        path: 'overview', 
        component: QcOverview
      }
    ])
  ]
})
export class QcUserModule {}
