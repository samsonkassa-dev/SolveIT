import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from "../project.service";

@Component({
    selector: "app-project-create",
    templateUrl: "createProject.component.html",
    styleUrls: ["createProject.component.css"]
})

export class CreateProject {

    private project = {};
    public projectForm: FormGroup;

    constructor(private service: ProjectService) {
        this.projectForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

    createProject() {
        this.service.createProject(this.project).subscribe(
            res => {
                console.log(res);
            }
        )
    }
    
}