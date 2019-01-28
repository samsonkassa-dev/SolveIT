/** @kal **/
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AUTH_ROUTES } from './Auth/auth.routes';
import { RESOURCES_ROUTES } from './resources/resources.routes';

import { ForumRoutes } from './forum/forum.route';
import { ProjectRoutes } from './project/project.route';
import { UserManagementRoutes } from './userManagement/userManagament.route';
import { CompetitionRoutes } from './competition/competition.route';
import { NEWS_ROUTES } from './news/news.router';
import { WinnerComponent } from './winnerProject/winner/winner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardGuardService } from './Auth/services/dashboard-guard.service';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingPageComponent },
  ...AUTH_ROUTES,
  ...ForumRoutes,
  ...ProjectRoutes,
  ...UserManagementRoutes,
  ...CompetitionRoutes,
  { path: 'resources', loadChildren: './resources/resources.module#ResourcesModule'},
  ...NEWS_ROUTES,
  {
    path: 'events', loadChildren: './solveitTeam/solveitTeam.module#SolveitTeamModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'winner',
    component: WinnerComponent,
    canActivate: [DashboardGuardService]
  }
];
