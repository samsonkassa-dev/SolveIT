import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from '../forum.service';
import { SharedService } from '../../shared/services/shared.service';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
    selector: 'app-discussion-create',
    templateUrl: './createDiscussion.component.html',
    styleUrls: ['./createDiscussion.component.css']
})

export class CreateDiscussionComponent implements OnInit {

    @Input() forum;
    @Output() created = new EventEmitter();
    public discussion = {userAccountId: 0, forumId: 0, slung: '', title: ''};
    public discussionForm: FormGroup;

    constructor(public authService: AuthService, public service: ForumService,
                public sharedService: SharedService, public router: Router) {
        this.discussionForm = new FormGroup({
            title: new FormControl('', Validators.required),
            content: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.discussion.forumId = this.forum.id;
        this.discussion.userAccountId = this.authService.getUserId() ? this.authService.getUserId() : 0;
    }

    createDiscussion() {
        this.discussion.slung = this.discussion.title.replace(' ', '-');
        this.service.createDiscussion(this.discussion).subscribe(
            res => {
              this.toggleDiscussionList();
                this.sharedService.addToast('Success', 'Discussion Created!.', 'success');
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured!', 'error');
                }
            }
        );
    }

    toggleDiscussionList() {
      this.created.emit();
    }

    onSignIn() {
      this.router.navigate(['login']);
    }
}
