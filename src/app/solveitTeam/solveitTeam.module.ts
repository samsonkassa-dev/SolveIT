import { NgModule } from '@angular/core';

import { SolveitTeamService } from './solveitTeam.service';
import { Events } from './event/event.component';
import { CreateEventComponent } from './event/createEvent/createEvent.component';
import { EventListComponent } from './event/eventList/eventList.component';
import { NewsfeedComponent } from './newsFeed/newsfeed.component';
import {EventViewComponent} from './event/eventView/viewEvent.component';

@NgModule({
    declarations: [
        Events,
        CreateEventComponent,
        EventListComponent,
        NewsfeedComponent,
      EventViewComponent
    ],
    imports: [

    ],
    providers: [SolveitTeamService],
    exports: []
})

export class SolveitTeamModule {

}
