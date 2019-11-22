import { HelpPageComponent } from './help-page/help-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { SharedModule } from '../shared/shared.module';

import { NgxPaginationModule } from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {AuthService} from '../Auth/services/auth.service';
import {MomentModule} from 'angular2-moment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HelpRoutes } from './help.route';

@NgModule({
  declarations: [
    HelpPageComponent
  ],
  imports: [
    RouterModule.forChild(HelpRoutes),
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MomentModule,
    NgxSpinnerModule
  ],
  providers: [ AuthService],
  exports: []
})

export class HelpModule {

}
