import { Component, OnInit } from "@angular/core";
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-view",
    templateUrl: "./forumView.component.html",
    styleUrls: ["./forumView.component.css"]
})

export class ForumView implements OnInit{
    
    private forum = {};
    private comment = {};

    constructor(private service: ForumService) {

    }

    ngOnInit() {
        this.getForum();
    }

    getForum() {
        this.service.getForum();
    }

    addComment() {
        this.service.addComment(this.comment);
    }
    
}