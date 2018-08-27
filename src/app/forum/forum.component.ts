import { Component } from "@angular/core";
import { ForumService } from "./forum.service";

@Component({
    selector: "app-forum",
    templateUrl: "./forum.component.html",
    styleUrls: ["./forum.component.css"]
})

export class Forum {
    
    private selected = "forum-list";
    private categories = [];

    constructor(private service: ForumService) {}

    toggleView(view) {
        this.selected = view;
    }

    getCategories() {
        this.service.getCategories().subscribe(
            res => {
                this.categories = res;
            }
        );
    }
}