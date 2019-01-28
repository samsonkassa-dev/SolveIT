/** @kal **/

import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { AppTableModule } from './app-table/app-table.module';
import { AppTableComponent } from './app-table/app-table.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { SharedService } from './services/shared.service';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppTableModule,
    Ng2TableModule,
    ToastyModule.forRoot()
  ],
  providers: [ApiService, ToastyService, SharedService, CommonService],
  exports: [HeaderComponent, AppTableComponent, ToastyModule],
})
export class SharedModule { }
