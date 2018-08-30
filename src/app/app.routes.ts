/** @kal **/
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AUTH_ROUTES } from './Auth/auth.routes';
import {RESOURCES_ROUTES} from './resources/resources.routes';

import { ForumRoutes } from "./forum/forum.route";
import { SolveitMgmtRoutes } from './solveitMgmt/solveitMgmt.route';
import { SolveitTeamRoutes } from "./solveitTeam/solveitTeam.route";
import { ProjectRoutes } from './project/project.route';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingPageComponent },
  ...AUTH_ROUTES,
  ...ForumRoutes,
  ...ProjectRoutes,
  ...SolveitMgmtRoutes,
  ...SolveitTeamRoutes,
  ...RESOURCES_ROUTES
];
