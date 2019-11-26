import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AttendanceService } from './attendance.service';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {NgxPaginationModule} from 'ngx-pagination';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgxPaginationModule,
    FileUploadModule,
    RouterModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [AttendanceListComponent, AttendanceDetailComponent],
  exports: [AttendanceListComponent],
  providers: [AttendanceService]
})
export class AttendanceModule { }
