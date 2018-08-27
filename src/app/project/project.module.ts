import { NgModule } from '@angular/core';

import { ProjectService } from './project.service';

import { Project } from './project.component';
import { CreateProject } from './createProject/createProject.component';
import { ProjectList } from './projectList/projectList.component';
import { ProjectView } from './projectView/projectView.component';

@NgModule({
    declarations: [
        Project,
        CreateProject,
        ProjectList,
        ProjectView
    ],
    imports: [
        
    ],
    providers: [ProjectService],
    exports: []
})

export class ProjectModule {

}