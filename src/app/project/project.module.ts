import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProjectService } from './project.service';

import { CreateProject } from './createProject/createProject.component';
import { ProjectList } from './projectList/projectList.component';
import { ProjectView } from './projectView/projectView.component';
import { ProjectContainer } from './projectContainer.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectMemberList } from './memberList/memberList.component';
import { AddProjectMember } from './addMember/addMember.component';

@NgModule({
    declarations: [
        CreateProject,
        ProjectList,
        ProjectView,
        ProjectContainer,
        ProjectMemberList,
        AddProjectMember
    ],
    imports: [
        NgxPaginationModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [ProjectService],
    exports: []
})

export class ProjectModule {

}
