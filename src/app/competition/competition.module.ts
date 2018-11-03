import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { CompetitionViewComponent } from './competitionView/competitionView.component';
import { CompetitionListComponent } from './competitionList/competitionList.component';
import { CompetitionCreateComponent } from './competitionCreate/competitionCreate.component';
import { CompetitionService } from './competition.service';
import {MomentModule} from 'angular2-moment';
import { CompetitionProjectsComponent } from './competitionProjects/competitionProjects.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  declarations: [
    CompetitionViewComponent,
    CompetitionListComponent,
    CompetitionCreateComponent,
    CompetitionProjectsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxPaginationModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [CompetitionService],
  exports: [CompetitionViewComponent]
})

export class CompetitionModule {

}
