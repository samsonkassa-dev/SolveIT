import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ForumService } from '../forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-discussion-view',
    templateUrl: './discussionView.component.html',
    styleUrls: ['./discussionView.component.css']
})

export class DiscussionViewComponent implements OnInit {

    public numberOfComments: any;
    public discussion = {id: 0};
    public comment = {solveitdiscussionId: this.discussion.id, userId: 0};
    public commentForm: FormGroup;
    public favoriteDiscusions = [];
    @Input() slung = '';
    @Input() favoriteDiscussions = [];
    @Output() addFavorite = new EventEmitter();

    constructor(public route: ActivatedRoute, public router: Router, public service: ForumService, public authService: AuthService, public sharedService: SharedService) {
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

    getFavoriteDiscusions() {
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
        const authenticated = this.authService.isAuthenticated();
        if (authenticated) {
            this.authService.getUserInfo().subscribe(
                res => {
                    const userId = res.id;
                    this.comment.userId = userId;
                    this.comment.solveitdiscussionId = this.discussion.id;

                    this.service.addComment(this.comment).subscribe(
                        res1 => {
                            this.sharedService.addToast('Success', 'Comment Added!.', 'success');
                        },
                        err => {
                            if (err.status = 422) {
                                this.sharedService.addToast('', 'Error occured!', 'error');
                            }
                        }
                    );
                }
            );
        } else {
            this.comment.userId = 0;
            this.service.addComment(this.comment).subscribe(
                res => {
                    this.sharedService.addToast('Success', 'Comment Added!.', 'success');
                },
                err => {
                    if (err.status = 422) {
                        this.sharedService.addToast('', 'Error occured!', 'error');
                    }
                }
            );
        }
    }

    addToFavorites() {
      this.addFavorite.emit({id: this.discussion.id});
    }

    isFavorite(discussion) {
      return this.favoriteDiscusions.indexOf(discussion) !== -1;
    }
}
