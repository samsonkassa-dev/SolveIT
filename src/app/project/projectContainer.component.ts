import { Component } from "@angular/core";

@Component({
    selector: "app-project-container",
    templateUrl: "projectContainer.component.html",
    styleUrls: ["projectContainer.component.css"]
})

export class ProjectContainer {

    private selected = "project-list";

    toggleView(view) {
        this.selected = view;
    }
}