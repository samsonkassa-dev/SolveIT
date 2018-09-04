import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { ForumService } from "../forum.service";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
    selector: "app-forum-create",
    templateUrl: "./createForum.component.html",
    styleUrls: ["./createForum.component.css"]
})

export class CreateForum {

    @Input() categories;
    private forum = { userAccountId:0 };
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
        this.service.createForum(this.forum).subscribe(
            res => {
                let forumId = res.id;
                this._authService.getUserInfo().subscribe(
                    res => {
                        let userId = res.id;
                        let member = {
                            forumId: forumId,
                            userId: userId
                        }
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