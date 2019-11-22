import { JudgeRoutes } from './judge.routes';
import { JudgeService } from './judge.service';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {NgxPaginationModule} from 'ngx-pagination';

import { JudgeListComponent } from './judge-list/judge-list.component';
import { JudgeRegistrationComponent } from './judge-registration/judge-registration.component';

@NgModule({
  imports: [
    RouterModule.forChild(JudgeRoutes),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgxPaginationModule,
    FileUploadModule,
    RouterModule
  ],
  declarations: [JudgeListComponent, JudgeRegistrationComponent],
  exports: [],
  providers: [JudgeService]
})
export class JudgeModule { }
