import { Component, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { ForumService } from '../../forum/forum.service';

@Component({
    selector: 'app-add-project-member',
    templateUrl: './addMember.component.html',
    styleUrls: ['./addMember.component.css']
})

export class AddProjectMemberComponent {

    @Input() project;
    private users = [];
    private page = 1;
    private keyword = '';

    constructor(private service: ProjectService, private forumService: ForumService) {

    }

    addMember(user) {
        const member = {
            forumId: this.project.id,
            userId: user.id
        };
        this.service.addProjectMember(member).subscribe(
            res => {
                console.log(res);
            }
        );
    }

    searchUser() {
        this.forumService.searchUser(this.keyword).subscribe(
            res => {
                this.users = res.Result;
            }
        );
    }
}
