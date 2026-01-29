import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-review-sidebar',
  imports: [CommonModule],
  templateUrl: './admin-review-sidebar.html',
  styleUrl: './admin-review-sidebar.css',
})
export class AdminReviewSidebar {
  @Output() menuItemSelected = new EventEmitter<string>();
  
  constructor(private router: Router, private authService: AuthService) {}
  
  activeMenuItem = 'overview';

  selectMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
    this.menuItemSelected.emit(menuItem);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
