import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-list",
    templateUrl: "./forumList.component.html",
    styleUrls: ["./forumList.component.css"]
})

export class ForumList implements OnInit {
    
    private forums = [];
    private selected = "forums-list";

    constructor(private service: ForumService, private router: Router) {
        
    }

    ngOnInit() {
        this.fetchForumsList();
    }

    fetchForumsList() {
        this.service.getForumList();
    }

    viewForum() {
        this.router.navigate(['/forums', "dis"]);
    }

}