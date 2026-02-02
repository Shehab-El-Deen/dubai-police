import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterOutlet,Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Prevent back navigation to login
    history.pushState(null, '', location.href);
  }

}