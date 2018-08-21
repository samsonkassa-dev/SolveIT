import { Component } from "@angular/core";

@Component({
    selector: "app-forum",
    templateUrl: "./forum.component.html",
    styleUrls: ["./forum.component.css"]
})

export class Forum {
    
    private selected = "forum-list";

    toggleView(view) {
        this.selected = view;
    }
}