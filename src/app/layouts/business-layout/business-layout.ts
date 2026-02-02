import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-business-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './business-layout.html',
  styleUrl: './business-layout.css',
})
export class BusinessLayout implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Prevent back navigation to login
    history.pushState(null, '', location.href);
  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    // If user is authenticated, prevent going back to login
    if (this.authService.isAuthenticated()) {
      history.pushState(null, '', location.href);
      // Stay on current page
      this.router.navigate(['/business'], { replaceUrl: true });
    }
  }
}
