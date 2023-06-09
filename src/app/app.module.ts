import { JudgeModule } from './dashboard/judge/judge.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastOptions } from 'ng2-toasty';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AuthModule } from './Auth/auth.module';
import { ApiService } from './shared/services/api.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
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
import { WeeklyWinnerComponent } from './weeklyWinner/weeklyWinner.component';
import { FacebookModule } from 'ngx-facebook';
import { NgxGalleryModule } from 'ngx-gallery';
import { GalleryComponent } from './gallery/gallery.component';
import {CarouselModule} from "ngx-carousel-lib";
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AlumunniDetailComponent,
    PageNotFoundComponent,
    WeeklyWinnerComponent,
    GalleryComponent
  ],
  imports: [  
    CarouselModule,
    NgxGalleryModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES, {
    }),
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    JudgeModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    NgSelectModule
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
export class AppModule { }
