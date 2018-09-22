import { Component, Input } from "@angular/core";
import { ForumService } from "../forum.service";
import { SharedService } from "../../shared/services/shared.service";

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

    constructor(private service: ForumService, private sharedService: SharedService) {
        
    }

    addMember(user) {
        const member = {
            forumId: this.forum.id,
            userId: user.id
        };
        this.service.addMember(member).subscribe(
            res => {
                this.sharedService.addToast("Success", "New Member Added!.", 'success');
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
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
