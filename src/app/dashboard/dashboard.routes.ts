import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardGuardService } from '../Auth/services/dashboard-guard.service';
import { CompetitionProjectsComponent } from '../competition/competitionProjects/competitionProjects.component';
import { UserProfileComponent } from '../userManagement/userProfile/userProfile.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardComponent, canActivate: [DashboardGuardService] }, 
  {path: 'competitions/:competitionId', component: CompetitionProjectsComponent, canActivate: [DashboardGuardService]},
  {path: 'userProfile/:userId', component: UserProfileComponent}
];
