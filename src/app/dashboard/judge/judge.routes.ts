import { JudgeRegistrationComponent } from './judge-registration/judge-registration.component';
import { Routes } from '@angular/router';

export const JudgeRoutes: Routes = [
  {path: 'judge/registration', pathMatch: 'full', component: JudgeRegistrationComponent},
];
