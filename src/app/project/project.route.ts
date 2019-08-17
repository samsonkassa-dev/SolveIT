import { Routes } from '@angular/router';
import { ProjectContainerComponent } from './projectContainer.component';
import { ProjectViewComponent } from './projectView/projectView.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ProjectInvestorViewComponent } from './projectInvestorView/projectInvestorView.component';

export const ProjectRoutes: Routes = [
  {path: 'recommendations', component: RecommendationsComponent},
  {path: 'investor-view/:id', component: ProjectInvestorViewComponent},
  {
    path: '',
    children: [
      {path: '', pathMatch: 'full', component: ProjectContainerComponent},
      {path: ':id', component: ProjectViewComponent}
    ]
  }
];
