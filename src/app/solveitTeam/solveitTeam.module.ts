import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SolveitTeamService } from './solveitTeam.service';
import { EventsComponent } from './event/event.component';
import { CreateEventComponent } from './event/createEvent/createEvent.component';
import { EventListComponent } from './event/eventList/eventList.component';
import { Newsfeed } from './newsFeed/newsfeed.component';
import { SharedModule } from '../shared/shared.module';
import { EventViewComponent } from './event/eventView/viewEvent.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../Auth/services/auth.service';
import {SolveitMgmtGuardService} from '../Auth/services/solveit-mgmt-guard.service';
import {MomentModule} from 'angular2-moment';

@NgModule({
  declarations: [
    EventsComponent,
    CreateEventComponent,
    EventListComponent,
    EventViewComponent,
    Newsfeed
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    MomentModule
  ],
  providers: [SolveitTeamService, AuthService],
  exports: []
})

export class SolveitTeamModule {

}
