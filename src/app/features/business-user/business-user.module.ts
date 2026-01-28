import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessOverview } from './components/business-overview/business-overview';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: BusinessOverview
      },
      { 
        path: 'overview', 
        component: BusinessOverview
      }
    ])
  ]
})
export class BusinessUserModule {}
