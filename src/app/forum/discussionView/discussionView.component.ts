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
    public comments = [];
    public isFavouriteDiscussion = false;
    public postedBy = null;
    @Input() slung = '';
    @Input() favoriteDiscussions = [];
    @Output() addFavorite = new EventEmitter();
    @Output() remove = new EventEmitter();

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
                this.postedBy = res.Result.user;
                console.log("user ", this.postedBy);
                this.discussion = res.Result.discussion[0];
                console.log('fetched', this.discussion);
                this.countComments();
                this.getComments();
                this.isFavorite(this.discussion);
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
                            this.getComments();
                            this.countComments();
                            this.commentForm.reset();
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
                    this.countComments();
                    this.getComments();
                    this.commentForm.reset();
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

    removeFromFavorites() {
        this.remove.emit({id: this.discussion.id});
    }

    isFavorite(discussion) {
        this.favoriteDiscussions.forEach(item => {
            if (item.id === discussion.id) {
                console.log('is Favorite');
                this.isFavouriteDiscussion = true;
                return;
            }
            console.log('finished');
        });
    }

    getComments() {
        this.service.getComments(this.discussion.id)
            .subscribe(res => {
                this.comments = res;
            })
    }
}
