import { Routes } from '@angular/router';
import { ProjectContainerComponent } from './projectContainer.component';
import { ProjectView } from './projectView/projectView.component';

export const ProjectRoutes: Routes = [
  {
    path: 'my-projects',
    children: [
      {path: '', component: ProjectContainerComponent},
      {path: ':id', component: ProjectView}
    ]
  }
];
