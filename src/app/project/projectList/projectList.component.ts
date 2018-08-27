import { Component } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-project-list',
    templateUrl: 'projectList.component.html',
    styleUrls: ['projectList.component.css']
})

export class ProjectListComponent {

    private projects = [];

    constructor(private service: ProjectService) {

    }

    getProjectList() {
        this.service.getMyProjects(0).subscribe(
            res => {
                this.projects = res;
            }
        );
    }

}
