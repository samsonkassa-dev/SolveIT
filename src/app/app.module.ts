import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ForumModule } from "./forum/forum.module";
import { SolveitMgmtModule } from "./solveitMgmt/solveitMgmt.module";
import { SolveitTeamModule } from "./solveitTeam/solveitTeam.module";

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AuthModule } from './Auth/auth.module';
import { ApiService } from './shared/services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES, {
      enableTracing: true
    }),
    AuthModule,
    ForumModule,
    SolveitMgmtModule,
    SolveitTeamModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
