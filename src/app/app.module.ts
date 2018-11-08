import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ToastOptions } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {RouterModule} from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AuthModule } from './Auth/auth.module';
import { ApiService } from './shared/services/api.service';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {ResourcesModule} from './resources/resources.module';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {BsModalModule} from 'ng2-bs3-modal';
import { ProjectModule } from './project/project.module';
import { UserManagementModule } from './userManagement/userManagement.module';
import {ForumModule} from './forum/forum.module';
import {SolveitTeamModule} from './solveitTeam/solveitTeam.module';
import { CompetitionModule } from './competition/competition.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthGuardService} from './Auth/services/auth-guard.service';
import {SolveitTeamGuardService} from './Auth/services/solveit-team-guard.service';
import {SolveitMgmtGuardService} from './Auth/services/solveit-mgmt-guard.service';
import {NewsModule} from './news/news.module';
import { WinnerProjectModule } from './winnerProject/winnerProject.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    Ng2TableModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot(APP_ROUTES, {
      // enableTracing: true
    }),
    FormsModule,
    ProjectModule,
    UserManagementModule,
    CompetitionModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    ResourcesModule,
    NewsModule,
    NgCircleProgressModule.forRoot({
      radius: 20,
      outerStrokeWidth: 8,
      innerStrokeWidth: 4,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 200,
      maxPercent: 100
    }),
    ForumModule,
    SolveitTeamModule,
    BsModalModule,
    DashboardModule,
    WinnerProjectModule
  ],
  providers: [ApiService, ToastOptions, AuthGuardService, SolveitTeamGuardService, SolveitMgmtGuardService],
  bootstrap: [AppComponent],
})
export class AppModule { }
