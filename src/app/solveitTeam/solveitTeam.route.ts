import { Routes } from '@angular/router';
import { Events } from './event/event.component';
import { NewsfeedComponent } from './newsFeed/newsfeed.component';

export const SolveitTeamRoutes: Routes = [
  {
    path: 'team', children: [
      {path: 'events', component: Events},
      {path: 'newsfeed', component: NewsfeedComponent}
      ]
  }
];
