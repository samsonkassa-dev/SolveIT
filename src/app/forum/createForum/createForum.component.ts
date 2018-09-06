import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ForumService } from '../forum.service';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
    selector: 'app-forum-create',
    templateUrl: './createForum.component.html',
    styleUrls: ['./createForum.component.css']
})

export class CreateForumComponent {

    @Input() categories;
    private forum = { userAccountId: 0, created: new Date(), name: '', slung: '' };
    private forumForm: FormGroup;

    constructor(private service: ForumService, private _authService: AuthService) {
        this.forumForm = new FormGroup({
            name: new FormControl('', Validators.required),
            slung: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
        });
    }

    getUserId() {

    }

    createForum() {
      this.forum.created = new Date();
        this.service.createForum(this.forum).subscribe(
            res => {
                const forumId = res.id;
                this._authService.getUserInfo().subscribe(
                    res1 => {
                        const userId = res1.id;
                        const member = {
                            forumId: forumId,
                            userId: userId
                        };
                        this.service.addMember(member).subscribe(
                            res2 => {
                                console.log(res2);
                            }
                        );
                    }
                );
            }
        );
    }
}
