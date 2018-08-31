import { Routes } from '@angular/router';
import { ProjectContainer } from './projectContainer.component';
import { ProjectView } from './projectView/projectView.component';

export const ProjectRoutes: Routes = [
	{
		path: "projects",
		children: [
			{path: '', component: ProjectContainer},
			{path: ':id', component: ProjectView}
		]
	}
];
