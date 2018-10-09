import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../forum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-comment-list',
    templateUrl: './commentList.component.html',
    styleUrls: ['./commentList.component.css']
})

export class CommentListComponent implements OnInit {

    @Input() comments = [];
    private selectedComment = 0;
    private replies = [];
    public reply = {"solveIT-Discussion-CommentId": this.selectedComment, userId: 0};
    public replyForm: FormGroup;
    private page = 1;

    constructor(private service: ForumService, public authService: AuthService, public sharedService: SharedService) {
        this.replyForm = new FormGroup({
            content: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {

    }

    getCommentReplies(commentId) {
        this.service.getCommentReplies(commentId).subscribe(
            res => {
                this.replies = res;
            }
        )
    }

    replyToComment() {
        const authenticated = this.authService.isAuthenticated();
        if (authenticated) {
            this.authService.getUserInfo().subscribe(
                res => {
                    const userId = res.id;
                    this.reply.userId = userId;

                    this.service.replyToComment(this.reply).subscribe(
                        res1 => {
                            this.sharedService.addToast('Success', 'Reply Added!.', 'success');
                            this.getCommentReplies(this.selectedComment);
                            this.replyForm.reset();
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
            this.reply.userId = 0;
            this.service.replyToComment(this.reply).subscribe(
                res => {
                    this.sharedService.addToast('Success', 'Reply Added!.', 'success');
                    this.getCommentReplies(this.selectedComment);
                    this.replyForm.reset();
                },
                err => {
                    if (err.status = 422) {
                        this.sharedService.addToast('', 'Error occured!', 'error');
                    }
                }
            );
        }
    }

}
