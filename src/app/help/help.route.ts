import { HelpPageComponent } from './help-page/help-page.component';
import { Routes } from '@angular/router';

export const HelpRoutes: Routes = [
  {path: '', pathMatch: 'full', component: HelpPageComponent},
];
