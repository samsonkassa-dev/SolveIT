import { NgCircleProgressModule } from 'ng-circle-progress';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { CompetitionViewComponent } from './competitionView/competitionView.component';
import { CompetitionListComponent } from './competitionList/competitionList.component';
import { CompetitionCreateComponent } from './competitionCreate/competitionCreate.component';
import { CompetitionService } from './competition.service';
import { MomentModule } from 'angular2-moment';
import { CompetitionProjectsComponent } from './competitionProjects/competitionProjects.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditCompetitionComponent } from './edit-competition/edit-competition.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompetitionCreateProjectComponent } from './competition-create-project/competition-create-project.component';

@NgModule({
  declarations: [
    CompetitionViewComponent,
    CompetitionListComponent,
    CompetitionCreateComponent,
    CompetitionProjectsComponent,
    EditCompetitionComponent,
    CompetitionCreateProjectComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    FileUploadModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    NgxSpinnerModule,
    NgCircleProgressModule

  ],
  providers: [CompetitionService],
  exports: [CompetitionViewComponent]
})

export class CompetitionModule {

}
