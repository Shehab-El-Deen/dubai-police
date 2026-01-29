import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (user) => {
        // Determine where to redirect based on role
        const role = this.authService.getRoleForUsername(user.username);
        if (role === 'business') {
          this.router.navigate(['/business']);
        } else if (role === 'qc') {
          this.router.navigate(['/qc']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.error = error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}

