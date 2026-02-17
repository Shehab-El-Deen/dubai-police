import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-review-sidebar',
  imports: [CommonModule],
  templateUrl: './review-sidebar.html',
  styleUrl: './review-sidebar.css',
})
export class ReviewSidebar {
  @Output() menuItemSelected = new EventEmitter<string>();
  
  constructor(private router: Router, private authService: AuthService) {}
  
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
    this.router.navigate(['/login']);
  }
}
