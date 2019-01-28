import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardGuardService } from '../Auth/services/dashboard-guard.service';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [DashboardGuardService] }
];
