import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SolveitTeamService } from "./solveitTeam.service";
import { Events } from "./event/event.component";
import { CreateEvent } from "./event/createEvent/createEvent.component";
import { EventList } from "./event/eventList/eventList.component";
import { Newsfeed } from "./newsFeed/newsfeed.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        Events,
        CreateEventComponent,
        EventListComponent,
        NewsfeedComponent,
      EventViewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [SolveitTeamService],
    exports: []
})

export class SolveitTeamModule {

}
