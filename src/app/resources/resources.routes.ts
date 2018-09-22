import {Routes} from '@angular/router';
import {ResourcesListComponent} from './resources-list/resources-list.component';
import {CreateResourceComponent} from './create-resource/create-resource.component';
import { SolveitTeamGuardService } from '../Auth/services/solveit-team-guard.service';
import {AuthGuardService} from '../Auth/services/auth-guard.service';

export const RESOURCES_ROUTES: Routes = [
  { path: 'resources', component: ResourcesListComponent, canActivate: [AuthGuardService] },
  { path: 'upload-resource', component: CreateResourceComponent, canActivate: [AuthGuardService, SolveitTeamGuardService] }
];
