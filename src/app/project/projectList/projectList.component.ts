import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-project-list",
    templateUrl: "projectList.component.html",
    styleUrls: ["projectList.component.css"]
})

export class ProjectList implements OnInit{

    private projects = [];

    constructor(private service: ProjectService, private router: Router) {
        
    }

    ngOnInit() {
        this.getProjectList();
    }

    getProjectList() {
        this.service.getMyProjects(0).subscribe(
            res => {
                this.projects = res;
            }
        )
    }

    viewProject(project) {
        this.router.navigate(['/projects/', project.id]);
    }
}