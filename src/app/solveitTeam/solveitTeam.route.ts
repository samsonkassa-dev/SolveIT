import { Routes } from '@angular/router';
import { EventsComponent } from './event/event.component';
import { SolveItTeamMemberDisplayComponent } from './solve-it-team-member-display/solve-it-team-member-display.component';

export const SolveitTeamRoutes: Routes = [
  {path: '', pathMatch: 'full', component: EventsComponent},
  {path: 'list', pathMatch: 'full', component: SolveItTeamMemberDisplayComponent},
];
