import { Routes } from '@angular/router';
import { ProjectContainerComponent } from './projectContainer.component';
import { ProjectViewComponent } from './projectView/projectView.component';

export const ProjectRoutes: Routes = [
  {
    path: 'my-projects',
    children: [
      {path: '', component: ProjectContainerComponent},
      {path: ':id', component: ProjectViewComponent}
    ]
  }
];
