import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-project",
    templateUrl: "project.component.html",
    styleUrls: ["project.component.css"]
})

export class Project {

    private project = {};

    constructor(private router: Router) {
        
    }

    viewProject() {
        this.router.navigate(['/projects/', "pro"]);
    }
}