import { Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component';
import {NotSignedinGuardService} from './services/not-signedin-guard.service';

export const AUTH_ROUTES: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [NotSignedinGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [NotSignedinGuardService] },
  { path: 'confirm/:id', component: EmailConfirmationComponent, canActivate: [NotSignedinGuardService] }
];
