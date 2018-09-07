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

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppTableModule,
    Ng2TableModule,
    ToastyModule,
    SharedModule,
    UserManagementModule,
    CompetitionModule
  ],
  providers: [ApiService, ToastyService, SharedService],
  exports: [HeaderComponent, AppTableComponent],
})
export class DashboardModule { }
