import { Component } from "@angular/core";

@Component({
    selector: "app-project-container",
    templateUrl: "projectContainer.component.html",
    styleUrls: ["projectContainer.component.css"]
})

export class ProjectContainer {

    private selected = "project-list";

    toggeleView(view) {
        this.selected = view;
    }
}