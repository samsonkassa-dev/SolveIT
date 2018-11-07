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
import {CompetitionWinnerComponent} from './competitionWinner/competitionWinner.component';
import {WinnerComponent} from '../winnerProject/winner/winner.component';
import {WeeklyWinnerListComponent} from '../winnerProject/weeklyWinnerList/weeklyWinnerList.component';
import {CompetitionWinnerListComponent} from '../winnerProject/competitionWinnerList/competitionWinnerList.component';
import {AddWeeklyWinnerComponent} from '../winnerProject/addWeeklyWinner/addWeeklyWinner.component';
import {AddCompetitionWinnerComponent} from '../winnerProject/addCompetitionWinner/addCompetitionWinner.component';
import { EditCompetitionComponent } from './edit-competition/edit-competition.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    CompetitionViewComponent,
    CompetitionListComponent,
    CompetitionCreateComponent,
    CompetitionProjectsComponent,
    CompetitionWinnerComponent,
    WinnerComponent,
    WeeklyWinnerListComponent,
    CompetitionWinnerListComponent,
    AddWeeklyWinnerComponent,
    AddCompetitionWinnerComponent,
    EditCompetitionComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule

  ],
  providers: [CompetitionService],
  exports: [CompetitionViewComponent]
})

export class CompetitionModule {

}
