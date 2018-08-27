import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-discussion",
    templateUrl: "./discussion.component.html",
    styleUrls: ["./discussion.component.css"]
})

export class Discussion {
    private discussion = {};

    constructor(private router: Router) { }

    viewDiscussion() {
        this.router.navigate(['/forums/discussion', "dis"]);
    }
}