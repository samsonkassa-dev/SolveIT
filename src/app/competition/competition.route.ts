import { Routes } from '@angular/router';
import { CompetitionListComponent } from './competitionList/competitionList.component';
import { CompetitionProjectsComponent } from './competitionProjects/competitionProjects.component';

export const CompetitionRoutes: Routes = [
	{
		path: "competition",
		children: [
			{path: '', component: CompetitionListComponent},
			{path: ':competitionId', component: CompetitionProjectsComponent}
		]
	}
];
