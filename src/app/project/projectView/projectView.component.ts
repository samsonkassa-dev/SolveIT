import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-project-view',
    templateUrl: 'projectView.component.html',
    styleUrls: ['projectView.component.css']
})

export class ProjectViewComponent implements OnInit {

    private selected = 'project';
    private project = {};

    constructor(private route: ActivatedRoute, private router: Router, private service: ProjectService) {

    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id")
        this.getProject(id);
    }

    toggleView(view) {
        this.selected = view;
    }

    getProject(projectId) {
        this.service.getProject(projectId).subscribe(
            res => {
                this.project = res;
            }
        );
    }

    addProjectMember() {
        const member = {
            projectId: 0,
            userId: 0
        };
        this.service.addProjectMember(member).subscribe(
            res => {
                console.log(res);
            }
        );
    }

}
