import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { CompetitionViewComponent } from './competitionView/competitionView.component';
import { CompetitionListComponent } from './competitionList/competitionList.component';
import { CompetitionCreateComponent } from './competitionCreate/competitionCreate.component';
import { CompetitionService } from './competition.service';
import {MomentModule} from 'angular2-moment';

@NgModule({
    declarations: [
        CompetitionViewComponent,
        CompetitionListComponent,
        CompetitionCreateComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      MomentModule
    ],
    providers: [CompetitionService],
    exports: [CompetitionViewComponent]
})

export class CompetitionModule {

}
