import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {NgxPaginationModule} from 'ngx-pagination';
import { WinnerProjectService } from './winnerProject.service';
import { WinnerComponent } from './winner/winner.component';
import { AddCompetitionWinnerComponent } from './addCompetitionWinner/addCompetitionWinner.component';
import { AddWeeklyWinnerComponent } from './addWeeklyWinner/addWeeklyWinner.component';
import { WeeklyWinnerListComponent } from './weeklyWinnerList/weeklyWinnerList.component';
import { CompetitionWinnerListComponent } from './competitionWinnerList/competitionWinnerList.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgxPaginationModule
  ],
  declarations: [WinnerComponent, AddCompetitionWinnerComponent, AddWeeklyWinnerComponent, WeeklyWinnerListComponent, CompetitionWinnerListComponent],
  exports: [],
  providers: [WinnerProjectService]
})
export class WinnerProjectModule { }
