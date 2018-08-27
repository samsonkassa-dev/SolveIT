import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ForumService } from "../forum.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-discussion-view",
    templateUrl: "./discussionView.component.html",
    styleUrls: ["./discussionView.component.css"]
})

export class DiscussionView implements OnInit {

    private discussion = {};
    private comments = [];
    private comment = {};
    private commentForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private service: ForumService) {
        
    }

    ngOnInit() {
        console.log(this.route.snapshot.paramMap.get("name"));
        this.getDiscussion(1);
    }

    getDiscussion(discussionId) {
        this.service.getDiscussion(discussionId).subscribe(
            res => {
                this.discussion = res;
            }
        );
    }

    addComment(discussionId) {
        this.service.addComment(this.comment, discussionId).subscribe(
            res => {
                console.log(res);
            }
        );
    }

    getComments(discussionId) {
        this.service.getComments(discussionId).subscribe(
            res => {
                this.comments = res;
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