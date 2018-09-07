import { Routes } from '@angular/router';
import { CompetitionListComponent } from './competitionList/competitionList.component';

export const CompetitionRoutes: Routes = [
	{
		path: "competition",
		children: [
			{path: '', component: CompetitionListComponent}
		]
	}
];
