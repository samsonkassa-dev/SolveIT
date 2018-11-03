import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ForumService} from '../forum.service';
import {AuthService} from '../../Auth/services/auth.service';
import {SharedService} from '../../shared/services/shared.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {

  @Input() comment: any = null;
  @Input() isOwnerOfDiscussion = false;
  @Output() remove = new EventEmitter();

  public isReplyActive = false;
  public reply = {'solveIT-Discussion-CommentId': !this.comment ? '' : this.comment.id , userId: '', content: ''};
  public replyForm: FormGroup;
  public replies = [];

  constructor(public service: ForumService, public authService: AuthService, public sharedService: SharedService) { }

  ngOnInit() {
    this.replyForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });
    this.getCommentReplies(this.comment);
  }

  getCommentReplies(comment) {
    this.service.getCommentReplies(comment.id).subscribe(
      res => {
        console.log('Comment replies ', this.replies);
        this.replies = res;
      }
    );
  }

  toggleReplyForm() {
    this.isReplyActive = !this.isReplyActive;
  }

  removeComment(comment) {
    this.remove.emit({comment: comment});
  }

  replyToComment() {
    const authenticated = this.authService.isAuthenticated();
    if (authenticated) {
      const userId = this.authService.getUserId();
      if (userId) {
        this.reply = {...this.reply, userId: userId, 'solveIT-Discussion-CommentId': this.comment.id};
        this.service.replyToComment(this.reply).subscribe(
          res1 => {
            this.sharedService.addToast('Success', 'Reply Added!.', 'success');
            this.getCommentReplies(this.comment);
            this.replyForm.reset();
          },
          err => {
            if (err.status = 422) {
              this.sharedService.addToast('', 'Error occured!', 'error');
            }
          }
        );
      }
    } else {
      console.log('not authenticated');
    }
  }


}
