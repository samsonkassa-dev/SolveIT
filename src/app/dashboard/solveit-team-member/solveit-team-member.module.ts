import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolveItTeamMemberListComponent } from './solve-it-team-member-list/solve-it-team-member-list.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SolveItTeamMemberService} from './solveit-team-member.service';
import {ToastyModule} from 'ng2-toasty';
import {NgxPaginationModule} from 'ngx-pagination';
import { SolveItTeamMemberAddComponent } from './solve-it-team-member-add/solve-it-team-member-add.component';
import { SolveItTeamMemberEditComponent } from './solve-it-team-member-edit/solve-it-team-member-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgxPaginationModule,
    FileUploadModule,
    RouterModule
  ],
  declarations: [SolveItTeamMemberListComponent, SolveItTeamMemberAddComponent, SolveItTeamMemberEditComponent],
  exports: [SolveItTeamMemberListComponent],
  providers: [SolveItTeamMemberService]
})
export class SolveItTeamMemberModule { }
