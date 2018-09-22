import { Routes } from '@angular/router';
import { EventsComponent } from './event/event.component';
import { Newsfeed } from './newsFeed/newsfeed.component';
import {EventViewComponent} from './event/eventView/viewEvent.component';

export const SolveitTeamRoutes: Routes = [
  {
    path: '',
    children: [
      {path: 'events', component: EventsComponent},
      {path: 'newsfeed', component: Newsfeed}
    ]
  }
];
