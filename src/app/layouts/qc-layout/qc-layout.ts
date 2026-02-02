import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-qc-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './qc-layout.html',
  styleUrl: './qc-layout.css',
})
export class QcLayout implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Prevent back navigation to login
    history.pushState(null, '', location.href);
  }

}
