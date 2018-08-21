/** @kal **/
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AUTH_ROUTES } from './Auth/auth.routes';
export const APP_ROUTES: Routes = [
  { path: '', component: LandingPageComponent },
  ...AUTH_ROUTES,
];
