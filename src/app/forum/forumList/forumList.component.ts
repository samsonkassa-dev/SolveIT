import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-list",
    templateUrl: "./forumList.component.html",
    styleUrls: ["./forumList.component.css"]
})

export class ForumList implements OnInit {
    
    @Input() selected;
    private forums = [];

    constructor(private service: ForumService, private router: Router) {
        
    }

    ngOnInit() {
        this.fetchForumsList();
    }

    fetchForumsList() {
        
    }

    viewForum() {
        this.router.navigate(['/forums', "dis"]);
    }

}