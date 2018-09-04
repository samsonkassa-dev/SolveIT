import { Component, Input } from "@angular/core";
import { ProjectService } from "../project.service";
import { ForumService } from "../../forum/forum.service";

@Component({
    selector: 'add-project-member',
    templateUrl: './addMember.component.html',
    styleUrls: ['./addMember.component.css']
})

export class AddProjectMember {

    @Input() project;
    private users = [];
    private page: number = 1;
    private keyword = '';

    constructor(private service: ProjectService, private forumService: ForumService) {
        
    }
    
    addMember(user) {   
        let member = {
            forumId: this.project.id,
            userId: user.id
        }
        this.service.addProjectMember(member).subscribe(
            res => {
                console.log(res);
            }
        )
    }

    searchUser() {
        this.forumService.searchUser(this.keyword).subscribe(
            res => {
                this.users = res.Result;
            }
        )
    }
}