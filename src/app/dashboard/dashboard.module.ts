import {NgModule} from '@angular/core';
import {HeaderComponent} from '../shared/header/header.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppTableModule} from '../shared/app-table/app-table.module';
import {Ng2TableModule} from 'ng2-table';
import {ToastyModule, ToastyService} from 'ng2-toasty';
import {ApiService} from '../shared/services/api.service';
import {SharedService} from '../shared/services/shared.service';
import {AppTableComponent} from '../shared/app-table/app-table.component';
import {SharedModule} from '../shared/shared.module';
import {UserManagementModule} from '../userManagement/userManagement.module';
import {DashboardComponent} from './dashboard.component';
import {CompetitionModule} from '../competition/competition.module';
import {CategoryModule} from './category/category.module';
import {TagModule} from './tag/tag.module';
import {AdminGuardService} from '../Auth/services/admin-guard.service';
import { ForumModule } from '../forum/forum.module';
import { CityModule } from './city/city.module';
import { DASHBOARD_ROUTES } from './dashboard.routes';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    RouterModule.forChild(DASHBOARD_ROUTES),
    CommonModule,
    RouterModule,
    AppTableModule,
    Ng2TableModule,
    ToastyModule,
    SharedModule,
    UserManagementModule,
    CompetitionModule,
    CategoryModule,
    TagModule,
    ForumModule,
    CityModule
  ],
  providers: [ApiService, ToastyService, SharedService, AdminGuardService],
  exports: [HeaderComponent, AppTableComponent],
})
export class DashboardModule { }
