import { NgModule } from '@angular/core';

import { ProjectService } from './project.service';

import { CreateProject } from './createProject/createProject.component';
import { ProjectListComponent } from './projectList/projectList.component';
import { ProjectViewComponent } from './projectView/projectView.component';
import {ProjectComponent} from './project/project.component';

@NgModule({
    declarations: [
        ProjectComponent,
        CreateProject,
        ProjectListComponent,
        ProjectViewComponent
    ],
    imports: [

    ],
    providers: [ProjectService],
    exports: []
})

export class ProjectModule {

}
