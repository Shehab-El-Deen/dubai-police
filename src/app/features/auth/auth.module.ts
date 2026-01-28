import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: Login },
      { path: 'signup', component: Signup }
    ]),
    Login,
    Signup
  ]
})
export class AuthModule {}
