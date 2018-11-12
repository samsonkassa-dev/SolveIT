/** @kal **/
import { Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AUTH_ROUTES } from "./Auth/auth.routes";
import { RESOURCES_ROUTES } from "./resources/resources.routes";

import { ForumRoutes } from "./forum/forum.route";
import { SolveitTeamRoutes } from "./solveitTeam/solveitTeam.route";
import { ProjectRoutes } from "./project/project.route";
import { UserManagementRoutes } from "./userManagement/userManagament.route";
import { CompetitionRoutes } from "./competition/competition.route";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NEWS_ROUTES } from "./news/news.router";
import { SolveitMgmtGuardService } from "./Auth/services/solveit-mgmt-guard.service";
import { AuthGuardService } from "./Auth/services/auth-guard.service";
import { DashboardGuardService } from "./Auth/services/dashboard-guard.service";
import { WinnerComponent } from "./winnerProject/winner/winner.component";

export const APP_ROUTES: Routes = [
  { path: "", component: LandingPageComponent },
  ...AUTH_ROUTES,
  ...ForumRoutes,
  ...ProjectRoutes,
  ...UserManagementRoutes,
  ...CompetitionRoutes,
  ...SolveitTeamRoutes,
  ...RESOURCES_ROUTES,
  ...NEWS_ROUTES,
  { path: "dashboard", component: DashboardComponent, canActivate: [] },
  { path: "winner", component: WinnerComponent, canActivate: [] }
];
