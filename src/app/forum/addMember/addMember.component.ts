import { Component, Input } from '@angular/core';
import { ForumService } from '../forum.service';

@Component({
    selector: 'add-member',
    templateUrl: './addMember.component.html',
    styleUrls: ['./addMember.component.css']
})

export class AddMember {

    @Input() forum;
    private users = [];
    private page = 1;
    private keyword = '';

    constructor(private service: ForumService) {

    }

    addMember(user) {
        const member = {
            forumId: this.forum.id,
            userId: user.id
        };
        this.service.addMember(member).subscribe(
            res => {
                console.log(res);
            }
        );
    }

    searchUser() {
        this.service.searchUser(this.keyword).subscribe(
            res => {
                this.users = res.Result;
            }
        );
    }
}
