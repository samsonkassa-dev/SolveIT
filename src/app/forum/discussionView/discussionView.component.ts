import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { ForumService } from "../forum.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../Auth/services/auth.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: "app-discussion-view",
    templateUrl: "./discussionView.component.html",
    styleUrls: ["./discussionView.component.css"]
})

export class DiscussionView implements OnInit {

    private numberOfComments: any;
    private discussion = {id:0};
    private comment = {"solveIT-DiscussionId": this.discussion.id, userId:0};
    private commentForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private service: ForumService, private _authService: AuthService, private sharedService: SharedService) {
        this.commentForm = new FormGroup({
            content: new FormControl('', Validators.required)
        });

    }

    ngOnInit() {
        let slung = this.route.snapshot.paramMap.get("slung");
        this.getDiscussion(slung);
    }

    getDiscussion(slung) {
        this.service.getDiscussion(slung).subscribe(
            res => {
                this.discussion = res.Result[0];
                this.countComments();
            }
        );
    }

    countComments() {
        this.service.countComments(this.discussion.id).subscribe(
            res => {
                this.numberOfComments = res.count;
            }
        )
    }

    addComment() {
        let authenticated = this._authService.isAuthenticated();
        if (authenticated) {
            this._authService.getUserInfo().subscribe(
                res => {
                    let userId = res.id;
                    this.comment.userId = userId;

                    this.service.addComment(this.comment).subscribe(
                        res1 => {
                            this.sharedService.addToast("Success", "Comment Added!.", 'success');
                        },
                        err => {
                            if (err.status = 422) {
                                this.sharedService.addToast("", "Error occured!", 'error');
                            }
                        }
                    );
                }
            );
        } else {
            this.comment.userId = 0;
            this.service.addComment(this.comment).subscribe(
                res => {
                    this.sharedService.addToast("Success", "Comment Added!.", 'success');
                },
                err => {
                    if (err.status = 422) {
                        this.sharedService.addToast("", "Error occured!", 'error');
                    }
                }
            );
        }
    }

    addToFavourites(discussion) {
        this._authService.getUserInfo().subscribe(
            res => {
                let userId = res.id;
                let content = {
                    discussionId: discussion.id,
                    userId: userId
                };
                this.service.addToFavourites(content).subscribe(
                    res1 => {
                        this.sharedService.addToast("Success", "Added To Favourites!.", 'success');
                    },
                    err => {
                        if (err.status = 422) {
                            this.sharedService.addToast("", "Error occured!", 'error');
                        }
                    }
                );
            }
        );
    }

    pinDiscussion() {
        this.service.pinDiscussion(this.discussion).subscribe(
            res => {
                this.sharedService.addToast("Success", "Discussion Pinned!.", 'success');
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        )
    }

}