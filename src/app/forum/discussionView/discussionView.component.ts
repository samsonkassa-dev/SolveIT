import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ForumService } from '../forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
    selector: 'app-discussion-view',
    templateUrl: './discussionView.component.html',
    styleUrls: ['./discussionView.component.css']
})

export class DiscussionViewComponent implements OnInit {

    public numberOfComments: any;
    public discussion = {id: 0};
    public comment = {'solveIT-DiscussionId': this.discussion.id, userId: 0};
    public commentForm: FormGroup;
    @Input() slung = '';

    constructor(public route: ActivatedRoute, public router: Router, public service: ForumService, public _authService: AuthService) {
        this.commentForm = new FormGroup({
            content: new FormControl('', Validators.required)
        });

    }

    ngOnInit() {
        // const slung = this.route.snapshot.paramMap.get('slung');
        if (this.slung !== '') {
          this.getDiscussion(this.slung);
        }
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
        );
    }

    addComment() {
        const authenticated = this._authService.isAuthenticated();
        if (authenticated) {
            this._authService.getUserInfo().subscribe(
                res => {
                    const userId = res.id;
                    this.comment.userId = userId;

                    this.service.addComment(this.comment).subscribe(
                        res => {
                            console.log(res);
                        }
                    );
                }
            );
        } else {
            this.comment.userId = 0;
            this.service.addComment(this.comment).subscribe(
                res => {
                    console.log(res);
                }
            );
        }
    }

    addToFavourites(discussion) {
        this._authService.getUserInfo().subscribe(
            res => {
                const userId = res.id;
                const content = {
                    discussionId: discussion.id,
                    userId: userId
                };
                this.service.addToFavourites(content).subscribe(
                    res => {
                        console.log(res);
                    }
                );
            }
        );
    }

    pinDiscussion() {
        this.service.pinDiscussion(this.discussion).subscribe(
            res => {
                console.log(res);
            }
        );
    }

}
