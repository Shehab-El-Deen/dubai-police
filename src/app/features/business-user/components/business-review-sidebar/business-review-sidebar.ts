import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-business-review-sidebar',
  imports: [],
  templateUrl: './business-review-sidebar.html',
  styleUrl: './business-review-sidebar.css',
})
export class BusinessReviewSidebar {
 @Output() menuItemSelected = new EventEmitter<string>();
  
 constructor( private router: Router,
  private authService: AuthService) {}
  requestsExpanded = true;
  activeMenuItem = 'overview';

  toggleRequests() {
    this.requestsExpanded = !this.requestsExpanded;
  }

selectMenuItem(menuItem: string) {
  this.activeMenuItem = menuItem;
  this.menuItemSelected.emit(menuItem); 
}

  logout() {
     this.authService.logout();
  
  // Redirect to login page
  this.router.navigate(['/login']);
  }

  onCreateRequest() {
    this.activeMenuItem = 'create-request';
    this.menuItemSelected.emit('create-request');
  }

    onSubmitRequest() {
    this.activeMenuItem = 'submit-request';
    this.menuItemSelected.emit('submit-request');
  }
}
