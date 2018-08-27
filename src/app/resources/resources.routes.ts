import {Routes} from '@angular/router';
import {ResourcesListComponent} from './resources-list/resources-list.component';
import {CreateResourceComponent} from './create-resource/create-resource.component';

export const RESOURCES_ROUTES: Routes = [
  { path: 'resources', component: ResourcesListComponent },
  { path: 'upload-resource', component: CreateResourceComponent }
];
