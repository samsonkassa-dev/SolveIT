import { NgModule } from '@angular/core';

import { SolveitTeamService } from "./solveitTeam.service";
import { Events } from "./event/event.component";
import { CreateEvent } from "./event/createEvent/createEvent.component";
import { EventList } from "./event/eventList/eventList.component";
import { Newsfeed } from "./newsFeed/newsfeed.component";

@NgModule({
    declarations: [
        Events,
        CreateEvent,
        EventList,
        Newsfeed
    ],
    imports: [
        
    ],
    providers: [SolveitTeamService],
    exports: []
})

export class SolveitTeamModule {

}