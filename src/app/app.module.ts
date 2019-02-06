import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
  import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ToastOptions } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AuthModule } from './Auth/auth.module';
import { ApiService } from './shared/services/api.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BsModalModule } from 'ng2-bs3-modal';
import { UserManagementModule } from './userManagement/userManagement.module';
import { CompetitionModule } from './competition/competition.module';
import { AuthGuardService } from './Auth/services/auth-guard.service';
import { SolveitTeamGuardService } from './Auth/services/solveit-team-guard.service';
import { SolveitMgmtGuardService } from './Auth/services/solveit-mgmt-guard.service';
import { WinnerProjectModule } from './winnerProject/winnerProject.module';
import { MomentModule } from 'angular2-moment';
import { AlumunniDetailComponent } from './alumunni-detail/alumunni-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AlumunniDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    Ng2TableModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES, {
    }),
    FormsModule,
    UserManagementModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    BsModalModule,
    BrowserAnimationsModule,
    CompetitionModule,
    MomentModule,
    WinnerProjectModule,
    NgxSpinnerModule,
    NgCircleProgressModule
  ],
  providers: [
    ApiService,
    ToastOptions,
    AuthGuardService,
    SolveitTeamGuardService,
    SolveitMgmtGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
