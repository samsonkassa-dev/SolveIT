import { Component } from "@angular/core";
import { ProjectService } from "../project.service";

@Component({
    selector: "app-project-create",
    templateUrl: "createProject.component.html",
    styleUrls: ["createProject.component.css"]
})

export class CreateProject {

    private project = {};

    constructor(private service: ProjectService) {
        
    }

    createProject() {
        this.service.createProject(this.project).subscribe(
            res => {
                console.log(res);
            }
        )
    }
    
}