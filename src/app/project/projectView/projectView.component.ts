import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-project-view',
    templateUrl: 'projectView.component.html',
    styleUrls: ['projectView.component.css']
})

export class ProjectViewComponent implements OnInit {
    public views = [
      'report',
      'members',
      'add-member',
    ];
    public selected = this.views[0];
    public uploadReport = false;
    public project: any = null;

    constructor(public route: ActivatedRoute, public router: Router, public service: ProjectService) {

    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
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
            projectId: this.project.id,
            userId: 0
        };
        this.service.addProjectMember(member).subscribe(
            res => {
                console.log(res);
            }
        );
    }

    toggleUploadReport(value) {
      this.uploadReport = value;
    }

}
