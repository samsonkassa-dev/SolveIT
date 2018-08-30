import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { ForumService } from "../forum.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-discussion-view",
    templateUrl: "./discussionView.component.html",
    styleUrls: ["./discussionView.component.css"]
})

export class DiscussionView implements OnInit {

    private numberOfComments: any;
    private discussion = {id:0};
    private comment = {"solveIT-DiscussionId": 0};
    private commentForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private service: ForumService) {
        this.commentForm = new FormGroup({
            content: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        let slung = this.route.snapshot.paramMap.get("slung");
        this.getDiscussion(slung);
        this.countComments();
    }

    getDiscussion(slung) {
        this.service.getDiscussion(slung).subscribe(
            res => {
                this.discussion = res.Result[0];
            }
        );
    }

    countComments() {
        this.service.countComments(this.discussion.id).subscribe(
            res => {
                this.numberOfComments = res;
            }
        )
    }

    addComment() {
        this.service.addComment(this.comment).subscribe(
            res => {
                console.log(res);
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