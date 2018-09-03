import { Component, OnInit, Input } from "@angular/core";
import { ProjectService } from "../project.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-project-list',
    templateUrl: 'projectList.component.html',
    styleUrls: ['projectList.component.css']
})

export class ProjectList implements OnInit{

    @Input() selected;
    private projects = [];
    private projectsBackup = [];
    private p: number = 1;
    private keyword = '';

    constructor(private service: ProjectService, private router: Router) {
        
    }

    ngOnInit() {
        this.getProjectList();
    }

    getProjectList() {
        if (this.selected == "project-list-user") {
            this.service.getMyProjects(0).subscribe(
                res => {
                    this.projects = res;
                    this.projectsBackup = res;
                }
            );   
        }else if (this.selected == "project-list-all") {
            this.service.getAllProjects().subscribe(
                res => {
                    this.projects = res;
                    this.projectsBackup = res;
                }
            );
        }
    }

    searchPoject() {
        if (this.keyword !== '') {
            this.projects = this.projectsBackup.filter(item => item.title.includes(this.keyword));
        } else {
            this.projects = this.projectsBackup.filter(item => item.pinned);
        }
    }

    viewProject(project) {
        this.router.navigate(['/projects/', project.id]);
    }
}
