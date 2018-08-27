import { Routes } from '@angular/router';
import { ProjectContainer } from './projectContainer.component';
import { ProjectViewComponent } from './projectView/projectView.component';

export const ForumRoutes: Routes = [
	{
		path: "projects",
		children: [
			{path: '', component: ProjectContainer},
			{path: ':name', component: ProjectViewComponent}
		]
	}
];
