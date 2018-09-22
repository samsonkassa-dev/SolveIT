import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProjectService } from './project.service';
import { FileUploadModule } from 'ng2-file-upload';
import { CreateProjectComponent } from './createProject/createProject.component';
import { ProjectListComponent } from './projectList/projectList.component';
import { ProjectView } from './projectView/projectView.component';
import { ProjectContainerComponent } from './projectContainer.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {AddProjectMemberComponent} from './addMember/addMember.component';
import {ProjectMemberList} from './memberList/memberList.component';

@NgModule({
  declarations: [
    CreateProjectComponent,
    ProjectListComponent,
    ProjectView,
    ProjectContainerComponent,
    AddProjectMemberComponent,
    ProjectMemberList
  ],
  imports: [
    NgxPaginationModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgCircleProgressModule
  ],
  providers: [ProjectService],
  exports: []
})

export class ProjectModule {

}
