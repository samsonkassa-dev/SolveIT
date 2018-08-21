import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ForumModule } from "./forum/forum.module";
import { SolveitMgmtModule } from "./solveitMgmt/solveitMgmt.module";
import { SolveitTeamModule } from "./solveitTeam/solveitTeam.module";

import { AppComponent } from './app.component';


@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      ForumModule,
      SolveitMgmtModule,
      SolveitTeamModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
