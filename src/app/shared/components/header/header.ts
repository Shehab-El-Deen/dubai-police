import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() centerText: string = '';
  @Input() showUserInfo: boolean = false;
  
  private authService = inject(AuthService);
  
  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get userRole() {
    const user = this.currentUser;
    if (user) {
      return this.authService.getRoleForUsername(user.username);
    }
    return '';
  }

  getUserInitials(): string {
    const user = this.currentUser;
    if (user?.username) {
      const parts = user.username.split('-');
      return parts.map(p => p.charAt(0).toUpperCase()).join('');
    }
    return 'U';
  }
}

