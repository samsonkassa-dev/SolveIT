/** @kal **/
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AUTH_ROUTES } from './Auth/auth.routes';
import {RESOURCES_ROUTES} from './resources/resources.routes';

import { ForumRoutes } from './forum/forum.route';
import { SolveitTeamRoutes } from './solveitTeam/solveitTeam.route';
import { ProjectRoutes } from './project/project.route';
import { UserManagementRoutes } from './userManagement/userManagament.route';
import { CompetitionRoutes } from './competition/competition.route';
import {DashboardComponent} from './dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingPageComponent },
  ...AUTH_ROUTES,
  ...ForumRoutes,
  ...ProjectRoutes,
  ...UserManagementRoutes,
  ...CompetitionRoutes,
  ...SolveitTeamRoutes,
  ...RESOURCES_ROUTES,
  { path: 'dashboard', component: DashboardComponent, canActivate: []}
];
