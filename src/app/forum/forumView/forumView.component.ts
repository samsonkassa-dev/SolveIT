import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-view",
    templateUrl: "./forumView.component.html",
    styleUrls: ["./forumView.component.css"]
})

export class ForumView implements OnInit{
    
    private selected = "discussion-list";
    private discussions = [];
    private forum = {};

    constructor(private route: ActivatedRoute, private router: Router, private service: ForumService) {

    }

    ngOnInit() {
        console.log(this.route.snapshot.paramMap.get("name"));
    }

    toggleView(view) {
        this.selected = view;
    }

    getForum(forumId) {
        this.service.getForum(forumId).subscribe(
            res => {
                console.log(res);
            }
        );
    }

    getDiscussions(forumId) {
        this.service.getDiscussions(forumId).subscribe(
            res => {
                this.discussions = res;
            }
        );
    }

    addToFavourites() {
        let content = {
            "discussionId": 0,
            "userId": 0
        };
        this.service.addToFavourites(content).subscribe(
            res => {
                console.log(res);
            }
        );
    }
}