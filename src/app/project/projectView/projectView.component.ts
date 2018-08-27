import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from "../project.service";

@Component({
    selector: "app-project-view",
    templateUrl: "projectView.component.html",
    styleUrls: ["projectView.component.css"]
})

export class ProjectView implements OnInit{

    private project = {};

    constructor(private route: ActivatedRoute, private router: Router, private service: ProjectService) {
        
    }

    ngOnInit() {
        console.log(this.route.snapshot.paramMap.get("name"));
    }

    getProject() {
        this.service.getProject(0).subscribe(
            res => {
                this.project = res;
            }
        )
    }

    addProjectMember() {
        let member = {
            projectId: 0,
            userId: 0
        };
        this.service.addProjectMember(member).subscribe(
            res => {
                console.log(res);
            }
        )
    }
    
}