import { Component, OnInit } from "@angular/core";
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-list",
    templateUrl: "./forumList.component.html",
    styleUrls: ["./forumList.component.css"]
})

export class ForumList implements OnInit {
    
    private forums = [];
    private selected = "forums-list";

    constructor(private service: ForumService) {
        
    }

    ngOnInit() {
        this.fetchForumsList();
    }

    fetchForumsList() {
        this.service.getForumList();
    }

    viewForum() {
        this.selected = "view-forum";
    }

}